# -*- coding: utf-8 -*-
"""Build U5 practice Word/PDF — tight layout matching school photo pages."""
from __future__ import annotations

import shutil
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.shared import Cm, Pt

ROOT = Path(__file__).resolve().parent
CROPS = ROOT / "source" / "crops" / "u5"
OUT = ROOT


def font(run, name="宋体", size=11, bold=False):
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold


def font_en(run, size=11, bold=False):
    run.font.name = "Times New Roman"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "宋体")
    run.font.size = Pt(size)
    run.bold = bold


def P(doc, text, *, size=11, bold=False, center=False, before=0, after=2, indent=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    if indent is not None:
        p.paragraph_format.first_line_indent = Cm(indent)
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(text)
    font(r, size=size, bold=bold)
    return p


def blank(n=16):
    return "_" * n


def dialogue_line(doc, who_zh: str, parts: list[tuple[str, bool]]):
    """parts: (text, is_english). Leaves wide blanks for handwriting."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.line_spacing = 1.35
    r = p.add_run(who_zh + "：")
    font(r, size=12, bold=True)
    for text, is_en in parts:
        r = p.add_run(text)
        if is_en:
            font_en(r, size=12)
        else:
            font(r, size=12)
    return p


def add_menu_table(doc):
    """Clear printable menu with checkbox + word (no tiny scan text)."""
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title.paragraph_format.space_before = Pt(2)
    title.paragraph_format.space_after = Pt(6)
    r = title.add_run("Menu")
    font_en(r, size=14, bold=True)

    cols = [
        ("Meat", ["fish", "chicken", "meatballs"]),
        ("Vegetables", ["tomatoes", "potatoes", "cabbages"]),
        ("Main Food", ["rice", "baozi", "jiaozi"]),
        ("Drink", ["apple juice", "orange juice", "coffee"]),
    ]
    table = doc.add_table(rows=4, cols=4)
    table.autofit = True
    for c, (head, items) in enumerate(cols):
        cell0 = table.rows[0].cells[c]
        cell0.text = ""
        p = cell0.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(head)
        font_en(r, size=12, bold=True)
        for i, word in enumerate(items):
            cell = table.rows[i + 1].cells[c]
            cell.text = ""
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(4)
            p.paragraph_format.space_after = Pt(4)
            r = p.add_run("□  " + word)
            font_en(r, size=12)
    P(doc, "（在点过的食物前画 √）", size=10, center=True, before=6, after=4)


def S(doc, text):
    """Section title — compact like school paper."""
    P(doc, text, size=11, bold=True, before=6, after=3)


def footer(doc, page, total=4):
    P(doc, f"英语 · 四上 · 第五单元  第 {page} 页（共 {total} 页）", size=9, center=True, before=8, after=0)


def add_pic(doc, path: Path | None, width_cm=16.0):
    if not path or not path.exists():
        P(doc, "【图缺失】", size=10, center=True)
        return
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    p.add_run().add_picture(str(path), width=Cm(width_cm))


def new_doc():
    doc = Document()
    for s in doc.sections:
        s.top_margin = Cm(1.2)
        s.bottom_margin = Cm(1.1)
        s.left_margin = Cm(1.5)
        s.right_margin = Cm(1.5)
    return doc


def build_paper() -> Path:
    doc = new_doc()

    # —— Page 1: 听力 一 / 二 / 三 ——
    P(doc, "英语 · 四上 · 第五单元练习", size=15, bold=True, center=True, after=4)
    P(doc, "小学________ 四年级____班  姓名____________  成绩________", size=10, center=True, after=4)
    P(doc, "听力部分", size=12, bold=True, center=True, after=4)

    S(doc, "一、听句子，判断图片与所听内容是否相符，相符的写“T”，不相符的写“F”。")
    add_pic(doc, CROPS / "sec1.jpg", 16.0)

    S(doc, "二、听短文，根据听到的顺序，用字母 A—F 给下列图片排序。")
    add_pic(doc, CROPS / "sec2.jpg", 12.5)

    S(doc, "三、听问句，选择正确的答语，将序号写在题前括号内。")
    reply3 = [
        [("A", "We have meat and rice for lunch."), ("B", "Eggs are good for us.")],
        [("A", "I'd like to have fish and juice."), ("B", "Yes, please.")],
        [("A", "I want some milk."), ("B", "My favourite food is chicken.")],
        [("A", "I'd like some soup."), ("B", "I'd like some meat.")],
        [("A", "We play with them."), ("B", "We hold them in one hand and pick up food.")],
    ]
    for i, opts in enumerate(reply3, 1):
        line = f"(  ) {i}.  " + "    ".join(f"{lab}. {t}" for lab, t in opts)
        P(doc, line, size=10, after=2)

    footer(doc, 1)
    doc.add_page_break()

    # —— Page 2: 四 / 笔试 五 / 六 ——
    S(doc, "四、听短文，根据短文内容，完成表格。")
    table = doc.add_table(rows=2, cols=4)
    headers = ["Meals", "Breakfast", "Lunch", "3. ________"]
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = h
        for p in cell.paragraphs:
            for run in p.runs:
                font(run, size=10, bold=True)
    row = [
        "Food and drinks",
        "bread, milk, 1. ________",
        "rice, 2. ________, vegetables",
        "chicken, 4. ________, 5. ________",
    ]
    for i, val in enumerate(row):
        cell = table.rows[1].cells[i]
        cell.text = val
        for p in cell.paragraphs:
            for run in p.runs:
                font(run, size=10)

    P(doc, "笔试部分", size=12, bold=True, center=True, before=8, after=4)

    S(doc, "五、读单词，给下列单词分类，将序号写在横线上。")
    P(
        doc,
        "A. ham  B. sweet  C. pizza  D. knife  E. sour  F. fish  "
        "G. fork  H. steak  I. chopstick  J. salty  K. bowl  L. bitter",
        size=10,
        after=3,
    )
    P(doc, "1. Food: ________ ________ ________ ________", size=10, after=2)
    P(doc, "2. Tableware: ________ ________ ________ ________", size=10, after=2)
    P(doc, "3. Flavour: ________ ________ ________ ________", size=10, after=4)

    S(doc, "六、看图读短语，选择与图片相符的短语，将序号写在括号内。")
    P(
        doc,
        "A. a bowl of rice   B. an apple pie   C. a chicken wing   D. mushroom soup\n"
        "E. some vegetables   F. an ice cream   G. a glass of milk   H. a cup of coffee",
        size=9,
        after=2,
    )
    add_pic(doc, CROPS / "sec6.jpg", 16.0)

    footer(doc, 2)
    doc.add_page_break()

    # —— Page 3: 七 / 八 / 九 短文 ——
    S(doc, "七、看图读故事，从方框中选择合适的词语补全故事，将序号写在横线上。")
    P(doc, "A. strawberries   B. chopsticks   C. tomato soup   D. fork   E. good", size=10, after=2)
    add_pic(doc, CROPS / "sec7.jpg", 16.0)

    S(doc, "八、读对话，从方框中选择合适的句子补全对话，将序号写在横线上。")
    for line in [
        "A. I love Chinese food.   B. I'd like to try something different.",
        "C. What would you like to eat?   D. And for dessert?   E. They are good for our body.",
    ]:
        P(doc, line, size=9, after=1)
    for line in [
        "Maomao: Hi Sara, it's lunch time. 1. ________",
        "Sara: I'd like to have some rice with potatoes and meatballs. 2. ________ How about you?",
        "Maomao: 3. ________ I'd like to have some salad and mushroom soup. 4. ________",
        "Sara: 5. ________",
        "Maomao: Cake. That's my favourite.",
    ]:
        P(doc, line, size=10, after=2)

    S(doc, "九、阅读短文，完成任务。")
    passage = (
        "My family often goes to a restaurant on weekends, and it's my favourite time of the week! "
        "The restaurant is bright and clean, and the waiters are friendly. I always order fish—the fish is yummy. "
        "My brother loves to drink orange juice. It is cold, sweet, and full of vitamin C. "
        "My mum chooses cabbages and potatoes. She says they're super healthy—they're full of vitamins and fiber. "
        "Dad likes to eat meatballs and jiaozi. Eating at the restaurant is always fun and enjoyable. "
        "We talk, laugh, and share our food. The delicious meals make our weekends even more special. "
        "I can't wait to go again next weekend!"
    )
    P(doc, passage, size=10, after=2, indent=0.6)

    footer(doc, 3)
    doc.add_page_break()

    # —— Page 4: 任务一文字对话 + 任务二文字菜单（避免扫描小字看不清）——
    P(doc, "任务一：根据短文内容，补全对话。", size=11, bold=True, before=2, after=4)
    P(
        doc,
        "（场景：服务员问一家四口想点什么。请把短文里点的食物写在横线上。）",
        size=10,
        after=6,
    )
    dialogue_line(
        doc,
        "服务员 Waitress",
        [("What would you like?", True)],
    )
    dialogue_line(
        doc,
        "妈妈 Mum",
        [
            ("I'd like some ", True),
            (f"1. {blank(18)}", True),
            (" and ", True),
            (f"2. {blank(18)}", True),
            (".", True),
        ],
    )
    dialogue_line(
        doc,
        "弟弟 Brother",
        [
            ("I'd like some ", True),
            (f"3. {blank(20)}", True),
            (".", True),
        ],
    )
    dialogue_line(
        doc,
        "我 I",
        [
            ("I'd like some ", True),
            (f"4. {blank(20)}", True),
            (".", True),
        ],
    )
    dialogue_line(
        doc,
        "爸爸 Dad",
        [
            ("I'd like some ", True),
            (f"5. {blank(18)}", True),
            (" and ", True),
            (f"6. {blank(18)}", True),
            (".", True),
        ],
    )

    P(doc, "任务二：在菜单上勾出（√）他们点的食物。", size=11, bold=True, before=10, after=4)
    add_menu_table(doc)

    footer(doc, 4)

    path = OUT / "U5_第五单元练习.docx"
    doc.save(path)
    shutil.copy(path, OUT / "U5_Unit5_Practice.docx")
    return path


def build_answers() -> Path:
    doc = new_doc()
    P(doc, "英语 · 四上 · 第五单元练习 · 参考答案", size=15, bold=True, center=True, after=4)
    P(doc, "含完整英语听力原文 + 全部题目答案（听力据《四上听力材料》第五单元）", size=9, center=True, after=8)

    S(doc, "听力部分 · 原文与答案")
    P(doc, "一、听句子判断 T/F", size=11, bold=True, after=2)
    P(doc, "【Listening script】", size=9, bold=True, after=1)
    for i, t in enumerate(
        [
            "I'd like a sandwich.",
            "Some orange juice for me, please.",
            "We always hold the knife in the right hand.",
            "Please don't make noise when you eat.",
            "I'd like hot dogs on our school menu.",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=9, after=1)
    P(doc, "【Answers】1F  2T  3F  4T  5T", size=11, bold=True, after=4)

    P(doc, "二、听短文排序 A—F", size=11, bold=True, after=2)
    P(doc, "【Listening script】", size=9, bold=True, after=1)
    P(
        doc,
        "Making fruit salad is easy and fun! Here are the things we need. "
        "We need fruits like bananas, strawberries, and grapes. "
        "We also need a big bowl, a small knife, and some yogurt. "
        "It's a healthy snack. You can make it with a little help from your parents.",
        size=9,
        after=2,
    )
    P(doc, "【Answers】纸面图序（上排 L→R / 下排 L→R）：A  D  E  B  C  F", size=10, bold=True, after=4)

    P(doc, "三、听选答语", size=11, bold=True, after=2)
    P(doc, "【Listening script】", size=9, bold=True, after=1)
    for i, t in enumerate(
        [
            "What's for lunch, Mum?",
            "What would you like, Tom?",
            "What's your favourite food?",
            "What would you like to drink?",
            "How do you use the chopsticks?",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=9, after=1)
    P(doc, "【Answers】1A  2A  3B  4A  5B", size=11, bold=True, after=4)

    P(doc, "四、听短文填表", size=11, bold=True, after=2)
    P(doc, "【Listening script】", size=9, bold=True, after=1)
    P(
        doc,
        'Hi, I\'m Jack. Everyone needs many kinds of food. My mum tells me, "You are what you eat." '
        "I like to help my family to make a healthy meal plan. Here is the plan. "
        "We have bread, milk and eggs for breakfast. We eat rice, fish and vegetables for lunch. "
        "We have chicken, soup and fruit for dinner. How is my plan?",
        size=9,
        after=2,
    )
    P(doc, "【Answers】1 eggs  2 fish  3 Dinner  4 soup  5 fruit", size=11, bold=True, after=6)

    S(doc, "笔试部分 · 答案")
    P(doc, "五、分类：1 Food: A C F H；2 Tableware: D G I K；3 Flavour: B E J L", size=10, after=3)
    P(doc, "六、看图选短语：1H  2E  3C  4D  5B  6A  7G  8F", size=10, after=3)
    P(doc, "七、补全故事：1B  2C  3D  4A  5E", size=10, after=3)
    P(doc, "八、补全对话：1C  2A  3B  4E  5D", size=10, after=3)
    P(
        doc,
        "九·任务一：1 cabbages  2 potatoes（Mum）  3 orange juice（Brother）  "
        "4 fish（I）  5 meatballs  6 jiaozi（Dad）",
        size=10,
        after=2,
    )
    P(
        doc,
        "九·任务二：勾选 fish、meatballs、potatoes、cabbages、jiaozi、orange juice。",
        size=10,
        after=4,
    )


    path = OUT / "U5_第五单元练习_答案.docx"
    doc.save(path)
    shutil.copy(path, OUT / "U5_Unit5_Practice_Answers.docx")
    return path


def export_pdfs(paths: list[Path]) -> None:
    import win32com.client

    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    try:
        for docx in paths:
            pdf = docx.with_suffix(".pdf")
            d = word.Documents.Open(str(docx))
            d.SaveAs(str(pdf), FileFormat=17)
            d.Close(False)
            print("pdf", pdf.name)
    finally:
        word.Quit()


def build_scan_pdf() -> Path | None:
    try:
        from PIL import Image
    except ImportError:
        return None
    pages = []
    for name in ["u5-1a_hq", "u5-1b_hq", "u5-2a_hq", "u5-2b_hq"]:
        p = CROPS / f"{name}.jpg"
        if p.exists():
            pages.append(Image.open(p).convert("RGB"))
    if not pages:
        return None
    out = OUT / "U5_Unit5_Practice_Scan.pdf"
    pages[0].save(out, save_all=True, append_images=pages[1:], resolution=150)
    shutil.copy(out, OUT / "U5_第五单元练习_原卷扫描.pdf")
    print("scan pdf", out.name)
    return out


if __name__ == "__main__":
    paper = build_paper()
    ans = build_answers()
    print("docx", paper.name, ans.name)
    build_scan_pdf()
    export_pdfs(
        [
            paper,
            OUT / "U5_Unit5_Practice.docx",
            ans,
            OUT / "U5_Unit5_Practice_Answers.docx",
        ]
    )
    shutil.copy(OUT / "U5_Unit5_Practice.pdf", OUT / "U5_第五单元练习.pdf")
    shutil.copy(OUT / "U5_Unit5_Practice_Answers.pdf", OUT / "U5_第五单元练习_答案.pdf")
    print("done")
