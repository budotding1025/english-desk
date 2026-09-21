    (function () {
      const DATA = window.ENGLISH_DESK_DATA;
      const Lesson = window.EnglishDeskLesson;
      const Progress = window.EnglishDeskProgress;
      const V = window.EnglishVoice;
      const STORE_KEY = "english-desk-v3";

      const $ = (id) => document.getElementById(id);
      const state = {
        view: "home",
        unitId: "u1",
        sessionId: "weekdayListen",
        pathId: "u1-L1",
        cards: [],
        index: 0,
        results: [],
        revealed: false,
        listenLocked: false,
        sortAssign: {},
        sortActive: null,
        lessonCoins: 0,
        correctInLesson: 0,
        lastSettle: null,
        lessonMode: "normal",
        returnTo: "home",
      };

      function loadStore() {
        try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); }
        catch (e) { return {}; }
      }
      function saveStore(partial) {
        const next = Object.assign({}, loadStore(), partial);
        localStorage.setItem(STORE_KEY, JSON.stringify(next));
        return next;
      }
      function todayKey() {
        return new Date().toISOString().slice(0, 10);
      }
      function unit() {
        return DATA.units.find((u) => u.id === state.unitId) || DATA.units[0];
      }
      function card() {
        return state.cards[state.index] || null;
      }

      function streakDays() {
        const logs = loadStore().logs || {};
        const keys = Object.keys(logs).filter((k) => logs[k] && logs[k].done).sort().reverse();
        if (!keys.length) return 0;
        let n = 0;
        const d = new Date();
        for (;;) {
          const key = d.toISOString().slice(0, 10);
          if (logs[key] && logs[key].done) {
            n += 1;
            d.setDate(d.getDate() - 1);
          } else if (n === 0 && key === todayKey()) {
            d.setDate(d.getDate() - 1);
          } else break;
        }
        return n;
      }

      let homeAudio = null;
      let homeAudioDone = null;
      let cancelHomeIntro = function () {};
      let startHomeMascotLoop = function () {};
      let hideSloganTapHint = function () {};
      let showSloganTapHint = function () {};
      const homeSloganSaid = { turtle: false, bee: false };
      let homeSloganBusy = false;
      let sloganGen = 0;
      let fxAudio = null;
      let fxToken = 0;
      function pauseFx() {
        if (!fxAudio) return;
        try {
          fxAudio.onended = null;
          fxAudio.pause();
          fxAudio.src = "";
        } catch (e) {}
        fxAudio = null;
      }
      function stopFx() {
        fxToken += 1;
        pauseFx();
      }
      function playFx(name, seconds) {
        if (V && !V.isEnabled()) return;
        stopFx();
        const token = fxToken;
        const a = new Audio("./audio/fx/" + name + ".wav?v=3");
        fxAudio = a;
        a.volume = 0.9;
        const started = a.play();
        if (started && started.catch) started.catch(function () {});
        setTimeout(function () {
          if (token !== fxToken || fxAudio !== a) return;
          pauseFx();
        }, Math.round(seconds * 1000));
      }
      function stopHomeAudio() {
        const done = homeAudioDone;
        homeAudioDone = null;
        if (homeAudio) {
          try {
            homeAudio.onended = null;
            homeAudio.onerror = null;
            homeAudio.pause();
            try { homeAudio.currentTime = 0; } catch (e2) {}
          } catch (e) {}
          homeAudio = null;
        }
        if (done) done(false);
        sloganGen += 1;
        homeSloganBusy = false;
        const host = location.hostname;
        if (host === "localhost" || host === "127.0.0.1") {
          fetch("http://127.0.0.1:8731/api/stop", { cache: "no-store" }).catch(function () {});
        }
      }

      function showView(name) {
        state.view = name;
        $("screenHome").classList.toggle("hidden", name !== "home");
        $("screenLesson").classList.toggle("hidden", name !== "lesson");
        $("screenDone").classList.toggle("hidden", name !== "done");
        if ($("screenPath")) $("screenPath").classList.toggle("hidden", name !== "path");
        if ($("screenRecords")) $("screenRecords").classList.toggle("hidden", name !== "records");
        const showNav = name === "home" || name === "path" || name === "records";
        if ($("appNav")) $("appNav").classList.toggle("hidden", !showNav);
        syncNav(name === "path" || name === "home" || name === "records" ? name : null);
        stopFx();
        stopMascotLine();
        if (name !== "home") {
          cancelHomeIntro();
          stopHomeAudio();
          hideSloganTapHint();
        }
        if (name !== "lesson") stopChallengeTimer();
        if (name !== "lesson" && V) V.stop();
        if (name === "lesson") playLessonHome();
        // 回首页：等 V.stop 后再播 slogan，避免刚解锁的音频被立刻打断
        if (name === "home") {
          playNavHome();
          setTimeout(function () {
            if (state.view === "home") startHomeMascotLoop();
          }, 30);
        }
      }

      const homeAnims = {};
      function mountHomeLottie(hostId) {
        const host = $(hostId);
        if (!host || homeAnims[hostId]) return homeAnims[hostId] || null;
        if (!window.lottie || location.protocol === "file:") {
          host.textContent = "🏠";
          host.classList.add("nav-fallback");
          return null;
        }
        try {
          const anim = window.lottie.loadAnimation({
            container: host,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "./assets/lottie/home-in-out.json?v=2",
          });
          homeAnims[hostId] = anim;
          anim.addEventListener("DOMLoaded", () => {
            try { anim.play(); } catch (e) {}
          });
          anim.addEventListener("data_failed", () => {
            host.textContent = "🏠";
            host.classList.add("nav-fallback");
            homeAnims[hostId] = null;
          });
          return anim;
        } catch (e) {
          host.textContent = "🏠";
          host.classList.add("nav-fallback");
          return null;
        }
      }
      function mountNavHome() {
        mountHomeLottie("navHomeLottie");
        mountHomeLottie("lessonHomeLottie");
      }
      function playHomeLottie(hostId) {
        let anim = homeAnims[hostId];
        if (!anim) anim = mountHomeLottie(hostId);
        if (!anim) return;
        try {
          if (anim.isPaused) anim.play();
          else anim.goToAndPlay(0, true);
        } catch (e) {}
      }
      function playNavHome() {
        playHomeLottie("navHomeLottie");
      }
      function playLessonHome() {
        playHomeLottie("lessonHomeLottie");
      }
      function syncNav(active) {
        document.querySelectorAll(".nav-item").forEach((el) => {
          el.classList.toggle("is-on", !!active && el.dataset.nav === active);
        });
      }

      function walletStore() {
        return Progress.ensureProgress(loadStore());
      }

      function syncWalletUI() {
        const s = walletStore();
        function setCount(id, text) {
          const el = $(id);
          if (!el) return;
          const b = el.querySelector("b");
          if (b) b.textContent = text;
        }
        setCount("homeCoins", String(s.coins));
        setCount("homeGems", String(s.gems));
        setCount("pathCoins", String(s.coins));
        setCount("recordsGems", String(s.gems));
        setCount("lessonCoinsHud", "+" + (state.lessonCoins || 0));
        const rank = Progress.currentRank(s);
        const nxt = Progress.nextRank(s);
        if ($("rankLine")) {
          $("rankLine").textContent = nxt
            ? rank.en + " · " + rank.zh + "  ·  下一级要 " + Progress.coinNeed(s, nxt) + " 金币、" + nxt.lessons + " 课"
            : rank.en + " · " + rank.zh;
        }
        const done = Progress.completedCount(s.completedLessons);
        const total = Progress.pathTotal();
        if ($("pathSummary")) {
          $("pathSummary").textContent = "本学期已学 " + done + " / " + total + " 课 · 多学/复习可拿附加金币";
        }
        syncRetryBadge(s);
      }

      function paintRetryBadge(host, n) {
        if (!host) return;
        let badge = host.querySelector(".nav-badge");
        if (!n) {
          if (badge) badge.remove();
          return;
        }
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "nav-badge";
          host.appendChild(badge);
        }
        badge.textContent = n > 99 ? "99+" : String(n);
      }

      function syncRetryBadge(store) {
        const n = ((store || walletStore()).retryWords || []).length;
        const btn = $("navRecords");
        if (btn) {
          paintRetryBadge(btn, n);
          btn.setAttribute("aria-label", n ? "Records，" + n + " 道错题" : "Records");
        }
        const retryBtn = document.querySelector("#recordsActions .rec-action-retry");
        paintRetryBadge(retryBtn, n);
        if (retryBtn) retryBtn.setAttribute("aria-label", n ? "错题复习，" + n + " 道" : "错题复习");
      }

      function huiwenDue(store) {
        store = store || walletStore();
        const recent = (store.stats && store.stats.recent) || [];
        const floatAcc = Progress.floatAccuracyPct(store);
        const acc = Progress.accuracyPct(store);
        const holding = recent.length >= Progress.FLOAT_WINDOW && floatAcc >= 95 && acc >= 95;
        if (!holding) {
          if (store.huiwenWatch) saveStore({ huiwenWatch: null });
          return false;
        }
        const today = todayKey();
        const watch = store.huiwenWatch || { since: today, days: [], dismissed: false };
        let changed = !store.huiwenWatch;
        if (watch.days.indexOf(today) < 0) {
          watch.days.push(today);
          changed = true;
        }
        if (changed) saveStore({ huiwenWatch: watch });
        if (watch.dismissed) return false;
        const span = Math.round((new Date(today + "T12:00:00") - new Date(watch.since + "T12:00:00")) / 86400000);
        return watch.days.length >= 3 || span >= 7;
      }

      function paintHuiwen(store) {
        const show = huiwenDue(store);
        ["huiwenHome", "huiwenRecords"].forEach((id) => {
          const el = $(id);
          if (!el) return;
          el.classList.toggle("hidden", !show);
          if (!show) {
            el.innerHTML = "";
            return;
          }
          el.innerHTML =
            "<p>最近正确率已经稳住 95%。可以考虑接入汇文南的提升内容。</p>" +
            '<button type="button" data-huiwen-dismiss>知道了</button>';
          el.querySelector("[data-huiwen-dismiss]").addEventListener("click", () => {
            const cur = walletStore();
            const watch = Object.assign({}, cur.huiwenWatch || {}, { dismissed: true });
            saveStore({ huiwenWatch: watch });
            paintHuiwen(walletStore());
          });
        });
      }

      function persistWallet(store) {
        saveStore({
          coins: store.coins,
          gems: store.gems,
          rank: store.rank,
          gemCut: store.gemCut,
        });
      }

      let challengeTimer = null;
      function formatClock(sec) {
        sec = Math.max(0, sec | 0);
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return m + ":" + (s < 10 ? "0" : "") + s;
      }
      function paintChallengeClock() {
        const el = $("challengeTime");
        if (el) el.textContent = formatClock(state.challengeLeft || 0);
        const hold = $("challengeHold");
        if (hold) hold.classList.toggle("hidden", !state.challengeHold);
        const btn = $("btnGemTime");
        if (!btn) return;
        const gems = walletStore().gems;
        btn.disabled = gems < 1;
        btn.textContent = gems < 1 ? "没有宝石" : "1 宝石 +" + Progress.GEM_TIME + " 秒";
      }
      function stopChallengeTimer() {
        if (challengeTimer) {
          clearInterval(challengeTimer);
          challengeTimer = null;
        }
        state.challengeHold = false;
        const box = $("challengeClock");
        if (box) box.classList.add("hidden");
        paintChallengeClock();
      }
      function tickChallenge() {
        state.challengeLeft -= 1;
        paintChallengeClock();
        if (state.challengeLeft <= 0) {
          stopChallengeTimer();
          finishLesson("timeout");
        }
      }
      function armChallengeInterval() {
        if (challengeTimer) clearInterval(challengeTimer);
        challengeTimer = setInterval(tickChallenge, 1000);
      }
      function pauseChallengeClock() {
        if (state.lessonMode !== "challenge" || state.view !== "lesson") return;
        if (challengeTimer) {
          clearInterval(challengeTimer);
          challengeTimer = null;
        }
        state.challengeHold = true;
        const box = $("challengeClock");
        if (box) box.classList.remove("hidden");
        paintChallengeClock();
      }
      function resumeChallengeClock() {
        if (!state.challengeHold) return;
        state.challengeHold = false;
        paintChallengeClock();
        if (state.lessonMode !== "challenge" || state.view !== "lesson") return;
        if ((state.challengeLeft || 0) <= 0) {
          finishLesson("timeout");
          return;
        }
        armChallengeInterval();
      }
      function startChallengeTimer(seconds) {
        stopChallengeTimer();
        state.challengeLeft = seconds;
        const box = $("challengeClock");
        if (box) box.classList.remove("hidden");
        paintChallengeClock();
        armChallengeInterval();
      }

      function showCoinToast(amount) {
        const el = $("coinToast");
        if (!el) return;
        $("coinToastText").textContent = "+" + amount;
        el.classList.remove("hidden");
        el.classList.remove("pop");
        void el.offsetWidth;
        el.classList.add("pop");
        clearTimeout(showCoinToast._t);
        showCoinToast._t = setTimeout(() => {
          el.classList.add("hidden");
          el.classList.remove("pop");
        }, 900);
      }

      let mascotAudio = null;
      let praiseGate = Promise.resolve();
      function stopMascotLine() {
        if (!mascotAudio) return;
        try {
          mascotAudio.onended = null;
          mascotAudio.onerror = null;
          mascotAudio.pause();
          mascotAudio.src = "";
        } catch (e) {}
        mascotAudio = null;
      }
      function playMascotLine(clip, role, text) {
        return new Promise((resolve) => {
          if (V && !V.isEnabled()) { resolve(); return; }
          stopMascotLine();
          if (V) V.stop();
          const a = new Audio("./audio/cheer/" + clip + ".mp3?v=1");
          mascotAudio = a;
          let settled = false;
          const finish = function () {
            if (settled) return;
            settled = true;
            if (mascotAudio === a) mascotAudio = null;
            resolve();
          };
          const fallback = function () {
            if (settled) return;
            if (V) {
              const p = V.speak(text, role, { forceAll: true });
              if (p && p.then) p.then(finish).catch(finish);
              else setTimeout(finish, 900);
            } else finish();
          };
          a.onended = finish;
          a.onerror = fallback;
          const started = a.play();
          if (started && started.catch) started.catch(fallback);
        });
      }
      function cueReward(fxName, fxSeconds, clip, role, text, voiceMs) {
        playFx(fxName, fxSeconds);
        const token = fxToken;
        state.praiseWait = 1000 + voiceMs;
        praiseGate = new Promise((resolve) => {
          setTimeout(function () {
            if (token !== fxToken) { resolve(); return; }
            if ((clip === "streak2" || clip === "streak5") && fxAudio) fxAudio.volume = 0.18;
            if (state.view !== "lesson" && state.view !== "done") { resolve(); return; }
            playMascotLine(clip, role, text).then(resolve);
          }, 1000);
        });
        return praiseGate;
      }
      function afterPraise(fn, gapMs) {
        gapMs = gapMs == null ? 280 : gapMs;
        const gate = praiseGate || Promise.resolve();
        gate.then(() => {
          setTimeout(() => {
            if (typeof fn === "function") fn();
          }, gapMs);
        });
      }
      function onCorrectReward() {
        const gain = Progress.COIN_CORRECT;
        state.lessonCoins = (state.lessonCoins || 0) + gain;
        state.correctInLesson = (state.correctInLesson || 0) + 1;
        state.correctStreak = (state.correctStreak || 0) + 1;
        showCoinToast(gain);
        syncWalletUI();
        const n = state.correctStreak;
        if (n === 5) {
          cueReward("sparkle", 2.6, "streak5", "girlChild", "我说什么来着！你比你自己想象的要厉害得多！", 5200);
        } else if (n === 2) {
          cueReward("sparkle", 2.6, "streak2", "girlChild", "哇！你又答对了！厉害！", 3000);
        } else {
          cueReward("sparkle", 2.6, "ok", "girlChild", "赞！", 900);
        }
      }

      function onWrongReward() {
        state.correctStreak = 0;
        cueReward("bug", 0.8, "wrong", "boyChild", "没关系，错了就改。加油！下一次你一定行！", 5200);
      }

      function mountCoinsLottie(host, loop) {
        if (!host) return null;
        host.innerHTML = "";
        if (!window.lottie || location.protocol === "file:") {
          host.innerHTML = '<div class="coin-fallback">🪙🪙🪙</div>';
          return null;
        }
        try {
          return window.lottie.loadAnimation({
            container: host,
            renderer: "svg",
            loop: !!loop,
            autoplay: true,
            path: "./assets/lottie/coins.json?v=1",
          });
        } catch (e) {
          host.innerHTML = '<div class="coin-fallback">🪙🪙🪙</div>';
          return null;
        }
      }

      function renderHome() {
        state.sessionId = Lesson.todaySessionId();
        const store = walletStore();
        const node = Progress.nodeById(store.currentPathId) || Progress.semesterPath()[0];
        if (node) {
          state.pathId = node.id;
          state.unitId = node.unitId;
        }
        const sess = Lesson.sessionMeta("weekdayListen");
        const u = unit();
        const bookNo = node ? (node.bookLesson || node.lesson) : "";
        const unitTitle = (node && node.unitTitle) || (u && u.name) || "";
        const lessonTitle = (node && node.lessonTitle) || "";
        if ($("sessionEyebrow")) $("sessionEyebrow").textContent = unitTitle;
        if ($("sessionTitle")) $("sessionTitle").textContent = lessonTitle;
        if ($("sessionMeta")) {
          $("sessionMeta").textContent = (bookNo ? "Lesson " + bookNo + " · " : "") + "约 " + sess.minutes + " 分钟";
        }
        if ($("unitLine")) {
          $("unitLine").textContent = unitTitle + (lessonTitle ? " · " + lessonTitle : "");
        }
        $("streakLine").innerHTML = "连续 <strong>" + streakDays() + "</strong> 天";
        syncWalletUI();
        paintHuiwen(walletStore());
      }

      function startLesson(pathId, opts) {
        if (V && V.prime) V.prime();
        opts = opts || {};
        const mode = opts.mode || "normal";
        state.lessonMode = mode;
        state.returnTo = mode === "retry" || mode === "challenge" || mode === "phonics" ? "records" : "home";
        const store = walletStore();
        if (pathId) state.pathId = pathId;
        else state.pathId = store.currentPathId || state.pathId;
        const node = Progress.nodeById(state.pathId);
        if (node) {
          state.unitId = node.unitId;
          if (state.lessonMode === "normal") {
            saveStore({ unitId: state.unitId, currentPathId: state.pathId });
          } else {
            saveStore({ unitId: state.unitId });
          }
        }
        const sessionId =
          state.lessonMode === "retry"
            ? "retry"
            : state.lessonMode === "challenge"
              ? "challenge"
              : state.lessonMode === "phonics"
                ? "phonics"
                : "weekdayListen";
        const cardStore = Object.assign({}, store, { currentPathId: state.pathId });
        state.cards = Lesson.buildCards(unit(), sessionId, cardStore);
        state.sessionId = sessionId;
        state.index = 0;
        state.results = [];
        state.revealed = false;
        state.listenLocked = false;
        state.lessonCoins = 0;
        state.correctInLesson = 0;
        state.correctStreak = 0;
        state.praiseWait = 0;
        state.scored = false;
        state.lastSettle = null;
        stopChallengeTimer();
        if (!state.cards.length) {
          if (state.lessonMode === "retry") alert("暂时没有错题，先去上课积累几道吧。");
          else if (state.lessonMode === "phonics") alert("发音小站还在准备词，先去上一课吧。");
          else alert("本单元暂无练习内容。");
          return;
        }
        showView("lesson");
        syncLessonBack();
        syncWalletUI();
        if (state.lessonMode === "challenge") startChallengeTimer(Progress.challengeSeconds(state.cards.length));
        renderCard(true);
      }

      function renderPath() {
        const store = walletStore();
        const path = Progress.semesterPath();
        const doneN = Progress.completedCount(store.completedLessons);
        $("pathMeta").textContent =
          "本学期共 " + path.length + " 课 · 已学 " + doneN + " 课 · 复习/多学都有附加金币";
        syncWalletUI();
        const list = $("pathList");
        list.innerHTML = "";
        let lastUnit = "";
        path.forEach((node, i) => {
          if (node.unitId !== lastUnit) {
            lastUnit = node.unitId;
            const head = document.createElement("h2");
            head.className = "path-unit";
            head.textContent = node.unitTitle || node.unitName || "";
            list.appendChild(head);
          }
          const rec = store.completedLessons[node.id];
          const done = !!(rec && rec.count > 0);
          const current = store.currentPathId === node.id;
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "path-node" + (done ? " is-done" : "") + (current ? " is-current" : "");
          const bookNo = node.bookLesson || node.lesson;
          btn.innerHTML =
            '<span class="path-dot">' + (done ? "✓" : bookNo) + "</span>" +
            '<span class="path-copy"><strong>' + node.lessonTitle + "</strong>" +
            "<small>" + (node.unitTitle || "") + "</small>" +
            "<small>" + (done ? "已学 · 复习 +" + 25 + " 币" : current ? "Lesson " + bookNo + " · 下一课 · 首通 +" + 50 + " 币" : "Lesson " + bookNo) +
            "</small></span>";
          btn.addEventListener("click", () => {
            startLesson(node.id);
          });
          list.appendChild(btn);
        });
      }

      function renderRankShop(store) {
        const rankBox = $("rankPanel");
        const shopBox = $("shopPanel");
        if (!rankBox) return;
        const cur = Progress.currentRank(store);
        const nxt = Progress.nextRank(store);
        const done = Progress.completedCount(store.completedLessons);
        rankBox.innerHTML = "";
        const card = document.createElement("div");
        card.className = "rank-card";
        if (!nxt) {
          card.innerHTML =
            '<p class="score-label">当前等级</p>' +
            '<p class="rank-name">' + cur.en + " · " + cur.zh + "</p>" +
            '<p class="rank-cost">已是最高等级</p>';
        } else {
          const need = Progress.coinNeed(store, nxt);
          const coinPct = need <= 0 ? 100 : Math.min(100, Math.round((store.coins / need) * 100));
          const lessonPct = nxt.lessons <= 0 ? 100 : Math.min(100, Math.round((done / nxt.lessons) * 100));
          const cutNote = store.gemCut ? "（宝石已抵 " + store.gemCut + "）" : "";
          card.innerHTML =
            '<p class="score-label">当前等级</p>' +
            '<p class="rank-name">' + cur.en + " · " + cur.zh + "</p>" +
            '<p class="rank-cost">下一级 ' + nxt.en + " · " + nxt.zh + " · 金币和已学课数都要够</p>" +
            '<p class="rank-need">金币 ' + store.coins + " / " + need + cutNote + "</p>" +
            '<div class="rank-bar"><i style="width:' + coinPct + '%"></i></div>' +
            '<p class="rank-need">进度 ' + done + " / " + nxt.lessons + " 课</p>" +
            '<div class="rank-bar"><i style="width:' + lessonPct + '%"></i></div>';
        }
        rankBox.appendChild(card);
        if (nxt) {
          const need = Progress.coinNeed(store, nxt);
          const ready = store.coins >= need && done >= nxt.lessons;
          const up = document.createElement("button");
          up.type = "button";
          up.className = "btn-start rank-up";
          up.textContent = ready ? "升级到 " + nxt.en : "金币和进度都够才能升级";
          up.disabled = !ready;
          up.addEventListener("click", () => {
            const res = Progress.upgradeRank(walletStore());
            persistWallet(res.store);
            syncWalletUI();
            renderRecords();
            if (!res.ok) alert(res.reason);
          });
          rankBox.appendChild(up);
          const gem = document.createElement("button");
          gem.type = "button";
          gem.className = "btn-ok rank-up";
          gem.textContent = "用 1 宝石抵 " + Progress.GEM_CUT + " 金币";
          gem.disabled = store.gems < 1 || need <= 0;
          gem.addEventListener("click", () => {
            const res = Progress.spendGemBoost(walletStore());
            persistWallet(res.store);
            syncWalletUI();
            renderRecords();
            if (!res.ok) alert(res.reason);
          });
          rankBox.appendChild(gem);
        }
        if (shopBox) {
          shopBox.innerHTML =
            '<ul class="shop-note rules">' +
            "<li>答对一题：+10 金币</li>" +
            "<li>上完一课：再得金币奖励，还送 1 宝石</li>" +
            "<li>宝石：升级时可抵金币；挑战里可加时间</li>" +
            "<li>升级要两样都够：金币够 + 上过的课够</li>" +
            "<li>慢速 0.5×：随便点，不花金币也不花宝石</li>" +
            "</ul>";
        }
      }

      function renderRecords() {
        const store = walletStore();
        syncWalletUI();
        paintHuiwen(store);
        renderRankShop(store);
        const acc = Progress.accuracyPct(store);
        const floatAcc = Progress.floatAccuracyPct(store);
        const answered = (store.stats && store.stats.answered) || 0;
        const correct = (store.stats && store.stats.correct) || 0;
        const recentN = ((store.stats && store.stats.recent) || []).length;
        const retries = store.retryWords || [];
        if ($("recordsScore")) {
          $("recordsScore").innerHTML =
            '<div class="score-hero">' +
            '<p class="score-label">总积分</p>' +
            '<p class="score-num">' + store.coins + ' <span>🪙</span></p>' +
            '<p class="score-sub">宝石 ' + store.gems + ' 💎 · 连续 ' + streakDays() + ' 天</p>' +
            "</div>" +
            '<div class="records-stats">' +
            '<div class="rec-stat"><strong>' + (acc == null ? "—" : acc + "%") + "</strong><span>正确率</span><small>" + correct + "/" + answered + "</small></div>" +
            '<div class="rec-stat float"><strong>' + (floatAcc == null ? "—" : floatAcc + "%") + "</strong><span>浮动正确率</span><small>近 " + (recentN || Progress.FLOAT_WINDOW) + " 题</small></div>" +
            '<div class="rec-stat"><strong>' + retries.length + "</strong><span>错题待练</span><small>错词本</small></div>" +
            "</div>" +
            '<p class="score-sub">上课和错题复习计入正确率。发音小站、难度挑战不算。</p>';
        }
        if ($("recordsActions")) {
          $("recordsActions").innerHTML = "";
          const retryBtn = document.createElement("button");
          retryBtn.type = "button";
          retryBtn.className = "rec-action rec-action-retry";
          retryBtn.innerHTML =
            "<strong>错题复习</strong><span>" +
            (retries.length ? retries.length + " 道错题 · 听写强化" : "暂无错题") +
            "</span>";
          retryBtn.disabled = !retries.length;
          retryBtn.addEventListener("click", () => startLesson(null, { mode: "retry" }));
          const challengeBtn = document.createElement("button");
          challengeBtn.type = "button";
          challengeBtn.className = "rec-action challenge";
          challengeBtn.innerHTML = "<strong>难度挑战</strong><span>约 8 题 · 听写 · 听力 · 口语</span>";
          challengeBtn.addEventListener("click", () => startLesson(null, { mode: "challenge" }));
          const phonicsBtn = document.createElement("button");
          phonicsBtn.type = "button";
          phonicsBtn.className = "rec-action";
          phonicsBtn.innerHTML = "<strong>发音小站</strong><span>听熟词 · 判 √× · 跟读画线音</span>";
          phonicsBtn.addEventListener("click", () => startLesson(null, { mode: "phonics" }));
          $("recordsActions").appendChild(retryBtn);
          $("recordsActions").appendChild(phonicsBtn);
          $("recordsActions").appendChild(challengeBtn);
          paintRetryBadge(retryBtn, retries.length);
        }
        if ($("recordsMeta")) {
          $("recordsMeta").textContent = retries.length
            ? "错题记录 · " + retries.length + " 道，点一项可单练"
            : "错题记录 · 答错后会出现在这里";
        }
        const list = $("recordsList");
        if (!list) return;
        list.innerHTML = "";
        if (!retries.length) {
          const empty = document.createElement("p");
          empty.className = "records-empty";
          empty.textContent = "答错的题会记在这里。复习做对后，红色数字会变小或消失。";
          list.appendChild(empty);
          return;
        }
        retries
          .slice()
          .reverse()
          .forEach((r) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "path-node";
            const u = DATA.units.find((x) => x.id === r.unitId);
            btn.innerHTML =
              '<span class="path-dot">!</span>' +
              '<span class="path-copy"><strong>' + r.en + "</strong>" +
              "<small>" + r.zh + (u ? " · " + u.name : "") + (r.date ? " · " + r.date : "") + "</small></span>";
            btn.addEventListener("click", () => {
              state.unitId = r.unitId || state.unitId;
              startLesson(null, { mode: "retry" });
            });
            list.appendChild(btn);
          });
      }

      function progressPct() {
        if (!state.cards.length) return 0;
        return Math.round((state.index / state.cards.length) * 100);
      }

      function renderCard(autoSpeak) {
        const c = card();
        if (!c) {
          finishLesson();
          return;
        }
        state.revealed = false;
        state.listenLocked = false;
        state.scored = false;
        state.sortAssign = {};
        state.sortActive = null;
        $("progressFill").style.width = progressPct() + "%";
        $("cardType").textContent = c.title || c.type;
        $("cardPrompt").textContent = c.prompt || "";
        $("cardSub").textContent = c.tip || c.sub || "";
        $("cardExtra").innerHTML = "";
        $("cardActions").innerHTML = "";
        paintLessonHead();

        if (c.type === "word") renderWordCard(c);
        else if (c.type === "listen") renderListenCard(c);
        else if (c.type === "pattern") renderPatternCard(c);
        else if (c.type === "oral") renderOralCard(c);
        else if (c.type === "phonics") renderPhonicsCard(c);
        else if (c.type === "dialogue") renderDialogueCard(c);
        else if (c.type === "sort") renderSortCard(c);
        else if (c.type === "write") renderWriteCard(c);
        else if (c.type === "read") renderReadCard(c);
        else renderOkBad(c);

        if (autoSpeak && V && V.isEnabled()) {
          if (V.prime) V.prime();
          if (c.autoPlay) speakCard(c);
          else if (c.type === "word" && c.zh) V.speak(c.zh, "girlChild");
        }
      }

      function syncLessonBack() {
        const btn = $("btnCloseLesson");
        if (!btn) return;
        const backRecords = state.returnTo === "records";
        const label = btn.querySelector(".nav-label");
        const icon = btn.querySelector(".nav-lottie");
        const book = btn.querySelector(".lesson-records-glyph");
        if (label) label.textContent = backRecords ? "Records" : "Home";
        btn.setAttribute("aria-label", backRecords ? "返回 Records" : "Home");
        if (icon) icon.classList.toggle("hidden", backRecords);
        if (book) book.classList.toggle("hidden", !backRecords);
      }

      function paintLessonHead() {
        const node = Progress.nodeById(state.pathId);
        const u = unit();
        if ($("lessonUnitTitle")) {
          if (state.lessonMode === "phonics") $("lessonUnitTitle").textContent = "发音小站";
          else $("lessonUnitTitle").textContent = (node && node.unitTitle) || (u && u.name) || "";
        }
        if ($("lessonNameTitle")) {
          if (state.lessonMode === "retry") $("lessonNameTitle").textContent = "Review · 错题复习";
          else if (state.lessonMode === "challenge") $("lessonNameTitle").textContent = "Challenge · 难度挑战";
          else if (state.lessonMode === "phonics") $("lessonNameTitle").textContent = "Phonics · 发音小站";
          else if (node) $("lessonNameTitle").textContent = "Lesson " + (node.bookLesson || node.lesson) + " · " + node.lessonTitle;
          else $("lessonNameTitle").textContent = "";
        }
        if ($("lessonFocus")) {
          const focus = (u && u.focus && node && u.focus[node.lesson - 1]) || "";
          if (state.lessonMode === "challenge") {
            $("lessonFocus").textContent = "比课本再难一点：长句听力、延展句型、要开口说完";
          } else if (state.lessonMode === "phonics") {
            $("lessonFocus").textContent = "听熟词，判断画线部分发音相同还是不同，再跟读";
          } else if (node && u && node.lesson === u.lessonCount) {
            $("lessonFocus").textContent = "本单元复习 · 知识延展 · " + focus;
          } else {
            $("lessonFocus").textContent = focus;
          }
        }
      }

      function setCoachTalking(on) {
        document.querySelectorAll(".coach-avatar").forEach((el) => {
          el.classList.toggle("is-talking", !!on);
          el.classList.toggle("is-idle", !on);
        });
      }

      function speakCard(c, rate) {
        if (!V || !c) return;
        setCoachTalking(true);
        const done = () => setTimeout(() => setCoachTalking(false), 200);
        const opts = rate && rate !== 1 ? { rate: rate } : undefined;
        let p;
        if (c.type === "dialogue" && c.lines) {
          p = V.speakSequence(c.lines.map((l) => ({ role: l.role, text: l.text, rate: opts && opts.rate })));
        } else if (c.type === "pattern" && c.demos && c.demos.length) {
          p = V.speakSequence(
            c.demos.map((d) => ({
              role: d.role || c.speakRole || "girlChild",
              text: d.text,
              rate: opts && opts.rate,
            }))
          );
        } else if (c.type === "write" && c.passage) {
          const parts = c.passage.split(/\n+/).map((s) => s.trim()).filter(Boolean);
          p = V.speakSequence(parts.map((text) => ({ role: c.narratorRole || "boyChild", text: text, rate: opts && opts.rate })));
        } else if (c.type === "phonics" && c.left && c.right) {
          p = V.speakSequence([
            { role: c.speakRole || "girlChild", text: c.left.en, rate: opts && opts.rate },
            { role: c.speakRole || "girlChild", text: c.right.en, rate: opts && opts.rate },
          ]);
        } else if (c.speakText) {
          p = V.speak(c.speakText, c.speakRole || "adultFemale", opts);
        }
        if (p && p.then) p.then(done).catch(done);
        else done();
      }

      function normalizeAnswer(s) {
        return String(s || "")
          .trim()
          .toLowerCase()
          .replace(/[’']/g, "'")
          .replace(/\s+/g, " ");
      }

      const LOTTIE = {
        turtle: "./assets/lottie/turtle.json?v=4",
        bee: "./assets/lottie/bee.json?v=4",
      };
      const PNG = {
        turtle: "./assets/turtle.png",
        bee: "./assets/bee.png",
      };
      const lottieAnims = {};

      function ensurePng(el, kind) {
        if (!el) return;
        let img = el.querySelector("img.mascot-fallback");
        if (!img) {
          img = document.createElement("img");
          img.className = "mascot-fallback";
          img.alt = kind === "bee" ? "翻翻蜂" : "翻翻龟";
          el.appendChild(img);
        }
        img.src = PNG[kind] || PNG.turtle;
        img.width = 148;
        img.height = 148;
        img.style.display = "";
      }

      function mountLottie(el, kind, loop) {
        if (!el) return null;
        const fb = el.querySelector("img.mascot-fallback");
        if (fb) fb.style.display = "none";
        if (!window.lottie) return null;
        el.querySelectorAll(".lottie-host").forEach((n) => n.remove());
        const host = document.createElement("div");
        host.className = "lottie-host";
        host.style.cssText = "position:absolute;inset:0;opacity:1;pointer-events:none;";
        el.appendChild(host);
        try {
          const anim = window.lottie.loadAnimation({
            container: host,
            renderer: "svg",
            loop: loop !== false,
            autoplay: true,
            path: LOTTIE[kind] || LOTTIE.turtle,
          });
          anim.addEventListener("DOMLoaded", () => {
            if (fb) fb.remove();
            try { anim.play(); } catch (e) {}
          });
          anim.addEventListener("data_failed", () => {
            host.remove();
          });
          return anim;
        } catch (e) {
          host.remove();
          return null;
        }
      }

      function playMascotAnim(kind) {
        const anim = lottieAnims[kind];
        if (!anim) return;
        try {
          if (anim.isPaused) anim.play();
          else anim.goToAndPlay(0, true);
        } catch (e) {}
      }

      function coachAvatar(kind) {
        const wrap = document.createElement("div");
        wrap.className = "coach-avatar coach-" + kind + " is-idle";
        const box = document.createElement("div");
        box.className = "coach-lottie";
        wrap.appendChild(box);
        mountLottie(box, kind, true);
        return wrap;
      }

      function coachBanner(kind, title) {
        const row = document.createElement("div");
        row.className = "coach-banner";
        row.appendChild(coachAvatar(kind));
        const text = document.createElement("div");
        text.className = "coach-copy";
        const name = document.createElement("strong");
        name.textContent = kind === "bee" ? "翻翻蜂" : "翻翻龟";
        const tip = document.createElement("span");
        tip.textContent = title;
        text.appendChild(name);
        text.appendChild(tip);
        row.appendChild(text);
        return row;
      }

      function actionSpeak(label, fn, secondary) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "btn-speak" + (secondary ? " secondary" : "");
        b.textContent = label;
        b.addEventListener("click", fn);
        $("cardActions").appendChild(b);
        return b;
      }

      /** 听音 + 慢速 0.5× 并排，始终一起出现 */
      function actionSpeakPair(label, speakFn) {
        const row = document.createElement("div");
        row.className = "row2 speak-pair";
        const normal = document.createElement("button");
        normal.type = "button";
        normal.className = "btn-speak";
        normal.textContent = label;
        normal.addEventListener("click", () => speakFn(1));
        const slow = document.createElement("button");
        slow.type = "button";
        slow.className = "btn-speak secondary";
        slow.textContent = "慢速 0.5×";
        slow.addEventListener("click", () => speakFn(0.5));
        row.appendChild(normal);
        row.appendChild(slow);
        $("cardActions").appendChild(row);
        return row;
      }

      function wordSpeak(c, rate) {
        if (V && V.prime) V.prime();
        if (!V || !c) return;
        const role = c.speakRole || (c.mode === "dictation" ? "boyChild" : "adultMale");
        const opts = rate && rate !== 1 ? { rate: rate } : undefined;
        const words = (c.followWords || []).map((w) => String(w || "").trim()).filter(Boolean);
        if (words.length >= 2) {
          V.speakSequence(words.map((text) => ({ role: role, text: text, rate: opts && opts.rate })));
          return;
        }
        const text = String(c.en || c.speakText || words[0] || "").trim();
        if (!text || text === "null" || text === "undefined") return;
        V.speak(text, role, opts);
      }
      function actionOkBad(onOk, onBad) {
        const row = document.createElement("div");
        row.className = "row2";
        const ok = document.createElement("button");
        ok.type = "button";
        ok.className = "btn-ok";
        ok.textContent = "会了";
        ok.addEventListener("click", onOk);
        const bad = document.createElement("button");
        bad.type = "button";
        bad.className = "btn-bad";
        bad.textContent = "不会";
        bad.addEventListener("click", onBad);
        row.appendChild(bad);
        row.appendChild(ok);
        $("cardActions").appendChild(row);
      }
      function renderOkBad(c) {
        actionSpeak("听 Agent", () => speakCard(c));
        actionOkBad(() => advance(true), () => advance(false));
      }

      function showAnswerThenContinue(c, wasOk) {
        $("cardActions").innerHTML = "";
        actionSpeakPair("再播放一次", (rate) => wordSpeak(c, rate));
        const go = document.createElement("button");
        go.type = "button";
        go.className = "btn-ok";
        go.textContent = "会了";
        go.addEventListener("click", () => advance(wasOk, c));
        $("cardActions").appendChild(go);
      }

      function startFollowRead(c, onDone, opts) {
        opts = opts || {};
        const times = opts.times > 0 ? opts.times : 3;
        const zh = opts.zh || "";
        const manual = !!opts.manualDone;
        let count = 0;
        let leftFollow = false;
        pauseChallengeClock();
        function leaveFollow() {
          if (leftFollow) return;
          leftFollow = true;
          resumeChallengeClock();
          onDone();
        }
        $("cardActions").innerHTML = "";
        if (zh) {
          const note = document.createElement("p");
          note.className = "follow-zh";
          note.textContent = "中文翻译：" + zh;
          $("cardExtra").appendChild(note);
        }
        const tip = document.createElement("p");
        tip.className = "follow-tip";
        tip.id = "followTip";
        tip.textContent = opts.tip || "大声跟读 " + times + " 遍";
        $("cardExtra").appendChild(tip);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-ok";
        btn.textContent = "跟读（0 / " + times + "）";
        btn.addEventListener("click", () => {
          count += 1;
          btn.textContent = "跟读（" + count + " / " + times + "）";
          wordSpeak(c, 1);
          if (count < times) return;
          btn.disabled = true;
          if (manual) {
            tip.textContent = opts.doneTip || "读得很棒！点「完成」";
            const done = document.createElement("button");
            done.type = "button";
            done.className = "btn-ok";
            done.textContent = "完成";
            done.addEventListener("click", () => leaveFollow());
            $("cardActions").appendChild(done);
            return;
          }
          tip.textContent = "跟读完成，继续下一题";
          setTimeout(() => leaveFollow(), 700);
        });
        $("cardActions").appendChild(btn);
        setTimeout(() => wordSpeak(c, 1), 200);
      }

      function fillHighlight(el, text, key) {
        const raw = String(text || "");
        const focus = String(key || "").trim();
        const at = focus ? raw.toLowerCase().indexOf(focus.toLowerCase()) : -1;
        el.textContent = "";
        if (at < 0) {
          el.textContent = raw;
          return;
        }
        el.appendChild(document.createTextNode(raw.slice(0, at)));
        const mark = document.createElement("mark");
        mark.textContent = raw.slice(at, at + focus.length);
        el.appendChild(mark);
        el.appendChild(document.createTextNode(raw.slice(at + focus.length)));
      }

      function listenFocus(c) {
        const choice = (c.choices || []).filter((ch) => String(ch.id) === String(c.answer))[0];
        const answerEn = c.kind === "reply" && choice ? choice.label : "";
        const tipEn = String(c.tip || "").match(/[A-Za-z][A-Za-z'’ .,!?]*/);
        let key = tipEn ? tipEn[0].trim().replace(/[.?!,\s]+$/, "") : "";
        if (!key) key = answerEn;
        return {
          original: c.speakText || "",
          key: key,
          answerEn: answerEn,
          zh: c.zh || "",
          explain: c.explain || "",
          answerZh: c.answerZh || "",
        };
      }

      function replayListenFocus(c, focus) {
        if (!V) return Promise.resolve();
        const role = c.speakRole || "girlChild";
        let chain = V.speak(focus.original, role) || Promise.resolve();
        if (focus.answerEn && focus.answerEn !== focus.original) {
          chain = chain.then(() => V.speak(focus.answerEn, "girlChild"));
        }
        if (focus.explain) {
          chain = chain.then(() => V.speak(focus.explain, "adultFemale", { forceAll: true }));
        }
        return chain;
      }

      function followJudgeOnce(c) {
        $("cardSub").textContent = "跟读一遍，记住这句话";
        startFollowRead(c, () => advance(!!state.results[state.results.length - 1], c), {
          times: 1,
          zh: c.zh || "",
          tip: "跟读一遍，加深记忆",
        });
      }

      function renderWordCard(c) {
        const isDictation = c.mode === "dictation";
        const extra = $("cardExtra");
        extra.innerHTML = "";
        $("cardActions").innerHTML = "";

        if (isDictation) {
          $("cardPrompt").textContent = "";
          $("cardSub").textContent = c.zh ? "中文意思：" + c.zh : "";
          extra.appendChild(coachBanner("turtle", "听「翻翻龟」读，写出英文"));
        } else {
          $("cardPrompt").textContent = c.zh || c.prompt || "";
          $("cardSub").textContent = "看中文，在下方输入英文";
          extra.appendChild(coachBanner("turtle", "写出英文，点确定"));
        }

        const field = document.createElement("div");
        field.className = "dictation-box";
        const inputEl = document.createElement("input");
        inputEl.id = "dictInput";
        inputEl.className = "dict-input";
        inputEl.type = "text";
        inputEl.value = "";
        inputEl.autocomplete = "off";
        inputEl.setAttribute("autocapitalize", "off");
        inputEl.setAttribute("autocorrect", "off");
        inputEl.spellcheck = false;
        inputEl.placeholder = "在这里输入英文";
        field.appendChild(inputEl);
        extra.appendChild(field);

        const confirm = document.createElement("button");
        confirm.type = "button";
        confirm.className = "btn-ok";
        confirm.id = "dictConfirm";
        confirm.textContent = "确定";
        confirm.addEventListener("click", () => {
          const input = $("dictInput");
          const typed = normalizeAnswer(input && input.value);
          const right = normalizeAnswer(c.en);
          if (!typed) {
            if (input) input.focus();
            return;
          }
          const ok = typed === right;
          state.revealed = true;
          confirm.disabled = true;
          if (input) input.disabled = true;
          const peek = document.createElement("div");
          peek.className = "answer-peek" + (ok ? " ok" : "");
          peek.textContent = (ok ? "对了！ " : "正确答案：") + c.en;
          extra.appendChild(peek);
          $("cardSub").textContent = "先听鼓励，再大声跟读 3 遍";
          $("cardActions").innerHTML = "";
          scoreAnswer(ok, c);
          afterPraise(() => {
            if (state.view !== "lesson" || card() !== c) return;
            // 看中文写词：跟读前先读一遍正确英文（角色规则不变）
            if (!isDictation) wordSpeak(c, 1);
            const leadMs = isDictation ? 0 : 700;
            setTimeout(() => {
              if (state.view !== "lesson" || card() !== c) return;
              startFollowRead(c, () => advance(ok, c), {
                tip: "大声跟读 3 遍",
              });
            }, leadMs);
          });
        });
        $("cardActions").appendChild(confirm);
        actionSpeakPair(isDictation ? "再听一遍" : "听发音", (rate) => wordSpeak(c, rate));

        inputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter") confirm.click();
        });
        setTimeout(() => {
          inputEl.value = "";
          inputEl.focus();
        }, 120);
      }

      function phonicsFollowCard(c) {
        const left = (c.left && c.left.en) || "";
        const right = (c.right && c.right.en) || "";
        return {
          en: left + " · " + right,
          speakText: left + " " + right,
          speakRole: "girlChild",
          followWords: [left, right].filter(Boolean),
        };
      }

      function renderPhonicsCard(c) {
        const extra = $("cardExtra");
        extra.innerHTML = "";
        $("cardActions").innerHTML = "";
        $("cardPrompt").textContent = c.prompt || "听一听，画线部分发音相同吗？";
        $("cardSub").textContent = c.tip || "相同画 √，不相同画 ×";
        extra.appendChild(coachBanner("bee", "听两个熟词，再判断画线音"));

        const pair = document.createElement("div");
        pair.className = "phonics-pair";
        pair.innerHTML =
          '<span class="phonics-word">' +
          (c.leftHtml || (c.left && c.left.en) || "") +
          "</span>" +
          '<span class="phonics-vs">·</span>' +
          '<span class="phonics-word">' +
          (c.rightHtml || (c.right && c.right.en) || "") +
          "</span>";
        extra.appendChild(pair);

        function speakPair(rate) {
          speakCard(c, rate);
        }
        actionSpeak("再听一遍", () => speakPair(1));
        actionSpeak("慢速 0.5×", () => speakPair(0.5), true);

        function afterJudge(ok) {
          state.listenLocked = true;
          scoreAnswer(ok, c);
          $("cardActions").innerHTML = "";
          if (!ok) {
            $("cardSub").textContent = "先听鼓励。再看规律，听懂。";
            const panel = document.createElement("div");
            panel.className = "listen-repair";
            panel.innerHTML =
              '<p class="repair-label">画线部分</p>' +
              '<p class="repair-en">' +
              (c.leftHtml || "") +
              " · " +
              (c.rightHtml || "") +
              "</p>" +
              (c.sound ? '<p class="repair-key">音：' + c.sound + "</p>" : "") +
              (c.rule ? '<p class="repair-zh">' + c.rule + "</p>" : "") +
              '<p class="repair-zh">正确答案：' + (c.same ? "相同 √" : "不相同 ×") + "</p>";
            extra.appendChild(panel);
            const got = document.createElement("button");
            got.type = "button";
            got.className = "btn-ok";
            got.textContent = "听懂了";
            got.disabled = true;
            got.addEventListener("click", () => {
              startFollowRead(phonicsFollowCard(c), () => advance(ok, c), {
                tip: "大声跟读这两个词 3 遍",
              });
            });
            $("cardActions").appendChild(got);
            afterPraise(() => {
              if (state.view !== "lesson" || card() !== c) return;
              speakPair(1);
              got.disabled = false;
            });
            return;
          }
          $("cardSub").textContent = "对了！" + (c.rule ? " " + c.rule : "");
          afterPraise(() => {
            if (state.view !== "lesson" || card() !== c) return;
            startFollowRead(phonicsFollowCard(c), () => advance(ok, c), {
              tip: "大声跟读这两个词 3 遍",
            });
          });
        }

        const row = document.createElement("div");
        row.className = "row2";
        const sameBtn = document.createElement("button");
        sameBtn.type = "button";
        sameBtn.className = "btn-ok";
        sameBtn.textContent = "相同 √";
        sameBtn.addEventListener("click", () => {
          if (state.listenLocked) return;
          afterJudge(!!c.same);
        });
        const diffBtn = document.createElement("button");
        diffBtn.type = "button";
        diffBtn.className = "btn-bad";
        diffBtn.textContent = "不相同 ×";
        diffBtn.addEventListener("click", () => {
          if (state.listenLocked) return;
          afterJudge(!c.same);
        });
        row.appendChild(sameBtn);
        row.appendChild(diffBtn);
        $("cardActions").appendChild(row);
      }

      function renderListenCard(c) {
        const extra = $("cardExtra");
        if (c.hard) {
          $("cardSub").textContent = (c.tip ? c.tip + " · " : "") + "挑战：先听完整句，再点选项";
        } else if (c.coach === "bee") {
          $("cardPrompt").textContent = c.prompt || "";
          $("cardSub").textContent = (c.tip ? c.tip + " · " : "") + "听「翻翻蜂」读完再选";
          extra.appendChild(coachBanner("bee", "听「翻翻蜂」读，再判断对错"));
        } else if (c.kind === "reply") {
          $("cardSub").textContent = (c.tip ? c.tip + " · " : "") + "听问句，选正确应答";
        }
        if (c.hard && c.coach === "bee") {
          extra.appendChild(coachBanner("bee", "听力挑战：先听，不看中文"));
        }
        const box = document.createElement("div");
        box.className = "choices";
        box.id = "listenChoices";
        let heardOnce = !c.hard;
        (c.choices || []).forEach((ch) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "choice";
          b.textContent = ch.label;
          if (c.hard) b.disabled = true;
          b.addEventListener("click", () => {
            if (state.listenLocked || (c.hard && !heardOnce)) return;
            state.listenLocked = true;
            const ok = String(ch.id) === String(c.answer);
            box.querySelectorAll(".choice").forEach((el) => {
              el.disabled = true;
            });
            b.classList.add(ok ? "correct" : "wrong");
            box.querySelectorAll(".choice").forEach((el, i) => {
              if (String(c.choices[i].id) === String(c.answer)) el.classList.add("correct");
            });
            if (ok) {
              $("cardSub").textContent = "对了。 " + (c.tip || "");
              scoreAnswer(true, c);
              if (c.kind === "judge") {
                afterPraise(() => {
                  if (state.view !== "lesson" || card() !== c) return;
                  followJudgeOnce(c);
                });
              } else {
                afterPraise(() => advance(true, c));
              }
              return;
            }
            const focus = listenFocus(c);
            scoreAnswer(false, c);
            $("cardSub").textContent = "先听鼓励。再看英文和中文，听懂。";
            const panel = document.createElement("div");
            panel.className = "listen-repair";
            const lab = document.createElement("p");
            lab.className = "repair-label";
            lab.textContent = "英文原文和中文，认真看";
            const en = document.createElement("p");
            en.className = "repair-en";
            fillHighlight(en, focus.original, focus.key);
            panel.appendChild(lab);
            panel.appendChild(en);
            if (focus.zh) {
              const zh = document.createElement("p");
              zh.className = "repair-zh";
              zh.textContent = "中文：" + focus.zh;
              panel.appendChild(zh);
            }
            if (focus.explain) {
              const ex = document.createElement("p");
              ex.className = "repair-zh";
              ex.textContent = focus.explain;
              panel.appendChild(ex);
            }
            if (focus.answerEn) {
              const ans = document.createElement("p");
              ans.className = "repair-en";
              ans.appendChild(document.createTextNode("正确答语："));
              const mark = document.createElement("mark");
              mark.textContent = focus.answerEn;
              ans.appendChild(mark);
              panel.appendChild(ans);
              if (focus.answerZh) {
                const az = document.createElement("p");
                az.className = "repair-zh";
                az.textContent = "中文：" + focus.answerZh;
                panel.appendChild(az);
              }
            } else if (focus.key) {
              const keyLine = document.createElement("p");
              keyLine.className = "repair-key";
              keyLine.appendChild(document.createTextNode("重点："));
              const mark = document.createElement("mark");
              mark.textContent = focus.key;
              keyLine.appendChild(mark);
              panel.appendChild(keyLine);
            }
            extra.appendChild(panel);
            $("cardActions").innerHTML = "";
            actionSpeak("再听英文", () => replayListenFocus(c, focus));
            const go = document.createElement("button");
            go.type = "button";
            go.className = "btn-ok";
            go.textContent = c.kind === "judge" ? "跟读一遍" : "听懂了";
            go.disabled = true;
            go.addEventListener("click", () => {
              if (c.kind === "judge") followJudgeOnce(c);
              else advance(false);
            });
            $("cardActions").appendChild(go);
            afterPraise(() => {
              if (state.view !== "lesson" || card() !== c) return;
              const chain = replayListenFocus(c, focus);
              const enable = () => {
                if (state.view !== "lesson" || card() !== c) return;
                go.disabled = false;
              };
              if (chain && chain.then) chain.then(enable);
              else enable();
            });
          });
          box.appendChild(b);
        });
        extra.appendChild(box);
        function unlockChoices() {
          if (!c.hard) return;
          heardOnce = true;
          box.querySelectorAll(".choice").forEach((el) => {
            if (!state.listenLocked) el.disabled = false;
          });
        }
        actionSpeak(c.coach === "bee" ? "再听翻翻蜂" : "再听一遍", () => {
          speakCard(c);
          setTimeout(unlockChoices, 600);
        });
        actionSpeak("慢速 0.5×", () => {
          speakCard(c, 0.5);
          setTimeout(unlockChoices, 600);
        }, true);
        if (c.hard && c.autoPlay) {
          setTimeout(unlockChoices, 2200);
        }
      }

      function paintGlosses(host, glosses) {
        if (!host || !glosses || !glosses.length) return;
        const box = document.createElement("div");
        box.className = "gloss-list";
        glosses.forEach((g) => {
          const en = document.createElement("p");
          en.className = "gloss-en";
          en.textContent = g.en;
          const zh = document.createElement("p");
          zh.className = "gloss-zh";
          zh.textContent = "中文翻译：" + g.zh;
          box.appendChild(en);
          box.appendChild(zh);
        });
        host.appendChild(box);
      }

      function renderPatternCard(c) {
        const extra = $("cardExtra");
        extra.innerHTML = "";
        $("cardActions").innerHTML = "";
        if (c.followRead) {
          extra.appendChild(coachBanner("bee", "大声读出来。跟 3 遍，然后自己点完成"));
          $("cardPrompt").textContent = c.speakText || c.prompt || "";
          $("cardSub").textContent = c.tip || "大声跟读 3 遍，读完自己点完成";
          paintGlosses(extra, c.glosses);
          startFollowRead(c, () => advance(true, c), {
            manualDone: true,
            zh: c.glosses && c.glosses.length ? "" : c.zh || "",
            tip: "大声跟读 3 遍。读完自己点「完成」。",
            doneTip: "声音真棒！点「完成」就过关。",
          });
          return;
        }
        extra.appendChild(coachBanner("bee", "听双人对话示范，再自己说一遍"));
        const target =
          (c.demos && c.demos[0] && c.demos[0].text) ||
          c.speakText ||
          "I'm happy because I can play.";

        actionSpeakPair("听对话", (rate) => speakCard(c, rate));

        const tip = document.createElement("p");
        tip.className = "follow-tip";
        tip.textContent = c.makeSentence
          ? "造句：用 because / when 说自己的一句（语音或打字）"
          : "选一种方式作答：语音 或 打字";
        extra.appendChild(tip);

        const mode = document.createElement("div");
        mode.className = "row2";
        const voiceBtn = document.createElement("button");
        voiceBtn.type = "button";
        voiceBtn.className = "btn-speak";
        voiceBtn.textContent = "语音输入";
        const textBtn = document.createElement("button");
        textBtn.type = "button";
        textBtn.className = "btn-speak secondary";
        textBtn.textContent = "文字输入";
        mode.appendChild(voiceBtn);
        mode.appendChild(textBtn);
        $("cardActions").appendChild(mode);

        function finishPattern(ok, heard) {
          tip.className = "follow-tip " + (ok ? "ok" : "bad");
          tip.textContent = ok ? "说得不错！" : "再听听翻翻蜂，然后点会了继续";
          if (heard) {
            let line = extra.querySelector(".heard-line");
            if (!line) {
              line = document.createElement("p");
              line.className = "heard-line";
              extra.appendChild(line);
            }
            line.textContent = "你说了 / 写了：" + heard;
          }
          $("cardActions").innerHTML = "";
          actionSpeakPair("听对话", (rate) => speakCard(c, rate));
          const go = document.createElement("button");
          go.type = "button";
          go.className = "btn-ok";
          go.textContent = "会了";
          go.addEventListener("click", () => advance(ok));
          $("cardActions").appendChild(go);
        }

        voiceBtn.addEventListener("click", () => {
          tip.textContent = "正在听…请用英文说一句";
          voiceBtn.disabled = true;
          textBtn.disabled = true;
          if (V) V.stop();
          listenOnceEnglish().then((res) => {
            voiceBtn.disabled = false;
            textBtn.disabled = false;
            if (res.error === "nosupport") {
              tip.textContent = "此浏览器不支持语音，请改用文字输入";
              return;
            }
            if (!res.text) {
              tip.textContent = "没听清，再试一次语音，或改用文字";
              return;
            }
            const judge = scoreSpeech(res.text, target);
            finishPattern(judge.ok, res.text);
          });
        });

        textBtn.addEventListener("click", () => {
          tip.textContent = "把你的句子打在下面";
          voiceBtn.disabled = true;
          textBtn.disabled = true;
          const field = document.createElement("div");
          field.className = "dictation-box";
          field.innerHTML =
            '<input id="patternInput" class="dict-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="I\'m … because / when …" />';
          extra.appendChild(field);
          $("cardActions").innerHTML = "";
          const confirm = document.createElement("button");
          confirm.type = "button";
          confirm.className = "btn-ok";
          confirm.textContent = "确定";
          confirm.addEventListener("click", () => {
            const input = $("patternInput");
            const typed = (input && input.value) || "";
            if (!typed.trim()) {
              if (input) input.focus();
              return;
            }
            const judge = scoreSpeech(typed, target);
            if (input) input.disabled = true;
            confirm.disabled = true;
            finishPattern(judge.ok, typed.trim());
          });
          $("cardActions").appendChild(confirm);
          setTimeout(() => {
            const input = $("patternInput");
            if (input) input.focus();
          }, 80);
        });
      }

      function renderOralCard(c) {
        const extra = $("cardExtra");
        $("cardActions").innerHTML = "";
        if (c.challenge) {
          extra.appendChild(coachBanner("bee", "口语挑战：说完整句"));
        }
        actionSpeak("听提问", () => {
          if (V) V.speak(c.speakText, c.speakRole || "adultFemale");
        });
        if (c.sampleText) {
          actionSpeak("听示范答", () => {
            if (V) V.speak(c.sampleText, c.sampleRole || "boyChild");
          }, true);
        }
        if (!c.requireSpeech) {
          actionOkBad(() => advance(true), () => advance(false));
          return;
        }
        const tip = document.createElement("p");
        tip.className = "follow-tip";
        tip.textContent = "点「我说」开口答；要用 because / when";
        extra.appendChild(tip);
        const mic = document.createElement("button");
        mic.type = "button";
        mic.className = "btn-ok";
        mic.textContent = "我说";
        mic.addEventListener("click", () => {
          mic.disabled = true;
          tip.textContent = "正在听…请说英文完整句";
          if (V) V.stop();
          listenOnceEnglish().then((res) => {
            mic.disabled = false;
            if (res.error === "nosupport") {
              tip.textContent = "此浏览器不支持语音，请点「我会了」或「再练」";
              actionOkBad(() => advance(true), () => advance(false));
              return;
            }
            if (!res.text) {
              tip.className = "follow-tip bad";
              tip.textContent = "没听清，再试一次";
              return;
            }
            const target = c.sampleText || "I feel happy because I can play.";
            const judge = scoreSpeech(res.text, target);
            tip.className = "follow-tip " + (judge.ok ? "ok" : "bad");
            tip.textContent = judge.reason + "（你说了：" + res.text + "）";
            $("cardActions").innerHTML = "";
            actionSpeak("听提问", () => {
              if (V) V.speak(c.speakText, c.speakRole || "adultFemale");
            });
            if (c.sampleText) {
              actionSpeak("听示范答", () => {
                if (V) V.speak(c.sampleText, c.sampleRole || "boyChild");
              }, true);
            }
            const go = document.createElement("button");
            go.type = "button";
            go.className = "btn-ok";
            go.textContent = judge.ok ? "过关" : "算过关，继续";
            go.addEventListener("click", () => advance(judge.ok));
            const again = document.createElement("button");
            again.type = "button";
            again.className = "btn-bad";
            again.textContent = "再练一次";
            again.addEventListener("click", () => renderOralCard(c));
            $("cardActions").appendChild(go);
            $("cardActions").appendChild(again);
          });
        });
        $("cardActions").appendChild(mic);
      }

      function renderDialogueCard(c) {
        const list = document.createElement("div");
        list.className = "card-sub";
        list.style.whiteSpace = "pre-wrap";
        list.textContent = (c.lines || [])
          .map((l) => (l.name || "") + ": " + l.text)
          .join("\n");
        $("cardExtra").appendChild(list);
        actionSpeak("听对话", () => speakCard(c));
        actionOkBad(() => advance(true), () => advance(false));
      }

      function renderSortCard(c) {
        const wrap = document.createElement("div");
        wrap.className = "sort-wrap";
        const bank = document.createElement("div");
        bank.className = "sort-bank";
        bank.id = "sortBank";
        (c.bank || []).forEach((w) => {
          const chip = document.createElement("button");
          chip.type = "button";
          chip.className = "sort-chip";
          chip.textContent = w;
          chip.dataset.word = w;
          chip.addEventListener("click", () => {
            state.sortActive = w;
            bank.querySelectorAll(".sort-chip").forEach((el) => {
              el.classList.toggle("picked", el.dataset.word === w);
            });
          });
          bank.appendChild(chip);
        });
        const bins = document.createElement("div");
        bins.className = "sort-bins";
        (c.groups || []).forEach((g) => {
          const bin = document.createElement("div");
          bin.className = "sort-bin";
          bin.dataset.bin = g.id;
          bin.innerHTML = "<strong>" + g.label + "</strong><div class=\"bin-words\"></div>";
          bin.addEventListener("click", () => {
            if (!state.sortActive) return;
            state.sortAssign[state.sortActive] = g.id;
            state.sortActive = null;
            refreshSortUI(c, bank, bins);
          });
          bins.appendChild(bin);
        });
        wrap.appendChild(bank);
        wrap.appendChild(bins);
        $("cardExtra").appendChild(wrap);
        actionSpeak("听提示", () => {
          if (V) V.speak("Put the words into groups.", "adultFemale");
        });
        actionOkBad(
          () => {
            let ok = 0, total = 0;
            (c.groups || []).forEach((g) => {
              (g.answers || []).forEach((w) => {
                if ((c.bank || []).indexOf(w) < 0) return;
                total += 1;
                if (state.sortAssign[w] === g.id) ok += 1;
              });
            });
            advance(total ? ok >= Math.ceil(total * 0.6) : true);
          },
          () => advance(false)
        );
      }

      function refreshSortUI(c, bank, bins) {
        bank.querySelectorAll(".sort-chip").forEach((el) => {
          el.classList.toggle("used", !!state.sortAssign[el.dataset.word]);
          el.classList.remove("picked");
        });
        bins.querySelectorAll(".sort-bin").forEach((bin) => {
          const id = bin.dataset.bin;
          const words = Object.keys(state.sortAssign).filter((w) => state.sortAssign[w] === id);
          bin.querySelector(".bin-words").textContent = words.join(" · ");
        });
      }

      function renderWriteCard(c) {
        if (c.passage) {
          const p = document.createElement("div");
          p.className = "passage-mini";
          p.textContent = c.passage;
          $("cardExtra").appendChild(p);
        }
        const fields = document.createElement("div");
        fields.className = "write-fields";
        fields.innerHTML =
          '<label>仿写 1<input id="write1" maxlength="120" placeholder="I\'m happy when I …" /></label>' +
          '<label>仿写 2<input id="write2" maxlength="120" placeholder="I\'m happy when I …" /></label>';
        $("cardExtra").appendChild(fields);
        actionSpeak("听短文", () => speakCard(c));
        actionOkBad(
          () => {
            const t = (($("write1") && $("write1").value) || "") + " " + (($("write2") && $("write2").value) || "");
            const hasArticleBug = /go\s+to\s+park\b/i.test(t);
            if (hasArticleBug) $("cardSub").textContent = "提醒：go to a park / the park";
            saveStore({
              lastWrite: { w1: ($("write1") && $("write1").value) || "", w2: ($("write2") && $("write2").value) || "" },
            });
            advance(!hasArticleBug);
          },
          () => advance(false)
        );
      }

      function renderReadCard(c) {
        actionSpeak("听提问", () => speakCard(c));
        actionOkBad(() => advance(true), () => advance(false));
      }

      function pushRetry(c) {
        if (!c) return;
        const isListen = c.type === "listen" && c.speakText;
        const en = isListen ? c.speakText : c.retryWord && c.retryWord.en;
        if (!en) return;
        const zh = isListen ? c.zh || "" : (c.retryWord && c.retryWord.zh) || "";
        const store = loadStore();
        let retry = store.retryWords || [];
        retry = retry.filter((r) => !(r.unitId === state.unitId && r.en === en));
        const rec = {
          unitId: state.unitId,
          en: en,
          zh: zh,
          type: isListen ? "listen" : "word",
          date: todayKey(),
        };
        if (isListen) {
          rec.card = {
            type: "listen",
            kind: c.kind,
            title: c.title,
            prompt: c.prompt,
            speakText: c.speakText,
            speakRole: c.speakRole,
            coach: c.coach,
            autoPlay: true,
            answer: c.answer,
            tip: c.tip,
            zh: c.zh || "",
            explain: c.explain || "",
            answerZh: c.answerZh || "",
            choices: c.choices || [],
            retryWord: { en: en, zh: zh },
          };
        }
        retry.push(rec);
        saveStore({ retryWords: retry });
        syncRetryBadge();
      }

      function clearRetry(c) {
        if (!c) return;
        const en = (c.retryWord && c.retryWord.en) || (c.type === "listen" ? c.speakText : "");
        if (!en) return;
        const store = loadStore();
        const retry = (store.retryWords || []).filter(
          (r) => !(r.unitId === state.unitId && r.en === en)
        );
        saveStore({ retryWords: retry });
        syncRetryBadge();
      }

      function scoreAnswer(ok, c) {
        if (state.scored) return state.praiseWait || 0;
        state.scored = true;
        const cur = c || card();
        state.results.push(!!ok);
        if (state.lessonMode !== "challenge" && state.lessonMode !== "phonics") {
          const tracked = Progress.recordAnswer(walletStore(), !!ok);
          saveStore({ stats: tracked.stats });
        }
        if (!ok && cur && cur.retryWord) pushRetry(cur);
        if (ok && cur && cur.retryWord) clearRetry(cur);
        if (ok) onCorrectReward();
        else onWrongReward();
        return state.praiseWait || (ok ? 900 : 1200);
      }

      function advance(ok, c) {
        if (!state.scored) scoreAnswer(ok, c);
        state.scored = false;
        state.index += 1;
        state.praiseWait = 0;
        afterPraise(() => {
          if (state.index >= state.cards.length) finishLesson();
          else renderCard(true);
        });
      }

      function finishLesson(reason) {
        const timedOut = reason === "timeout" && state.lessonMode === "challenge";
        const ok = state.results.filter(Boolean).length;
        const total = state.results.length;
        const egg = Lesson.eggLine(unit());
        const store0 = walletStore();
        const lessonCoins = state.lessonCoins || 0;
        const settle =
          state.lessonMode === "retry" ||
          state.lessonMode === "challenge" ||
          state.lessonMode === "phonics"
            ? Progress.settlePractice(store0, lessonCoins, todayKey(), state.lessonMode, { timedOut: timedOut })
            : Progress.settleLesson(
                store0,
                state.pathId || store0.currentPathId,
                lessonCoins,
                todayKey()
              );
        state.lastSettle = settle;
        const logs = settle.store.logs || loadStore().logs || {};
        logs[todayKey()] = Object.assign({}, logs[todayKey()] || {}, {
          date: todayKey(),
          unitId: state.unitId,
          unitName: unit().name,
          pathId: settle.pathId,
          session: state.sessionId,
          wordScore: ok + "/" + total,
          lessonCoins: settle.earned,
          mode: state.lessonMode || "normal",
          done: true,
        });
        settle.store.logs = logs;
        settle.store.unitId = state.unitId;
        localStorage.setItem(STORE_KEY, JSON.stringify(settle.store));
        $("progressFill").style.width = "100%";
        showView("done");
        renderDoneSummary(settle, ok, total, egg);
      }

      function buildLessonFocus() {
        const u = unit();
        const node = Progress.nodeById(state.pathId);
        if (!u || !node || !Lesson.lineZh) return null;
        const n = node.lesson;
        const review = n === (u.lessonCount || 4);
        const patterns = (u.patterns || []).filter((p) =>
          review ? p.lesson === n || p.extend : p.lesson === n && !p.extend
        );
        const words = (u.words || [])
          .filter((w) => {
            const hit = review ? w.lesson === n || w.extend : w.lesson === n && !w.extend;
            return hit && w.priority === "high";
          })
          .slice(0, 8);
        if (!patterns.length && !words.length) return null;
        const box = document.createElement("section");
        box.className = "lesson-focus";
        const h = document.createElement("h2");
        h.textContent = "本课重点";
        box.appendChild(h);
        const say = Lesson.lessonTalk ? Lesson.lessonTalk(u.id, n) : "";
        if (patterns.length) {
          const lab = document.createElement("p");
          lab.className = "focus-label";
          lab.textContent = "主要句子 / 句型";
          box.appendChild(lab);
          patterns.forEach((p) => {
            (p.demos || []).forEach((d) => {
              const zh = Lesson.lineZh(d.text) || "";
              const line = document.createElement("p");
              line.className = "focus-sent";
              line.textContent = d.text + (zh ? "　" + zh : "");
              box.appendChild(line);
            });
          });
        }
        if (words.length) {
          const lab = document.createElement("p");
          lab.className = "focus-label";
          lab.textContent = "要掌握的单词";
          box.appendChild(lab);
          const row = document.createElement("p");
          row.className = "focus-words";
          row.textContent = words.map((w) => w.en + "　" + w.zh).join(" · ");
          box.appendChild(row);
        }
        return { el: box, say: say };
      }

      function renderDoneSummary(settle, ok, total, egg) {
        const wrap = $("doneSummary");
        const practice = $("donePracticeWrap");
        const bar = $("doneActionsBar");
        practice.classList.add("hidden");
        $("btnHome").classList.add("hidden");
        wrap.innerHTML = "";
        bar.innerHTML = "";

        const coinHost = document.createElement("div");
        coinHost.className = "done-coins-lottie";
        wrap.appendChild(coinHost);
        mountCoinsLottie(coinHost, true);

        const challengeDone = settle.practiceKind === "challenge" && !settle.timedOut;
        const challengeLate = settle.practiceKind === "challenge" && !!settle.timedOut;
        let beeAvatar = null;
        if (settle.practiceKind === "challenge") {
          const stage = document.createElement("div");
          stage.className = "done-bee";
          beeAvatar = coachAvatar("bee");
          stage.appendChild(beeAvatar);
          const say = document.createElement("p");
          say.className = "bee-say";
          say.textContent = challengeLate
            ? "不要紧，下次准备好再来，我看好你哦！"
            : "没想到你居然是一个学习的天才，效率太惊人啦！";
          stage.appendChild(say);
          wrap.appendChild(stage);
        }

        const title = document.createElement("h1");
        title.textContent = challengeLate
          ? "时间到了"
          : challengeDone
            ? "挑战完成！"
            : settle.practiceKind === "phonics"
              ? "发音小站完成！"
              : settle.practiceKind === "retry"
                ? "错题复习完成！"
                : settle.isReview
                  ? "复习完成！"
                  : "本课完成！";
        wrap.appendChild(title);

        const score = document.createElement("p");
        score.className = "meta";
        score.textContent = challengeLate ? "做对 " + ok + " 题" : "做对 " + ok + " / " + total;
        wrap.appendChild(score);

        const earned = document.createElement("div");
        earned.className = "done-earn";
        earned.innerHTML =
          '<div class="earn-row"><span>答题金币</span><strong>+' + settle.lessonCoins + "</strong></div>" +
          (settle.bonus ? '<div class="earn-row"><span>' + settle.bonusLabel + '</span><strong>+' + settle.bonus + "</strong></div>" : "") +
          (settle.rankBonus ? '<div class="earn-row"><span>等级加成</span><strong>+' + settle.rankBonus + "</strong></div>" : "") +
          (settle.gems ? '<div class="earn-row gem"><span>宝石</span><strong>+' + settle.gems + "</strong></div>" : "") +
          '<div class="earn-total"><span>本课合计</span><strong>+' + settle.earned + " 🪙</strong></div>" +
          '<div class="earn-total all"><span>总金币</span><strong>' + settle.totalCoins + " 🪙</strong></div>";
        wrap.appendChild(earned);

        const doneFx = challengeDone ? "cheer" : challengeLate ? "" : "applause";
        const doneLine = challengeLate
          ? ["timeout", "girlChild", "不要紧，下次准备好再来，我看好你哦！"]
          : challengeDone
            ? ["challenge", "girlChild", "没想到你居然是一个学习的天才，效率太惊人啦！"]
            : ["lesson", "boyChild", "你又前进了一步，我为你感到自豪！"];
        const voiceAt = challengeDone || !challengeLate ? 3100 : 400;
        if (doneFx) playFx(doneFx, 3);
        const praiseToken = fxToken;
        setTimeout(function () {
          if (praiseToken !== fxToken && doneFx) return;
          if (state.view !== "done") return;
          if (beeAvatar) {
            beeAvatar.classList.add("is-talking");
            beeAvatar.classList.remove("is-idle");
          }
          playMascotLine(doneLine[0], doneLine[1], doneLine[2]);
        }, voiceAt);

        if (state.lessonMode === "normal") {
          const focus = buildLessonFocus();
          if (focus) {
            wrap.appendChild(focus.el);
            const focusToken = praiseToken;
            setTimeout(function () {
              if (focusToken !== fxToken && doneFx) return;
              if (state.view !== "done" || !focus.say || !V) return;
              V.speak(focus.say, "adultFemale", { forceAll: true });
            }, voiceAt + 4600);
          }
        }

        function addBtn(label, cls, fn) {
          const b = document.createElement("button");
          b.type = "button";
          b.className = cls;
          b.textContent = label;
          b.addEventListener("click", fn);
          bar.appendChild(b);
        }
        addBtn(
          settle.practiceKind === "challenge"
            ? "再挑战一次"
            : settle.practiceKind === "phonics"
              ? "再练发音"
              : settle.practiceKind === "retry"
                ? "继续错题"
                : settle.next
                  ? "下一课 · " + settle.next.label
                  : "看学期路径",
          "btn-start",
          () => {
            if (settle.practiceKind === "challenge") startLesson(null, { mode: "challenge" });
            else if (settle.practiceKind === "phonics") startLesson(null, { mode: "phonics" });
            else if (settle.practiceKind === "retry") startLesson(null, { mode: "retry" });
            else if (settle.next) startLesson(settle.next.id);
            else {
              showView("path");
              renderPath();
            }
          }
        );
        addBtn(settle.practiceKind ? "看 Records" : "看学期路径", "btn-path", () => {
          if (settle.practiceKind) {
            showView("records");
            renderRecords();
          } else {
            showView("path");
            renderPath();
          }
        });
        addBtn("今日一句挑战", "btn-speak", () => {
          practice.classList.remove("hidden");
          $("doneScore").textContent = "做对 " + ok + " / " + total;
          $("doneEgg").textContent = "";
          startDonePractice(egg);
        });
        addBtn("回首页", "btn-bad", () => {
          showView("home");
          renderHome();
        });
        syncWalletUI();
      }

      function scoreSpeech(heard, target) {
        const a = normalizeAnswer(heard);
        const b = normalizeAnswer(target);
        if (!a) return { ok: false, reason: "没听清，再说一次" };
        if (a === b) return { ok: true, reason: "说得很好！" };
        const aw = a.replace(/[^a-z'\s]/g, " ").split(/\s+/).filter(Boolean);
        const bw = b.replace(/[^a-z'\s]/g, " ").split(/\s+/).filter(Boolean);
        const setB = {};
        bw.forEach((w) => { setB[w] = true; });
        const hit = aw.filter((w) => setB[w]).length;
        const cover = bw.length ? hit / bw.length : 0;
        const patternOk = /\bi\s*(am|'m|feel)\b/.test(a) && /\b(because|when)\b/.test(a) && aw.length >= 5;
        if (cover >= 0.55 || (patternOk && cover >= 0.3)) {
          return { ok: true, reason: cover >= 0.55 ? "跟原句很像，真棒！" : "造句结构对了，很好！" };
        }
        return { ok: false, reason: "再试试：I'm … because / when …" };
      }

      function listenOnceEnglish() {
        return new Promise((resolve) => {
          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SR) {
            resolve({ ok: false, text: "", error: "nosupport" });
            return;
          }
          const rec = new SR();
          rec.lang = (V && V.getAccent && V.getAccent() === "en-GB") ? "en-GB" : "en-US";
          rec.interimResults = false;
          rec.maxAlternatives = 3;
          let settled = false;
          const finish = (payload) => {
            if (settled) return;
            settled = true;
            try { rec.stop(); } catch (e) {}
            resolve(payload);
          };
          rec.onresult = (ev) => {
            let best = "";
            for (let i = 0; i < ev.results.length; i++) {
              const alt = ev.results[i][0];
              if (alt && alt.transcript) best = (best ? best + " " : "") + alt.transcript;
            }
            finish({ ok: true, text: best.trim(), error: null });
          };
          rec.onerror = () => finish({ ok: false, text: "", error: "error" });
          rec.onend = () => {
            if (!settled) finish({ ok: false, text: "", error: "empty" });
          };
          try {
            rec.start();
          } catch (e) {
            finish({ ok: false, text: "", error: "error" });
          }
        });
      }

      function startDonePractice(egg) {
        const box = $("donePractice");
        const home = $("btnHome");
        if (!box) return;
        box.innerHTML = "";
        home.classList.add("hidden");

        const sentence = document.createElement("div");
        sentence.className = "egg-line";
        sentence.textContent = egg;
        box.appendChild(sentence);

        const banner = coachBanner("turtle", "今日一句 · 大声跟读");
        box.appendChild(banner);

        const tip = document.createElement("p");
        tip.className = "follow-tip";
        tip.id = "doneFollowTip";
        tip.textContent = "先听翻翻龟，再跟读 3 遍。不用录音。";
        box.appendChild(tip);

        const actions = document.createElement("div");
        actions.className = "done-actions";
        box.appendChild(actions);

        let count = 0;
        const followBtn = document.createElement("button");
        followBtn.type = "button";
        followBtn.className = "btn-ok";
        followBtn.textContent = "跟读（0 / 3）";

        function playLead() {
          if (V) V.speak(egg, "boyChild");
        }

        followBtn.addEventListener("click", () => {
          count += 1;
          followBtn.textContent = "跟读（" + count + " / 3）";
          playLead();
          if (count < 3) return;
          followBtn.disabled = true;
          tip.className = "follow-tip ok";
          tip.textContent = "跟读完成！真棒！";
          const done = document.createElement("button");
          done.type = "button";
          done.className = "btn-ok";
          done.textContent = "完成";
          done.addEventListener("click", () => {
            box.innerHTML = "";
            const reward = document.createElement("div");
            reward.className = "done-reward";
            reward.innerHTML =
              '<div class="reward-stage">' +
              '<div class="reward-burst" aria-hidden="true"></div>' +
              '<img class="reward-char turtle" src="./assets/reward-turtle-lift.svg" alt="翻翻龟" width="132" height="132">' +
              '<img class="reward-char bee" src="./assets/reward-bee-dance.svg" alt="翻翻蜂" width="124" height="124">' +
              "</div>" +
              '<h2 class="reward-title">今日一句完成！</h2>' +
              '<p class="reward-sub">大声读出来，就是进步</p>';
            box.appendChild(reward);
            const again = document.createElement("button");
            again.type = "button";
            again.className = "btn-ok";
            again.textContent = "看学期路径";
            again.addEventListener("click", () => {
              showView("path");
              renderPath();
            });
            box.appendChild(again);
            home.classList.remove("hidden");
            if (V) V.speak("你真是太棒了！再接再厉！", "girlChild", { forceAll: true });
          });
          actions.appendChild(done);
        });

        actions.appendChild(followBtn);
        setTimeout(playLead, 200);
      }

      function openSettings(open) {
        $("settingsOverlay").classList.toggle("hidden", !open);
        $("settingsOverlay").setAttribute("aria-hidden", open ? "false" : "true");
      }

      function renderSettings() {
        $("unitSelect").innerHTML = DATA.units
          .map((u) => '<option value="' + u.id + '">' + u.name + "</option>")
          .join("");
        $("unitSelect").value = state.unitId;
        if (V) {
          const acc = V.getAccent();
          document.querySelectorAll("[data-accent]").forEach((el) => {
            el.classList.toggle("active", el.dataset.accent === acc);
          });
          const on = V.isEnabled();
          $("btnVoiceOn").classList.toggle("active", on);
          $("btnVoiceOff").classList.toggle("active", !on);
          $("castMap").innerHTML = V.castMap()
            .map((c) => "<div><strong>" + c.label + "</strong> · " + c.voice + "</div>")
            .join("");
        }
      }

      function init() {
        try { renderHome(); } catch (e) {}
        let store = Progress.ensureProgress(loadStore());
        localStorage.setItem(STORE_KEY, JSON.stringify(store));
        if (store.unitId && DATA.units.some((u) => u.id === store.unitId)) {
          state.unitId = store.unitId;
        }
        if (store.currentPathId) state.pathId = store.currentPathId;
        if (V) {
          if (store.accent === "en-GB" || store.accent === "en-US") V.setAccent(store.accent);
          V.setEnabled(store.voiceOn !== false);
        }
        $("btnStart").addEventListener("click", () => startLesson());
        if ($("btnOpenPath")) {
          $("btnOpenPath").addEventListener("click", () => {
            showView("path");
            renderPath();
          });
        }
        if ($("btnClosePath")) {
          $("btnClosePath").addEventListener("click", () => {
            showView("home");
            renderHome();
          });
        }
        if ($("btnPathStart")) {
          $("btnPathStart").addEventListener("click", () => {
            const s = walletStore();
            startLesson(s.currentPathId);
          });
        }
        if ($("navHome")) {
          $("navHome").addEventListener("click", () => {
            showView("home");
            renderHome();
          });
        }
        if ($("navPath")) {
          $("navPath").addEventListener("click", () => {
            showView("path");
            renderPath();
          });
        }
        if ($("navRecords")) {
          $("navRecords").addEventListener("click", () => {
            showView("records");
            renderRecords();
          });
        }
        if ($("btnCloseRecords")) {
          $("btnCloseRecords").addEventListener("click", () => {
            showView("home");
            renderHome();
          });
        }
        if ($("btnRecordsToPath")) {
          $("btnRecordsToPath").addEventListener("click", () => {
            showView("path");
            renderPath();
          });
        }
        mountNavHome();
        $("btnHome").addEventListener("click", () => {
          showView("home");
          renderHome();
        });
        $("btnCloseLesson").addEventListener("click", () => {
          if (V) V.stop();
          if (state.returnTo === "records") {
            showView("records");
            renderRecords();
            return;
          }
          if (confirm("结束今天的练习？未完成不记本课积分。")) {
            showView("home");
            renderHome();
          }
        });
        $("btnMute").addEventListener("click", () => {
          if (!V) return;
          const on = !V.isEnabled();
          V.setEnabled(on);
          saveStore({ voiceOn: on });
          if (!on) V.stop();
          $("btnMute").textContent = on ? "♪" : "🔇";
        });
        $("btnSettings").addEventListener("click", () => {
          renderSettings();
          openSettings(true);
        });
        $("btnCloseSettings").addEventListener("click", () => openSettings(false));
        $("settingsOverlay").addEventListener("click", (e) => {
          if (e.target === $("settingsOverlay")) openSettings(false);
        });
        $("unitSelect").addEventListener("change", () => {
          state.unitId = $("unitSelect").value;
          saveStore({ unitId: state.unitId });
          renderHome();
        });
        document.querySelectorAll("[data-accent]").forEach((el) => {
          el.addEventListener("click", () => {
            if (!V) return;
            V.setAccent(el.dataset.accent);
            saveStore({ accent: el.dataset.accent });
            renderSettings();
          });
        });
        $("btnVoiceOn").addEventListener("click", () => {
          if (!V) return;
          V.setEnabled(true);
          saveStore({ voiceOn: true });
          renderSettings();
        });
        $("btnVoiceOff").addEventListener("click", () => {
          if (!V) return;
          V.setEnabled(false);
          V.stop();
          saveStore({ voiceOn: false });
          renderSettings();
        });
        $("btnVoicePreview").addEventListener("click", () => {
          if (!V) return;
          V.speakSequence([
            { role: "adultMale", text: "Hello. I am your English agent." },
            { role: "adultFemale", text: "Listen carefully. Please write the word." },
            { role: "boyChild", text: "I feel happy because I can play." },
            { role: "girlChild", text: "What's the matter? I can help you." },
          ]);
        });
        if ($("btnHomeSlogan")) {
          $("btnHomeSlogan").addEventListener("click", () => {
            if (V) {
              V.setEnabled(true);
              saveStore({ voiceOn: true });
            }
            homeSloganSaid.turtle = false;
            homeSloganSaid.bee = false;
            openSettings(false);
            unlockAudio().then(function () {
              showView("home");
              playHomeSlogans();
            });
            renderSettings();
          });
        }

        const turtle = document.querySelector(".mascot-turtle");
        const bee = document.querySelector(".mascot-bee");
        lottieAnims.turtle = mountLottie(turtle, "turtle", true);
        lottieAnims.bee = mountLottie(bee, "bee", true);
        const homeClips = {
          turtle: "./audio/home/turtle.mp3?v=5",
          bee: "./audio/home/bee.mp3?v=5",
        };
        const homeLines = {
          turtle: { role: "boyChild", text: "每天进步一点点，有一天比兔子跑得还远。" },
          bee: { role: "girlChild", text: "嗡嗡嗡，今天你也开口了吗？" },
        };
        let homeWho = "turtle";
        let introToken = 0;
        let homeTimer = null;
        let audioUnlocked = false;
        let homeAudioCtx = null;
        const homePlayers = {
          turtle: document.getElementById("sloganTurtle"),
          bee: document.getElementById("sloganBee"),
        };
        Object.keys(homePlayers).forEach(function (who) {
          const a = homePlayers[who];
          if (!a) return;
          a.preload = "auto";
          a.playsInline = true;
          a.muted = false;
          a.volume = 1;
        });
        cancelHomeIntro = function () {
          introToken += 1;
          if (homeTimer) {
            clearTimeout(homeTimer);
            homeTimer = null;
          }
        };
        function homeAlive(token) {
          return token === introToken && $("screenHome") && !$("screenHome").classList.contains("hidden");
        }
        function isHomeView() {
          return $("screenHome") && !$("screenHome").classList.contains("hidden");
        }
        showSloganTapHint = function () {};
        hideSloganTapHint = function () {};
        function unlockAudio() {
          const a = homePlayers.turtle;
          if (!a) return Promise.resolve(false);
          a.muted = false;
          a.volume = 1;
          const started = a.play();
          if (started && started.then) {
            return started.then(function () {
              audioUnlocked = true;
              return true;
            }).catch(function () { return false; });
          }
          return Promise.resolve(true);
        }
        function pauseOther(who) {
          Object.keys(homePlayers).forEach(function (key) {
            if (key === who) return;
            const other = homePlayers[key];
            if (!other) return;
            try { other.pause(); } catch (e) {}
          });
        }
        function playHomeFile(who) {
          return new Promise(function (resolve) {
            if (!isHomeView()) { resolve(false); return; }
            const a = homePlayers[who];
            if (!a) { resolve(false); return; }
            pauseOther(who);
            homeAudio = a;
            let settled = false;
            const finish = function (ok) {
              if (settled) return;
              settled = true;
              if (homeAudioDone === finish) homeAudioDone = null;
              if (homeAudio === a) homeAudio = null;
              resolve(!!ok);
            };
            homeAudioDone = finish;
            a.muted = false;
            a.volume = 1;
            a.onended = function () { finish(true); };
            a.onerror = function () { finish(false); };
            if (!a.paused && a.currentTime > 0) {
              audioUnlocked = true;
              return;
            }
            try { if (a.currentTime > 0.2) a.currentTime = 0; } catch (e) {}
            const started = a.play();
            if (started && started.then) {
              started.then(function () { audioUnlocked = true; }).catch(function () { finish(false); });
            }
          });
        }
        let sloganNeedGesture = false;
        function playHomeSlogans() {
          if (homeSloganBusy) return;
          if (!V || !V.isEnabled()) return;
          if (!isHomeView()) return;
          const gen = ++sloganGen;
          homeSloganBusy = true;
          sloganNeedGesture = false;
          homeSloganSaid.turtle = false;
          homeSloganSaid.bee = false;
          showHomeMascot("turtle");
          playHomeFile("turtle").then(function (ok) {
            if (gen !== sloganGen) return;
            if (!ok) {
              homeSloganBusy = false;
              sloganNeedGesture = true;
              return;
            }
            homeSloganSaid.turtle = true;
            if (!isHomeView()) {
              homeSloganBusy = false;
              return;
            }
            showHomeMascot("bee");
            playHomeFile("bee").then(function (ok2) {
              if (gen !== sloganGen) return;
              homeSloganBusy = false;
              if (!ok2) {
                sloganNeedGesture = true;
                return;
              }
              homeSloganSaid.bee = true;
            });
          });
        }
        function setHomeLine(who) {
          const line = homeLines[who];
          const lineEl = $("mascotLine");
          if (lineEl && line) lineEl.textContent = line.text;
        }
        function showHomeMascot(who) {
          homeWho = who;
          turtle.classList.toggle("is-on", who === "turtle");
          bee.classList.toggle("is-on", who === "bee");
          setHomeLine(who);
          playMascotAnim(who);
        }
        startHomeMascotLoop = function () {
          if (!turtle || !bee) return;
          cancelHomeIntro();
          if (!lottieAnims.turtle) lottieAnims.turtle = mountLottie(turtle, "turtle", true);
          if (!lottieAnims.bee) lottieAnims.bee = mountLottie(bee, "bee", true);
          const token = ++introToken;
          showHomeMascot("turtle");
          const turtleAudio = homePlayers.turtle;
          const already = turtleAudio && !turtleAudio.paused && turtleAudio.currentTime > 0;
          if (!already && !homeSloganSaid.turtle && !homeSloganBusy) playHomeSlogans();
          else if (already && !homeSloganBusy) playHomeSlogans();
          function scheduleNext() {
            if (!homeAlive(token)) return;
            homeTimer = setTimeout(function () {
              if (!homeAlive(token)) return;
              if (!homeSloganBusy) showHomeMascot(homeWho === "turtle" ? "bee" : "turtle");
              scheduleNext();
            }, 5000);
          }
          scheduleNext();
        };
        function onUserGesture() {
          if (!isHomeView()) return;
          if (sloganNeedGesture || (!homeSloganSaid.turtle && !homeSloganBusy)) playHomeSlogans();
        }
        document.addEventListener("pointerdown", onUserGesture, true);
        document.addEventListener("touchstart", onUserGesture, { capture: true, passive: true });
        document.addEventListener("keydown", onUserGesture, true);

        renderHome();
        showView("home");
        if (V) setTimeout(renderSettings, 400);
      }

      init();
    })();
  