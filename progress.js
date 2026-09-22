/* 翻翻英语 · 金币宝石与学期路径 */
(function (g) {
  const DATA = g.ENGLISH_DESK_DATA;
  if (!DATA) return;

  const COIN_CORRECT = 10;
  const GEM_LESSON = 1;
  const BONUS_FIRST = 50;
  const BONUS_REVIEW = 25;
  const BONUS_EXTRA = 30;
  const PRAISE_EVERY = 5;

  function unitLessonCount(u) {
    if (!u) return 4;
    if (u.lessonCount) return u.lessonCount;
    if (u.currentLesson) return u.currentLesson;
    const nums = (u.words || []).map((w) => w.lesson || 0).filter(Boolean);
    return nums.length ? Math.max.apply(null, nums) : 4;
  }

  function shortUnitName(u) {
    const m = String(u.name || u.id || "").match(/Unit\s*\d+/i);
    return m ? m[0] : u.id;
  }

  function lessonEnglish(u, i) {
    const list = (u && u.lessonTitles) || [];
    return list[i - 1] || ("Lesson " + i);
  }

  function semesterPath() {
    const nodes = [];
    (DATA.units || []).forEach((u) => {
      const n = unitLessonCount(u);
      for (let i = 1; i <= n; i++) {
          const bookNo = (u.lessonStart || 1) + i - 1;
          nodes.push({
            id: u.id + "-L" + i,
            unitId: u.id,
            lesson: i,
            bookLesson: bookNo,
            label: "Lesson " + bookNo + " · " + lessonEnglish(u, i),
            lessonTitle: lessonEnglish(u, i),
            unitTitle: u.name,
            unitName: u.name,
          });
      }
    });
    return nodes;
  }

  function pathTotal() {
    return semesterPath().length;
  }

  function nodeById(id) {
    return semesterPath().find((n) => n.id === id) || null;
  }

  function nextNode(id, completedMap) {
    const path = semesterPath();
    const idx = path.findIndex((n) => n.id === id);
    if (idx < 0) return path[0] || null;
    for (let i = idx + 1; i < path.length; i++) {
      if (!(completedMap && completedMap[path[i].id])) return path[i];
    }
    for (let i = 0; i < path.length; i++) {
      if (!(completedMap && completedMap[path[i].id])) return path[i];
    }
    return path[Math.min(idx + 1, path.length - 1)] || null;
  }

  function completedCount(completedMap) {
    const path = semesterPath();
    let n = 0;
    path.forEach((node) => {
      if (completedMap && completedMap[node.id] && completedMap[node.id].count > 0) n += 1;
    });
    return n;
  }

  function ensureProgress(store) {
    store = store || {};
    if (typeof store.coins !== "number") store.coins = 0;
    if (typeof store.gems !== "number") store.gems = 0;
    if (!store.completedLessons) store.completedLessons = {};
    if (!store.retryWords) store.retryWords = [];
    if (!store.stats) {
      store.stats = { answered: 0, correct: 0, recent: [] };
    } else {
      if (typeof store.stats.answered !== "number") store.stats.answered = 0;
      if (typeof store.stats.correct !== "number") store.stats.correct = 0;
      if (!Array.isArray(store.stats.recent)) store.stats.recent = [];
    }
    if (!store.currentPathId) {
      const path = semesterPath();
      store.currentPathId = (path[0] && path[0].id) || "u1-L1";
    }
    if (typeof store.rank !== "number" || store.rank < 1) store.rank = 1;
    if (store.rank > RANKS.length) store.rank = RANKS.length;
    if (typeof store.gemCut !== "number" || store.gemCut < 0) store.gemCut = 0;
    return store;
  }

  const GEM_CUT = 50;
  const GEM_TIME = 30;

  const RANKS = [
    { id: 1, en: "Sprout", zh: "新芽", cost: 0, lessons: 0 },
    { id: 2, en: "Listener", zh: "耳朵", cost: 80, lessons: 1 },
    { id: 3, en: "Speaker", zh: "开口", cost: 180, lessons: 2 },
    { id: 4, en: "Reader", zh: "读书", cost: 320, lessons: 4 },
    { id: 5, en: "Writer", zh: "写句", cost: 480, lessons: 6 },
    { id: 6, en: "Challenger", zh: "挑战", cost: 700, lessons: 8 },
    { id: 7, en: "Star", zh: "小星", cost: 980, lessons: 12 },
    { id: 8, en: "Fanfan", zh: "翻翻达人", cost: 1400, lessons: 16 },
  ];

  function rankById(id) {
    return RANKS.filter(function (r) { return r.id === id; })[0] || RANKS[0];
  }

  function currentRank(store) {
    store = ensureProgress(store);
    return rankById(store.rank);
  }

  function nextRank(store) {
    store = ensureProgress(store);
    return RANKS.filter(function (r) { return r.id === store.rank + 1; })[0] || null;
  }

  function coinNeed(store, rank) {
    store = ensureProgress(store);
    return Math.max(0, (rank.cost || 0) - (store.gemCut || 0));
  }

  function lessonNeedMet(store, rank) {
    return completedCount(store.completedLessons) >= (rank.lessons || 0);
  }

  function upgradeRank(store) {
    store = ensureProgress(store);
    const nxt = nextRank(store);
    if (!nxt) return { ok: false, reason: "已经是最高等级", store: store };
    const coins = coinNeed(store, nxt);
    const lessons = completedCount(store.completedLessons);
    if (store.coins < coins) {
      return { ok: false, reason: "金币还差 " + (coins - store.coins), store: store };
    }
    if (lessons < nxt.lessons) {
      return { ok: false, reason: "进度还差 " + (nxt.lessons - lessons) + " 课", store: store };
    }
    store.coins -= coins;
    store.gemCut = 0;
    store.rank = nxt.id;
    return { ok: true, reason: "升到 " + nxt.en + " · " + nxt.zh, store: store, rank: nxt };
  }

  function spendGemBoost(store) {
    store = ensureProgress(store);
    const nxt = nextRank(store);
    if (!nxt) return { ok: false, reason: "已经是最高等级", store: store };
    if (store.gems < 1) return { ok: false, reason: "没有宝石", store: store };
    if (coinNeed(store, nxt) <= 0) return { ok: false, reason: "金币条件已经够了", store: store };
    store.gems -= 1;
    store.gemCut += GEM_CUT;
    return { ok: true, reason: "已用 1 宝石抵 " + GEM_CUT + " 金币", store: store };
  }

  function spendGemTime(store) {
    store = ensureProgress(store);
    if (store.gems < 1) return { ok: false, reason: "没有宝石", store: store, add: 0 };
    store.gems -= 1;
    return { ok: true, reason: "+" + GEM_TIME + " 秒", store: store, add: GEM_TIME };
  }

  function challengeSeconds(cardCount) {
    const n = cardCount || 1;
    return Math.max(180, n * 25);
  }

  const FLOAT_WINDOW = 20;

  function recordAnswer(store, ok) {
    store = ensureProgress(store);
    store.stats.answered += 1;
    if (ok) store.stats.correct += 1;
    store.stats.recent.push(ok ? 1 : 0);
    if (store.stats.recent.length > FLOAT_WINDOW) {
      store.stats.recent = store.stats.recent.slice(-FLOAT_WINDOW);
    }
    return store;
  }

  function accuracyPct(store) {
    store = ensureProgress(store);
    if (!store.stats.answered) return null;
    return Math.round((store.stats.correct / store.stats.answered) * 100);
  }

  function floatAccuracyPct(store) {
    store = ensureProgress(store);
    const recent = store.stats.recent || [];
    if (!recent.length) return null;
    const hit = recent.reduce((a, b) => a + b, 0);
    return Math.round((hit / recent.length) * 100);
  }

  function settlePractice(store, lessonCoins, todayKey, kind, opts) {
    store = ensureProgress(store);
    opts = opts || {};
    const timedOut = kind === "challenge" && !!opts.timedOut;
    const bonus = timedOut
      ? 0
      : kind === "challenge"
        ? 40
        : kind === "miniExam"
          ? 30
          : kind === "phonics" || kind === "minimal" || kind === "listenDrill"
            ? 20
            : kind === "preview"
              ? 15
              : 20;
    const bonusLabel = timedOut
      ? ""
      : kind === "challenge"
        ? "限时挑战奖励"
        : kind === "miniExam"
          ? "迷你卷奖励"
          : kind === "phonics"
            ? "发音小站奖励"
            : kind === "minimal"
              ? "易混音奖励"
              : kind === "listenDrill"
                ? "听力加练奖励"
                : kind === "preview"
                  ? "预习奖励"
                  : "错题复习奖励";
    const gems = timedOut ? 0 : kind === "challenge" || kind === "miniExam" ? 1 : 0;
    const earned = (lessonCoins || 0) + bonus;
    store.coins += earned;
    store.gems += gems;
    const weakTips = kind === "miniExam" ? buildWeakTips(opts.cards || [], opts.results || []) : [];
    return {
      store: store,
      lessonCoins: lessonCoins || 0,
      bonus: bonus,
      bonusLabel: bonusLabel,
      gems: gems,
      earned: earned,
      totalCoins: store.coins,
      totalGems: store.gems,
      isReview: true,
      next: null,
      pathId: store.currentPathId,
      practiceKind: kind,
      timedOut: timedOut,
      weakTips: weakTips,
    };
  }

  function buildWeakTips(cards, results) {
    let listenFail = 0;
    let phonFail = 0;
    let sentFail = 0;
    let wordFail = 0;
    (cards || []).forEach((c, i) => {
      if (results[i]) return;
      if (c.type === "listen") listenFail += 1;
      else if (c.type === "phonics") phonFail += 1;
      else if (c.type === "pattern" || c.makeSentence || c.saySelf) sentFail += 1;
      else wordFail += 1;
    });
    const tips = [];
    if (listenFail) {
      tips.push({
        title: "听力",
        text: "长句后半句易漏 → 去「听力加练」",
        mode: "listenDrill",
      });
    }
    if (phonFail) {
      tips.push({
        title: "发音",
        text: "画线音 / 易混对比 → 去「发音小站」或「易混音」",
        mode: "minimal",
      });
    }
    if (sentFail) {
      tips.push({
        title: "造句",
        text: "I'm … because / when … → 上课多「说自己」",
        mode: "retry",
      });
    }
    if (wordFail) {
      tips.push({
        title: "词汇",
        text: "认词还不够稳 → 去「预习」听三遍",
        mode: "preview",
      });
    }
    if (!tips.length) {
      tips.push({
        title: "真棒",
        text: "这套迷你卷过关了，可以去挑战或预习下一课",
        mode: "",
      });
    }
    return tips;
  }

  function settleLesson(store, pathId, lessonCoins, todayKey) {
    store = ensureProgress(store);
    const done = store.completedLessons[pathId] || { count: 0, last: null };
    const isReview = done.count > 0;
    const sameDayExtra = done.last === todayKey;
    let bonus = 0;
    let bonusLabel = "";
    if (!isReview) {
      bonus = BONUS_FIRST;
      bonusLabel = "首通奖励";
    } else if (sameDayExtra) {
      bonus = BONUS_EXTRA;
      bonusLabel = "多学一课奖励";
    } else {
      bonus = BONUS_REVIEW;
      bonusLabel = "复习奖励";
    }
    const gems = GEM_LESSON;
    const earned = (lessonCoins || 0) + bonus;
    store.coins += earned;
    store.gems += gems;
    store.completedLessons[pathId] = {
      count: done.count + 1,
      last: todayKey,
    };
    const nxt = nextNode(pathId, store.completedLessons);
    if (nxt) store.currentPathId = nxt.id;
    return {
      store: store,
      lessonCoins: lessonCoins || 0,
      bonus: bonus,
      bonusLabel: bonusLabel,
      gems: gems,
      earned: earned,
      totalCoins: store.coins,
      totalGems: store.gems,
      isReview: isReview,
      next: nxt,
      pathId: pathId,
    };
  }

  g.EnglishDeskProgress = {
    COIN_CORRECT: COIN_CORRECT,
    PRAISE_EVERY: PRAISE_EVERY,
    FLOAT_WINDOW: FLOAT_WINDOW,
    semesterPath: semesterPath,
    pathTotal: pathTotal,
    nodeById: nodeById,
    nextNode: nextNode,
    completedCount: completedCount,
    unitLessonCount: unitLessonCount,
    ensureProgress: ensureProgress,
    settleLesson: settleLesson,
    settlePractice: settlePractice,
    recordAnswer: recordAnswer,
    accuracyPct: accuracyPct,
    floatAccuracyPct: floatAccuracyPct,
    RANKS: RANKS,
    GEM_CUT: GEM_CUT,
    GEM_TIME: GEM_TIME,
    currentRank: currentRank,
    nextRank: nextRank,
    coinNeed: coinNeed,
    upgradeRank: upgradeRank,
    spendGemBoost: spendGemBoost,
    spendGemTime: spendGemTime,
    challengeSeconds: challengeSeconds,
  };
})(window);
