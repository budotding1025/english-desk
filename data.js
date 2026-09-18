/* 北京版四年级上册 · 家侧检测
 * Unit 1 按「第一单元练习卷」考点与丢分点设计：
 * 新增词（情绪/天气/动作）· 听力长句 because · 口语/仿写 I'm…because/when… + 冠词
 * 其余单元保留作滚动复习。
 */
window.ENGLISH_DESK_DATA = {
  title: "翻翻英语 · 先稳 95 再冲汇文南",
  book: "北京版四年级上册",
  phaseNote:
    "阶段 A：兴趣 + 听力长句 + 口语完整句 + 词能进句，校内稳住约 95。过关后再开汇文南提高。",
  /** 每周 3 场：工作日①词听 · 工作日②口头 · 周末综合 */
  sessions: {
    weekdayListen: {
      id: "weekdayListen",
      label: "工作日① 词听",
      minutes: 18,
      blurb: "5 词检测 + 听力长句/应答 + 句型 1–2 步",
      steps: ["check"],
      showListen: true,
      showSort: false,
      showWrite: false,
      patternMaxStep: 2,
    },
    weekdayOral: {
      id: "weekdayOral",
      label: "工作日② 口头",
      minutes: 18,
      blurb: "错词轻测 + 口头 3 问（完整句）+ 短角色戏",
      steps: ["oral"],
      showListen: false,
      showSort: false,
      showWrite: false,
      patternMaxStep: 3,
    },
    weekend: {
      id: "weekend",
      label: "周末综合",
      minutes: 30,
      blurb: "分类 + 拼读提示 + 仿写冠词 + 角色戏 + 小书",
      steps: ["check", "oral", "read"],
      showListen: true,
      showSort: true,
      showWrite: true,
      patternMaxStep: 3,
    },
  },
  /** 兼容旧字段：按场次拆给三块倒计时 */
  modes: {
    weekdayListen: { label: "工作日① 18′", check: 18, oral: 0, read: 0 },
    weekdayOral: { label: "工作日② 18′", check: 0, oral: 18, read: 0 },
    weekend: { label: "周末 30′", check: 10, oral: 10, read: 10 },
  },
  weekHints: [
    { day: 1, session: "weekdayListen", note: "建议开周做词听" },
    { day: 2, session: "weekdayOral", note: "建议做口头" },
    { day: 3, session: "weekdayListen", note: "可再做一场词听" },
    { day: 4, session: "weekdayOral", note: "可再做一场口头" },
    { day: 5, session: "weekdayListen", note: "轻量词听收尾" },
    { day: 6, session: "weekend", note: "周末综合 30′" },
    { day: 0, session: "weekend", note: "周末综合 30′" },
  ],
  units: [
    {
      id: "u1",
      name: "Unit 1 Share and Care",
      examFocus: true,
      lessonCount: 4,
      currentLesson: 4,
      lessonTitle: "对标第一单元练习卷",
      themes: "情绪 · 天气 · because/when · What's the matter · 找东西",
      kaixinHint: "卷面重点：happy/sad/angry/excited/worried + sunny/rainy/cloudy/windy；丢分在听力长句与仿写冠词",
      words: [
        { en: "happy", zh: "高兴的", src: "卷·情绪", lesson: 1, cat: "emotion", priority: "high" },
        { en: "sad", zh: "难过的", src: "卷·情绪", lesson: 1, cat: "emotion", priority: "high" },
        { en: "angry", zh: "生气的", src: "卷·情绪", lesson: 3, cat: "emotion", priority: "high" },
        { en: "excited", zh: "兴奋的", src: "卷·情绪", lesson: 2, cat: "emotion", priority: "high" },
        { en: "worried", zh: "担心的", src: "卷·情绪", lesson: 2, cat: "emotion", priority: "high" },
        { en: "better", zh: "更好的；（感觉）好些", src: "卷·情绪", lesson: 2, cat: "emotion", priority: "mid" },
        { en: "feel", zh: "感觉", src: "卷·核心", lesson: 1, cat: "verb", priority: "high" },
        { en: "matter", zh: "麻烦；问题（What's the matter?）", src: "卷·核心", lesson: 2, cat: "verb", priority: "high" },
        { en: "look", zh: "看；看起来", src: "卷·动词", lesson: 2, cat: "verb", priority: "high" },
        { en: "find", zh: "找到", src: "卷·动词", lesson: 2, cat: "verb", priority: "high" },
        { en: "help", zh: "帮助", src: "卷·动词", lesson: 2, cat: "verb", priority: "mid" },
        { en: "play", zh: "玩", src: "卷·动词", lesson: 1, cat: "verb", priority: "mid" },
        { en: "sunny", zh: "晴朗的", src: "卷·天气", lesson: 4, cat: "weather", priority: "high" },
        { en: "rainy", zh: "下雨的", src: "卷·天气", lesson: 4, cat: "weather", priority: "high" },
        { en: "cloudy", zh: "多云的", src: "卷·天气", lesson: 4, cat: "weather", priority: "high" },
        { en: "windy", zh: "有风的", src: "卷·天气", lesson: 4, cat: "weather", priority: "high" },
        { en: "hot", zh: "热的", src: "卷·天气", lesson: 4, cat: "weather", priority: "mid" },
        { en: "rain", zh: "雨；下雨", src: "第4课", lesson: 4, cat: "weather", priority: "mid" },
        { en: "wind", zh: "风", src: "第4课", lesson: 4, cat: "weather", priority: "mid" },
        { en: "together", zh: "一起", src: "卷·对话", lesson: 2, cat: "other", priority: "high" },
        { en: "idea", zh: "主意", src: "第4课", lesson: 4, cat: "other", priority: "mid" },
        { en: "come", zh: "来", src: "第4课", lesson: 4, cat: "other", priority: "mid" },
        { en: "stop", zh: "停止", src: "第4课", lesson: 4, cat: "other", priority: "low" },
        { en: "his", zh: "他的", src: "第4课", lesson: 4, cat: "other", priority: "low" },
        { en: "mouse", zh: "老鼠", src: "第4课", lesson: 4, cat: "other", priority: "low" },
        { en: "but", zh: "但是", src: "第4课", lesson: 4, cat: "other", priority: "low" },
        { en: "have", zh: "有", src: "第4课", lesson: 4, cat: "other", priority: "mid" },
      ],
      wordSort: {
        title: "词分类（卷 VI）",
        hint: "把词拖进三类：情绪 / 动作 / 天气。和卷子同一考法。",
        groups: [
          { id: "emotion", label: "情绪类（如 happy）", answers: ["worried", "sad", "angry", "excited", "better"] },
          { id: "verb", label: "动作类（如 look）", answers: ["feel", "look", "find", "help", "play"] },
          { id: "weather", label: "天气类（如 windy）", answers: ["sunny", "cloudy", "hot", "rainy", "windy"] },
        ],
        bank: ["worried", "sad", "angry", "excited", "better", "feel", "look", "find", "help", "play", "sunny", "cloudy", "hot", "rainy", "windy"],
      },
      listen: {
        title: "听力强化（卷面丢分点）",
        hint: "单图听力已会。这里练「听整句原因」和「听问句选应答」。点播放，孩子听完再选。",
        judge: [
          {
            id: "j1",
            role: "boyChild",
            speak: "I am happy because I can play with friends and read interesting books at school.",
            show: "判断：我开心，因为能和朋友玩，还能在学校读有趣的书。",
            answer: true,
            tip: "卷 IV 易错：because 后面有两件事，都要听到。",
          },
          {
            id: "j2",
            role: "girlChild",
            speak: "I am sad because it is rainy and I can't play outside.",
            show: "判断：我难过，因为下雨了，不能出去玩。",
            answer: true,
            tip: "抓住 because + can't。",
          },
          {
            id: "j3",
            role: "adultMale",
            speak: "Tom is angry because his friend broke his pencil.",
            show: "判断：Tom 很高兴，因为他交到了新朋友。",
            answer: false,
            tip: "情绪词 angry ≠ happy；听清原因。",
          },
          {
            id: "j4",
            role: "adultFemale",
            speak: "Mum is worried because Grandma is ill.",
            show: "判断：妈妈担心，因为奶奶生病了。",
            answer: true,
            tip: "worried + ill 常一起出现。",
          },
          {
            id: "j5",
            role: "boyChild",
            speak: "I feel excited when it is sunny. I can ride a bike.",
            show: "判断：晴天我很兴奋，可以骑自行车。",
            answer: true,
            tip: "when 引导的条件/时间，和 because 一样要听完整。",
          },
        ],
        reply: [
          {
            id: "r1",
            role: "adultFemale",
            speak: "What's the matter?",
            prompt: "听到问句，选最佳应答",
            choices: [
              { id: "a", text: "I can't find my watch." },
              { id: "b", text: "I'm fine, thank you." },
              { id: "c", text: "It's sunny today." },
            ],
            answer: "a",
            tip: "What's the matter? → 说问题/麻烦。",
          },
          {
            id: "r2",
            role: "adultMale",
            speak: "How do you feel?",
            prompt: "听到问句，选最佳应答",
            choices: [
              { id: "a", text: "I feel happy." },
              { id: "b", text: "It's under the desk." },
              { id: "c", text: "Yes, please." },
            ],
            answer: "a",
            tip: "How do you feel? → I feel + 情绪词。",
          },
          {
            id: "r3",
            role: "boyChild",
            speak: "I'm angry because he broke my pencil.",
            prompt: "听到陈述，选合适回应",
            choices: [
              { id: "a", text: "Don't be angry. I can help you." },
              { id: "b", text: "Happy birthday!" },
              { id: "c", text: "It's rainy." },
            ],
            answer: "a",
            tip: "安慰 + 提议帮助，是卷面常见应答。",
          },
          {
            id: "r4",
            role: "girlChild",
            speak: "Can you look for it together?",
            prompt: "听到问句，选最佳应答",
            choices: [
              { id: "a", text: "Sure. Let's look for it together." },
              { id: "b", text: "I am sad." },
              { id: "c", text: "It's black." },
            ],
            answer: "a",
            tip: "一起找东西：Sure / OK + together。",
          },
        ],
      },
      patterns: [
        {
          id: "because",
          label: "I'm … because …（卷核心）",
          steps: [
            "原句：I'm happy because I can play with friends.",
            "换词：happy→sad/angry/worried；because 后换原因",
            "说自己：今天真实的心情 + 原因（完整一句）",
          ],
          frame: "I'm ____ because ____.",
          demos: [
            { role: "boyChild", text: "I'm happy because I can play with friends." },
            { role: "girlChild", text: "I'm sad because it is rainy." },
            { role: "boyChild", text: "I'm worried because I can't find my book." },
          ],
        },
        {
          id: "when",
          label: "I'm happy when …（仿写考点）",
          steps: [
            "原句：I'm happy when I read a good book.",
            "换词：read a good book → play catch / go to the park / help Mum",
            "说自己：两句；注意 a / the（go to a park / the park）",
          ],
          frame: "I'm happy when I ____.",
          demos: [
            { role: "girlChild", text: "I'm happy when I read a good book." },
            { role: "boyChild", text: "I'm happy when I play catch." },
            { role: "girlChild", text: "I'm happy when I go to the park." },
          ],
        },
        {
          id: "matter",
          label: "What's the matter?",
          steps: [
            "原句：What's the matter? → I can't find my watch.",
            "换词：watch → bag / pencil / scarf",
            "说自己：假装丢了一样东西，问答各一句",
          ],
          frame: "What's the matter? / I can't find ____.",
          demos: [
            { role: "adultFemale", text: "What's the matter?" },
            { role: "boyChild", text: "I can't find my watch." },
            { role: "adultMale", text: "Let's look for it together." },
          ],
        },
        {
          id: "like-rain",
          label: "I like / don't like rainy days",
          steps: [
            "原句：I like rainy days. / I don't like rainy days.",
            "换词：rainy → sunny / windy / cloudy",
            "说自己：喜欢哪种天气？because…",
          ],
          frame: "I like / don't like ____ days because ____.",
          demos: [
            { role: "boyChild", text: "I like rainy days." },
            { role: "girlChild", text: "I don't like rainy days." },
            { role: "boyChild", text: "I like sunny days because I can ride a bike." },
          ],
        },
      ],
      questions: [
        {
          ask: "How do you feel today? Why?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I feel happy because I can play with my friends." },
          tip: "必须说出 because / when 原因，不要只说 happy。",
        },
        {
          ask: "What's the matter?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "I can't find my red scarf." },
          tip: "答问题本身，不要答天气。",
        },
        {
          ask: "I'm happy when I read a good book. What about you?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I'm happy when I go to the park." },
          tip: "仿写口说；park 前要有 a/the。",
        },
        {
          ask: "Do you like rainy days? Why?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "No. I don't like rainy days because I can't play outside." },
          tip: "Yes/No + because。",
        },
      ],
      roleplay: "你看起来难过；朋友问 What's the matter？你说找不到手表，两人一起找，最后在帽子下面找到。",
      dialogues: [
        { role: "adultFemale", name: "Mum", text: "You look sad. What's the matter?" },
        { role: "boyChild", name: "You", text: "I can't find my watch." },
        { role: "girlChild", name: "Friend", text: "Don't worry. Let's look for it together." },
        { role: "boyChild", name: "You", text: "It's round in shape and black in colour." },
        { role: "girlChild", name: "Friend", text: "Look! It's under your cap." },
        { role: "boyChild", name: "You", text: "Thank you! I feel happy now." },
      ],
      reading: {
        title: "I'm Happy（卷面短文风格）",
        narratorRole: "boyChild",
        passage:
          "I am happy when it is sunny. I can play with my friends. We ride bikes, fly kites and play catch.\n" +
          "I am happy when I am with my family. We eat dinner and listen to stories.\n" +
          "I am happy when I read a good book. I can go on adventures with the characters.\n" +
          "I am happy when I help others. Helping makes me feel warm.",
        prompts: [
          { role: "adultFemale", text: "When is the writer happy?" },
          { role: "adultMale", text: "What do the friends do on a sunny day?" },
          { role: "adultFemale", text: "How does helping others make him feel?" },
        ],
        writeModel: "I'm happy when I read a good book.",
        writeHints: [
          "仿两句：I'm happy when I ____.",
          "活动短语：play catch / ride a bike / fly a kite / go to the park / help Mum",
          "冠词自查：go to a park / go to the park（不要写成 go to park）",
          "读完可对照：a good book、the park、my friends",
        ],
        articleTips: [
          { wrong: "go to park", right: "go to a park / go to the park", note: "卷面 −2 点：地点前常要 a/the" },
          { wrong: "read book", right: "read a book / read a good book", note: "可数名词单数要冠词" },
          { wrong: "play the catch", right: "play catch", note: "球类/捉人游戏前常常不用 the" },
        ],
      },
      readPrompts: [
        { role: "adultFemale", text: "When are you happy?" },
        { role: "adultMale", text: "What do you do with your friends?" },
        { role: "adultFemale", text: "Can you make a sentence with because?" },
      ],
      phonics: [
        { a: "cake", b: "make", same: true, note: "a_e → /eɪ/" },
        { a: "cat", b: "angry", same: true, note: "a → /æ/" },
        { a: "he", b: "she", same: true, note: "e → /iː/" },
        { a: "bed", b: "me", same: false, note: "/e/ vs /iː/" },
      ],
    },
    {
      id: "u2",
      name: "Unit 2 Be Good Friends",
      lessonCount: 4,
      themes: "朋友 · 一起读 · 帮助 · 休息",
      kaixinHint: "开心单词书：一起玩 / 读书 / 生病休息",
      words: [
        { en: "read", zh: "读", src: "课本" },
        { en: "story", zh: "故事", src: "课本" },
        { en: "together", zh: "一起", src: "课本" },
        { en: "help", zh: "帮助", src: "课本" },
        { en: "share", zh: "分享", src: "课本" },
        { en: "should", zh: "应该", src: "课本" },
        { en: "rest", zh: "休息", src: "课本" },
        { en: "ill", zh: "生病的", src: "课本" },
        { en: "remember", zh: "记住", src: "课本" },
        { en: "poem", zh: "诗", src: "课本" },
        { en: "friend", zh: "朋友", src: "课本" },
        { en: "polite", zh: "礼貌的", src: "拓展" },
        { en: "kind", zh: "友好的", src: "拓展" },
        { en: "book", zh: "书", src: "拓展" },
      ],
      patterns: [
        {
          id: "doing",
          label: "What are you doing?",
          steps: [
            "原句：What are you doing? → I'm reading.",
            "换词：reading → drawing / playing / helping Mum",
            "说自己：现在正在做什么",
          ],
          frame: "I'm ____ing.",
          demos: [
            { role: "adultFemale", text: "What are you doing?" },
            { role: "boyChild", text: "I'm reading." },
            { role: "girlChild", text: "I'm helping Mum." },
          ],
        },
        {
          id: "can",
          label: "Can I … with you?",
          steps: [
            "原句：Can I read it with you? → Sure.",
            "换词：read → play / walk / sing",
            "说自己：邀请家人一起做一事",
          ],
          frame: "Can I ____ with you?",
          demos: [
            { role: "girlChild", text: "Can I read it with you?" },
            { role: "boyChild", text: "Sure. We can read it together." },
          ],
        },
        {
          id: "should",
          label: "You should…",
          steps: [
            "原句：You should have a good rest.",
            "换词：have a good rest → drink water / see a doctor",
            "说自己：给家人一条善意建议",
          ],
          frame: "You should ____.",
          demos: [
            { role: "adultFemale", text: "You should have a good rest." },
            { role: "adultMale", text: "You should drink some water." },
          ],
        },
      ],
      questions: [
        {
          ask: "What are you doing now?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I'm reading a storybook." },
        },
        {
          ask: "Can I read / play with you?",
          asker: "girlChild",
          sample: { role: "boyChild", text: "Sure. Let's play together." },
        },
        {
          ask: "What should a good friend do?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "A good friend should help you." },
        },
      ],
      roleplay: "朋友生病了，你打电话关心并给出建议。",
      dialogues: [
        { role: "girlChild", name: "You", text: "Hello. How do you feel today?" },
        { role: "boyChild", name: "Friend", text: "I'm ill. I feel tired." },
        { role: "girlChild", name: "You", text: "Oh. You should have a good rest." },
        { role: "adultFemale", name: "Mum", text: "Please drink a lot of water." },
      ],
      readPrompts: [
        { role: "adultFemale", text: "Who are the friends?" },
        { role: "adultFemale", text: "What should the friend do?" },
      ],
    },
    {
      id: "u3",
      name: "Unit 3 Be a Nice Person",
      lessonCount: 4,
      themes: "礼貌 · 请求 · 道歉",
      kaixinHint: "开心单词书：借东西 / 道歉 / 请帮忙",
      words: [
        { en: "help", zh: "帮助", src: "课本" },
        { en: "please", zh: "请", src: "课本" },
        { en: "excuse", zh: "劳驾", src: "课本" },
        { en: "sorry", zh: "抱歉", src: "课本" },
        { en: "could", zh: "可以（更礼貌）", src: "课本" },
        { en: "banana", zh: "香蕉", src: "课本" },
        { en: "pencil", zh: "铅笔", src: "拓展" },
        { en: "borrow", zh: "借入", src: "拓展" },
        { en: "thank", zh: "感谢", src: "拓展" },
        { en: "nice", zh: "友好的", src: "拓展" },
        { en: "careful", zh: "小心的", src: "拓展" },
        { en: "wait", zh: "等待", src: "拓展" },
      ],
      patterns: [
        {
          id: "helpme",
          label: "Can you help me, please?",
          steps: [
            "原句：Can you help me, please?",
            "换词：help me → open the door / carry the books",
            "说自己：向家人礼貌求助一件事",
          ],
          frame: "Can you ____, please?",
          demos: [
            { role: "girlChild", text: "Can you help me, please?" },
            { role: "adultMale", text: "Sure. Let me help you." },
          ],
        },
        {
          id: "sorry",
          label: "I'm sorry.",
          steps: [
            "原句：I'm sorry.",
            "换词：补原因 I'm sorry I'm late.",
            "说自己：今天有没有想道歉的小事",
          ],
          frame: "I'm sorry ____.",
          demos: [
            { role: "boyChild", text: "I'm sorry." },
            { role: "boyChild", text: "I'm sorry I'm late." },
          ],
        },
        {
          id: "could",
          label: "Could I have…?",
          steps: [
            "原句：Could I have a banana, please?",
            "换词：banana → apple / pencil / water",
            "说自己：礼貌要一样东西",
          ],
          frame: "Could I have ____, please?",
          demos: [
            { role: "girlChild", text: "Could I have a banana, please?" },
            { role: "adultFemale", text: "Yes, of course." },
          ],
        },
      ],
      questions: [
        {
          ask: "Can you help me, please?",
          asker: "girlChild",
          sample: { role: "adultMale", text: "Yes. What can I do for you?" },
        },
        {
          ask: "When do you say sorry?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I say sorry when I make a mistake." },
        },
        {
          ask: "Could I have a banana / pencil, please?",
          asker: "boyChild",
          sample: { role: "adultFemale", text: "Yes, please. Here you are." },
        },
      ],
      roleplay: "在家里礼貌点一份食物或借一支笔。",
      dialogues: [
        { role: "boyChild", name: "You", text: "Excuse me. Could I have a pencil, please?" },
        { role: "adultFemale", name: "Mum", text: "Yes. Here you are." },
        { role: "boyChild", name: "You", text: "Thank you." },
        { role: "adultFemale", name: "Mum", text: "You're welcome." },
      ],
      readPrompts: [
        { role: "adultFemale", text: "What does the child ask for?" },
        { role: "adultMale", text: "Is the child polite?" },
      ],
    },
    {
      id: "u5",
      name: "Unit 5 Enjoy Eating",
      lessonCount: 4,
      themes: "点餐 · 食物 · 餐桌礼仪",
      kaixinHint: "开心单词书：点餐 / 食物饮料 / 餐桌",
      words: [
        { en: "chicken", zh: "鸡肉", src: "课本" },
        { en: "salad", zh: "沙拉", src: "课本" },
        { en: "chopsticks", zh: "筷子", src: "课本" },
        { en: "would", zh: "想要（委婉）", src: "课本" },
        { en: "like", zh: "喜欢；想要", src: "课本" },
        { en: "drink", zh: "饮料；喝", src: "课本" },
        { en: "soup", zh: "汤", src: "拓展" },
        { en: "rice", zh: "米饭", src: "拓展" },
        { en: "noodles", zh: "面条", src: "拓展" },
        { en: "fruit", zh: "水果", src: "拓展" },
        { en: "water", zh: "水", src: "拓展" },
        { en: "juice", zh: "果汁", src: "拓展" },
        { en: "clean", zh: "干净的", src: "拓展" },
        { en: "table", zh: "桌子", src: "拓展" },
      ],
      patterns: [
        {
          id: "wouldlike",
          label: "What would you like…?",
          steps: [
            "原句：What would you like to have? → I'd like some chicken.",
            "换词：chicken → salad / soup / noodles",
            "说自己：今晚想吃什么",
          ],
          frame: "I'd like ____.",
          demos: [
            { role: "adultFemale", text: "What would you like to have?" },
            { role: "boyChild", text: "I'd like some chicken." },
            { role: "girlChild", text: "I'd like some fruit salad." },
          ],
        },
        {
          id: "wouldyou",
          label: "Would you like…?",
          steps: [
            "原句：Would you like some water? → Yes, please. / No, thank you.",
            "换词：water → juice / rice",
            "说自己：招待家人喝点什么",
          ],
          frame: "Would you like ____?",
          demos: [
            { role: "adultMale", text: "Would you like some water?" },
            { role: "girlChild", text: "Yes, please." },
            { role: "boyChild", text: "No, thank you." },
          ],
        },
        {
          id: "table",
          label: "Keep the table clean",
          steps: [
            "原句：Please don't play with the chopsticks.",
            "换词：说一条餐桌礼貌",
            "说自己：你家饭桌有什么规矩",
          ],
          frame: "Please ____. / Keep ____ clean.",
          demos: [
            { role: "adultFemale", text: "Please don't play with the chopsticks." },
            { role: "adultMale", text: "Keep the table clean." },
          ],
        },
      ],
      questions: [
        {
          ask: "What would you like to have?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I'd like some noodles, please." },
        },
        {
          ask: "Would you like some water?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "Yes, please. Thank you." },
        },
        {
          ask: "How do you keep the table clean?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I don't play with the chopsticks." },
        },
      ],
      roleplay: "假装在餐厅点餐，完成 4 个来回。",
      dialogues: [
        { role: "adultFemale", name: "Waiter", text: "What would you like to have?" },
        { role: "boyChild", name: "You", text: "I'd like some chicken, please." },
        { role: "adultFemale", name: "Waiter", text: "Would you like some juice?" },
        { role: "boyChild", name: "You", text: "Yes, please." },
      ],
      readPrompts: [
        { role: "adultFemale", text: "What food do they order?" },
        { role: "adultMale", text: "How do they keep the table clean?" },
      ],
    },
    {
      id: "u6",
      name: "Unit 6 Get Close to Nature",
      lessonCount: 4,
      themes: "自然 · 农场 · 旅行",
      kaixinHint: "开心单词书：农场 / 天气 / 动植物",
      words: [
        { en: "nature", zh: "自然", src: "课本" },
        { en: "farm", zh: "农场", src: "课本" },
        { en: "snow", zh: "雪", src: "课本" },
        { en: "water", zh: "水", src: "课本" },
        { en: "trip", zh: "旅行", src: "课本" },
        { en: "live", zh: "生活；居住", src: "课本" },
        { en: "without", zh: "没有", src: "课本" },
        { en: "plant", zh: "植物", src: "拓展" },
        { en: "animal", zh: "动物", src: "拓展" },
        { en: "river", zh: "河", src: "拓展" },
        { en: "tree", zh: "树", src: "拓展" },
        { en: "sun", zh: "太阳", src: "拓展" },
        { en: "wind", zh: "风", src: "拓展" },
        { en: "love", zh: "爱", src: "拓展" },
      ],
      patterns: [
        {
          id: "without",
          label: "We can't live without…",
          steps: [
            "原句：We can't live without nature / water.",
            "换词：water → air / plants / the sun",
            "说自己：你觉得什么最不能缺少",
          ],
          frame: "We can't live without ____.",
          demos: [
            { role: "adultMale", text: "We can't live without water." },
            { role: "adultFemale", text: "We can't live without nature." },
          ],
        },
        {
          id: "see",
          label: "I can see…",
          steps: [
            "原句：在农场 / 自然里看到什么",
            "换词：trees / animals / snow / a river",
            "说自己：最近一次户外看见了什么",
          ],
          frame: "I can see ____.",
          demos: [
            { role: "boyChild", text: "I can see a river." },
            { role: "girlChild", text: "I can see many trees." },
          ],
        },
        {
          id: "like",
          label: "I like … because…",
          steps: [
            "原句：I love this trip.",
            "换词：说明喜欢的原因 because…",
            "说自己：喜欢自然里的哪一样",
          ],
          frame: "I like ____ because ____.",
          demos: [
            { role: "boyChild", text: "I love this trip." },
            { role: "girlChild", text: "I like the farm because I can see animals." },
          ],
        },
      ],
      questions: [
        {
          ask: "What can you see in nature?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I can see trees, birds and a river." },
        },
        {
          ask: "What can't we live without?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "We can't live without water." },
        },
        {
          ask: "Do you like the farm / snow? Why?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I like the farm because I can see animals." },
        },
      ],
      roleplay: "介绍一次去公园或农场，说看到了什么。",
      dialogues: [
        { role: "adultMale", name: "Dad", text: "What can you see on the farm?" },
        { role: "girlChild", name: "You", text: "I can see cows and trees." },
        { role: "adultFemale", name: "Mum", text: "Do you like this trip?" },
        { role: "girlChild", name: "You", text: "Yes. I love this trip." },
      ],
      readPrompts: [
        { role: "adultFemale", text: "What can you see?" },
        { role: "adultMale", text: "Why do you like nature?" },
      ],
    },
    {
      id: "u7",
      name: "Unit 7 Be Together",
      lessonCount: 4,
      themes: "新年 · 春节 · 元宵",
      kaixinHint: "开心单词书：生日 / 春节 / 聚会 / 许愿",
      words: [
        { en: "new", zh: "新的", src: "课本" },
        { en: "year", zh: "年", src: "课本" },
        { en: "festival", zh: "节日", src: "课本" },
        { en: "spring", zh: "春；春节相关", src: "课本" },
        { en: "lantern", zh: "灯笼", src: "课本" },
        { en: "wish", zh: "愿望", src: "课本" },
        { en: "riddle", zh: "谜语", src: "课本" },
        { en: "guess", zh: "猜", src: "课本" },
        { en: "happy", zh: "快乐的", src: "课本" },
        { en: "family", zh: "家庭", src: "拓展" },
        { en: "party", zh: "聚会", src: "拓展" },
        { en: "candle", zh: "蜡烛", src: "拓展" },
        { en: "together", zh: "一起", src: "拓展" },
        { en: "story", zh: "故事", src: "拓展" },
      ],
      patterns: [
        {
          id: "happy",
          label: "Happy …!",
          steps: [
            "原句：Happy New Year! / Happy Spring Festival!",
            "换词：换节日或生日 Happy birthday!",
            "说自己：给家人一句节日祝福",
          ],
          frame: "Happy ____!",
          demos: [
            { role: "adultMale", text: "Happy New Year!" },
            { role: "adultFemale", text: "Happy Spring Festival!" },
            { role: "girlChild", text: "Happy birthday!" },
          ],
        },
        {
          id: "wish",
          label: "I make a wish…",
          steps: [
            "原句：I make a wish.",
            "换词：说出愿望 I wish I can…",
            "说自己：你的一个小愿望",
          ],
          frame: "I wish ____.",
          demos: [
            { role: "boyChild", text: "I make a wish." },
            { role: "girlChild", text: "I wish I can read more books." },
          ],
        },
        {
          id: "festival",
          label: "What do you do at…?",
          steps: [
            "原句：春节 / 元宵做什么",
            "换词：eat / visit / guess riddles",
            "说自己：你家过节的一件事",
          ],
          frame: "At ____, we ____.",
          demos: [
            { role: "adultFemale", text: "What do you do at Spring Festival?" },
            { role: "boyChild", text: "At Spring Festival, we visit our family." },
          ],
        },
      ],
      questions: [
        {
          ask: "What festival is coming?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "Spring Festival is coming." },
        },
        {
          ask: "What do you do at Spring Festival?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "We eat together and visit our family." },
        },
        {
          ask: "What is your wish?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I wish I can be a good friend." },
        },
      ],
      roleplay: "介绍你们家过节的一天，说三件事。",
      dialogues: [
        { role: "adultMale", name: "Dad", text: "Happy Spring Festival!" },
        { role: "girlChild", name: "You", text: "Happy Spring Festival, Dad!" },
        { role: "adultFemale", name: "Mum", text: "What is your wish?" },
        { role: "girlChild", name: "You", text: "I wish we can be together." },
      ],
      readPrompts: [
        { role: "adultFemale", text: "What festival is it?" },
        { role: "adultMale", text: "What is the wish?" },
      ],
    },
  ],
};

