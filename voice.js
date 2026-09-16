/**
 * 英语家侧 · 四角色标准英语语音
 * adultMale / adultFemale / boyChild / girlChild
 * 优先系统 en-US / en-GB 自然音色；无童声时用音高近似。
 */
(function (global) {
  const ROLES = {
    adultMale: {
      label: "男成年",
      langPrefer: ["en-GB", "en-US", "en"],
      namePrefer: ["guy", "david", "mark", "ryan", "tony", "daniel", "thomas", "james", "george", "arthur", "eric", "christopher", "male", "man"],
      nameAvoid: ["female", "woman", "girl", "zira", "aria", "jenny", "samantha", "karen", "susan", "moira", "hazel"],
      pitch: 0.92,
      rate: 0.94,
    },
    adultFemale: {
      label: "女成年",
      langPrefer: ["en-GB", "en-US", "en"],
      namePrefer: ["aria", "jenny", "sara", "zira", "samantha", "karen", "moira", "susan", "emma", "sonia", "hazel", "female", "woman"],
      nameAvoid: ["male", "man", "boy", "david", "mark", "guy", "ryan", "daniel"],
      pitch: 1.02,
      rate: 0.95,
    },
    boyChild: {
      label: "男小孩",
      langPrefer: ["en-US", "en-GB", "en"],
      namePrefer: ["boy", "kid", "child", "junior", "young"],
      nameAvoid: ["female", "woman", "girl", "grandma", "mature"],
      // 多数设备没有真童声，用男声略提速+提音调近似
      pitch: 1.28,
      rate: 1.02,
      fallbackRole: "adultMale",
    },
    girlChild: {
      label: "女小孩",
      langPrefer: ["en-US", "en-GB", "en"],
      namePrefer: ["girl", "kid", "child", "junior", "young", "princess"],
      nameAvoid: ["male", "man", "boy", "grandpa", "mature"],
      pitch: 1.38,
      rate: 1.03,
      fallbackRole: "adultFemale",
    },
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

  let accent = "en-US"; // en-US | en-GB
  let enabled = true;
  let cache = {};
  let voicesReady = false;

  function normRole(role) {
    if (!role) return "adultFemale";
    if (ROLES[role]) return role;
    const key = String(role).toLowerCase().replace(/\s+/g, "_");
    return ROLE_ALIASES[key] || "adultFemale";
  }

  function getVoices() {
    return window.speechSynthesis ? window.speechSynthesis.getVoices() || [] : [];
  }

  function scoreVoice(v, roleKey) {
    const cfg = ROLES[roleKey];
    if (!cfg) return -999;
    const name = (v.name || "").toLowerCase();
    const lang = (v.lang || "").toLowerCase();
    if (!/^en([-_]|$)/.test(lang)) return -200;

    let s = 20;
    // accent preference
    if (accent === "en-GB" && /en-?gb|en-?uk|british/.test(lang + " " + name)) s += 40;
    if (accent === "en-US" && /en-?us|american/.test(lang + " " + name)) s += 40;
    if (/en-?gb|en-?us/.test(lang)) s += 10;

    // natural / neural
    if (/natural|neural|online|premium|enhanced|microsoft|google|siri|apple/.test(name)) s += 35;

    cfg.namePrefer.forEach((p) => {
      if (name.includes(p)) s += 28;
    });
    cfg.nameAvoid.forEach((p) => {
      if (name.includes(p)) s -= 40;
    });

    // child roles: boost kid voices strongly
    if ((roleKey === "boyChild" || roleKey === "girlChild") && /kid|child|boy|girl|junior/.test(name)) {
      s += 50;
    }

    // slight gender heuristics on unknown voices
    if (roleKey === "adultMale" || roleKey === "boyChild") {
      if (/\b(he|him|mr)\b/.test(name)) s += 5;
    }
    if (roleKey === "adultFemale" || roleKey === "girlChild") {
      if (/\b(she|her|ms|mrs)\b/.test(name)) s += 5;
    }

    return s;
  }

  function pickVoice(roleKey) {
    roleKey = normRole(roleKey);
    if (cache[roleKey + "|" + accent]) return cache[roleKey + "|" + accent];
    const voices = getVoices();
    if (!voices.length) return null;

    const ranked = voices
      .map((v) => ({ v, s: scoreVoice(v, roleKey) }))
      .filter((x) => x.s > -50)
      .sort((a, b) => b.s - a.s);

    let best = ranked[0] && ranked[0].s > 0 ? ranked[0].v : null;

    // child fallback: use adult of same gender family if no kid voice
    if (!best && ROLES[roleKey].fallbackRole) {
      best = pickVoice(ROLES[roleKey].fallbackRole);
    }
    if (!best) {
      best = voices.find((v) => /^en/i.test(v.lang)) || voices[0] || null;
    }
    cache[roleKey + "|" + accent] = best;
    return best;
  }

  function refresh() {
    cache = {};
    voicesReady = getVoices().length > 0;
    return voicesReady;
  }

  function stop() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function speak(text, role, opts) {
    opts = opts || {};
    if (!enabled || !text || !window.speechSynthesis) return Promise.resolve(false);
    const clean = String(text)
      .replace(/[【】]/g, " ")
      .replace(/（.*?）/g, " ")
      .replace(/\(.*?\)/g, " ")
      .replace(/[·•]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // Prefer speaking English-only chunks when mixed
    const enOnly = clean.match(/[A-Za-z][A-Za-z0-9'’.,!?;:\-\s]*/g);
    const utterText = opts.forceAll
      ? clean
      : enOnly && enOnly.join(" ").trim().length >= 2
        ? enOnly.join(" ").replace(/\s+/g, " ").trim()
        : clean;
    if (!utterText) return Promise.resolve(false);

    const roleKey = normRole(role);
    const cfg = ROLES[roleKey];
    const voice = pickVoice(roleKey);

    return new Promise((resolve) => {
      try {
        if (!opts.queue) stop();
        const u = new SpeechSynthesisUtterance(utterText);
        u.lang = (voice && voice.lang) || accent;
        if (voice) u.voice = voice;
        u.rate = opts.rate != null ? opts.rate : cfg.rate;
        u.pitch = opts.pitch != null ? opts.pitch : cfg.pitch;
        u.volume = 1;
        u.onend = () => resolve(true);
        u.onerror = () => resolve(false);
        window.speechSynthesis.speak(u);
      } catch (e) {
        resolve(false);
      }
    });
  }

  function speakSequence(lines, gapMs) {
    gapMs = gapMs == null ? 320 : gapMs;
    stop();
    let chain = Promise.resolve();
    (lines || []).forEach((line, i) => {
      chain = chain
        .then(() => speak(line.text, line.role, { queue: true, forceAll: line.forceAll }))
        .then(
          () =>
            new Promise((r) => {
              if (i < lines.length - 1) setTimeout(r, gapMs);
              else r();
            })
        );
    });
    return chain;
  }

  function castMap() {
    return Object.keys(ROLES).map((key) => {
      const v = pickVoice(key);
      return {
        role: key,
        label: ROLES[key].label,
        voice: v ? v.name + " · " + v.lang : "（本机暂无可用英语音色）",
      };
    });
  }

  function setAccent(next) {
    accent = next === "en-GB" ? "en-GB" : "en-US";
    cache = {};
  }

  function setEnabled(on) {
    enabled = !!on;
    if (!enabled) stop();
  }

  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = refresh;
    // Chrome sometimes needs a tick
    setTimeout(refresh, 0);
    setTimeout(refresh, 400);
  }

  global.EnglishVoice = {
    ROLES,
    normRole,
    speak,
    speakSequence,
    stop,
    refresh,
    castMap,
    setAccent,
    setEnabled,
    getAccent: () => accent,
    isEnabled: () => enabled,
    pickVoice,
  };
})(window);
