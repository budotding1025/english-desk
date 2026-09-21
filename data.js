/* 北京版四年级上册（2025）
 * 单词、句型、听力、重难点按课本课次。
 * 每单元最后一课：复习 + 知识延展。挑战比课本再难一点。
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
      label: "每课 18 分钟",
      minutes: 18,
      blurb: "看中文写词、听写、听力判断、听力对话、跟读重点句",
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
      name: "Unit One Share and Care",
      lessonCount: 4,
      lessonStart: 1,
      lessonTitles: ["How Do You Feel Today?", "What's the Matter?", "Let's Take a Walk", "Yoyo and Joe"],
      focus: [
        "重难点：How do you feel today? I'm worried / happy / excited.",
        "重难点：What's the matter? I can't find… Let's look for… together.",
        "重难点：Please don't be angry. I feel better. Calm down.",
        "复习心情和帮助；延展 because，以及 a_e / e / e_e（cake, he, these）。",
      ],
      words: [
        { en: "worried", zh: "担心的", src: "课本", lesson: 1, priority: "high" },
        { en: "late", zh: "晚的", src: "课本", lesson: 1, priority: "high" },
        { en: "worry", zh: "担心", src: "课本", lesson: 1, priority: "mid" },
        { en: "just", zh: "正，恰恰", src: "课本", lesson: 1, priority: "mid" },
        { en: "in time", zh: "及时，按时", src: "课本", lesson: 1, priority: "high" },
        { en: "welcome", zh: "欢迎", src: "课本", lesson: 1, priority: "mid" },
        { en: "feel", zh: "感受", src: "课本", lesson: 1, priority: "high" },
        { en: "today", zh: "今天", src: "课本", lesson: 1, priority: "mid" },
        { en: "so", zh: "如此，非常", src: "课本", lesson: 1, priority: "mid" },
        { en: "excited", zh: "兴奋的", src: "课本", lesson: 1, priority: "high" },
        { en: "happy", zh: "高兴的", src: "课本", lesson: 1, priority: "high" },
        { en: "matter", zh: "问题；事情", src: "课本", lesson: 2, priority: "high" },
        { en: "sad", zh: "悲伤的", src: "课本", lesson: 2, priority: "high" },
        { en: "find", zh: "找到", src: "课本", lesson: 2, priority: "high" },
        { en: "dog", zh: "狗", src: "课本", lesson: 2, priority: "mid" },
        { en: "cry", zh: "哭泣", src: "课本", lesson: 2, priority: "mid" },
        { en: "together", zh: "一起", src: "课本", lesson: 2, priority: "high" },
        { en: "with", zh: "和……一起；有", src: "课本", lesson: 2, priority: "mid" },
        { en: "look", zh: "看起来", src: "课本", lesson: 2, priority: "high" },
        { en: "model", zh: "模型", src: "课本", lesson: 3, priority: "mid" },
        { en: "plane", zh: "飞机", src: "课本", lesson: 3, priority: "high" },
        { en: "angry", zh: "生气的", src: "课本", lesson: 3, priority: "high" },
        { en: "better", zh: "更好地；好些", src: "课本", lesson: 3, priority: "high" },
        { en: "calm down", zh: "冷静下来", src: "课本", lesson: 3, priority: "high" },
        { en: "fix", zh: "修理", src: "课本", lesson: 3, priority: "high" },
        { en: "his", zh: "他的", src: "课本", lesson: 4, priority: "mid" },
        { en: "mouse", zh: "老鼠", src: "课本", lesson: 4, priority: "mid" },
        { en: "come", zh: "来", src: "课本", lesson: 4, priority: "mid" },
        { en: "have", zh: "有", src: "课本", lesson: 4, priority: "mid" },
        { en: "idea", zh: "主意", src: "课本", lesson: 4, priority: "high" },
        { en: "stop", zh: "停止", src: "课本", lesson: 4, priority: "mid" },
        { en: "but", zh: "但是", src: "课本", lesson: 4, priority: "mid" },
        { en: "because", zh: "因为", src: "课本", lesson: 4, priority: "high", extend: true },
        { en: "cake", zh: "蛋糕（a_e）", src: "课本", lesson: 4, priority: "high", extend: true },
        { en: "these", zh: "这些（e_e）", src: "课本", lesson: 4, priority: "high", extend: true },
      ],
      patterns: [
        {
          id: "feel",
          lesson: 1,
          label: "How do you feel today?",
          frame: "How do you feel today? I'm ____.",
          steps: [
            "原句：How do you feel today? I'm a little worried.",
            "换词：worried → happy / excited",
            "说自己：今天真实的心情",
          ],
          demos: [
            { role: "adultFemale", text: "How do you feel today?" },
            { role: "boyChild", text: "I'm a little worried." },
            { role: "girlChild", text: "I'm so happy." },
          ],
        },
        {
          id: "matter",
          lesson: 2,
          label: "What's the matter?",
          frame: "What's the matter? I can't find ____. Let's look for ____ together.",
          steps: [
            "原句：What's the matter? I can't find my dog.",
            "换词：dog → book / bag",
            "说自己：丢了什么，并邀请一起找",
          ],
          demos: [
            { role: "girlChild", text: "What's the matter? You look sad." },
            { role: "boyChild", text: "I can't find my dog." },
            { role: "girlChild", text: "Let's look for him together." },
          ],
        },
        {
          id: "walk",
          lesson: 3,
          label: "Don't be angry. I feel better.",
          frame: "Please don't be angry. I feel better. Let's ____.",
          steps: [
            "原句：Please don't be angry. Let's take a walk.",
            "换词：walk → fix it / calm down",
            "说自己：生气时怎么让自己好一点",
          ],
          demos: [
            { role: "adultFemale", text: "Please don't be angry." },
            { role: "boyChild", text: "I feel better." },
            { role: "boyChild", text: "Let's fix it together." },
          ],
        },
        {
          id: "story",
          lesson: 4,
          label: "I have an idea.",
          frame: "I have an idea. Let's ____.",
          steps: [
            "原句：I have an idea.",
            "用 his / mouse / stop / but 讲一句故事",
            "把本单元心情词放进故事",
          ],
          demos: [
            { role: "boyChild", text: "I have an idea." },
            { role: "girlChild", text: "Come and look. But stop!" },
          ],
        },
        {
          id: "because",
          lesson: 4,
          label: "知识延展 I'm … because …",
          frame: "I'm ____ because ____.",
          steps: [
            "课本心情词 + because 说原因",
            "换词：worried because I'm late / happy because I can play",
            "说自己今天的心情和原因",
          ],
          demos: [
            { role: "boyChild", text: "I'm worried because I'm late." },
            { role: "girlChild", text: "I'm happy because we look for the dog together." },
          ],
          extend: true,
        },
        {
          id: "phonics1",
          lesson: 4,
          label: "知识延展 a_e / e / e_e",
          frame: "cake / he / these",
          steps: [
            "a_e：cake",
            "e：he, she",
            "e_e：these",
          ],
          demos: [
            { role: "boyChild", text: "I like cake." },
            { role: "girlChild", text: "Look at these cakes." },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "Dad, I'm a little worried. Am I late?",
            show: "判断：男孩有点担心自己迟到了。",
            answer: true,
            tip: "课文：I'm a little worried.",
          },
          {
            lesson: 2,
            role: "boyChild",
            speak: "I can't find my dog Danny. He is brown with a black nose.",
            show: "判断：他找不到棕色的狗 Danny。",
            answer: true,
            tip: "课文：I can't find my dog.",
          },
          {
            lesson: 3,
            role: "adultFemale",
            speak: "Please don't be angry. A walk always helps me calm down.",
            show: "判断：散步能帮助冷静下来。",
            answer: true,
            tip: "课文：calm down",
          },
          {
            lesson: 4,
            role: "boyChild",
            speak: "The mouse has an idea, but the cat does not stop.",
            show: "判断：老鼠有主意，可是猫没有停。",
            answer: true,
            tip: "故事课：idea / but / stop",
          },
          {
            lesson: 4,
            role: "girlChild",
            speak: "I'm excited because I can see these cakes.",
            show: "判断：她兴奋是因为看到了这些蛋糕。",
            answer: true,
            tip: "延展：because + these",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 1,
            role: "adultFemale",
            speak: "How do you feel today?",
            choices: [
              { id: "a", text: "I'm so happy." },
              { id: "b", text: "I'd like some chicken." },
              { id: "c", text: "Open the door, please." },
            ],
            answer: "a",
            tip: "回应心情",
          },
          {
            lesson: 2,
            role: "girlChild",
            speak: "What's the matter?",
            choices: [
              { id: "a", text: "I can't find my dog." },
              { id: "b", text: "Happy New Year!" },
              { id: "c", text: "Use the fork." },
            ],
            answer: "a",
            tip: "说说怎么了",
          },
          {
            lesson: 3,
            role: "adultFemale",
            speak: "How do you feel now?",
            choices: [
              { id: "a", text: "I feel better." },
              { id: "b", text: "He is a mouse." },
              { id: "c", text: "Fifty." },
            ],
            answer: "a",
            tip: "现在感觉好些了",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "boyChild",
            speak: "Mike is worried because he thinks he is late, but Dad says he is just in time.",
            show: "判断：Mike 最后还是迟到了。",
            answer: false,
            tip: "挑战：just in time 不是迟到",
          },
          {
            lesson: 0,
            role: "girlChild",
            speak: "Maomao is sad because he can't find Danny, so Lingling looks for the dog with him.",
            show: "判断：Lingling 和 Maomao 一起找狗。",
            answer: true,
            tip: "挑战：because + together",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "adultFemale",
            speak: "You look angry. What's the matter?",
            choices: [
              { id: "a", text: "My model plane is broken. Let's fix it." },
              { id: "b", text: "I'd like some soup." },
              { id: "c", text: "Happy Lantern Festival!" },
            ],
            answer: "a",
            tip: "挑战：先说问题，再说办法",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "How do you feel today?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I feel happy." },
        },
        {
          lesson: 2,
          ask: "What's the matter?",
          asker: "girlChild",
          sample: { role: "boyChild", text: "I can't find my dog." },
        },
        {
          lesson: 3,
          ask: "How do you feel now?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I feel better." },
        },
        {
          lesson: 4,
          ask: "I'm worried because I'm late. How about you?",
          asker: "girlChild",
          tip: "用 because 说自己的原因。",
          sample: { role: "boyChild", text: "I'm excited because I can play." },
          extend: true
        },
      ],
    },
    {
      id: "u2",
      name: "Unit Two Be Good Friends",
      lessonCount: 4,
      lessonStart: 5,
      lessonTitles: ["We Can Read It Together", "Let Me Help You", "You Should Have a Good Rest", "A Cupcake"],
      focus: [
        "重难点：We can read it together. The story is interesting.",
        "重难点：Let me help you. May I try? It's hard.",
        "重难点：You should have a good rest.",
        "复习朋友互助；延展 should … because …，以及 i / i_e / o。",
      ],
      words: [
        { en: "animal", zh: "动物", src: "课本", lesson: 1, priority: "high" },
        { en: "different", zh: "不同的", src: "课本", lesson: 1, priority: "high" },
        { en: "interesting", zh: "有趣的", src: "课本", lesson: 1, priority: "high" },
        { en: "story", zh: "故事", src: "课本", lesson: 1, priority: "high" },
        { en: "brush", zh: "刷子；画笔", src: "课本", lesson: 1, priority: "mid" },
        { en: "remember", zh: "记住", src: "课本", lesson: 2, priority: "high" },
        { en: "poem", zh: "诗", src: "课本", lesson: 2, priority: "mid" },
        { en: "hard", zh: "难的", src: "课本", lesson: 2, priority: "high" },
        { en: "may", zh: "可能，也许", src: "课本", lesson: 2, priority: "high" },
        { en: "try", zh: "尝试", src: "课本", lesson: 2, priority: "high" },
        { en: "ill", zh: "生病的", src: "课本", lesson: 3, priority: "high" },
        { en: "call", zh: "打电话", src: "课本", lesson: 3, priority: "mid" },
        { en: "her", zh: "她", src: "课本", lesson: 3, priority: "mid" },
        { en: "tomorrow", zh: "明天", src: "课本", lesson: 3, priority: "mid" },
        { en: "should", zh: "应该", src: "课本", lesson: 3, priority: "high" },
        { en: "rest", zh: "休息", src: "课本", lesson: 3, priority: "high" },
        { en: "wait", zh: "等待", src: "课本", lesson: 4, priority: "mid" },
        { en: "mouth", zh: "嘴", src: "课本", lesson: 4, priority: "mid" },
        { en: "best", zh: "最好的", src: "课本", lesson: 4, priority: "high" },
        { en: "share", zh: "分享", src: "课本", lesson: 4, priority: "high" },
        { en: "little", zh: "小的", src: "课本", lesson: 4, priority: "mid" },
        { en: "small", zh: "小的", src: "课本", lesson: 4, priority: "mid" },
        { en: "like", zh: "喜欢（i_e）", src: "课本", lesson: 4, priority: "high", extend: true },
        { en: "hot", zh: "热的（o）", src: "课本", lesson: 4, priority: "mid", extend: true },
      ],
      patterns: [
        {
          id: "read",
          lesson: 1,
          label: "We can read it together",
          frame: "We can read the ____ together. It is interesting.",
          steps: [
            "原句：We can read it together.",
            "换词：story / animal book",
            "说自己想和朋友一起读什么",
          ],
          demos: [
            { role: "boyChild", text: "We can read it together." },
            { role: "girlChild", text: "This animal story is interesting." },
          ],
        },
        {
          id: "help",
          lesson: 2,
          label: "Let me help you",
          frame: "Let me help you. May I try?",
          steps: [
            "原句：Let me help you.",
            "It's hard. May I try?",
            "说自己怎么帮朋友",
          ],
          demos: [
            { role: "girlChild", text: "Let me help you." },
            { role: "boyChild", text: "It's hard. May I try?" },
          ],
        },
        {
          id: "rest",
          lesson: 3,
          label: "You should have a good rest",
          frame: "You should ____.",
          steps: [
            "原句：You should have a good rest.",
            "换词：call her / remember the poem",
            "给生病的朋友一句建议",
          ],
          demos: [
            { role: "adultFemale", text: "She is ill." },
            { role: "boyChild", text: "You should have a good rest." },
          ],
        },
        {
          id: "share",
          lesson: 4,
          label: "Friends share",
          frame: "Good friends share ____.",
          steps: [
            "原句：We can share.",
            "little / small / best",
            "说说好朋友会分享什么",
          ],
          demos: [
            { role: "girlChild", text: "This cupcake is little, but we can share." },
            { role: "boyChild", text: "You are my best friend." },
          ],
        },
        {
          id: "should-because",
          lesson: 4,
          label: "知识延展 You should … because …",
          frame: "You should ____ because ____.",
          steps: [
            "should 后说做法",
            "because 后说原因",
            "给朋友一条带原因的建议",
          ],
          demos: [
            { role: "girlChild", text: "You should rest because you are ill." },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "We can read this animal story together. It is interesting.",
            show: "判断：他们可以一起读有趣的动物故事。",
            answer: true,
            tip: "课文：together / interesting",
          },
          {
            lesson: 2,
            role: "girlChild",
            speak: "The poem is hard. May I try?",
            show: "判断：诗很难，所以她不想试。",
            answer: false,
            tip: "May I try 是想试",
          },
          {
            lesson: 3,
            role: "adultFemale",
            speak: "She is ill. You should have a good rest and I will call her tomorrow.",
            show: "判断：她病了，应该好好休息。",
            answer: true,
            tip: "课文：should / rest",
          },
          {
            lesson: 4,
            role: "boyChild",
            speak: "The cupcake is small. We can wait and share it.",
            show: "判断：杯子蛋糕很小，他们可以分享。",
            answer: true,
            tip: "故事：share / small",
          },
          {
            lesson: 4,
            role: "girlChild",
            speak: "You should remember the story because it is interesting.",
            show: "判断：因为故事有趣，所以应该记住。",
            answer: true,
            tip: "延展 should because",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "Can we read it together?",
            choices: [
              { id: "a", text: "Yes. The story is interesting." },
              { id: "b", text: "Open the door." },
              { id: "c", text: "I'm a mouse." },
            ],
            answer: "a",
            tip: "一起读",
          },
          {
            lesson: 3,
            role: "adultFemale",
            speak: "Yangyang is ill. What should he do?",
            choices: [
              { id: "a", text: "He should have a good rest." },
              { id: "b", text: "He should play with chopsticks." },
              { id: "c", text: "He is a pig." },
            ],
            answer: "a",
            tip: "应该休息",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "girlChild",
            speak: "A good friend should help you when the poem is hard, and you may try again together.",
            show: "判断：朋友只在简单的时候才帮忙。",
            answer: false,
            tip: "挑战：hard 的时候也该帮忙",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "boyChild",
            speak: "I can't remember the poem. It's too hard.",
            choices: [
              { id: "a", text: "Let me help you. May I try with you?" },
              { id: "b", text: "Snow turns into water." },
              { id: "c", text: "Happy New Year!" },
            ],
            answer: "a",
            tip: "挑战：先帮忙再一起试",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "What can we read together?",
          asker: "adultFemale",
          sample: { role: "girlChild", text: "We can read an interesting animal story." },
        },
        {
          lesson: 2,
          ask: "The poem is hard. Can you help me?",
          asker: "boyChild",
          sample: { role: "girlChild", text: "Let me help you. May I try?" },
        },
        {
          lesson: 3,
          ask: "I am ill. What should I do?",
          asker: "boyChild",
          sample: { role: "adultFemale", text: "You should have a good rest." },
        },
        {
          lesson: 4,
          ask: "What should a good friend do? Why?",
          asker: "adultFemale",
          tip: "用 should 和 because。",
          sample: { role: "boyChild", text: "A good friend should share because we can be happy together." },
          extend: true
        },
      ],
    },
    {
      id: "u3",
      name: "Unit Three Be a Nice Person",
      lessonCount: 4,
      lessonStart: 9,
      lessonTitles: ["Can You Help Me, Please?", "Excuse Me", "I'm Sorry", "Could I Have a Banana, Please?"],
      focus: [
        "重难点：Can you help me, please? May I use your bat?",
        "重难点：Would you open the door, please?",
        "重难点：I'm sorry. Could you get it?",
        "复习礼貌请求；延展 Could I / Would you，以及 o / o_e / u_e。",
      ],
      words: [
        { en: "excuse me", zh: "打扰一下", src: "课本", lesson: 1, priority: "high" },
        { en: "please", zh: "请", src: "课本", lesson: 1, priority: "high" },
        { en: "bat", zh: "球拍", src: "课本", lesson: 1, priority: "mid" },
        { en: "use", zh: "使用", src: "课本", lesson: 1, priority: "high" },
        { en: "sorry", zh: "抱歉的", src: "课本", lesson: 1, priority: "high" },
        { en: "would", zh: "愿意", src: "课本", lesson: 2, priority: "high" },
        { en: "open", zh: "打开", src: "课本", lesson: 2, priority: "high" },
        { en: "door", zh: "门", src: "课本", lesson: 2, priority: "mid" },
        { en: "problem", zh: "问题", src: "课本", lesson: 2, priority: "mid" },
        { en: "must", zh: "必须", src: "课本", lesson: 2, priority: "high" },
        { en: "stand", zh: "站立", src: "课本", lesson: 2, priority: "mid" },
        { en: "polite", zh: "有礼貌的", src: "课本", lesson: 3, priority: "high" },
        { en: "could", zh: "能够（表礼貌）", src: "课本", lesson: 3, priority: "high" },
        { en: "get", zh: "拿；得到", src: "课本", lesson: 3, priority: "high" },
        { en: "monkey", zh: "猴子", src: "课本", lesson: 4, priority: "mid" },
        { en: "banana", zh: "香蕉", src: "课本", lesson: 4, priority: "high" },
        { en: "garden", zh: "花园", src: "课本", lesson: 4, priority: "mid" },
        { en: "want", zh: "想要", src: "课本", lesson: 4, priority: "high" },
        { en: "hope", zh: "希望（o_e）", src: "课本", lesson: 4, priority: "high", extend: true },
        { en: "cute", zh: "可爱的（u_e）", src: "课本", lesson: 4, priority: "mid", extend: true },
      ],
      patterns: [
        {
          id: "help-please",
          lesson: 1,
          label: "Can you help me, please?",
          frame: "Can you help me, please? May I use ____?",
          steps: [
            "原句：Can you help me, please?",
            "May I use your bat?",
            "礼貌地请求帮助",
          ],
          demos: [
            { role: "boyChild", text: "Excuse me. Can you help me, please?" },
            { role: "girlChild", text: "May I use your bat?" },
          ],
        },
        {
          id: "door",
          lesson: 2,
          label: "Would you open the door?",
          frame: "Would you ____, please?",
          steps: [
            "原句：Would you open the door, please?",
            "No problem.",
            "换一个礼貌请求",
          ],
          demos: [
            { role: "girlChild", text: "Would you open the door, please?" },
            { role: "boyChild", text: "No problem." },
          ],
        },
        {
          id: "sorry",
          lesson: 3,
          label: "I'm sorry",
          frame: "I'm sorry. Could you get ____?",
          steps: [
            "原句：I'm sorry.",
            "Could you get it for me?",
            "说一句道歉和请求",
          ],
          demos: [
            { role: "boyChild", text: "I'm sorry." },
            { role: "girlChild", text: "Could you get it for me? It's polite." },
          ],
        },
        {
          id: "banana",
          lesson: 4,
          label: "Could I have a banana, please?",
          frame: "Could I have ____, please?",
          steps: [
            "原句：Could I have a banana, please?",
            "The monkey wants a banana.",
            "在花园里礼貌地要一样东西",
          ],
          demos: [
            { role: "girlChild", text: "Could I have a banana, please?" },
            { role: "boyChild", text: "The monkey wants a banana." },
          ],
        },
        {
          id: "could-would",
          lesson: 4,
          label: "知识延展 Could I / Would you",
          frame: "Could I ____? / Would you ____, please?",
          steps: [
            "Could I 是自己想要",
            "Would you 是请对方做",
            "各说一句，都要带 please",
          ],
          demos: [
            { role: "girlChild", text: "Could I have a banana, please?" },
            { role: "boyChild", text: "Would you open the door, please?" },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "Excuse me. Can you help me, please? May I use your bat?",
            show: "判断：他想用球拍，并且说了 please。",
            answer: true,
            tip: "课文：please / use",
          },
          {
            lesson: 2,
            role: "girlChild",
            speak: "Would you open the door, please? You must stand here.",
            show: "判断：她请对方开门。",
            answer: true,
            tip: "课文：Would you",
          },
          {
            lesson: 3,
            role: "boyChild",
            speak: "I'm sorry. Could you get my bat? It is polite to say sorry.",
            show: "判断：道歉是不礼貌的。",
            answer: false,
            tip: "polite 是有礼貌",
          },
          {
            lesson: 4,
            role: "girlChild",
            speak: "The little monkey wants a banana in the garden.",
            show: "判断：猴子想要香蕉。",
            answer: true,
            tip: "课文：want / banana",
          },
          {
            lesson: 4,
            role: "boyChild",
            speak: "Could I use your bat, please? I hope I can play.",
            show: "判断：他礼貌地请求用球拍。",
            answer: true,
            tip: "延展 Could I",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "Can you help me, please?",
            choices: [
              { id: "a", text: "Yes. You may use my bat." },
              { id: "b", text: "I am a mouse." },
              { id: "c", text: "Snow is bad." },
            ],
            answer: "a",
            tip: "答应帮忙",
          },
          {
            lesson: 2,
            role: "girlChild",
            speak: "Would you open the door, please?",
            choices: [
              { id: "a", text: "No problem." },
              { id: "b", text: "He is ill." },
              { id: "c", text: "Fifty." },
            ],
            answer: "a",
            tip: "No problem",
          },
          {
            lesson: 4,
            role: "girlChild",
            speak: "Could I have a banana, please?",
            choices: [
              { id: "a", text: "Yes. Here you are." },
              { id: "b", text: "Calm down." },
              { id: "c", text: "Look at the plane." },
            ],
            answer: "a",
            tip: "礼貌应答",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "adultFemale",
            speak: "A nice person should say excuse me and please, and could is more polite than a short order.",
            show: "判断：礼貌的人不用 please。",
            answer: false,
            tip: "挑战：please / could 更礼貌",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "boyChild",
            speak: "I want that banana, now!",
            choices: [
              { id: "a", text: "Could I have a banana, please?" },
              { id: "b", text: "Give me that, now!" },
              { id: "c", text: "Go away!" },
            ],
            answer: "a",
            tip: "挑战：把命令改成礼貌请求",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "Can you help me, please?",
          asker: "boyChild",
          sample: { role: "girlChild", text: "Yes. You may use my bat." },
        },
        {
          lesson: 2,
          ask: "Would you open the door, please?",
          asker: "girlChild",
          sample: { role: "boyChild", text: "No problem." },
        },
        {
          lesson: 3,
          ask: "What do you say when you are sorry?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I'm sorry." },
        },
        {
          lesson: 4,
          ask: "How do you ask for a banana politely?",
          asker: "adultFemale",
          tip: "必须有 please。",
          sample: { role: "girlChild", text: "Could I have a banana, please?" },
          extend: true
        },
      ],
    },
    {
      id: "u4",
      name: "Unit Four Revision I",
      lessonCount: 2,
      lessonStart: 13,
      lessonTitles: ["Revision A", "Revision B"],
      focus: [
        "复习 Unit One 到 Unit Three：心情、帮助、礼貌。",
        "知识延展：把 because、should、Could I 串成更长的句子。",
      ],
      words: [
        { en: "worried", zh: "担心的", src: "课本", lesson: 1, priority: "high" },
        { en: "together", zh: "一起", src: "课本", lesson: 1, priority: "high" },
        { en: "angry", zh: "生气的", src: "课本", lesson: 1, priority: "mid" },
        { en: "should", zh: "应该", src: "课本", lesson: 1, priority: "high" },
        { en: "share", zh: "分享", src: "课本", lesson: 1, priority: "high" },
        { en: "please", zh: "请", src: "课本", lesson: 1, priority: "high" },
        { en: "sorry", zh: "抱歉的", src: "课本", lesson: 1, priority: "high" },
        { en: "polite", zh: "有礼貌的", src: "课本", lesson: 1, priority: "high" },
        { en: "because", zh: "因为", src: "课本", lesson: 2, priority: "high", extend: true },
        { en: "could", zh: "能够（表礼貌）", src: "课本", lesson: 2, priority: "high", extend: true },
      ],
      patterns: [
        {
          id: "rev-a",
          lesson: 1,
          label: "Revision A",
          frame: "I feel ____. We can ____ together.",
          steps: [
            "复习心情",
            "复习一起做",
            "复习 please / sorry",
          ],
          demos: [
            { role: "boyChild", text: "I feel better." },
            { role: "girlChild", text: "We can read it together." },
            { role: "boyChild", text: "I'm sorry." },
          ],
        },
        {
          id: "rev-b",
          lesson: 2,
          label: "知识延展 三句连说",
          frame: "I feel ____ because ____. You should ____. Could I ____, please?",
          steps: [
            "第一句心情加原因",
            "第二句 should 建议",
            "第三句 Could I 礼貌请求",
          ],
          demos: [
            { role: "girlChild", text: "I feel worried because I am late." },
            { role: "boyChild", text: "You should have a good rest." },
            { role: "girlChild", text: "Could I use your bat, please?" },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "I'm sorry. Let's look for it together.",
            show: "判断：他道歉，并提议一起找。",
            answer: true,
            tip: "复习 together",
          },
          {
            lesson: 2,
            role: "girlChild",
            speak: "I feel sad because my dog is lost, so you should help me, and I could say thank you.",
            show: "判断：她难过是因为狗丢了，而且希望得到帮助。",
            answer: true,
            tip: "延展长句",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 1,
            role: "adultFemale",
            speak: "How do you feel today?",
            choices: [
              { id: "a", text: "I feel happy." },
              { id: "b", text: "Use the fork." },
              { id: "c", text: "January." },
            ],
            answer: "a",
            tip: "复习心情",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "boyChild",
            speak: "A good friend should share and help, because a nice person is polite and says please.",
            show: "判断：好朋友不需要礼貌。",
            answer: false,
            tip: "挑战：should + because + polite",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "girlChild",
            speak: "I'm worried and the poem is hard.",
            choices: [
              { id: "a", text: "You should rest, and I can help you. May I try with you?" },
              { id: "b", text: "Go away." },
              { id: "c", text: "I want it now." },
            ],
            answer: "a",
            tip: "挑战：安慰并帮忙",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "How do you feel, and what can friends do?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I feel happy. We can read together." },
        },
        {
          lesson: 2,
          ask: "Say three things: a feeling with because, a should, and a Could I.",
          asker: "adultFemale",
          tip: "三句都要说完。",
          sample: { role: "girlChild", text: "I'm tired because it is late. You should rest. Could I have a banana, please?" },
          extend: true
        },
      ],
    },
    {
      id: "u5",
      name: "Unit Five Enjoy Eating",
      lessonCount: 4,
      lessonStart: 15,
      lessonTitles: ["I'd Like Some Chicken", "What Would You Like to Have?", "Please Don't Play with the Chopsticks", "How to Make Fruit Salad"],
      focus: [
        "重难点：I'd like some chicken / a sandwich.",
        "重难点：What would you like to have?",
        "重难点：Please don't play with the chopsticks.",
        "复习点餐和餐具；延展 First, next, then, last，以及 ir / ur。",
      ],
      words: [
        { en: "chicken", zh: "鸡肉", src: "课本", lesson: 1, priority: "high" },
        { en: "sandwich", zh: "三明治", src: "课本", lesson: 1, priority: "high" },
        { en: "tomato", zh: "西红柿", src: "课本", lesson: 1, priority: "mid" },
        { en: "potato", zh: "土豆", src: "课本", lesson: 2, priority: "mid" },
        { en: "meatball", zh: "肉丸", src: "课本", lesson: 2, priority: "mid" },
        { en: "eat", zh: "吃", src: "课本", lesson: 2, priority: "mid" },
        { en: "steak", zh: "牛排", src: "课本", lesson: 2, priority: "mid" },
        { en: "soup", zh: "汤", src: "课本", lesson: 2, priority: "high" },
        { en: "dessert", zh: "甜点", src: "课本", lesson: 2, priority: "mid" },
        { en: "ice cream", zh: "冰激凌", src: "课本", lesson: 2, priority: "high" },
        { en: "chopsticks", zh: "筷子", src: "课本", lesson: 3, priority: "high" },
        { en: "them", zh: "它们", src: "课本", lesson: 3, priority: "mid" },
        { en: "cut", zh: "切", src: "课本", lesson: 3, priority: "high" },
        { en: "knife", zh: "餐刀", src: "课本", lesson: 3, priority: "mid" },
        { en: "fork", zh: "餐叉", src: "课本", lesson: 3, priority: "high" },
        { en: "right", zh: "右边；正确的", src: "课本", lesson: 3, priority: "mid" },
        { en: "left", zh: "左边", src: "课本", lesson: 3, priority: "mid" },
        { en: "apple", zh: "苹果", src: "课本", lesson: 4, priority: "high" },
        { en: "salad", zh: "沙拉", src: "课本", lesson: 4, priority: "high" },
        { en: "first", zh: "首先", src: "课本", lesson: 4, priority: "high" },
        { en: "next", zh: "接下来", src: "课本", lesson: 4, priority: "high" },
        { en: "then", zh: "然后", src: "课本", lesson: 4, priority: "high" },
        { en: "last", zh: "最后", src: "课本", lesson: 4, priority: "high" },
        { en: "girl", zh: "女孩（ir）", src: "课本", lesson: 4, priority: "mid", extend: true },
        { en: "nurse", zh: "护士（ur）", src: "课本", lesson: 4, priority: "mid", extend: true },
      ],
      patterns: [
        {
          id: "like-food",
          lesson: 1,
          label: "I'd like some chicken",
          frame: "I'd like some ____.",
          steps: [
            "原句：I'd like some chicken.",
            "换词：sandwich / tomato",
            "说自己想吃什么",
          ],
          demos: [
            { role: "boyChild", text: "I'd like some chicken." },
            { role: "girlChild", text: "I'd like a sandwich." },
          ],
        },
        {
          id: "would-like",
          lesson: 2,
          label: "What would you like to have?",
          frame: "What would you like to have? I'd like ____.",
          steps: [
            "原句：What would you like to have?",
            "I'd like some soup.",
            "点一份甜点或冰激凌",
          ],
          demos: [
            { role: "adultFemale", text: "What would you like to have?" },
            { role: "boyChild", text: "I'd like some soup and ice cream." },
          ],
        },
        {
          id: "chopsticks",
          lesson: 3,
          label: "Please don't play with the chopsticks",
          frame: "Please don't ____. Use the ____.",
          steps: [
            "原句：Please don't play with the chopsticks.",
            "Use the knife and fork.",
            "说左右手怎么用餐具",
          ],
          demos: [
            { role: "adultFemale", text: "Please don't play with the chopsticks." },
            { role: "boyChild", text: "I use the fork in my left hand." },
          ],
        },
        {
          id: "salad",
          lesson: 4,
          label: "How to make fruit salad",
          frame: "First, ____. Next, ____. Then, ____. Last, ____.",
          steps: [
            "First 洗或切苹果",
            "Next / Then 混合",
            "Last 吃沙拉",
          ],
          demos: [
            { role: "girlChild", text: "First, cut the apples. Next, mix them. Then, wait. Last, eat the salad." },
          ],
        },
        {
          id: "order",
          lesson: 4,
          label: "知识延展 顺序 + I'd like",
          frame: "First I'd like ____. Then I'd like ____.",
          steps: [
            "用 First / Then 点两样",
            "不要只用一个 I'd like",
            "说完整两句",
          ],
          demos: [
            { role: "boyChild", text: "First I'd like some chicken. Then I'd like some fruit salad." },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "I'd like some chicken and a tomato sandwich.",
            show: "判断：他想要鸡肉和番茄三明治。",
            answer: true,
            tip: "课文 I'd like",
          },
          {
            lesson: 2,
            role: "adultFemale",
            speak: "What would you like to have? I'd like soup, not steak.",
            show: "判断：她想要牛排，不想要汤。",
            answer: false,
            tip: "not steak",
          },
          {
            lesson: 3,
            role: "adultFemale",
            speak: "Please don't play with the chopsticks. Use the knife and fork.",
            show: "判断：可以用筷子玩耍。",
            answer: false,
            tip: "don't play",
          },
          {
            lesson: 4,
            role: "girlChild",
            speak: "First, cut the apples. Next, mix them. Last, eat the fruit salad.",
            show: "判断：做水果沙拉要先切苹果。",
            answer: true,
            tip: "first / last",
          },
          {
            lesson: 4,
            role: "boyChild",
            speak: "The girl would like fruit salad, and the nurse would like soup.",
            show: "判断：女孩想要水果沙拉。",
            answer: true,
            tip: "延展 ir/ur girl nurse",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 2,
            role: "adultFemale",
            speak: "What would you like to have?",
            choices: [
              { id: "a", text: "I'd like some soup." },
              { id: "b", text: "I feel angry." },
              { id: "c", text: "Open the door." },
            ],
            answer: "a",
            tip: "点餐",
          },
          {
            lesson: 3,
            role: "adultFemale",
            speak: "Please don't play with the chopsticks.",
            choices: [
              { id: "a", text: "I'm sorry. I will use the fork." },
              { id: "b", text: "Woof!" },
              { id: "c", text: "He is a mouse." },
            ],
            answer: "a",
            tip: "改正用餐",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "girlChild",
            speak: "First she cuts the apples with a knife, then she mixes the salad, and last she eats it with a fork, not with chopsticks.",
            show: "判断：她最后用筷子吃沙拉。",
            answer: false,
            tip: "挑战：not with chopsticks",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "adultMale",
            speak: "What would you like, and how do you make it?",
            choices: [
              { id: "a", text: "I'd like fruit salad. First cut the apples, then mix them." },
              { id: "b", text: "I am late." },
              { id: "c", text: "May I use your bat?" },
            ],
            answer: "a",
            tip: "挑战：点餐加步骤",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "What would you like?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I'd like some chicken." },
        },
        {
          lesson: 2,
          ask: "What would you like to have?",
          asker: "adultFemale",
          sample: { role: "girlChild", text: "I'd like some soup." },
        },
        {
          lesson: 3,
          ask: "What shouldn't you do with chopsticks?",
          asker: "adultMale",
          sample: { role: "boyChild", text: "Please don't play with the chopsticks." },
        },
        {
          lesson: 4,
          ask: "How do you make fruit salad?",
          asker: "adultFemale",
          tip: "按顺序说。",
          sample: { role: "girlChild", text: "First, cut the apples. Next, mix them. Last, eat the salad." },
          extend: true
        },
      ],
    },
    {
      id: "u6",
      name: "Unit Six Get Close to Nature",
      lessonCount: 4,
      lessonStart: 19,
      lessonTitles: ["We Can't Live Without Nature", "Feel Nature on the Farm", "Snow Turns into Water", "I Love This Trip"],
      focus: [
        "重难点：We can't live without air / nature.",
        "重难点：I can feed the pigs. I listen and I hear.",
        "重难点：Snow turns into water.",
        "复习自然之旅；延展 can't live without … because …，以及 ar / or。",
      ],
      words: [
        { en: "nature", zh: "自然", src: "课本", lesson: 1, priority: "high" },
        { en: "Internet", zh: "互联网", src: "课本", lesson: 1, priority: "mid" },
        { en: "everything", zh: "一切", src: "课本", lesson: 1, priority: "mid" },
        { en: "air", zh: "空气", src: "课本", lesson: 1, priority: "high" },
        { en: "around", zh: "到处；周围", src: "课本", lesson: 1, priority: "mid" },
        { en: "live", zh: "生活", src: "课本", lesson: 1, priority: "high" },
        { en: "without", zh: "没有", src: "课本", lesson: 1, priority: "high" },
        { en: "farm", zh: "农场", src: "课本", lesson: 2, priority: "high" },
        { en: "feed", zh: "喂养", src: "课本", lesson: 2, priority: "high" },
        { en: "pig", zh: "猪", src: "课本", lesson: 2, priority: "mid" },
        { en: "smell", zh: "闻", src: "课本", lesson: 2, priority: "mid" },
        { en: "listen", zh: "听", src: "课本", lesson: 2, priority: "high" },
        { en: "hear", zh: "听到", src: "课本", lesson: 2, priority: "high" },
        { en: "glass", zh: "玻璃", src: "课本", lesson: 3, priority: "mid" },
        { en: "turn", zh: "变成", src: "课本", lesson: 3, priority: "high" },
        { en: "after", zh: "在……之后", src: "课本", lesson: 3, priority: "mid" },
        { en: "sun", zh: "太阳", src: "课本", lesson: 3, priority: "high" },
        { en: "bad", zh: "糟糕的", src: "课本", lesson: 3, priority: "mid" },
        { en: "start", zh: "开始", src: "课本", lesson: 4, priority: "high" },
        { en: "forest", zh: "森林", src: "课本", lesson: 4, priority: "high" },
        { en: "cross", zh: "穿过", src: "课本", lesson: 4, priority: "high" },
        { en: "car", zh: "小汽车（ar）", src: "课本", lesson: 4, priority: "mid", extend: true },
        { en: "horse", zh: "马（or）", src: "课本", lesson: 4, priority: "mid", extend: true },
      ],
      patterns: [
        {
          id: "without",
          lesson: 1,
          label: "We can't live without nature",
          frame: "We can't live without ____.",
          steps: [
            "原句：We can't live without nature.",
            "换词：air / water",
            "说一样生活不能没有的东西",
          ],
          demos: [
            { role: "boyChild", text: "We can't live without air." },
            { role: "girlChild", text: "Nature is around us." },
          ],
        },
        {
          id: "farm",
          lesson: 2,
          label: "Feel nature on the farm",
          frame: "I can feed the ____. I listen and I hear ____.",
          steps: [
            "原句：I can feed the pigs.",
            "I listen. I hear.",
            "说农场上你能闻见或听见什么",
          ],
          demos: [
            { role: "boyChild", text: "I can feed the pigs." },
            { role: "girlChild", text: "I listen and I hear the birds." },
          ],
        },
        {
          id: "snow",
          lesson: 3,
          label: "Snow turns into water",
          frame: "Snow turns into ____ after the sun.",
          steps: [
            "原句：Snow turns into water.",
            "after the sun",
            "说一种变化",
          ],
          demos: [
            { role: "girlChild", text: "Snow turns into water after the sun comes out." },
          ],
        },
        {
          id: "trip",
          lesson: 4,
          label: "I love this trip",
          frame: "I love this trip. We start ____ and cross ____.",
          steps: [
            "原句：I love this trip.",
            "start in the forest",
            "cross 穿过",
          ],
          demos: [
            { role: "boyChild", text: "I love this trip." },
            { role: "girlChild", text: "We start in the forest and cross the bridge." },
          ],
        },
        {
          id: "because-nature",
          lesson: 4,
          label: "知识延展 can't live without … because …",
          frame: "We can't live without ____ because ____.",
          steps: [
            "without 后面说东西",
            "because 后面说原因",
            "说自然为什么重要",
          ],
          demos: [
            { role: "boyChild", text: "We can't live without air because we need to breathe." },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "We can't live without air. Nature is around us.",
            show: "判断：没有空气我们也能生活。",
            answer: false,
            tip: "can't live without",
          },
          {
            lesson: 2,
            role: "girlChild",
            speak: "On the farm I feed the pigs. I listen and I hear them.",
            show: "判断：她在农场喂猪，并且听见它们。",
            answer: true,
            tip: "feed / hear",
          },
          {
            lesson: 3,
            role: "boyChild",
            speak: "Snow turns into water after the sun comes out.",
            show: "判断：雪在太阳出来后变成水。",
            answer: true,
            tip: "turns into",
          },
          {
            lesson: 4,
            role: "girlChild",
            speak: "I love this trip. We start in the forest and then we cross the river.",
            show: "判断：旅行从森林开始。",
            answer: true,
            tip: "start / cross",
          },
          {
            lesson: 4,
            role: "boyChild",
            speak: "We can't live without the farm because the horses and cars cannot make our food.",
            show: "判断：我们不能没有农场。",
            answer: true,
            tip: "延展 because + or/ar",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 1,
            role: "adultFemale",
            speak: "Can we live without air?",
            choices: [
              { id: "a", text: "No. We can't live without air." },
              { id: "b", text: "I'd like some soup." },
              { id: "c", text: "I'm sorry." },
            ],
            answer: "a",
            tip: "without air",
          },
          {
            lesson: 3,
            role: "boyChild",
            speak: "What happens to snow after the sun?",
            choices: [
              { id: "a", text: "Snow turns into water." },
              { id: "b", text: "I use a fork." },
              { id: "c", text: "May I try?" },
            ],
            answer: "a",
            tip: "turns into",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "girlChild",
            speak: "People can't live without nature, because air, water and farms are around us, and a short trip cannot replace them.",
            show: "判断：短途旅行可以代替自然。",
            answer: false,
            tip: "挑战：cannot replace nature",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "adultMale",
            speak: "Why do we get close to nature?",
            choices: [
              { id: "a", text: "We can't live without it, because we need air and farms." },
              { id: "b", text: "Please open the door." },
              { id: "c", text: "He is worried." },
            ],
            answer: "a",
            tip: "挑战：without + because",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "What can't we live without?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "We can't live without air." },
        },
        {
          lesson: 2,
          ask: "What can you do on the farm?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "I can feed the pigs." },
        },
        {
          lesson: 3,
          ask: "What does snow turn into?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "Snow turns into water." },
        },
        {
          lesson: 4,
          ask: "Why do you love this trip?",
          asker: "girlChild",
          tip: "用 because。",
          sample: { role: "boyChild", text: "I love this trip because we start in the forest." },
          extend: true
        },
      ],
    },
    {
      id: "u7",
      name: "Unit Seven Be Together",
      lessonCount: 4,
      lessonStart: 23,
      lessonTitles: ["Happy New Year!", "Happy Spring Festival!", "Happy Lantern Festival!", "The Story of Nian"],
      focus: [
        "重难点：Happy New Year! My goal is …",
        "重难点：Happy Spring Festival! Lucky money. I wish …",
        "重难点：Can you guess the riddle?",
        "复习节日；延展 I wish …，以及 er（her, winter）。",
      ],
      words: [
        { en: "gift", zh: "礼物", src: "课本", lesson: 1, priority: "high" },
        { en: "firework", zh: "烟花", src: "课本", lesson: 1, priority: "mid" },
        { en: "January", zh: "一月", src: "课本", lesson: 1, priority: "mid" },
        { en: "goal", zh: "目标", src: "课本", lesson: 1, priority: "high" },
        { en: "fifty", zh: "五十", src: "课本", lesson: 1, priority: "mid" },
        { en: "sixty", zh: "六十", src: "课本", lesson: 1, priority: "mid" },
        { en: "Spring Festival", zh: "春节", src: "课本", lesson: 2, priority: "high" },
        { en: "Mrs", zh: "太太", src: "课本", lesson: 2, priority: "mid" },
        { en: "lucky", zh: "幸运的", src: "课本", lesson: 2, priority: "high" },
        { en: "money", zh: "钱", src: "课本", lesson: 2, priority: "mid" },
        { en: "wish", zh: "希望；祝愿", src: "课本", lesson: 2, priority: "high" },
        { en: "mean", zh: "意味着", src: "课本", lesson: 2, priority: "mid" },
        { en: "Lantern Festival", zh: "元宵节", src: "课本", lesson: 3, priority: "high" },
        { en: "February", zh: "二月", src: "课本", lesson: 3, priority: "mid" },
        { en: "riddle", zh: "谜语", src: "课本", lesson: 3, priority: "high" },
        { en: "guess", zh: "猜测", src: "课本", lesson: 3, priority: "high" },
        { en: "of", zh: "……的", src: "课本", lesson: 4, priority: "mid" },
        { en: "loud", zh: "大声的", src: "课本", lesson: 4, priority: "high" },
        { en: "sound", zh: "声音", src: "课本", lesson: 4, priority: "high" },
        { en: "run", zh: "跑", src: "课本", lesson: 4, priority: "mid" },
        { en: "winter", zh: "冬天（er）", src: "课本", lesson: 4, priority: "mid", extend: true },
        { en: "sister", zh: "姐姐；妹妹（er）", src: "课本", lesson: 4, priority: "mid", extend: true },
      ],
      patterns: [
        {
          id: "newyear",
          lesson: 1,
          label: "Happy New Year!",
          frame: "Happy New Year! My goal is ____.",
          steps: [
            "原句：Happy New Year!",
            "My goal is …",
            "说一个新年目标和礼物",
          ],
          demos: [
            { role: "boyChild", text: "Happy New Year!" },
            { role: "girlChild", text: "My goal is to read fifty books." },
          ],
        },
        {
          id: "spring",
          lesson: 2,
          label: "Happy Spring Festival!",
          frame: "Happy Spring Festival! I wish ____.",
          steps: [
            "原句：Happy Spring Festival!",
            "Lucky money means good wishes.",
            "说一句 I wish",
          ],
          demos: [
            { role: "adultFemale", text: "Happy Spring Festival!" },
            { role: "boyChild", text: "I wish we can be together." },
          ],
        },
        {
          id: "lantern",
          lesson: 3,
          label: "Happy Lantern Festival!",
          frame: "Can you guess the riddle?",
          steps: [
            "原句：Happy Lantern Festival!",
            "Can you guess the riddle?",
            "出或猜一个简单谜语",
          ],
          demos: [
            { role: "girlChild", text: "Happy Lantern Festival!" },
            { role: "boyChild", text: "Can you guess the riddle?" },
          ],
        },
        {
          id: "nian",
          lesson: 4,
          label: "The Story of Nian",
          frame: "Nian is loud. People ____.",
          steps: [
            "原句：The sound is loud.",
            "People run.",
            "用 of / sound / run 讲一句",
          ],
          demos: [
            { role: "boyChild", text: "The story of Nian is loud." },
            { role: "girlChild", text: "People run when they hear the sound." },
          ],
        },
        {
          id: "wish",
          lesson: 4,
          label: "知识延展 I wish",
          frame: "I wish ____.",
          steps: [
            "I wish 后面说希望",
            "可以连节日名",
            "说一个冬天或家人的愿望",
          ],
          demos: [
            { role: "girlChild", text: "I wish my sister a happy winter." },
            { role: "boyChild", text: "I wish we can be together at Spring Festival." },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "Happy New Year! My goal is to read fifty books in January.",
            show: "判断：他的新年目标是在一月读五十本书。",
            answer: true,
            tip: "goal / fifty",
          },
          {
            lesson: 2,
            role: "adultFemale",
            speak: "Lucky money means good wishes at Spring Festival.",
            show: "判断：压岁钱意味着美好祝愿。",
            answer: true,
            tip: "mean / wish",
          },
          {
            lesson: 3,
            role: "girlChild",
            speak: "At the Lantern Festival in February, we guess riddles.",
            show: "判断：元宵节在二月，大家猜谜语。",
            answer: true,
            tip: "riddle / guess",
          },
          {
            lesson: 4,
            role: "boyChild",
            speak: "In the story of Nian, the sound is loud and people run.",
            show: "判断：年兽的声音很轻，人们不跑。",
            answer: false,
            tip: "loud / run",
          },
          {
            lesson: 4,
            role: "girlChild",
            speak: "I wish my sister a warm winter and a happy Spring Festival.",
            show: "判断：她祝姐姐冬天和春节都好。",
            answer: true,
            tip: "延展 I wish",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "Happy New Year!",
            choices: [
              { id: "a", text: "Happy New Year!" },
              { id: "b", text: "Use the fork." },
              { id: "c", text: "Feed the pigs." },
            ],
            answer: "a",
            tip: "节日问候",
          },
          {
            lesson: 2,
            role: "adultFemale",
            speak: "What is your wish?",
            choices: [
              { id: "a", text: "I wish we can be together." },
              { id: "b", text: "Snow turns into water." },
              { id: "c", text: "May I use your bat?" },
            ],
            answer: "a",
            tip: "I wish",
          },
          {
            lesson: 3,
            role: "girlChild",
            speak: "Can you guess the riddle?",
            choices: [
              { id: "a", text: "Let me try." },
              { id: "b", text: "I'm a knife." },
              { id: "c", text: "Sixty doors." },
            ],
            answer: "a",
            tip: "猜谜",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "boyChild",
            speak: "I wish my family a happy Spring Festival, because being together means more than lucky money or loud fireworks.",
            show: "判断：他觉得压岁钱和鞭炮比团圆更重要。",
            answer: false,
            tip: "挑战：together means more",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "adultFemale",
            speak: "Which festival do you like, and what is your wish?",
            choices: [
              { id: "a", text: "I like Spring Festival. I wish we can be together." },
              { id: "b", text: "I'd like a fork." },
              { id: "c", text: "He is worried." },
            ],
            answer: "a",
            tip: "挑战：节日 + wish",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "What is your New Year goal?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "My goal is to read fifty books." },
        },
        {
          lesson: 2,
          ask: "What do you say at Spring Festival?",
          asker: "adultMale",
          sample: { role: "girlChild", text: "Happy Spring Festival! I wish you happy." },
        },
        {
          lesson: 3,
          ask: "What do you do at the Lantern Festival?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "We guess riddles." },
        },
        {
          lesson: 4,
          ask: "What is your wish for your family?",
          asker: "girlChild",
          tip: "用 I wish。",
          sample: { role: "boyChild", text: "I wish we can be together." },
          extend: true
        },
      ],
    },
    {
      id: "u8",
      name: "Unit Eight Revision II",
      lessonCount: 2,
      lessonStart: 27,
      lessonTitles: ["Revision A", "Revision B"],
      focus: [
        "复习 Unit Five 到 Unit Seven：饮食、自然、节日。",
        "知识延展：I'd like、can't live without、I wish 连成一段话。",
      ],
      words: [
        { en: "chicken", zh: "鸡肉", src: "课本", lesson: 1, priority: "high" },
        { en: "chopsticks", zh: "筷子", src: "课本", lesson: 1, priority: "mid" },
        { en: "first", zh: "首先", src: "课本", lesson: 1, priority: "high" },
        { en: "nature", zh: "自然", src: "课本", lesson: 1, priority: "high" },
        { en: "without", zh: "没有", src: "课本", lesson: 1, priority: "high" },
        { en: "farm", zh: "农场", src: "课本", lesson: 1, priority: "mid" },
        { en: "wish", zh: "希望", src: "课本", lesson: 1, priority: "high" },
        { en: "Spring Festival", zh: "春节", src: "课本", lesson: 1, priority: "high" },
        { en: "because", zh: "因为", src: "课本", lesson: 2, priority: "high", extend: true },
        { en: "last", zh: "最后", src: "课本", lesson: 2, priority: "high", extend: true },
      ],
      patterns: [
        {
          id: "rev2a",
          lesson: 1,
          label: "Revision A",
          frame: "I'd like ____. We can't live without ____. I wish ____.",
          steps: [
            "点一样食物",
            "说一样不能没有的东西",
            "说一个节日愿望",
          ],
          demos: [
            { role: "boyChild", text: "I'd like some chicken." },
            { role: "girlChild", text: "We can't live without air." },
            { role: "boyChild", text: "I wish we can be together." },
          ],
        },
        {
          id: "rev2b",
          lesson: 2,
          label: "知识延展 一段话",
          frame: "First, ____. Then, ____. I wish ____ because ____.",
          steps: [
            "用 First / Then 说两步",
            "I wish 加 because",
            "把吃、自然、节日连起来",
          ],
          demos: [
            { role: "girlChild", text: "First I'd like fruit salad. Then I want to see the farm. I wish we can be together because Spring Festival is coming." },
          ],
          extend: true,
        },
      ],
      listen: {
        judge: [
          {
            lesson: 1,
            role: "boyChild",
            speak: "I'd like some soup. We can't live without water. I wish you a happy New Year.",
            show: "判断：这三句分别是食物、自然和节日。",
            answer: true,
            tip: "复习三类",
          },
          {
            lesson: 2,
            role: "girlChild",
            speak: "First we make fruit salad, then we go to the farm, and I wish we stay together because family means more than gifts.",
            show: "判断：她觉得礼物比家人在一起更重要。",
            answer: false,
            tip: "延展：together means more",
            extend: true,
          },
        ],
        reply: [
          {
            lesson: 1,
            role: "adultFemale",
            speak: "What would you like?",
            choices: [
              { id: "a", text: "I'd like some chicken." },
              { id: "b", text: "I am a mouse." },
              { id: "c", text: "Open your mouth." },
            ],
            answer: "a",
            tip: "复习点餐",
          },
        ],
        challenge: {
          judge: [
          {
            lesson: 0,
            role: "boyChild",
            speak: "We can't live without nature, so last I wish every family a green Spring Festival, not just loud fireworks.",
            show: "判断：他最后的愿望只是更响的烟花。",
            answer: false,
            tip: "挑战：不是只要烟花",
          },
          ],
          reply: [
          {
            lesson: 0,
            role: "adultFemale",
            speak: "Tell me your food, your nature idea, and your wish.",
            choices: [
              { id: "a", text: "I'd like salad. We can't live without air. I wish we can be together." },
              { id: "b", text: "May I use your bat?" },
              { id: "c", text: "He looks sad." },
            ],
            answer: "a",
            tip: "挑战：三块都要说到",
          },
          ],
        },
      },
      questions: [
        {
          lesson: 1,
          ask: "What would you like, and what can't we live without?",
          asker: "adultFemale",
          sample: { role: "boyChild", text: "I'd like some chicken. We can't live without air." },
        },
        {
          lesson: 2,
          ask: "Make a short talk: food, nature, and a wish with because.",
          asker: "adultFemale",
          tip: "三段都说。",
          sample: { role: "girlChild", text: "I'd like fruit salad. We can't live without farms. I wish we can be together because I love my family." },
          extend: true
        },
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

  function lessonNo(unit, store) {
    store = store || {};
    const id = String(store.currentPathId || "");
    const m = id.match(new RegExp("^" + unit.id + "-L(\\d+)$"));
    if (m) return Number(m[1]);
    return 1;
  }

  function isReviewLesson(unit, n) {
    return n === (unit.lessonCount || 4);
  }

  function wordsForLesson(unit, store) {
    const n = lessonNo(unit, store);
    const all = unit.words || [];
    if (isReviewLesson(unit, n)) return all.slice();
    return all.filter(function (w) { return w.lesson === n && !w.extend; });
  }

  function patternsFor(unit, store, extendOnly) {
    const all = unit.patterns || [];
    if (extendOnly) {
      const ext = all.filter(function (p) { return p.extend; });
      return ext.length ? ext : all;
    }
    const n = lessonNo(unit, store);
    if (isReviewLesson(unit, n)) {
      const own = all.filter(function (p) { return p.lesson === n || p.extend; });
      return own.length ? own : all;
    }
    const mine = all.filter(function (p) { return p.lesson === n && !p.extend; });
    return mine.length ? mine : all.filter(function (p) { return !p.extend; });
  }

  function listenFor(unit, store, kind, hard) {
    const L = (unit.listen && unit.listen[kind]) || [];
    if (hard) {
      const ch = (unit.listen && unit.listen.challenge && unit.listen.challenge[kind]) || [];
      if (ch.length) return ch;
      return L.filter(function (x) { return x.extend; });
    }
    const n = lessonNo(unit, store);
    if (isReviewLesson(unit, n)) {
      const own = L.filter(function (x) { return x.lesson === n || x.extend; });
      return own.length ? own : L;
    }
    const mine = L.filter(function (x) { return x.lesson === n && !x.extend; });
    return mine.length ? mine : L.filter(function (x) { return !x.extend; });
  }

  function questionsFor(unit, store, extendOnly) {
    const all = unit.questions || [];
    if (extendOnly) {
      const ext = all.filter(function (q) { return q.extend; });
      return ext.length ? ext : all;
    }
    const n = lessonNo(unit, store);
    if (isReviewLesson(unit, n)) {
      const own = all.filter(function (q) { return q.lesson === n || q.extend; });
      return own.length ? own : all;
    }
    const mine = all.filter(function (q) { return q.lesson === n; });
    return mine.length ? mine : all;
  }

  function pickWords(unit, store, n, preferRetry) {
    const custom = (store.customWords && store.customWords[unit.id]) || [];
    const retry = ((store.retryWords || []).filter((w) => w.unitId === unit.id) || []).map((r) => ({
      en: r.en,
      zh: r.zh,
      src: "错词",
      priority: "high",
    }));
    const pool = wordsForLesson(unit, store).concat(custom);
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
      title: dictation ? "听写" : "看中文写词",
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

  function lineZh(text) {
    const map = {
      "How do you feel today?": "你今天感觉怎么样？",
      "What's the matter?": "怎么了？",
      "How do you feel now?": "你现在感觉怎么样？",
      "You look angry. What's the matter?": "你看起来很生气。怎么了？",
      "Can we read it together?": "我们可以一起读吗？",
      "Yangyang is ill. What should he do?": "阳阳病了。他应该怎么做？",
      "I can't remember the poem. It's too hard.": "我记不住这首诗。太难了。",
      "Can you help me, please?": "请问你能帮我吗？",
      "Would you open the door, please?": "请你开一下门好吗？",
      "Could I have a banana, please?": "请问我可以吃一根香蕉吗？",
      "I want that banana, now!": "我现在就要那根香蕉！",
      "I'm worried and the poem is hard.": "我很担心，这首诗很难。",
      "What would you like to have?": "你想吃什么？",
      "Please don't play with the chopsticks.": "请不要玩筷子。",
      "What would you like, and how do you make it?": "你想吃什么？怎么做？",
      "Can we live without air?": "没有空气我们能生活吗？",
      "What happens to snow after the sun?": "太阳出来后，雪会怎样？",
      "Why do we get close to nature?": "我们为什么要亲近自然？",
      "Happy New Year!": "新年快乐！",
      "What is your wish?": "你的愿望是什么？",
      "Can you guess the riddle?": "你能猜出这个谜语吗？",
      "Which festival do you like, and what is your wish?": "你喜欢哪个节日？你的愿望是什么？",
      "What would you like?": "你想要什么？",
      "Tell me your food, your nature idea, and your wish.": "说说你想吃的、你对自然的想法，还有你的愿望。",
      "I'm so happy.": "我非常开心。",
      "I'm a little worried.": "我有一点担心。",
      "I can't find my dog.": "我找不到我的狗。",
      "What's the matter? You look sad.": "怎么了？你看起来很难过。",
      "Let's look for him together.": "我们一起找他吧。",
      "I feel better.": "我感觉好些了。",
      "Please don't be angry.": "请别生气。",
      "Let's fix it together.": "我们一起修吧。",
      "My model plane is broken. Let's fix it.": "我的飞机模型坏了。我们来修吧。",
      "I have an idea.": "我有一个主意。",
      "Come and look. But stop!": "过来看。可是停下！",
      "I'm worried because I'm late.": "我很担心，因为我迟到了。",
      "I'm happy because we look for the dog together.": "我很高兴，因为我们一起找狗。",
      "I like cake.": "我喜欢蛋糕。",
      "Look at these cakes.": "看这些蛋糕。",
      "Yes. The story is interesting.": "是的。这个故事很有趣。",
      "We can read it together.": "我们可以一起读。",
      "This animal story is interesting.": "这个动物故事很有趣。",
      "Let me help you.": "让我来帮助你。",
      "It's hard. May I try?": "这很难。我可以试试吗？",
      "Let me help you. May I try with you?": "让我来帮助你。我可以和你一起试吗？",
      "She is ill.": "她生病了。",
      "You should have a good rest.": "你应该好好休息。",
      "He should have a good rest.": "他应该好好休息。",
      "This cupcake is little, but we can share.": "这个杯子蛋糕很小，但我们可以分享。",
      "You are my best friend.": "你是我最好的朋友。",
      "You should rest because you are ill.": "你应该休息，因为你生病了。",
      "You should rest, and I can help you. May I try with you?": "你应该休息，我可以帮你。我可以和你一起试吗？",
      "Excuse me. Can you help me, please?": "打扰一下。请问你能帮我吗？",
      "May I use your bat?": "我可以用你的球拍吗？",
      "Yes. You may use my bat.": "可以。你可以用我的球拍。",
      "No problem.": "没问题。",
      "I'm sorry.": "对不起。",
      "Could you get it for me? It's polite.": "你能帮我拿吗？这样是有礼貌的。",
      "The monkey wants a banana.": "猴子想要一根香蕉。",
      "Yes. Here you are.": "好的，给你。",
      "Could I use your bat, please?": "请问我可以用你的球拍吗？",
      "I feel worried because I am late.": "我感到担心，因为我迟到了。",
      "I'd like some chicken.": "我想要一些鸡肉。",
      "I'd like a sandwich.": "我想要一个三明治。",
      "I'd like some soup.": "我想要一些汤。",
      "I'd like some soup and ice cream.": "我想要一些汤和冰淇淋。",
      "I use the fork in my left hand.": "我用左手拿叉子。",
      "I'm sorry. I will use the fork.": "对不起。我用叉子。",
      "First, cut the apples. Next, mix them. Then, wait. Last, eat the salad.": "首先切苹果。接着混合。然后等待。最后吃沙拉。",
      "First I'd like some chicken. Then I'd like some fruit salad.": "我先想要一些鸡肉。然后我想要一些水果沙拉。",
      "We can't live without air.": "没有空气我们无法生活。",
      "No. We can't live without air.": "不能。没有空气我们不能生活。",
      "Nature is around us.": "大自然就在我们身边。",
      "I can feed the pigs.": "我可以喂猪。",
      "I listen and I hear the birds.": "我听，并且听见鸟叫。",
      "Snow turns into water.": "雪会变成水。",
      "Snow turns into water after the sun comes out.": "太阳出来以后，雪变成水。",
      "I love this trip.": "我喜欢这次旅行。",
      "We start in the forest and cross the bridge.": "我们从森林出发，然后过桥。",
      "We can't live without air because we need to breathe.": "没有空气我们无法生活，因为我们需要呼吸。",
      "My goal is to read fifty books.": "我的目标是读五十本书。",
      "Happy Spring Festival!": "春节快乐！",
      "I wish we can be together.": "我希望我们能在一起。",
      "Happy Lantern Festival!": "元宵节快乐！",
      "The story of Nian is loud.": "年兽的故事里声音很大。",
      "People run when they hear the sound.": "人们听见声音就会跑。",
      "I wish my sister a happy winter.": "我祝姐姐一个快乐的冬天。",
      "I wish we can be together at Spring Festival.": "我希望春节时我们能在一起。",
      "First I'd like fruit salad. Then I want to see the farm. I wish we can be together because Spring Festival is coming.": "我先想要水果沙拉。然后我想去农场看看。我希望我们能在一起，因为春节就要到了。",
      "Dad, I'm a little worried. Am I late?": "爸爸，我有点担心。我迟到了吗？",
      "I can't find my dog Danny. He is brown with a black nose.": "我找不到我的狗 Danny。它是棕色的，鼻子是黑的。",
      "Please don't be angry. A walk always helps me calm down.": "请别生气。散散步总是能帮我冷静下来。",
      "The mouse has an idea, but the cat does not stop.": "老鼠有一个主意，可是猫没有停下来。",
      "I'm excited because I can see these cakes.": "我很兴奋，因为我能看到这些蛋糕。",
      "Mike is worried because he thinks he is late, but Dad says he is just in time.": "Mike 很担心，因为他以为自己迟到了，可是爸爸说他刚好及时赶到。",
      "Maomao is sad because he can't find Danny, so Lingling looks for the dog with him.": "Maomao 很难过，因为他找不到 Danny，所以 Lingling 和他一起找这只狗。",
      "We can read this animal story together. It is interesting.": "我们可以一起读这个动物故事。它很有趣。",
      "The poem is hard. May I try?": "这首诗很难。我可以试试吗？",
      "She is ill. You should have a good rest and I will call her tomorrow.": "她生病了。你应该好好休息，我明天会给她打电话。",
      "The cupcake is small. We can wait and share it.": "这个杯子蛋糕很小。我们可以等一等，一起分享。",
      "You should remember the story because it is interesting.": "你应该记住这个故事，因为它很有趣。",
      "A good friend should help you when the poem is hard, and you may try again together.": "诗很难的时候，好朋友应该帮助你，你们可以再一起试。",
      "Excuse me. Can you help me, please? May I use your bat?": "打扰一下。请问你能帮我吗？我可以用你的球拍吗？",
      "Would you open the door, please? You must stand here.": "请你开一下门好吗？你必须站在这里。",
      "I'm sorry. Could you get my bat? It is polite to say sorry.": "对不起。你能帮我拿球拍吗？说对不起是有礼貌的。",
      "The little monkey wants a banana in the garden.": "小猴子想要花园里的一根香蕉。",
      "Could I use your bat, please? I hope I can play.": "请问我可以用你的球拍吗？我希望我能玩。",
      "A nice person should say excuse me and please, and could is more polite than a short order.": "有礼貌的人应该说 excuse me 和 please，could 比短短的命令更礼貌。",
      "I'm sorry. Let's look for it together.": "对不起。我们一起找吧。",
      "I feel sad because my dog is lost, so you should help me, and I could say thank you.": "我很难过，因为我的狗丢了，所以你应该帮我，我可以说谢谢。",
      "A good friend should share and help, because a nice person is polite and says please.": "好朋友应该分享和帮忙，因为有礼貌的人会说 please。",
      "I'd like some chicken and a tomato sandwich.": "我想要一些鸡肉和一个番茄三明治。",
      "What would you like to have? I'd like soup, not steak.": "你想吃什么？我想要汤，不要牛排。",
      "Please don't play with the chopsticks. Use the knife and fork.": "请不要玩筷子。用刀叉。",
      "First, cut the apples. Next, mix them. Last, eat the fruit salad.": "首先切苹果。然后把它们混合。最后吃水果沙拉。",
      "The girl would like fruit salad, and the nurse would like soup.": "女孩想要水果沙拉，护士想要汤。",
      "First she cuts the apples with a knife, then she mixes the salad, and last she eats it with a fork, not with chopsticks.": "她先用刀切苹果，然后搅拌沙拉，最后用叉子吃，不是用筷子。",
      "We can't live without air. Nature is around us.": "没有空气我们无法生活。大自然就在我们身边。",
      "On the farm I feed the pigs. I listen and I hear them.": "在农场我喂猪。我听，并且听见它们。",
      "I love this trip. We start in the forest and then we cross the river.": "我喜欢这次旅行。我们从森林出发，然后过河。",
      "We can't live without the farm because the horses and cars cannot make our food.": "我们不能没有农场，因为马和汽车不能为我们做出食物。",
      "People can't live without nature, because air, water and farms are around us, and a short trip cannot replace them.": "人不能离开大自然生活，因为空气、水和农场都在我们身边，短途旅行不能代替它们。",
      "Happy New Year! My goal is to read fifty books in January.": "新年快乐！我的目标是在一月读五十本书。",
      "Lucky money means good wishes at Spring Festival.": "压岁钱在春节意味着美好的祝愿。",
      "At the Lantern Festival in February, we guess riddles.": "二月的元宵节，我们猜谜语。",
      "In the story of Nian, the sound is loud and people run.": "在年兽的故事里，声音很大，人们会跑。",
      "I wish my sister a warm winter and a happy Spring Festival.": "我祝姐姐一个温暖的冬天和快乐的春节。",
      "I wish my family a happy Spring Festival, because being together means more than lucky money or loud fireworks.": "我祝家人春节快乐，因为团圆比压岁钱或响亮的烟花更重要。",
      "I'd like some soup. We can't live without water. I wish you a happy New Year.": "我想要一些汤。没有水我们无法生活。祝你新年快乐。",
      "First we make fruit salad, then we go to the farm, and I wish we stay together because family means more than gifts.": "我们先做水果沙拉，然后去农场，我希望我们待在一起，因为家人比礼物更重要。",
      "We can't live without nature, so last I wish every family a green Spring Festival, not just loud fireworks.": "我们不能离开大自然生活，所以最后我祝每个家庭一个绿色的春节，而不只是更响的烟花。",
    };
    return map[text] || "";
  }

  var JUDGE_TALK = {
    "Dad, I'm a little worried. Am I late?": "你再听一遍。他说我有点担心，还问我是不是迟到了。他就是在担心迟到。这句该选对。",
    "I can't find my dog Danny. He is brown with a black nose.": "他找不到狗 Danny，还说它是棕色的，鼻子是黑的。判断说的就是这件事。这句该选对。",
    "Please don't be angry. A walk always helps me calm down.": "她让人别生气，还说散散步就能冷静下来。calm down 就是冷静下来。这句该选对。",
    "The mouse has an idea, but the cat does not stop.": "老鼠有主意，可是猫没有停。but 在这里就是可是。跟判断一样，该选对。",
    "I'm excited because I can see these cakes.": "她兴奋，是因为看见了这些蛋糕。because 就是因为。这句该选对。",
    "Mike is worried because he thinks he is late, but Dad says he is just in time.": "他是担心迟到，可爸爸说他刚好赶到。just in time 是及时，不是迟到。所以“最后还是迟到了”不对。",
    "Maomao is sad because he can't find Danny, so Lingling looks for the dog with him.": "毛毛难过，是因为找不到 Danny。玲玲和他一起找。一起找这句是对的。",
    "We can read this animal story together. It is interesting.": "他们可以一起读这个动物故事，故事还很有趣。together 是一起。这句该选对。",
    "The poem is hard. May I try?": "诗难，这点没错。可她接着问 May I try，就是我可以试试吗。她是想试，不是不想试。所以这句该选错。",
    "She is ill. You should have a good rest and I will call her tomorrow.": "她生病了，该好好休息。后面还说我明天给她打电话。判断说的前半句是对的。",
    "The cupcake is small. We can wait and share it.": "蛋糕很小，他们可以等一等，一起分享。share 就是分享。这句该选对。",
    "You should remember the story because it is interesting.": "因为故事有趣，所以该记住。because 就是因为。这句该选对。",
    "A good friend should help you when the poem is hard, and you may try again together.": "好朋友是在难的时候帮忙，不是只挑容易的时候。诗很难，也可以再一起试。所以这句该选错。",
    "Excuse me. Can you help me, please? May I use your bat?": "他先说打扰一下，再说请帮帮我，还问能不能用球拍。please 他说了。这句该选对。",
    "Would you open the door, please? You must stand here.": "Would you open the door 就是请你开一下门。她是在请对方开门。这句该选对。",
    "I'm sorry. Could you get my bat? It is polite to say sorry.": "他说了对不起，还说道歉是有礼貌的。polite 是有礼貌，不是不礼貌。所以这句该选错。",
    "The little monkey wants a banana in the garden.": "小猴子想要花园里的香蕉。want 就是想要。这句该选对。",
    "Could I use your bat, please? I hope I can play.": "Could I，再加上 please，是很客气地请求。他想借球拍去玩。这句该选对。",
    "A nice person should say excuse me and please, and could is more polite than a short order.": "有礼貌的人要说 excuse me，也要说 please。could 比硬邦邦的命令更客气。所以“不用 please”是错的。",
    "I'm sorry. Let's look for it together.": "他先道歉，再说我们一起找。together 就是一起。这句该选对。",
    "I feel sad because my dog is lost, so you should help me, and I could say thank you.": "她难过是因为狗丢了，所以希望你帮忙，她还可以说谢谢。跟判断一样，该选对。",
    "A good friend should share and help, because a nice person is polite and says please.": "好朋友要分享，要帮忙，还要有礼貌、会说 please。不是不需要礼貌。所以这句该选错。",
    "I'd like some chicken and a tomato sandwich.": "I'd like 就是我想要。他要鸡肉，还要一个番茄三明治。这句该选对。",
    "What would you like to have? I'd like soup, not steak.": "她说要汤，not steak 是不要牛排。判断说反了，该选错。",
    "Please don't play with the chopsticks. Use the knife and fork.": "Please don't 就是请不要。不要拿筷子玩，要用刀叉。所以“可以拿筷子玩”是错的。",
    "First, cut the apples. Next, mix them. Last, eat the fruit salad.": "First 是首先。做水果沙拉要先切苹果，再混合，最后吃。这句该选对。",
    "The girl would like fruit salad, and the nurse would like soup.": "女孩想要水果沙拉，护士想要汤。girl 就是女孩。这句该选对。",
    "First she cuts the apples with a knife, then she mixes the salad, and last she eats it with a fork, not with chopsticks.": "她先用刀切苹果，再搅拌，最后用叉子吃。not with chopsticks 是不用筷子。所以“用筷子吃沙拉”是错的。",
    "We can't live without air. Nature is around us.": "can't live without 是没有它就活不了。没有空气，活不了。不是没有空气也能生活。该选错。",
    "On the farm I feed the pigs. I listen and I hear them.": "她在农场喂猪，听，还听见它们。feed 是喂，hear 是听见。这句该选对。",
    "Snow turns into water after the sun comes out.": "太阳出来以后，雪变成水。turns into 就是变成。这句该选对。",
    "I love this trip. We start in the forest and then we cross the river.": "他喜欢这次旅行，从森林出发，然后过河。start 就是出发。这句该选对。",
    "We can't live without the farm because the horses and cars cannot make our food.": "没有农场不行，因为马和汽车做不出吃的。because 就是因为。这句该选对。",
    "People can't live without nature, because air, water and farms are around us, and a short trip cannot replace them.": "人离不开自然。短途旅行代替不了空气、水和农场。所以“旅行可以代替自然”是错的。",
    "Happy New Year! My goal is to read fifty books in January.": "新年快乐。他的目标是一月读五十本书。goal 是目标，fifty 是五十。这句该选对。",
    "Lucky money means good wishes at Spring Festival.": "压岁钱在春节就是美好的祝愿。mean 是意味着。这句该选对。",
    "At the Lantern Festival in February, we guess riddles.": "元宵节在二月，大家猜谜语。guess riddles 就是猜谜。这句该选对。",
    "In the story of Nian, the sound is loud and people run.": "年兽的声音是 loud，很大，人们会跑。不是轻轻的，也不是不跑。该选错。",
    "I wish my sister a warm winter and a happy Spring Festival.": "她祝姐姐冬天暖和，春节也快乐。I wish 就是我祝。这句该选对。",
    "I wish my family a happy Spring Festival, because being together means more than lucky money or loud fireworks.": "他觉得一家人在一起，比压岁钱、比鞭炮更重要。不是钱和鞭炮更重要。该选错。",
    "I'd like some soup. We can't live without water. I wish you a happy New Year.": "三句都在：想要汤，没有水活不了，祝你新年快乐。食物、自然、节日各一句。该选对。",
    "First we make fruit salad, then we go to the farm, and I wish we stay together because family means more than gifts.": "她希望一家人在一起，因为家人比礼物更重要。不是礼物更重要。该选错。",
    "We can't live without nature, so last I wish every family a green Spring Festival, not just loud fireworks.": "他最后祝的是一个绿色的春节。not just loud fireworks 是不只是更响的烟花。该选错。",
  };

  var LESSON_TALK = {
    u1: {
      1: "这课就问一句：你今天感觉怎么样。可以答我有一点担心，也可以答我很开心。担心、高兴、兴奋，这几个词先记住。",
      2: "别人看着难过，你就问怎么了。他会说我找不到我的狗。你可以接：我们一起找。",
      3: "这课是劝人别生气。说请别生气，我感觉好些了。散步能让人冷静下来。",
      4: "故事里老鼠有个主意，可是猫不停。你就说我有一个主意。再加一句因为：我担心，是因为我迟到了。",
    },
    u2: {
      1: "这课是一起读故事。我们可以一起读，故事很有趣。together 是一起，interesting 是有趣。",
      2: "记两句。让我来帮助你。还有：这很难，我可以试试吗。诗很难，不代表不想试。她问的就是可不可以试。",
      3: "她生病了，你要说你应该好好休息。should 就是应该。",
      4: "杯子蛋糕很小，可是好朋友会一起分享。难的时候也该帮忙，不是只在容易的时候才帮。",
    },
    u3: {
      1: "找人帮忙，先说打扰一下，再说请问你能帮我吗。想用球拍，就问我可以用吗。please 别丢。",
      2: "请人做事，说请你开一下门好吗。对方会说没问题。",
      3: "做错了先说对不起。说对不起是有礼貌，不是不礼貌。",
      4: "想要东西要客气：请问我可以要一根香蕉吗。Could I 比直接抢着说更有礼貌。",
    },
    u4: {
      1: "把前面三句再过一遍。我感觉好些了。我们可以一起读。对不起，我们一起找。",
      2: "三句连着说。我担心，因为我迟到了。你应该好好休息。请问我可以用你的球拍吗。",
    },
    u5: {
      1: "想吃什么，就说我想要。比如我想要一些鸡肉，我想要一个三明治。",
      2: "别人问你想吃什么，你就答我想要汤，不要牛排。not 是不要，别说反。",
      3: "筷子是用来吃的，不是用来玩的。请不要玩筷子。叉子用左手。",
      4: "做水果沙拉有顺序。先切苹果，再混合，然后等一等，最后吃。按这个顺序说。",
    },
    u6: {
      1: "没有空气我们就活不了。大自然就在身边。不是没有空气也能生活。",
      2: "在农场可以喂猪。听一听，还能听见鸟。feed 是喂，hear 是听见。",
      3: "太阳出来以后，雪会变成水。turns into 就是变成。",
      4: "我喜欢这次旅行。我们从森林出发，然后过桥。短途旅行代替不了自然。",
    },
    u7: {
      1: "新年就说新年快乐。他的目标是一月读五十本书。goal 是目标。",
      2: "春节说春节快乐。压岁钱是美好的祝愿。更要紧的是希望我们能在一起。",
      3: "元宵节说元宵节快乐，大家猜谜语。",
      4: "年兽的声音很大，人们听见就跑。不是轻轻的，也不是不跑。",
    },
    u8: {
      1: "三句连起来。我想要汤。没有水我们活不了。祝你新年快乐。食物、自然、节日，各一句。",
      2: "先做水果沙拉，再去农场，最后希望一家人在一起。家人比礼物更重要，也不只是要更响的烟花。",
    },
  };

  function judgeExplain(item) {
    if (!item) return "";
    if (item.explain) return item.explain;
    if (item.answer !== true && item.answer !== false) return "";
    return JUDGE_TALK[item.speak] || "";
  }

  function lessonTalk(unitId, lesson) {
    const row = LESSON_TALK[unitId];
    return (row && row[lesson]) || "";
  }

  function judgeTalk(speak) {
    return JUDGE_TALK[speak] || "";
  }

  function commentaryLines() {
    const lines = [];
    Object.keys(JUDGE_TALK).forEach(function (key) { lines.push(JUDGE_TALK[key]); });
    Object.keys(LESSON_TALK).forEach(function (id) {
      Object.keys(LESSON_TALK[id]).forEach(function (n) { lines.push(LESSON_TALK[id][n]); });
    });
    return lines;
  }

  function listenCard(item, kind, opts) {
    opts = opts || {};
    const hard = !!opts.hard;
    const isJudge = kind === "judge";
    let prompt;
    if (hard && isJudge) {
      prompt = item.showTrick || "听完整句，判断对错（先听，不给中文提示）";
    } else {
      prompt = item.show || item.prompt || "听完再选";
    }
    return {
      type: "listen",
      kind: kind,
      hard: hard,
      title: hard ? (isJudge ? "听力挑战·判断" : "听力挑战·应答") : isJudge ? "听力判断" : "听力对话",
      prompt: prompt,
      speakText: item.speak,
      speakRole: isJudge ? (item.role || "girlChild") : item.role || "adultFemale",
      coach: isJudge ? "bee" : null,
      autoPlay: true,
      answer: item.answer,
      tip: (item.tip || "") + (hard ? " · 先听再选" : ""),
      zh: item.zh || lineZh(item.speak) || (isJudge ? "" : String(item.show || "").replace(/^判断[:：]\s*/, "")),
      explain: judgeExplain(item),
      answerZh: item.answerZh || lineZh(((item.choices || []).filter((ch) => String(ch.id) === String(item.answer))[0] || {}).text || ""),
      meaning: item.meaning || "",
      choices:
        isJudge
          ? [
              { id: true, label: "对 √" },
              { id: false, label: "错 ×" },
            ]
          : (item.choices || []).map((c) => ({ id: c.id, label: c.text })),
    };
  }

  function patternCard(unit, index, store, extendFirst) {
    const list = patternsFor(unit, store || {}, !!extendFirst);
    const p = list[typeof index === "number" ? index : 0] || null;
    if (!p) return null;
    const demos = (p.demos || []).map((d) => ({
      role: d.role || "girlChild",
      text: d.text,
    }));
    const student = demos.filter((d) => d.role === "boyChild" || d.role === "girlChild")[0] || demos[0];
    const glosses = demos.map((d) => ({ en: d.text, zh: lineZh(d.text) })).filter((g) => g.zh);
    return {
      type: "pattern",
      title: "跟读练习",
      prompt: (extendFirst ? "复习加一句\n" : "") + p.label + "\n" + (student ? student.text : p.frame || ""),
      demos: demos,
      glosses: glosses,
      zh: lineZh(student ? student.text : ""),
      speakText: student ? student.text : p.label,
      speakRole: (student && student.role) || "girlChild",
      coach: "bee",
      tip: extendFirst ? "复习课，大声读。这句会了，单元测试更有把握。" : "先听，再跟着读 3 遍。读出来就算会了。",
      autoPlay: true,
      followRead: true,
      frame: p.frame || "",
    };
  }

  function sentenceCard(unit, index, store) {
    const list = patternsFor(unit, store || {}, true);
    const p = list[typeof index === "number" ? index : 0] || list[0];
    if (!p) return null;
    const demo = (p.demos && p.demos[0] && p.demos[0].text) || "I'm happy because I can play.";
    return {
      type: "pattern",
      title: "造句挑战",
      prompt: "用句型自己造一句（不要照抄示范）\n" + (p.frame || p.label),
      demos: [{ role: "girlChild", text: demo }],
      speakText: demo,
      speakRole: "girlChild",
      coach: "bee",
      tip: "必须含 because 或 when；地点注意 a/the",
      autoPlay: true,
      frame: p.frame || "",
      makeSentence: true,
    };
  }

  function oralCard(q, i, opts) {
    opts = opts || {};
    return {
      type: "oral",
      title: opts.challenge ? "口语挑战 " + (i + 1) : "口头问答 " + (i + 1),
      prompt: q.ask,
      speakText: q.ask,
      speakRole: q.asker || "adultFemale",
      sampleText: (q.sample && q.sample.text) || "",
      sampleRole: (q.sample && q.sample.role) || "boyChild",
      tip: q.tip || "请说完整句（because / when）",
      autoPlay: true,
      requireSpeech: !!opts.challenge,
      challenge: !!opts.challenge,
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
    if (sessionId === "weekdayListen" || sessionId === "weekend" || sessionId === "weekdayOral") {
      // 15–20 分钟：先看中文写对，再听写，然后判断、选答语、跟读。复习课跟读用延展句。
      const review = isReviewLesson(unit, lessonNo(unit, store));
      let words = pickWords(unit, store, 4, 1);
      if (review) {
        const ext = (unit.words || []).filter((w) => w.extend);
        const core = words.filter((w) => !w.extend);
        if (ext.length && core.length) words = core.slice(0, 3).concat([ext[0]]).slice(0, 4);
      }
      const see = words.slice(0, 2);
      const hear = words.slice(2, 4);
      (see.length ? see : words).forEach((w) => cards.push(wordCard(w, "zh2en")));
      (hear.length ? hear : see).slice(0, 2).forEach((w) => cards.push(wordCard(w, "dictation")));
      const judgeList = listenFor(unit, store, "judge");
      const replyList = listenFor(unit, store, "reply");
      const judge = review ? (judgeList.filter((x) => x.extend)[0] || judgeList[0]) : judgeList[0];
      const reply = review ? (replyList.filter((x) => x.extend)[0] || replyList[0]) : replyList[0];
      if (judge) cards.push(listenCard(judge, "judge"));
      if (reply) cards.push(listenCard(reply, "reply"));
      const pat = patternCard(unit, 0, store, review);
      if (pat) cards.push(pat);
    } else if (sessionId === "retry") {
      return buildRetryCards(unit, store);
    } else if (sessionId === "challenge") {
      return buildChallengeCards(unit, store);
    } else if (sessionId === "phonics") {
      return buildPhonicsCards(store);
    } else {
      const s = sortCard(unit);
      if (s) cards.push(s);
      const w = writeCard(unit);
      if (w) cards.push(w);
      const j = listenFor(unit, store, "judge")[0];
      if (j) cards.push(listenCard(j, "judge"));
      const q = questionsFor(unit, store)[0];
      if (q) cards.push(oralCard(q, 0));
      cards.push(readCard(unit));
    }
    return cards;
  }

  function buildRetryCards(unit, store) {
    store = store || {};
    const retry = ((store.retryWords || []).filter((w) => w.unitId === unit.id) || []);
    const allRetry = store.retryWords || [];
    const pool = (retry.length ? retry : allRetry).slice(-8);
    const cards = [];
    pool.forEach((r, i) => {
      if (r.type === "listen" && r.card) {
        cards.push(r.card);
        return;
      }
      cards.push(wordCard({ en: r.en, zh: r.zh, src: "错词", priority: "high" }, i % 2 === 0 ? "dictation" : "zh2en"));
    });
    return cards;
  }

  /** 发音小站：用课本词练「画线部分发音是否相同」（卷面题型） */
  const PHONICS_PAIRS = [
    {
      id: "a_e-same",
      needLesson: 3,
      left: { en: "cake", mark: "a" },
      right: { en: "plane", mark: "a" },
      same: true,
      sound: "/eɪ/",
      rule: "a_e 常读 /eɪ/。cake、plane、late 都是这个音。",
      follow: "cake",
    },
    {
      id: "a_e-late",
      needLesson: 1,
      left: { en: "late", mark: "a" },
      right: { en: "cake", mark: "a" },
      same: true,
      sound: "/eɪ/",
      rule: "late 和 cake 中间的 a，都读 /eɪ/。",
      follow: "late",
    },
    {
      id: "ae-same",
      needLesson: 2,
      left: { en: "sad", mark: "a" },
      right: { en: "angry", mark: "a" },
      same: true,
      sound: "/æ/",
      rule: "sad、angry、happy 里的 a，常读 /æ/，嘴巴张大一点。",
      follow: "sad",
    },
    {
      id: "ae-happy",
      needLesson: 1,
      left: { en: "happy", mark: "a" },
      right: { en: "cat", mark: "a" },
      same: true,
      sound: "/æ/",
      rule: "happy 和 cat 里的 a，都读 /æ/。",
      follow: "happy",
    },
    {
      id: "ee-same",
      needLesson: 1,
      left: { en: "he", mark: "e" },
      right: { en: "she", mark: "e" },
      same: true,
      sound: "/iː/",
      rule: "he、she 里的 e，常读长音 /iː/。",
      follow: "he",
    },
    {
      id: "ee-feel",
      needLesson: 1,
      left: { en: "feel", mark: "ee" },
      right: { en: "these", mark: "e" },
      same: true,
      sound: "/iː/",
      rule: "feel 的 ee、these 的 e，都读 /iː/。",
      follow: "feel",
    },
    {
      id: "e-diff",
      needLesson: 1,
      left: { en: "bed", mark: "e" },
      right: { en: "me", mark: "e" },
      same: false,
      sound: "/e/ ≠ /iː/",
      rule: "bed 的 e 读短音 /e/，me 的 e 读长音 /iː/。不一样。",
      follow: "bed",
    },
    {
      id: "a-diff",
      needLesson: 1,
      left: { en: "late", mark: "a" },
      right: { en: "sad", mark: "a" },
      same: false,
      sound: "/eɪ/ ≠ /æ/",
      rule: "late 的 a 读 /eɪ/，sad 的 a 读 /æ/。不一样。",
      follow: "late",
    },
    {
      id: "o-same",
      needLesson: 2,
      left: { en: "dog", mark: "o" },
      right: { en: "model", mark: "o" },
      same: true,
      sound: "/ɒ/",
      rule: "dog、model 里的 o，常读短音 /ɒ/。",
      follow: "dog",
    },
    {
      id: "oo-look",
      needLesson: 2,
      left: { en: "look", mark: "oo" },
      right: { en: "good", mark: "oo" },
      same: true,
      sound: "/ʊ/",
      rule: "look、good 里的 oo，常读短音 /ʊ/。",
      follow: "look",
    },
    {
      id: "i_e-like",
      needLesson: 8,
      left: { en: "like", mark: "i" },
      right: { en: "time", mark: "i" },
      same: true,
      sound: "/aɪ/",
      rule: "i_e 常读 /aɪ/。like、time 都是这个音。",
      follow: "like",
    },
    {
      id: "o-hot",
      needLesson: 8,
      left: { en: "hot", mark: "o" },
      right: { en: "dog", mark: "o" },
      same: true,
      sound: "/ɒ/",
      rule: "hot、dog 里的 o，常读短音 /ɒ/。",
      follow: "hot",
    },
    {
      id: "ar-hard",
      needLesson: 6,
      left: { en: "hard", mark: "ar" },
      right: { en: "start", mark: "ar" },
      same: true,
      sound: "/ɑː/",
      rule: "hard、start 里的 ar，常读 /ɑː/。",
      follow: "hard",
    },
    {
      id: "sh-share",
      needLesson: 8,
      left: { en: "share", mark: "sh" },
      right: { en: "should", mark: "sh" },
      same: true,
      sound: "/ʃ/",
      rule: "share、should 开头的 sh，读 /ʃ/。",
      follow: "share",
    },
    {
      id: "ea-please",
      needLesson: 9,
      left: { en: "please", mark: "ea" },
      right: { en: "eat", mark: "ea" },
      same: true,
      sound: "/iː/",
      rule: "please、eat 里的 ea，常读 /iː/。",
      follow: "please",
    },
    {
      id: "o_e-hope",
      needLesson: 12,
      left: { en: "hope", mark: "o" },
      right: { en: "home", mark: "o" },
      same: true,
      sound: "/əʊ/",
      rule: "o_e 常读 /əʊ/。hope、home 都是这个音。",
      follow: "hope",
    },
    {
      id: "u_e-cute",
      needLesson: 12,
      left: { en: "cute", mark: "u" },
      right: { en: "use", mark: "u" },
      same: true,
      sound: "/juː/",
      rule: "cute、use 里的 u_e，常读 /juː/。",
      follow: "cute",
    },
    {
      id: "ae-bat",
      needLesson: 9,
      left: { en: "bat", mark: "a" },
      right: { en: "cat", mark: "a" },
      same: true,
      sound: "/æ/",
      rule: "bat、cat 里的 a，都读 /æ/。",
      follow: "bat",
    },
    {
      id: "e-get",
      needLesson: 11,
      left: { en: "get", mark: "e" },
      right: { en: "bed", mark: "e" },
      same: true,
      sound: "/e/",
      rule: "get、bed 里的 e，都读短音 /e/。",
      follow: "get",
    },
    {
      id: "i-diff",
      needLesson: 8,
      left: { en: "like", mark: "i" },
      right: { en: "ill", mark: "i" },
      same: false,
      sound: "/aɪ/ ≠ /ɪ/",
      rule: "like 的 i 读 /aɪ/，ill 的 i 读短音 /ɪ/。不一样。",
      follow: "like",
    },
    {
      id: "o-diff",
      needLesson: 12,
      left: { en: "hope", mark: "o" },
      right: { en: "hot", mark: "o" },
      same: false,
      sound: "/əʊ/ ≠ /ɒ/",
      rule: "hope 的 o 读 /əʊ/，hot 的 o 读 /ɒ/。不一样。",
      follow: "hope",
    },
    {
      id: "th-these",
      needLesson: 4,
      left: { en: "these", mark: "th" },
      right: { en: "the", mark: "th" },
      same: true,
      sound: "/ð/",
      rule: "these、the 开头的 th，常读浊音 /ð/。",
      follow: "these",
    },
  ];

  function phonicsUnlockLesson(store) {
    store = store || {};
    let max = 0;
    const done = store.completedLessons || {};
    (DATA.units || []).forEach((u) => {
      const n = u.lessonCount || 4;
      for (let i = 1; i <= n; i++) {
        const id = u.id + "-L" + i;
        if (done[id] && done[id].count > 0) {
          const book = (u.lessonStart || 1) + i - 1;
          if (book > max) max = book;
        }
      }
    });
    const cur = store.currentPathId || "";
    const m = cur.match(/^u(\d+)-L(\d+)$/);
    if (m) {
      const u = (DATA.units || []).filter((x) => x.id === "u" + m[1])[0];
      if (u) {
        const book = (u.lessonStart || 1) + Number(m[2]) - 1;
        if (book > max) max = book;
      }
    }
    // 卷面常考拼读；至少开放到当前课，且不低于 Lesson 4
    return Math.max(max, 4);
  }

  function markWordHtml(en, mark) {
    const word = String(en || "");
    const m = String(mark || "");
    if (!m) return word;
    const at = word.toLowerCase().indexOf(m.toLowerCase());
    if (at < 0) return word;
    return (
      word.slice(0, at) +
      "<mark>" +
      word.slice(at, at + m.length) +
      "</mark>" +
      word.slice(at + m.length)
    );
  }

  function buildPhonicsCards(store) {
    store = store || {};
    const unlock = phonicsUnlockLesson(store);
    const pool = PHONICS_PAIRS.filter((p) => (p.needLesson || 1) <= unlock);
    const picked = shuffle(pool.length ? pool : PHONICS_PAIRS).slice(0, 6);
    return picked.map((p) => ({
      type: "phonics",
      title: "发音判断",
      prompt: "听一听，画线部分发音相同吗？",
      tip: "相同画 √，不相同画 ×",
      left: p.left,
      right: p.right,
      leftHtml: markWordHtml(p.left.en, p.left.mark),
      rightHtml: markWordHtml(p.right.en, p.right.mark),
      same: !!p.same,
      answer: !!p.same,
      sound: p.sound || "",
      rule: p.rule || "",
      speakText: p.left.en + ". " + p.right.en,
      speakRole: "girlChild",
      coach: "bee",
      autoPlay: true,
      en: p.left.en + " · " + p.right.en,
      followRead: true,
      followWords: [p.left.en, p.right.en],
      speakFollow: p.left.en + " " + p.right.en,
    }));
  }

  function buildChallengeCards(unit, store) {
    store = store || {};
    const cards = [];
    const hardWords = (unit.words || []).filter(function (w) { return w.extend || w.priority === "high"; });
    shuffle(hardWords.length ? hardWords : (unit.words || [])).slice(0, 3).forEach((w) => cards.push(wordCard(w, "dictation")));

    shuffle(listenFor(unit, store, "judge", true)).slice(0, 2).forEach((j) => {
      cards.push(listenCard(j, "judge", { hard: true }));
    });
    const replyOne = shuffle(listenFor(unit, store, "reply", true))[0];
    if (replyOne) cards.push(listenCard(replyOne, "reply", { hard: true }));

    const s = sortCard(unit);
    if (s) {
      s.title = "词分类挑战";
      cards.push(s);
    }

    const sent1 = sentenceCard(unit, 0, store);
    if (sent1) cards.push(sent1);

    shuffle(questionsFor(unit, store, true)).slice(0, 2).forEach((q, i) => {
      cards.push(oralCard(q, i, { challenge: true }));
    });

    return cards;
  }

  g.EnglishDeskLesson = {
    todaySessionId,
    sessionMeta,
    buildCards,
    buildRetryCards,
    buildChallengeCards,
    buildPhonicsCards,
    eggLine,
    lineZh,
    lessonTalk,
    judgeTalk,
    commentaryLines,
    shuffle,
  };
})(window);
