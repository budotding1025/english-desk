# -*- coding: utf-8 -*-
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent / "crops"
OUT.mkdir(parents=True, exist_ok=True)


def save(im, box, name, pad=4):
    x0, y0, x1, y1 = box
    x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
    x1, y1 = min(im.width, x1 + pad), min(im.height, y1 + pad)
    c = im.crop((x0, y0, x1, y1))
    c = c.resize((max(320, c.width * 3), max(320, c.height * 3)), Image.Resampling.LANCZOS)
    path = OUT / name
    c.save(path, optimize=True)
    print(name, box, "->", c.size)


def crop_u1(im):
    # Tuned from grid inspect on Unit test/U1-1.png (1179x912)
    # Section 一: 3 rows × 2 questions, each A|B
    rows = [(168, 248), (255, 335), (342, 422)]
    # each question span then split A/B
    qs = [
        (38, 168, 300, 248),   # overwritten by loop
    ]
    # Q positions: (qnum, x0, x1) per row pairing
    layout = [
        # row0: Q1 Q2
        [(1, 40, 300), (2, 310, 575)],
        # row1: Q3 Q4
        [(3, 40, 300), (4, 310, 575)],
        # row2: Q5 Q6
        [(5, 40, 300), (6, 310, 575)],
    ]
    for row_i, row in enumerate(layout):
        y0, y1 = rows[row_i]
        for qn, x0, x1 in row:
            mid = (x0 + x1) // 2
            save(im, (x0, y0, mid - 2, y1), f"u1_L1_{qn}A.png")
            save(im, (mid + 2, y0, x1, y1), f"u1_L1_{qn}B.png")

    # Section 二 four panels
    y0, y1 = 505, 615
    xs = [45, 165, 285, 405, 525]
    for i, lab in enumerate("ABCD"):
        save(im, (xs[i], y0, xs[i + 1] - 4, y1), f"u1_L2_{lab}.png")

    # Section 七 five panels on right page
    y0, y1 = 735, 875
    xs = [605, 710, 815, 920, 1025, 1145]
    for i in range(5):
        save(im, (xs[i], y0, xs[i + 1] - 4, y1), f"u1_W7_{i + 1}.png")


def crop_u2(im):
    rows = [(155, 235), (242, 322), (330, 410)]
    layout = [
        [(1, 40, 300), (2, 310, 575)],
        [(3, 40, 300), (4, 310, 575)],
        [(5, 40, 300), (6, 310, 575)],
    ]
    for row_i, row in enumerate(layout):
        y0, y1 = rows[row_i]
        for qn, x0, x1 in row:
            mid = (x0 + x1) // 2
            save(im, (x0, y0, mid - 2, y1), f"u2_L1_{qn}A.png")
            save(im, (mid + 2, y0, x1, y1), f"u2_L1_{qn}B.png")

    y0, y1 = 515, 625
    xs = [40, 140, 240, 340, 440, 540]
    for i in range(5):
        save(im, (xs[i], y0, xs[i + 1] - 4, y1), f"u2_L2_{i + 1}.png")

    y0, y1 = 710, 860
    xs = [605, 710, 815, 920, 1025, 1145]
    for i in range(5):
        save(im, (xs[i], y0, xs[i + 1] - 4, y1), f"u2_W7_{i + 1}.png")


if __name__ == "__main__":
    crop_u1(Image.open(ROOT / "Unit test" / "U1-1.png"))
    crop_u2(Image.open(ROOT / "Unit test" / "U2-1.png"))
    print("files", len(list(OUT.glob("*.png"))))
