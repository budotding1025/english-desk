/**
 * 英语家侧 · 四角色英语语音
 * 优先播放预生成的微软神经语音 MP3（真男声 / 真女童声 / 年轻男声男孩）
 * 仅在无现成录音时，才回退系统 TTS（且不再把同一女声提调冒充童声）
 */
(function (global) {
  const ROLE_META = {
    adultMale: { label: "男成年", neural: "Guy / Ryan" },
    adultFemale: { label: "女成年", neural: "Jenny / Sonia" },
    boyChild: { label: "男小孩", neural: "Andrew / Thomas（年轻男声）" },
    girlChild: { label: "女小孩", neural: "Ana / Maisie（儿童神经声）" },
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
    manifestPromise = fetch("./audio/manifest.json?v=2")
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

  function stop() {
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
  }

  function playUrl(url) {
    return new Promise((resolve) => {
      try {
        stop();
        const a = new Audio(url);
        currentAudio = a;
        a.onended = () => {
          if (currentAudio === a) currentAudio = null;
          resolve(true);
        };
        a.onerror = () => {
          if (currentAudio === a) currentAudio = null;
          resolve(false);
        };
        const p = a.play();
        if (p && p.catch) p.catch(() => resolve(false));
      } catch (e) {
        resolve(false);
      }
    });
  }

  function getVoices() {
    return window.speechSynthesis ? window.speechSynthesis.getVoices() || [] : [];
  }

  function scoreSynth(v, roleKey) {
    const name = (v.name || "").toLowerCase();
    const lang = (v.lang || "").toLowerCase();
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

  function pickSynth(roleKey) {
    const cacheKey = roleKey + "|" + accent;
    if (synthCache[cacheKey]) return synthCache[cacheKey];
    const voices = getVoices();
    if (!voices.length) return null;
    const ranked = voices
      .map((v) => ({ v, s: scoreSynth(v, roleKey) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);
    synthCache[cacheKey] = ranked.length ? ranked[0].v : null;
    return synthCache[cacheKey];
  }

  function speakSynth(text, roleKey) {
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
      pitch = 1.08; // mild only
      rate = 1.0;
    } else if (roleKey === "girlChild") {
      pitch = 1.12;
      rate = 1.0;
    }

    const voice = pickSynth(roleKey === "boyChild" ? "adultMale" : roleKey === "girlChild" ? "adultFemale" : roleKey);
    return new Promise((resolve) => {
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = (voice && voice.lang) || accent;
        if (voice) u.voice = voice;
        u.rate = rate;
        u.pitch = pitch;
        u.volume = 1;
        u.onend = () => resolve(true);
        u.onerror = () => resolve(false);
        window.speechSynthesis.speak(u);
      } catch (e) {
        resolve(false);
      }
    });
  }

  function speak(text, role, opts) {
    opts = opts || {};
    if (!enabled) return Promise.resolve(false);
    const roleKey = normRole(role);
    const utterText = cleanText(text, opts.forceAll);
    if (!utterText) return Promise.resolve(false);

    return loadManifest().then((man) => {
      if (!opts.queue) stop();
      const rel = man ? clipPath(roleKey, utterText) : null;
      if (rel) {
        return playUrl(rel + (rel.indexOf("?") >= 0 ? "&" : "?") + "v=2").then((ok) => {
          if (ok) return true;
          return speakSynth(utterText, roleKey);
        });
      }
      return speakSynth(utterText, roleKey);
    });
  }

  function speakSequence(lines, gapMs) {
    gapMs = gapMs == null ? 380 : gapMs;
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