/** 多邻国式课流：按场次生成一屏一题卡序 */
(function (g) {
  const DATA = g.ENGLISH_DESK_DATA;
  if (!DATA) return;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function todaySessionId() {
    const day = new Date().getDay();
    const hint = (DATA.weekHints || []).find((h) => h.day === day);
    return (hint && hint.session) || "weekdayListen";
  }

  function sessionMeta(id) {
    return (DATA.sessions && DATA.sessions[id]) || DATA.sessions.weekdayListen;
  }

  function pickWords(unit, store, n, preferRetry) {
    const custom = (store.customWords && store.customWords[unit.id]) || [];
    const retry = ((store.retryWords || []).filter((w) => w.unitId === unit.id) || []).map((r) => ({
      en: r.en,
      zh: r.zh,
      src: "错词",
      priority: "high",
    }));
    const pool = (unit.words || []).concat(custom);
    const high = shuffle(pool.filter((w) => w.priority === "high"));
    const rest = shuffle(pool.filter((w) => w.priority !== "high"));
    let picked = [];
    if (preferRetry && retry.length) {
      picked = picked.concat(shuffle(retry).slice(0, Math.min(preferRetry, retry.length)));
    }
    const merged = high.concat(rest);
    while (picked.length < n && merged.length) {
      const w = merged.shift();
      if (!picked.some((p) => p.en === w.en)) picked.push(w);
    }
    return picked.slice(0, n);
  }

  function wordCard(w, mode) {
    const dictation = mode === "dictation";
    return {
      type: "word",
      mode: dictation ? "dictation" : "zh2en",
      title: dictation ? "听写" : "认词",
      prompt: dictation ? "听「翻翻龟」读，写出英文" : w.zh,
      answer: w.en,
      zh: w.zh,
      en: w.en,
      speakText: w.en,
      speakRole: dictation ? "boyChild" : "adultMale",
      coach: dictation ? "turtle" : null,
      autoPlay: dictation,
      retryWord: { en: w.en, zh: w.zh },
    };
  }

  function listenCard(item, kind) {
    const isJudge = kind === "judge";
    return {
      type: "listen",
      kind: kind,
      title: isJudge ? "听力判断" : "听应答",
      prompt: item.show || item.prompt || "听完再选",
      speakText: item.speak,
      speakRole: isJudge ? "girlChild" : item.role || "adultFemale",
      coach: isJudge ? "bee" : null,
      autoPlay: true,
      answer: item.answer,
      tip: item.tip || "",
      choices:
        isJudge
          ? [
              { id: true, label: "对 √" },
              { id: false, label: "错 ×" },
            ]
          : (item.choices || []).map((c) => ({ id: c.id, label: c.text })),
    };
  }

  function patternCard(unit) {
    const p = (unit.patterns && unit.patterns[0]) || null;
    if (!p) return null;
    const demos = (p.demos || []).map((d) => ({
      role: "girlChild",
      text: d.text,
    }));
    return {
      type: "pattern",
      title: "跟说句型",
      prompt: p.label + "\n" + (p.frame || ""),
      demos: demos,
      speakText: demos[0] ? demos[0].text : p.label,
      speakRole: "girlChild",
      coach: "bee",
      tip: (p.steps && p.steps[2]) || "用自己的话再说一遍",
      autoPlay: true,
    };
  }

  function oralCard(q, i) {
    return {
      type: "oral",
      title: "口头问答 " + (i + 1),
      prompt: q.ask,
      speakText: q.ask,
      speakRole: q.asker || "adultFemale",
      sampleText: (q.sample && q.sample.text) || "",
      sampleRole: (q.sample && q.sample.role) || "boyChild",
      tip: q.tip || "请说完整句（because / when）",
      autoPlay: true,
    };
  }

  function dialogueCard(unit) {
    const lines = unit.dialogues || [];
    if (!lines.length) return null;
    return {
      type: "dialogue",
      title: "听角色戏",
      prompt: unit.roleplay || "听完整对话",
      lines: lines,
      tip: "听完试着跟说一两句",
    };
  }

  function sortCard(unit) {
    const S = unit.wordSort;
    if (!S) return null;
    const sample = shuffle(S.bank || []).slice(0, 6);
    return {
      type: "sort",
      title: "词分类",
      prompt: "把词点进正确类别",
      bank: sample,
      groups: S.groups || [],
    };
  }

  function writeCard(unit) {
    const R = unit.reading;
    if (!R) return null;
    return {
      type: "write",
      title: "仿写",
      prompt: R.writeModel || "I'm happy when I …",
      passage: R.passage || "",
      narratorRole: R.narratorRole || "boyChild",
      hints: R.writeHints || [],
      articleTips: R.articleTips || [],
    };
  }

  function readCard(unit) {
    const prompts = (unit.reading && unit.reading.prompts) || unit.readPrompts || [];
    const q = prompts[0] || { role: "adultFemale", text: "What happened?" };
    return {
      type: "read",
      title: "读后一句",
      prompt: q.text,
      speakText: q.text,
      speakRole: q.role || "adultFemale",
      tip: "用一句英文或中文说大意，然后点会了",
      autoPlay: true,
    };
  }

  function eggLine(unit) {
    const L = unit.listen;
    if (L && L.judge && L.judge[0]) return L.judge[0].speak;
    const q = (unit.questions || [])[0];
    if (q && q.sample && q.sample.text) return q.sample.text;
    return "I'm happy when I learn English.";
  }

  function buildCards(unit, sessionId, store) {
    store = store || {};
    const cards = [];
    if (sessionId === "weekdayListen") {
      pickWords(unit, store, 5, 1).forEach((w, i) => {
        cards.push(wordCard(w, i % 2 === 0 ? "dictation" : "zh2en"));
      });
      const judges = shuffle((unit.listen && unit.listen.judge) || []).slice(0, 1);
      const replies = shuffle((unit.listen && unit.listen.reply) || []).slice(0, 1);
      judges.forEach((j) => cards.push(listenCard(j, "judge")));
      replies.forEach((r) => cards.push(listenCard(r, "reply")));
      const pat = patternCard(unit);
      if (pat) cards.push(pat);
    } else if (sessionId === "weekdayOral") {
      pickWords(unit, store, 2, 2).forEach((w) => cards.push(wordCard(w, "zh2en")));
      (unit.questions || []).slice(0, 3).forEach((q, i) => cards.push(oralCard(q, i)));
      const d = dialogueCard(unit);
      if (d) cards.push(d);
    } else {
      const s = sortCard(unit);
      if (s) cards.push(s);
      const w = writeCard(unit);
      if (w) cards.push(w);
      const j = ((unit.listen && unit.listen.judge) || [])[0];
      if (j) cards.push(listenCard(j, "judge"));
      const q = (unit.questions || [])[0];
      if (q) cards.push(oralCard(q, 0));
      cards.push(readCard(unit));
    }
    return cards;
  }

  g.EnglishDeskLesson = {
    todaySessionId,
    sessionMeta,
    buildCards,
    eggLine,
    shuffle,
  };
})(window);
