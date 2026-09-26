/**
 * 翻翻英语 · 四角色语音
 * 英文：预生成微软神经语音（成年男/女、男孩、女孩）
 * 中文：同一四角色对应中文神经声（老师讲解用成年女，蜂/龟短句用童声）
 * 无现成录音时才回退系统 TTS
 */
(function (global) {
  const ROLE_META = {
    adultMale: { label: "成年男", neural: "Guy / Ryan · 中文 Yunxi" },
    adultFemale: { label: "成年女·老师", neural: "Jenny / Sonia · 中文 Xiaoxiao" },
    boyChild: { label: "小男孩·翻翻龟", neural: "Andrew / Thomas · 中文 Yunxia" },
    girlChild: { label: "小女孩·翻翻蜂", neural: "Ana / Maisie · 中文 Xiaoyi" },
  };

  const ROLE_ALIASES = {
    dad: "adultMale",
    father: "adultMale",
    man: "adultMale",
    teacher_m: "adultMale",
    mum: "adultFemale",
    mom: "adultFemale",
    mother: "adultFemale",
    teacher: "adultFemale",
    teacher_f: "adultFemale",
    woman: "adultFemale",
    boy: "boyChild",
    yoyo: "boyChild",
    joe: "boyChild",
    tom: "boyChild",
    kipper: "boyChild",
    girl: "girlChild",
    lisa: "girlChild",
    anna: "girlChild",
    child: "boyChild",
  };

  let accent = "en-US";
  let enabled = true;
  let manifest = null;
  let manifestPromise = null;
  let currentAudio = null;
  let synthCache = {};
  let playGen = 0;
  let playResolve = null;

  function normRole(role) {
    if (!role) return "adultFemale";
    if (ROLE_META[role]) return role;
    const key = String(role).toLowerCase().replace(/\s+/g, "_");
    return ROLE_ALIASES[key] || "adultFemale";
  }

  function cleanText(text, forceAll) {
    const clean = String(text || "")
      .replace(/[【】]/g, " ")
      .replace(/（.*?）/g, " ")
      .replace(/\(.*?\)/g, " ")
      .replace(/[·•]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (forceAll) return clean;
    const enOnly = clean.match(/[A-Za-z][A-Za-z0-9'’.,!?;:\-\s]*/g);
    if (enOnly && enOnly.join(" ").trim().length >= 2) {
      return enOnly.join(" ").replace(/\s+/g, " ").trim();
    }
    return clean;
  }

  function loadManifest() {
    if (manifest) return Promise.resolve(manifest);
    if (manifestPromise) return manifestPromise;
    manifestPromise = fetch("./audio/manifest.json?v=12")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        manifest = data;
        return data;
      })
      .catch(() => {
        manifest = null;
        return null;
      });
    return manifestPromise;
  }

  function clipPath(role, text) {
    if (!manifest || !manifest.clips) return null;
    const key = accent + "|" + role + "|" + text;
    return manifest.clips[key] || null;
  }

  function haltPlayback() {
    if (currentAudio) {
      try {
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.pause();
        currentAudio.src = "";
      } catch (e) {}
      currentAudio = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (playResolve) {
      const r = playResolve;
      playResolve = null;
      try {
        r(false);
      } catch (e) {}
    }
  }

  function stop() {
    playGen += 1;
    haltPlayback();
  }

  function playUrl(url, rate) {
    return new Promise((resolve) => {
      try {
        haltPlayback();
        playResolve = resolve;
        const a = new Audio(url);
        a.playbackRate = rate && rate > 0 ? rate : 1;
        a.preservesPitch = true;
        try { a.mozPreservesPitch = true; } catch (e) {}
        try { a.webkitPreservesPitch = true; } catch (e) {}
        currentAudio = a;
        a.onended = () => {
          if (currentAudio === a) currentAudio = null;
          if (playResolve === resolve) playResolve = null;
          resolve(true);
        };
        a.onerror = () => {
          if (currentAudio === a) currentAudio = null;
          if (playResolve === resolve) playResolve = null;
          resolve(false);
        };
        const p = a.play();
        if (p && p.catch) {
          p.catch(() => {
            if (playResolve === resolve) playResolve = null;
            resolve(false);
          });
        }
      } catch (e) {
        if (playResolve === resolve) playResolve = null;
        resolve(false);
      }
    });
  }

  function getVoices() {
    return window.speechSynthesis ? window.speechSynthesis.getVoices() || [] : [];
  }

  function scoreSynth(v, roleKey, langHint) {
    const name = (v.name || "").toLowerCase();
    const lang = (v.lang || "").toLowerCase();
    if (langHint === "zh") {
      if (!/^zh([-_]|$)/.test(lang)) return -200;
      let s = 20;
      if (/xiaoxiao|xiaoyi|xiaoshuang|huihui|yaoyao|kangkang|yunxi|yunyang/.test(name)) s += 30;
      if (roleKey === "boyChild") {
        if (/yunxi|yunyang|kangkang|male|男/.test(name)) s += 40;
        if (/xiaoxiao|xiaoyi|xiaoshuang|huihui|female|女/.test(name)) s -= 20;
      } else if (roleKey === "girlChild") {
        if (/xiaoxiao|xiaoyi|xiaoshuang|huihui|female|女/.test(name)) s += 40;
        if (/yunxi|yunyang|kangkang|male|男/.test(name)) s -= 20;
      }
      return s;
    }
    if (!/^en([-_]|$)/.test(lang)) return -200;
    let s = 10;
    if (accent === "en-GB" && /en-?gb|british/.test(lang + name)) s += 30;
    if (accent === "en-US" && /en-?us|american/.test(lang + name)) s += 30;
    if (/natural|neural|online|microsoft|google|premium/.test(name)) s += 25;

    if (roleKey === "adultMale" || roleKey === "boyChild") {
      if (/guy|david|mark|ryan|tony|daniel|thomas|james|george|arthur|eric|christopher|andrew|brian|roger|steffan|male|man/.test(name)) s += 40;
      if (/female|woman|zira|aria|jenny|samantha|karen|susan|hazel|sonia|ana|maisie/.test(name)) s -= 60;
    } else {
      if (/aria|jenny|sara|zira|samantha|karen|moira|susan|emma|sonia|hazel|ana|maisie|female|woman/.test(name)) s += 40;
      if (/guy|david|mark|ryan|daniel|thomas|male|man|andrew|brian/.test(name)) s -= 60;
    }
    // Never treat pitch-faked same voice as child solution in UI scoring
    if ((roleKey === "boyChild" || roleKey === "girlChild") && /kid|child|boy|girl|ana|maisie/.test(name)) s += 50;
    return s;
  }

  function pickSynth(roleKey, langHint) {
    const cacheKey = roleKey + "|" + (langHint || accent);
    if (synthCache[cacheKey]) return synthCache[cacheKey];
    const voices = getVoices();
    if (!voices.length) return null;
    const ranked = voices
      .map((v) => ({ v, s: scoreSynth(v, roleKey, langHint) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);
    synthCache[cacheKey] = ranked.length ? ranked[0].v : null;
    return synthCache[cacheKey];
  }

  function speakSynth(text, roleKey, langHint, rateScale) {
    if (!window.speechSynthesis) return Promise.resolve(false);
    // Children: do NOT extreme-pitch the same voice; prefer real system child if any,
    // otherwise speak with distinct adult gender at near-normal pitch (honest fallback).
    let pitch = 1;
    let rate = 0.95;
    if (roleKey === "adultMale") {
      pitch = 0.95;
      rate = 0.94;
    } else if (roleKey === "adultFemale") {
      pitch = 1.02;
      rate = 0.95;
    } else if (roleKey === "boyChild") {
      pitch = langHint === "zh" ? 1.18 : 1.08;
      rate = 1.0;
    } else if (roleKey === "girlChild") {
      pitch = langHint === "zh" ? 1.22 : 1.12;
      rate = 1.0;
    }
    if (rateScale && rateScale > 0) rate = rate * rateScale;

    const mapped = roleKey === "boyChild" ? "adultMale" : roleKey === "girlChild" ? "adultFemale" : roleKey;
    const voice = pickSynth(langHint === "zh" ? roleKey : mapped, langHint);
    return new Promise((resolve) => {
      try {
        // 排队连读时也先停掉上一句，避免两句叠在一起
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = (voice && voice.lang) || (langHint === "zh" ? "zh-CN" : accent);
        if (voice) u.voice = voice;
        u.rate = rate;
        u.pitch = pitch;
        u.volume = 1;
        playResolve = resolve;
        u.onend = () => {
          if (playResolve === resolve) playResolve = null;
          resolve(true);
        };
        u.onerror = () => {
          if (playResolve === resolve) playResolve = null;
          resolve(false);
        };
        window.speechSynthesis.speak(u);
      } catch (e) {
        resolve(false);
      }
    });
  }

  /** 把一段话拆成一句一句，避免多句挤在同一条语音里 */
  function splitUtterances(text) {
    const raw = String(text || "").trim();
    if (!raw) return [];
    if (/[\u4e00-\u9fff]/.test(raw)) {
      const chunks = raw.split(/([。！？!?])/);
      const parts = [];
      let buf = "";
      for (let i = 0; i < chunks.length; i++) {
        const p = chunks[i];
        if (!p) continue;
        buf += p;
        if (/[。！？!?]/.test(p)) {
          const s = buf.trim();
          if (s) parts.push(s);
          buf = "";
        }
      }
      if (buf.trim()) parts.push(buf.trim());
      return parts.length ? parts : [raw];
    }
    const parts = [];
    let buf = "";
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      buf += ch;
      if (ch === "." || ch === "!" || ch === "?") {
        const next = raw[i + 1];
        if (next == null || /\s|"|'|”|’/.test(next)) {
          const s = buf.trim();
          if (s) parts.push(s);
          buf = "";
          while (i + 1 < raw.length && /\s/.test(raw[i + 1])) i++;
        }
      }
    }
    if (buf.trim()) parts.push(buf.trim());
    return parts.length ? parts : [raw];
  }

  function speak(text, role, opts) {
    opts = opts || {};
    if (!enabled) return Promise.resolve(false);
    const roleKey = normRole(role);
    const utterText = cleanText(text, opts.forceAll);
    if (!utterText) return Promise.resolve(false);
    const langHint = opts.lang || (/[\u4e00-\u9fff]/.test(utterText) ? "zh" : "en");
    const rateScale = opts.rate && opts.rate > 0 ? opts.rate : 1;

    // 英文多句：拆开顺序读，避免叠音；中文讲解 forceAll 保持整段
    if (!opts.forceAll && !opts.keepJoined && langHint === "en") {
      const bits = splitUtterances(utterText);
      if (bits.length > 1) {
        return speakSequence(
          bits.map((t) => ({ text: t, role: roleKey, rate: rateScale })),
          opts.gapMs != null ? opts.gapMs : 420
        );
      }
    }

    return loadManifest().then((man) => {
      if (!opts.queue) stop();
      else haltPlayback();
      if (langHint === "zh") {
        const zhKey = "zh|" + roleKey + "|" + utterText;
        const zhRel = man && man.clips ? (man.clips[zhKey] || man.clips["zh|adultFemale|" + utterText]) : null;
        if (zhRel) {
          return playUrl(zhRel + (zhRel.indexOf("?") >= 0 ? "&" : "?") + "v=9", rateScale);
        }
        return speakSynth(utterText, roleKey, langHint, rateScale);
      }
      let rel = man ? clipPath(roleKey, utterText) : null;
      if (!rel && roleKey === "boyChild") rel = man ? clipPath("adultMale", utterText) : null;
      if (!rel && roleKey === "girlChild") rel = man ? clipPath("adultFemale", utterText) : null;
      if (!rel) {
        const order = ["boyChild", "girlChild", "adultMale", "adultFemale"];
        for (let i = 0; i < order.length; i++) {
          if (order[i] === roleKey) continue;
          rel = man ? clipPath(order[i], utterText) : null;
          if (rel) break;
        }
      }
      if (rel) {
        return playUrl(rel + (rel.indexOf("?") >= 0 ? "&" : "?") + "v=8", rateScale).then((ok) => {
          if (ok) return true;
          return speakSynth(utterText, roleKey, langHint, rateScale);
        });
      }
      return speakSynth(utterText, roleKey, langHint, rateScale);
    });
  }

  function speakSequence(lines, gapMs) {
    gapMs = gapMs == null ? 420 : gapMs;
    stop();
    const gen = playGen;
    let chain = Promise.resolve();
    const flat = [];
    (lines || []).forEach((line) => {
      if (!line) return;
      const bits = splitUtterances(line.text);
      (bits.length ? bits : [line.text]).forEach((text) => {
        flat.push({
          role: line.role,
          text: text,
          forceAll: line.forceAll,
          rate: line.rate,
        });
      });
    });
    flat.forEach((line, i) => {
      chain = chain
        .then(() => {
          if (gen !== playGen) return false;
          return speak(line.text, line.role, {
            queue: true,
            keepJoined: true,
            forceAll: line.forceAll,
            rate: line.rate,
          });
        })
        .then(() => {
          if (gen !== playGen) return;
          return new Promise((r) => {
            if (i < flat.length - 1) setTimeout(r, gapMs);
            else r();
          });
        });
    });
    return chain;
  }

  function castMap() {
    const voices = (manifest && manifest.voices && manifest.voices[accent]) || {};
    return Object.keys(ROLE_META).map((key) => ({
      role: key,
      label: ROLE_META[key].label,
      voice: voices[key]
        ? "神经语音 · " + voices[key]
        : "待加载神经语音包（回退系统音色） · " + ROLE_META[key].neural,
    }));
  }

  function setAccent(next) {
    accent = next === "en-GB" ? "en-GB" : "en-US";
    synthCache = {};
    stop();
  }

  let primer = null;
  function prime() {
    return new Promise((resolve) => {
      try {
        if (!primer) {
          primer = new Audio("./audio/fx/sparkle.wav");
          primer.preload = "auto";
          primer.volume = 0.001;
        }
        const started = primer.play();
        if (started && started.then) {
          started.then(() => {
            try { primer.pause(); primer.currentTime = 0; } catch (e) {}
            resolve(true);
          }).catch(() => resolve(false));
        } else resolve(true);
      } catch (e) {
        resolve(false);
      }
    });
  }

  function setEnabled(on) {
    enabled = !!on;
    if (!enabled) stop();
  }

  function refresh() {
    synthCache = {};
    return loadManifest().then(() => true);
  }

  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = function () {
      synthCache = {};
    };
  }

  // warm manifest
  loadManifest();

  global.EnglishVoice = {
    ROLES: ROLE_META,
    normRole,
    speak,
    prime,
    speakSequence,
    stop,
    refresh,
    castMap,
    setAccent,
    setEnabled,
    getAccent: () => accent,
    isEnabled: () => enabled,
    loadManifest,
  };
})(window);
