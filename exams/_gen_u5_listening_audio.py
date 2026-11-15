# -*- coding: utf-8 -*-
"""U5 paper listening TTS — slower Grade-4 pace (edge-tts rate ~-18%)."""
from __future__ import annotations

import asyncio
import hashlib
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "audio" / "manifest.json"

# Grade-4 classroom pace: clearer + slower than default adult TTS
VOICES = {
    "adultMale": ("en-US-GuyNeural", "+0Hz", "-18%"),
    "adultFemale": ("en-US-JennyNeural", "+0Hz", "-18%"),
    "boyChild": ("en-US-AndrewNeural", "+0Hz", "-20%"),
    "girlChild": ("en-US-AnaNeural", "+0Hz", "-18%"),
}

CLIPS: list[tuple[str, str]] = [
    # 一
    ("boyChild", "I'd like a sandwich."),
    ("girlChild", "Some orange juice for me, please."),
    ("adultFemale", "We always hold the knife in the right hand."),
    ("adultFemale", "Please don't make noise when you eat."),
    ("boyChild", "I'd like hot dogs on our school menu."),
    # 二
    (
        "adultFemale",
        "Making fruit salad is easy and fun! Here are the things we need. "
        "We need fruits like bananas, strawberries, and grapes. "
        "We also need a big bowl, a small knife, and some yogurt. "
        "It's a healthy snack. You can make it with a little help from your parents.",
    ),
    ("adultFemale", "We need fruits like bananas, strawberries, and grapes."),
    ("adultFemale", "We also need a big bowl, a small knife, and some yogurt."),
    # 三
    ("adultFemale", "What's for lunch, Mum?"),
    ("adultFemale", "What would you like, Tom?"),
    ("adultFemale", "What's your favourite food?"),
    ("adultFemale", "What would you like to drink?"),
    ("adultFemale", "How do you use the chopsticks?"),
    # 四
    (
        "boyChild",
        "Hi, I'm Jack. Everyone needs many kinds of food. My mum tells me, "
        '"You are what you eat." I like to help my family to make a healthy meal plan. '
        "Here is the plan. We have bread, milk and eggs for breakfast. "
        "We eat rice, fish and vegetables for lunch. "
        "We have chicken, soup and fruit for dinner. How is my plan?",
    ),
]


def file_id(accent: str, role: str, text: str) -> str:
    return hashlib.sha1(f"{accent}|{role}|{text}".encode("utf-8")).hexdigest()[:20]


async def synth_one(path: Path, text: str, voice: str, pitch: str, rate: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        path.unlink()
    await edge_tts.Communicate(text, voice, pitch=pitch, rate=rate).save(str(path))


async def main() -> None:
    if MANIFEST.exists():
        man = json.loads(MANIFEST.read_text(encoding="utf-8"))
    else:
        man = {"version": 2, "engine": "edge-tts-neural", "clips": {}}
    clips = man.setdefault("clips", {})
    accent = "en-US"
    fail = 0
    for role, text in CLIPS:
        voice, pitch, rate = VOICES[role]
        fid = file_id(accent, role, text)
        rel = f"audio/{accent}/{role}/{fid}.mp3"
        abs_path = ROOT / rel
        key = f"{accent}|{role}|{text}"
        # Force regenerate so Grade-4 slower pace replaces any faster clip
        for attempt in range(4):
            try:
                await synth_one(abs_path, text, voice, pitch, rate)
                if abs_path.exists() and abs_path.stat().st_size > 800:
                    clips[key] = rel.replace("\\", "/")
                    print("ok", role, text[:52])
                    break
            except Exception as e:
                print("retry", attempt + 1, role, type(e).__name__)
                await asyncio.sleep(1.2 * (attempt + 1))
        else:
            fail += 1
            print("FAIL", role, text[:52])
        await asyncio.sleep(0.25)
    MANIFEST.write_text(json.dumps(man, ensure_ascii=False, indent=2), encoding="utf-8")
    print("done fail", fail, "u5 clips", len(CLIPS))


if __name__ == "__main__":
    asyncio.run(main())
