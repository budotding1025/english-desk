# -*- coding: utf-8 -*-
"""Generate neural English voice pack for English Desk (edge-tts)."""
from __future__ import annotations

import asyncio
import hashlib
import json
import re
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent
DATA_JS = ROOT / "data.js"
OUT = ROOT / "audio"
MANIFEST = ROOT / "audio" / "manifest.json"

VOICES = {
    "en-US": {
        # Dad / adult man. Clear General American, natural pace.
        "adultMale": ("en-US-GuyNeural", "+0Hz", "-4%"),
        # Mum / Miss Wang.
        "adultFemale": ("en-US-JennyNeural", "+0Hz", "-4%"),
        # Boy students (Maomao, Mike, Baobao, Yangyang). Young male, not pitch-shifted.
        "boyChild": ("en-US-AndrewNeural", "+0Hz", "-6%"),
        # Girl students (Lingling, Guoguo, Sara). Real child neural voice.
        "girlChild": ("en-US-AnaNeural", "+0Hz", "-4%"),
    },
    "en-GB": {
        "adultMale": ("en-GB-RyanNeural", "+0Hz", "-4%"),
        "adultFemale": ("en-GB-SoniaNeural", "+0Hz", "-4%"),
        "boyChild": ("en-GB-ThomasNeural", "+0Hz", "-6%"),
        "girlChild": ("en-GB-MaisieNeural", "+0Hz", "-4%"),
    },
}

# Short words Andrew/Thomas often smear. Speak them with the clear adult male, slightly slower.
FRAGILE = {
    "should", "friend", "polite", "together", "would", "could",
    "mouth", "these", "live", "feel", "look", "soup", "cute", "full",
}

PREVIEW = [
    ("adultMale", "Hello. I am Dad."),
    ("adultFemale", "Hello. I am Mum."),
    ("boyChild", "Hi! I am a boy."),
    ("girlChild", "Hi! I am a girl."),
]

READ_FALLBACK = [
    ("adultFemale", "Who is in the story?"),
    ("adultFemale", "What happened?"),
    ("adultMale", "How do you feel?"),
]


def file_id(accent: str, role: str, text: str) -> str:
    raw = f"{accent}|{role}|{text}".encode("utf-8")
    return hashlib.sha1(raw).hexdigest()[:20]


def collect_from_data_js(src: str) -> set[tuple[str, str]]:
    """Return set of (role, text)."""
    items: set[tuple[str, str]] = set()

    # dialogues / demos / samples / readPrompts style objects
    for m in re.finditer(
        r'role:\s*"([^"]+)"\s*,\s*(?:name:\s*"[^"]*"\s*,\s*)?text:\s*"([^"]*)"',
        src,
    ):
        role, text = m.group(1), m.group(2).strip()
        if text:
            items.add((role, text))

    # listen cards: role + speak
    for m in re.finditer(
        r'role:\s*"([^"]+)"\s*,\s*speak:\s*"([^"]*)"',
        src,
    ):
        role, text = m.group(1), m.group(2).strip()
        if text:
            items.add((role, text))

    # speak first then role (rare)
    for m in re.finditer(
        r'speak:\s*"([^"]*)"\s*,\s*(?:show:\s*"[^"]*"\s*,\s*)?role:\s*"([^"]+)"',
        src,
    ):
        text, role = m.group(1).strip(), m.group(2)
        if text:
            items.add((role, text))

    # sample: { role: "...", text: "..." } already covered
    # questions ask strings inside objects
    for m in re.finditer(r'ask:\s*"([^"]+)"\s*,\s*asker:\s*"([^"]+)"', src):
        ask, asker = m.group(1).strip(), m.group(2).strip()
        if ask:
            items.add((asker, ask))

    # bare question strings (legacy)
    for m in re.finditer(r'questions:\s*\[(.*?)\]', src, re.S):
        block = m.group(1)
        if "ask:" in block:
            continue
        for q in re.findall(r'"([^"]+)"', block):
            items.add(("adultFemale", q.strip()))

    # pattern labels + frames with blanks filled later via demos
    for m in re.finditer(r'label:\s*"([^"]+)"', src):
        label = m.group(1).strip()
        # only speak mostly-English labels
        if re.search(r"[A-Za-z]{3,}", label) and not re.search(r"[\u4e00-\u9fff]", label):
            items.add(("adultFemale", label))

    # all word.en — adult + 翻翻龟 boyChild
    for m in re.finditer(r'en:\s*"([^"]+)"\s*,\s*zh:', src):
        w = m.group(1).strip()
        if w:
            items.add(("adultFemale", w))
            items.add(("adultMale", w))
            items.add(("boyChild", w))

    for role, text in PREVIEW + READ_FALLBACK:
        items.add((role, text))

    return items


async def synth_one(path: Path, text: str, voice: str, pitch: str, rate: str, force: bool = False) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.stat().st_size > 800 and not force:
        return
    if path.exists():
        path.unlink()
    communicate = edge_tts.Communicate(text, voice, pitch=pitch, rate=rate)
    await communicate.save(str(path))


def voice_for(accent: str, role: str, text: str):
    tokens = re.findall(r"[A-Za-z']+", text)
    bare = " ".join(tokens).lower()
    if role == "boyChild" and bare in FRAGILE:
        if accent == "en-US":
            return ("en-US-GuyNeural", "+2Hz", "-10%"), True
        return ("en-GB-RyanNeural", "+0Hz", "-10%"), True
    return VOICES[accent][role], False


async def main() -> None:
    src = DATA_JS.read_text(encoding="utf-8")
    pairs = collect_from_data_js(src)
    print(f"phrases: {len(pairs)}")

    manifest = {
        "version": 2,
        "engine": "edge-tts-neural",
        "voices": {
            accent: {role: meta[0] for role, meta in roles.items()}
            for accent, roles in VOICES.items()
        },
        "note": "Dialogue cast: Dad/Guy, Mum and Miss Wang/Jenny, boys/Andrew, girls/Ana. Short fragile words use Guy/Ryan so they stay clear. No cartoon pitch shift.",
        "clips": {},
    }

    tasks = []
    for accent, roles in VOICES.items():
        for role, text in sorted(pairs):
            if role not in roles:
                # map aliases lightly
                role_use = {
                    "dad": "adultMale",
                    "father": "adultMale",
                    "mum": "adultFemale",
                    "mom": "adultFemale",
                    "teacher": "adultFemale",
                    "boy": "boyChild",
                    "girl": "girlChild",
                    "yoyo": "boyChild",
                    "joe": "boyChild",
                }.get(role, role)
                if role_use not in roles:
                    role_use = "adultFemale"
            else:
                role_use = role
            picked, force = voice_for(accent, role_use, text)
            voice, pitch, rate = picked
            fid = file_id(accent, role_use, text)
            rel = f"audio/{accent}/{role_use}/{fid}.mp3"
            abs_path = ROOT / rel
            key = f"{accent}|{role_use}|{text}"
            manifest["clips"][key] = rel.replace("\\", "/")
            tasks.append(synth_one(abs_path, text, voice, pitch, rate, force))

    # concurrency limit
    sem = asyncio.Semaphore(6)

    async def bound(coro):
        async with sem:
            try:
                await coro
            except Exception as e:
                print("fail", e)

    await asyncio.gather(*(bound(t) for t in tasks))
    OUT.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print("wrote", MANIFEST, "clips", len(manifest["clips"]))


if __name__ == "__main__":
    asyncio.run(main())
