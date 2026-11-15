# -*- coding: utf-8 -*-
"""Auto-check practice paper crops & PDF pages for cut-off figures / empty bottoms."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parent
CROPS = ROOT / "source" / "crops"


def mostly_white_band(im: Image.Image, band: str, frac: float = 0.08, thresh: float = 245) -> bool:
    w, h = im.size
    bh = max(2, int(h * frac))
    bw = max(2, int(w * frac))
    if band == "top":
        crop = im.crop((0, 0, w, bh))
    elif band == "bottom":
        crop = im.crop((0, h - bh, w, h))
    elif band == "left":
        crop = im.crop((0, 0, bw, h))
    else:
        crop = im.crop((w - bw, 0, w, h))
    g = crop.convert("L")
    mean = ImageStat.Stat(g).mean[0]
    return mean >= thresh


def content_touches_edge(im: Image.Image, band: str, frac: float = 0.02, ink: float = 210) -> bool:
    """True if dark ink pixels sit on the outer edge (likely cut off)."""
    w, h = im.size
    g = im.convert("L")
    if band == "top":
        strip = g.crop((int(w * 0.1), 0, int(w * 0.9), max(2, int(h * frac))))
    elif band == "bottom":
        strip = g.crop((int(w * 0.1), h - max(2, int(h * frac)), int(w * 0.9), h))
    elif band == "left":
        strip = g.crop((0, int(h * 0.1), max(2, int(w * frac)), int(h * 0.9)))
    else:
        strip = g.crop((w - max(2, int(w * frac)), int(h * 0.1), w, int(h * 0.9)))
    # dark pixel ratio
    hist = strip.histogram()
    dark = sum(hist[: int(ink)])
    total = sum(hist) or 1
    return (dark / total) > 0.08


def check_crop_file(path: Path) -> list[str]:
    errs = []
    if not path.exists():
        return [f"missing {path}"]
    im = Image.open(path)
    w, h = im.size
    if w < 80 or h < 60:
        errs.append(f"{path.name}: too small {w}x{h}")
    # 场景小图：高度不够通常意味着人头被裁
    if "scene" in path.name.lower():
        if h < 480:
            errs.append(f"{path.name}: scene too short ({h}px) — heads likely cropped")
        return errs
    # 题图过小才报；满幅线稿贴边是常态，不做 top-edge 误报
    if path.name.startswith("sec") and (w < 200 or h < 120):
        errs.append(f"{path.name}: unusually small crop {w}x{h}")
    return errs


def _page_plain_text(page) -> str:
    try:
        return (page.get_text("text") or "").strip()
    except Exception:
        return ""


def check_pdf_pages(pdf: Path, max_bottom_gap: float = 0.32) -> list[str]:
    errs = []
    if not pdf.exists():
        return [f"missing pdf {pdf}"]
    try:
        import fitz
        import numpy as np
    except ImportError:
        return []
    doc = fitz.open(pdf)
    page_texts: list[str] = []
    for i in range(doc.page_count):
        page_texts.append(_page_plain_text(doc[i]))
        pix = doc[i].get_pixmap(matrix=fitz.Matrix(1.2, 1.2), alpha=False)
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        g = im.convert("L")
        arr = np.array(g)
        dark = (arr < 240).any(axis=1)
        if not dark.any():
            errs.append(f"{pdf.name} p{i+1}: blank page")
            continue
        last = int(dark.nonzero()[0][-1])
        gap = (arr.shape[0] - last) / arr.shape[0]
        if gap > max_bottom_gap:
            errs.append(
                f"{pdf.name} p{i+1}: large bottom empty gap {gap:.0%} (>{max_bottom_gap:.0%})"
            )

    # 段落跨页硬切：上一页正文以未结束的英文小写/单词结尾，下一页以小写续写开头
    for i in range(len(page_texts) - 1):
        a = " ".join(page_texts[i].split())
        b = " ".join(page_texts[i + 1].split())
        if not a or not b:
            continue
        # strip footer-like tails
        for foot in ("第 " + str(i + 1) + " 页", f"第{i+1}页", "共 4 页", "共4页"):
            if foot in a:
                a = a.split(foot)[0].strip()
        tail = a[-40:] if len(a) > 40 else a
        head = b[:40] if len(b) > 40 else b
        ends_open = bool(tail) and tail[-1] not in ".!?。！？…:：" and not tail.endswith("）")
        # classic bad split: ends with "My" / "The" / single Capital then lowercase continues
        last_word = tail.split()[-1] if tail.split() else ""
        next_word = head.split()[0] if head.split() else ""
        if ends_open and last_word[:1].isupper() and next_word[:1].islower():
            errs.append(
                f"{pdf.name} p{i+1}→p{i+2}: paragraph split mid-sentence "
                f"('{last_word} | {next_word}…')"
            )
        elif ends_open and last_word.isalpha() and len(last_word) <= 3 and next_word[:1].islower():
            errs.append(
                f"{pdf.name} p{i+1}→p{i+2}: short word orphan at page end "
                f"('{last_word} | {next_word}…')"
            )
    return errs


def check_unit_crops(unit: str) -> list[str]:
    folder = CROPS / unit
    errs = []
    if not folder.exists():
        return [f"no crop folder {folder}"]
    # 只检查正式出卷用图；跳过 _probe 草稿
    names = ["sec1.jpg", "sec2.jpg", "sec6.jpg", "sec7.jpg", "sec9_scene.jpg", "sec9_task1.jpg"]
    for name in names:
        p = folder / name
        if not p.exists():
            continue
        errs.extend(check_crop_file(p))
    return errs


def main(argv: list[str]) -> int:
    units = argv[1:] or ["u5"]
    all_errs: list[str] = []
    for u in units:
        print("QA crops", u)
        all_errs.extend(check_unit_crops(u))
        pdf = ROOT / f"U{u[1:].upper()}_Unit{u[1:].upper()}_Practice.pdf"
        # u5 -> U5
        n = u.lower().lstrip("u")
        pdf = ROOT / f"U{n}_Unit{n}_Practice.pdf"
        if not pdf.exists():
            pdf = ROOT / f"U{n}_Unit{n}_Practice.pdf"
        print("QA pdf", pdf.name if pdf.exists() else "(skip)")
        if pdf.exists():
            all_errs.extend(check_pdf_pages(pdf))
    if all_errs:
        print("QA FAIL")
        for e in all_errs:
            print(" -", e)
        return 1
    print("QA OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
