/**
 * 真实校内试卷归档：错题 → 错题本；薄弱项 → 以后练习重点。
 * 来源：real test/四上英语第二单元.pdf（四上 U2，得分 71）
 */
(function (w) {
  const PAPERS = {
    "u2-real": {
      id: "u2-real",
      unitId: "u2",
      title: "四上 · 第二单元真实卷",
      score: 71,
      source: "real test/四上英语第二单元.pdf",
      note: "按卷面批改 + 官方听力材料核对录入。听力短文陷阱以 walk≠car、park≠zoo、only 绝对化为重点。",
      // 错题本条目（导入 localStorage.retryWords）
      wrongs: [
        {
          en: "May I speak to Sara?",
          zh: "听选：应选 Sorry, she is not home.（不是 I am Sara.）",
          type: "listen",
          section: "听力三·1",
          practice: "listenDrill",
          card: {
            type: "listen",
            kind: "reply",
            title: "真实卷·听问句",
            prompt: "听问句，选正确答语",
            speakText: "May I speak to Sara?",
            speakRole: "adultFemale",
            coach: "adultFemale",
            autoPlay: true,
            answer: "b",
            tip: "找 Sara 时，若她不在：Sorry, she is not home.",
            zh: "请问 Sara 在吗？",
            explain: "A「I am Sara」是本人接听；卷面问句是找 Sara，应选 B。",
            answerZh: "对不起，她不在家。",
            choices: [
              { id: "a", text: "I am Sara." },
              { id: "b", text: "Sorry, she is not home." },
            ],
            retryWord: { en: "May I speak to Sara?", zh: "听选答语·电话" },
          },
        },
        {
          en: "What's the matter, Tina?",
          zh: "听选：应选 I can't remember…（不是 She can't…）",
          type: "listen",
          section: "听力三·2",
          practice: "listenDrill",
          card: {
            type: "listen",
            kind: "reply",
            title: "真实卷·听问句",
            prompt: "听问句，选正确答语",
            speakText: "What's the matter, Tina?",
            speakRole: "adultFemale",
            coach: "adultFemale",
            autoPlay: true,
            answer: "a",
            tip: "当面问 Tina：用 I，不用 She。",
            zh: "怎么了，Tina？",
            explain: "问的是 Tina 本人，答语用第一人称 I。",
            answerZh: "我记不住这首诗。",
            choices: [
              { id: "a", text: "I can't remember the poem." },
              { id: "b", text: "She can't remember the poem." },
            ],
            retryWord: { en: "What's the matter, Tina?", zh: "听选答语·I/She" },
          },
        },
        {
          en: "We go to school by car every day.",
          zh: "短文判断：应为 F（原文 walk，不是 by car）",
          type: "listen",
          section: "听力四·2",
          practice: "listenDrill",
          card: {
            type: "listen",
            kind: "judge",
            title: "真实卷·Tina短文陷阱",
            prompt: "判断对错：We go to school by car every day.",
            speakText: "Every day, we walk to school together.",
            speakRole: "girlChild",
            coach: "girlChild",
            autoPlay: true,
            answer: false,
            tip: "陷阱：原文是 walk，不是 by car。",
            zh: "我们每天坐车上学。",
            explain: "听到 walk，判断句写 by car → 错（F）。",
            answerZh: "假",
            choices: [],
            retryWord: { en: "We go to school by car every day.", zh: "Tina陷阱·walk≠car" },
          },
        },
        {
          en: "We go to the zoo and fly kites on weekends.",
          zh: "短文判断：应为 F（原文 park，不是 zoo）",
          type: "listen",
          section: "听力四·5",
          practice: "listenDrill",
          card: {
            type: "listen",
            kind: "judge",
            title: "真实卷·Tina短文陷阱",
            prompt: "判断对错：We go to the zoo and fly kites on weekends.",
            speakText: "On weekends, we go to the park and fly kites.",
            speakRole: "girlChild",
            coach: "girlChild",
            autoPlay: true,
            answer: false,
            tip: "陷阱：原文是 park，不是 zoo。",
            zh: "周末我们去动物园放风筝。",
            explain: "听到 park，判断句写 zoo → 错（F）。",
            answerZh: "假",
            choices: [],
            retryWord: { en: "We go to the zoo and fly kites on weekends.", zh: "Tina陷阱·park≠zoo" },
          },
        },
        {
          en: "May I speak to Lucy?",
          zh: "问句选答：应选 Sorry, she is sleeping.",
          type: "word",
          section: "笔试八·2",
          practice: "miniExam",
          card: null,
        },
        {
          en: "hard",
          zh: "异类词：remember / help / hard / try → 选 hard（形容词）",
          type: "word",
          section: "笔试六·1",
          practice: "miniExam",
        },
        {
          en: "She often gives me gifts.",
          zh: "仿写：第三人称单数 gives；勿写 she play give give…",
          type: "word",
          section: "笔试十·任务二",
          practice: "reviewWrite",
        },
        {
          en: "What's the matter?",
          zh: "问句配对：What's the matter? → I can't remember the poem. / Not so good 留给 How are you feeling?",
          type: "word",
          section: "笔试八·1",
          practice: "miniExam",
        },
        {
          en: "speak",
          zh: "电话用语：May I speak to…? / Sorry, she is…",
          type: "word",
          section: "听力+笔试综合",
          practice: "listenDrill",
        },
        {
          en: "only",
          zh: "听力陷阱：only / every day 等绝对化词常为错句信号",
          type: "word",
          section: "听力四",
          practice: "listenDrill",
        },
      ],
      // 以后练习重点题型（Records 展示 + 推荐入口）
      weakFocus: [
        {
          id: "listen-trap",
          title: "听力短文判断陷阱",
          priority: "high",
          text: "Tina 短文：walk≠car、park≠zoo、only 太绝对。先听关键词再判断。",
          mode: "listenDrill",
        },
        {
          id: "listen-reply",
          title: "听问句选答语",
          priority: "high",
          text: "电话 May I speak to…？当面问用 I / 转述用 She；he/she 别混。",
          mode: "listenDrill",
        },
        {
          id: "odd-one",
          title: "异类词（词性）",
          priority: "high",
          text: "先分清动词 / 形容词 / 名词 / -ing，再找「不一样的那个」。hard 是形容词。",
          mode: "miniExam",
        },
        {
          id: "qa-match",
          title: "问句与答语配对",
          priority: "mid",
          text: "What's the matter? / How are you feeling? / May I speak to…? 各有固定答法，选项勿重复用。",
          mode: "miniExam",
        },
        {
          id: "write-3rd",
          title: "仿写第三人称句子",
          priority: "high",
          text: "AnAn is my good friend. She often gives me gifts.（主语 She + 动词加 s）",
          mode: "reviewWrite",
        },
      ],
    },
  };

  function list() {
    return Object.keys(PAPERS).map(function (k) {
      return PAPERS[k];
    });
  }

  function get(id) {
    return PAPERS[id] || null;
  }

  /** 把未导入过的真实卷错题合并进 retryWords */
  function importIntoStore(store) {
    store = store || {};
    const imported = store.importedRealPapers || {};
    let retry = (store.retryWords || []).slice();
    let changed = false;
    const today =
      typeof store._todayHint === "string"
        ? store._todayHint
        : new Date().toISOString().slice(0, 10);

    list().forEach(function (paper) {
      if (imported[paper.id]) return;
      (paper.wrongs || []).forEach(function (w) {
        const en = String(w.en || "").trim();
        if (!en) return;
        retry = retry.filter(function (r) {
          return !(r.unitId === paper.unitId && r.en === en);
        });
        const rec = {
          unitId: paper.unitId,
          en: en,
          zh: w.zh || "",
          type: w.type === "listen" ? "listen" : "word",
          date: today,
          source: "real:" + paper.id,
          section: w.section || "",
          practice: w.practice || "",
        };
        if (w.type === "listen" && w.card) rec.card = w.card;
        retry.push(rec);
        changed = true;
      });
      imported[paper.id] = { at: today, score: paper.score, wrongs: (paper.wrongs || []).length };
      changed = true;
    });

    if (!changed) return { store: store, changed: false, added: 0 };
    store.retryWords = retry;
    store.importedRealPapers = imported;
    store.weakFocus = mergeWeakFocus(store.weakFocus, list());
    return { store: store, changed: true, added: retry.length };
  }

  function mergeWeakFocus(existing, papers) {
    const map = {};
    (existing || []).forEach(function (w) {
      if (w && w.id) map[w.id] = w;
    });
    papers.forEach(function (p) {
      (p.weakFocus || []).forEach(function (w) {
        map[w.id] = Object.assign({ unitId: p.unitId, paperId: p.id }, w);
      });
    });
    return Object.keys(map).map(function (k) {
      return map[k];
    });
  }

  function papersForUnit(unitId) {
    return list().filter(function (p) {
      return p.unitId === unitId;
    });
  }

  w.ENGLISH_DESK_REAL_PAPERS = {
    list: list,
    get: get,
    importIntoStore: importIntoStore,
    papersForUnit: papersForUnit,
    PAPERS: PAPERS,
  };
})(window);
