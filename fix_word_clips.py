# -*- coding: utf-8 -*-
"""Force-regenerate short word clips that neural TTS often misreads."""
from __future__ import annotations

import asyncio
import hashlib
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent

# text spoken to model (plain only; SSML often gets read as markup)
FIXES = {
    "should": {"plain": "should"},
    "friend": {"plain": "friend"},
    "polite": {"plain": "polite"},
    "together": {"plain": "together"},
}

VOICES = {
    ("en-US", "boyChild"): ("en-US-GuyNeural", "+8Hz", "-5%"),  # clearer than Andrew for short words
    ("en-US", "adultMale"): ("en-US-GuyNeural", "+0Hz", "-5%"),
    ("en-GB", "boyChild"): ("en-GB-RyanNeural", "+5Hz", "-5%"),
    ("en-GB", "adultMale"): ("en-GB-RyanNeural", "+0Hz", "-5%"),
}


def fid(accent: str, role: str, text: str) -> str:
    return hashlib.sha1(f"{accent}|{role}|{text}".encode("utf-8")).hexdigest()[:20]


async def regen(accent: str, role: str, key: str, payload: dict) -> None:
    voice, pitch, rate = VOICES[(accent, role)]
    path = ROOT / "audio" / accent / role / f"{fid(accent, role, key)}.mp3"
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        path.unlink()
    text = payload.get("ssml") or payload["plain"]
    print("regen", accent, role, key, "->", path.name)
    try:
        await edge_tts.Communicate(text, voice, pitch=pitch, rate=rate).save(str(path))
    except Exception as e:
        print("  ssml/fail, plain:", e)
        await edge_tts.Communicate(payload["plain"], voice, pitch=pitch, rate=rate).save(str(path))
    print("  size", path.stat().st_size)


async def main() -> None:
    tasks = []
    for key, payload in FIXES.items():
        for accent, role in VOICES:
            tasks.append(regen(accent, role, key, payload))
    await asyncio.gather(*tasks)
    print("done")


if __name__ == "__main__":
    asyncio.run(main())
