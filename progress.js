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

  function semesterPath() {
    const nodes = [];
    (DATA.units || []).forEach((u) => {
      const n = unitLessonCount(u);
      for (let i = 1; i <= n; i++) {
        nodes.push({
          id: u.id + "-L" + i,
          unitId: u.id,
          lesson: i,
          label: shortUnitName(u) + " · 第" + i + "课",
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
    if (!store.currentPathId) {
      const path = semesterPath();
      store.currentPathId = (path[0] && path[0].id) || "u1-L1";
    }
    return store;
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
    semesterPath: semesterPath,
    pathTotal: pathTotal,
    nodeById: nodeById,
    nextNode: nextNode,
    completedCount: completedCount,
    unitLessonCount: unitLessonCount,
    ensureProgress: ensureProgress,
    settleLesson: settleLesson,
  };
})(window);
