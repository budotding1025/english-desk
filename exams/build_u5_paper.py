# -*- coding: utf-8 -*-
"""Build U5 practice Word/PDF — match uploaded school paper page breaks & density."""
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

# 贴近原卷：题干/英文约 11–12pt；插图适中不拉虚；页码进页脚，正文用满版心
BODY = 11
STEM = 11
OPT = 11
SEC = 12
TITLE = 15


def font(run, name="宋体", size=BODY, bold=False):
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold


def font_en(run, size=BODY, bold=False):
    run.font.name = "Times New Roman"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "宋体")
    run.font.size = Pt(size)
    run.bold = bold


def P(doc, text, *, size=BODY, bold=False, center=False, before=0, after=2, indent=None, en=False, name=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    p.paragraph_format.line_spacing = 1.1
    if indent is not None:
        p.paragraph_format.first_line_indent = Cm(indent)
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(text)
    if en:
        font_en(r, size=size, bold=bold)
    else:
        font(r, name=name or ("黑体" if bold and size >= SEC else "宋体"), size=size, bold=bold)
    return p


def blank(n=14):
    return "_" * n


def S(doc, text):
    P(doc, text, size=SEC, bold=True, before=6, after=3, name="黑体")


def add_pic(doc, path: Path | None, width_cm=13.0):
    if not path or not path.exists():
        P(doc, "【图缺失】", size=11, center=True)
        return
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2)
    p.add_run().add_picture(str(path), width=Cm(width_cm))


def set_page_footer(section, page: int, total: int = 4):
    """Real footer — keeps page number at bottom without eating body space."""
    footer = section.footer
    footer.is_linked_to_previous = False
    # clear existing
    for p in list(footer.paragraphs):
        p.clear()
    p = footer.paragraphs[0] if footer.paragraphs else footer.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run(f"英语 · 四上 · 第五单元  第 {page} 页（共 {total} 页）")
    font(r, size=9)


def dialogue_line(doc, who: str, en_line: str):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(10)
    p.paragraph_format.line_spacing = 1.65
    r = p.add_run(who + "  ")
    font(r, name="黑体", size=12, bold=True)
    r2 = p.add_run(en_line)
    font_en(r2, size=13)


def add_menu_table(doc):
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title.paragraph_format.space_before = Pt(6)
    title.paragraph_format.space_after = Pt(10)
    r = title.add_run("Menu")
    font_en(r, size=16, bold=True)

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
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(10)
        r = p.add_run(head)
        font_en(r, size=13, bold=True)
        for i, word in enumerate(items):
            cell = table.rows[i + 1].cells[c]
            cell.text = ""
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after = Pt(10)
            p.paragraph_format.line_spacing = 1.5
            r = p.add_run("□  " + word)
            font_en(r, size=13)


def build_paper() -> Path:
    doc = Document()
    # Configure first section
    sec = doc.sections[0]
    sec.top_margin = Cm(1.2)
    sec.bottom_margin = Cm(1.0)
    sec.left_margin = Cm(1.5)
    sec.right_margin = Cm(1.5)
    sec.footer_distance = Cm(0.5)
    set_page_footer(sec, 1)

    # —— Page 1: 听力 一 / 二 / 三（同原卷）——
    P(doc, "英语 · 四上 · 第五单元练习", size=TITLE, bold=True, center=True, after=3, name="黑体")
    P(doc, "小学________ 四年级____班  姓名____________  成绩________", size=BODY, center=True, after=3)
    P(doc, "听力部分", size=13, bold=True, center=True, after=4, name="黑体")

    S(doc, "一、听句子，判断图片与所听内容是否相符，相符的写“T”，不相符的写“F”。")
    add_pic(doc, CROPS / "sec1.jpg", 15.2)

    S(doc, "二、听短文，根据听到的顺序，用字母 A—F 给下列图片排序。")
    add_pic(doc, CROPS / "sec2.jpg", 13.8)

    S(doc, "三、听问句，选择正确的答语，将序号写在题前括号内。")
    reply3 = [
        [("A", "We have meat and rice for lunch."), ("B", "Eggs are good for us.")],
        [("A", "I'd like to have fish and juice."), ("B", "Yes, please.")],
        [("A", "I want some milk."), ("B", "My favourite food is chicken.")],
        [("A", "I'd like some soup."), ("B", "I'd like some meat.")],
        [("A", "We play with them."), ("B", "We hold them in one hand and pick up food.")],
    ]
    for i, opts in enumerate(reply3, 1):
        line = f"(  ) {i}.  " + "   ".join(f"{lab}. {t}" for lab, t in opts)
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.25
        r = p.add_run(line)
        font_en(r, size=OPT)

    # —— Page 2 ——
    # Use page break within same section then update footer? Multi-section is cleaner.
    # Remove empty first approach: add section without prior page_break
    new_sec = doc.add_section()
    new_sec.top_margin = Cm(1.2)
    new_sec.bottom_margin = Cm(1.0)
    new_sec.left_margin = Cm(1.5)
    new_sec.right_margin = Cm(1.5)
    new_sec.footer_distance = Cm(0.5)
    set_page_footer(new_sec, 2)

    S(doc, "四、听短文，根据短文内容，完成表格。")
    table = doc.add_table(rows=2, cols=4)
    headers = ["Meals", "Breakfast", "Lunch", f"3. {blank(8)}"]
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = ""
        p = cell.paragraphs[0]
        r = p.add_run(h)
        font_en(r, size=OPT, bold=True)
    row = [
        "Food and drinks",
        f"bread, milk, 1. {blank(6)}",
        f"rice, 2. {blank(6)}, vegetables",
        f"chicken, 4. {blank(5)}, 5. {blank(5)}",
    ]
    for i, val in enumerate(row):
        cell = table.rows[1].cells[i]
        cell.text = ""
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run(val)
        font_en(r, size=OPT)

    P(doc, "笔试部分", size=13, bold=True, center=True, before=8, after=4, name="黑体")

    S(doc, "五、读单词，给下列单词分类，将序号写在横线上。")
    P(
        doc,
        "A. ham  B. sweet  C. pizza  D. knife  E. sour  F. fish  "
        "G. fork  H. steak  I. chopstick  J. salty  K. bowl  L. bitter",
        size=OPT,
        after=4,
        en=True,
    )
    for line in [
        f"1. Food: {blank(6)}  {blank(6)}  {blank(6)}  {blank(6)}",
        f"2. Tableware: {blank(6)}  {blank(6)}  {blank(6)}  {blank(6)}",
        f"3. Flavour: {blank(6)}  {blank(6)}  {blank(6)}  {blank(6)}",
    ]:
        P(doc, line, size=BODY, after=4, en=True)

    S(doc, "六、看图读短语，选择与图片相符的短语，将序号写在括号内。")
    for line in [
        "A. a bowl of rice   B. an apple pie   C. a chicken wing   D. mushroom soup",
        "E. some vegetables   F. an ice cream   G. a glass of milk   H. a cup of coffee",
    ]:
        P(doc, line, size=OPT, after=2, en=True)
    add_pic(doc, CROPS / "sec6.jpg", 15.0)

    # —— Page 3：七 / 八 / 九短文上半（同原卷在页中断开）——
    sec3 = doc.add_section()
    sec3.top_margin = Cm(1.2)
    sec3.bottom_margin = Cm(1.0)
    sec3.left_margin = Cm(1.5)
    sec3.right_margin = Cm(1.5)
    sec3.footer_distance = Cm(0.5)
    set_page_footer(sec3, 3)

    S(doc, "七、看图读故事，从方框中选择合适的词语补全故事，将序号写在横线上。")
    P(doc, "A. strawberries   B. chopsticks   C. tomato soup   D. fork   E. good", size=OPT, after=2, en=True)
    add_pic(doc, CROPS / "sec7.jpg", 14.8)

    S(doc, "八、读对话，从方框中选择合适的句子补全对话，将序号写在横线上。")
    for line in [
        "A. I love Chinese food.   B. I'd like to try something different.",
        "C. What would you like to eat?   D. And for dessert?   E. They are good for our body.",
    ]:
        P(doc, line, size=OPT, after=2, en=True)
    for line in [
        f"Maomao: Hi Sara, it's lunch time. 1. {blank(12)}",
        f"Sara: I'd like to have some rice with potatoes and meatballs. 2. {blank(10)} How about you?",
        f"Maomao: 3. {blank(12)} I'd like to have some salad and mushroom soup. 4. {blank(10)}",
        f"Sara: 5. {blank(12)}",
        "Maomao: Cake. That's my favourite.",
    ]:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.2
        r = p.add_run(line)
        font_en(r, size=BODY)

    S(doc, "九、阅读短文，完成任务。")
    # 原卷第 3 页断在 vitamin C 附近
    passage_a = (
        "My family often goes to a restaurant on weekends, and it's my favourite time of the week! "
        "The restaurant is bright and clean, and the waiters are friendly. I always order fish—the fish is yummy. "
        "My brother loves to drink orange juice. It is cold, sweet, and full of vitamin C. My"
    )
    p = doc.add_paragraph()
    p.paragraph_format.first_line_indent = Cm(0.74)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.25
    r = p.add_run(passage_a)
    font_en(r, size=BODY)

    # —— Page 4：短文下半 + 任务一/二（同原卷）——
    sec4 = doc.add_section()
    sec4.top_margin = Cm(1.2)
    sec4.bottom_margin = Cm(1.0)
    sec4.left_margin = Cm(1.5)
    sec4.right_margin = Cm(1.5)
    sec4.footer_distance = Cm(0.5)
    set_page_footer(sec4, 4)

    passage_b = (
        "mum chooses cabbages and potatoes. She says they're super healthy—they're full of vitamins and fiber. "
        "Dad likes to eat meatballs and jiaozi. Eating at the restaurant is always fun and enjoyable. "
        "We talk, laugh, and share our food. The delicious meals make our weekends even more special. "
        "I can't wait to go again next weekend!"
    )
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.25
    r = p.add_run(passage_b)
    font_en(r, size=BODY)

    P(doc, "任务一：根据短文内容，补全对话。", size=SEC, bold=True, before=4, after=4, name="黑体")
    # 清晰文字版对话（原卷气泡小字难读）；留足横线
    dialogue_line(doc, "服务员 Waitress:", "What would you like?")
    dialogue_line(doc, "妈妈 Mum:", f"I'd like some 1. {blank(18)} and 2. {blank(18)}.")
    dialogue_line(doc, "弟弟 Brother:", f"I'd like some 3. {blank(22)}.")
    dialogue_line(doc, "我 I:", f"I'd like some 4. {blank(22)}.")
    dialogue_line(doc, "爸爸 Dad:", f"I'd like some 5. {blank(18)} and 6. {blank(18)}.")

    P(
        doc,
        "任务二：他们一家人都选择了哪些菜品，请在菜单中画“√”。",
        size=SEC,
        bold=True,
        before=14,
        after=6,
        name="黑体",
    )
    add_menu_table(doc)

    path = OUT / "U5_第五单元练习.docx"
    doc.save(path)
    shutil.copy(path, OUT / "U5_Unit5_Practice.docx")
    return path


def build_answers() -> Path:
    doc = Document()
    for s in doc.sections:
        s.top_margin = Cm(1.4)
        s.bottom_margin = Cm(1.2)
        s.left_margin = Cm(1.6)
        s.right_margin = Cm(1.6)
    P(doc, "英语 · 四上 · 第五单元练习 · 参考答案", size=TITLE, bold=True, center=True, after=4, name="黑体")
    P(doc, "含完整英语听力原文 + 全部题目答案（听力据《四上听力材料》第五单元）", size=10, center=True, after=8)

    S(doc, "听力部分 · 原文与答案")
    P(doc, "一、听句子判断 T/F", size=STEM, bold=True, after=2)
    P(doc, "【Listening script】", size=10, bold=True, after=1)
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
        P(doc, f"{i}. {t}", size=BODY, after=1, en=True)
    P(doc, "【Answers】1F  2T  3F  4T  5T", size=BODY, bold=True, after=4)

    P(doc, "二、听短文排序 A—F", size=STEM, bold=True, after=2)
    P(doc, "【Listening script】", size=10, bold=True, after=1)
    P(
        doc,
        "Making fruit salad is easy and fun! Here are the things we need. "
        "We need fruits like bananas, strawberries, and grapes. "
        "We also need a big bowl, a small knife, and some yogurt. "
        "It's a healthy snack. You can make it with a little help from your parents.",
        size=BODY,
        after=2,
        en=True,
    )
    P(doc, "【Answers】纸面图序（上排 L→R / 下排 L→R）：A  D  E  B  C  F", size=BODY, bold=True, after=4)

    P(doc, "三、听选答语", size=STEM, bold=True, after=2)
    P(doc, "【Listening script】", size=10, bold=True, after=1)
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
        P(doc, f"{i}. {t}", size=BODY, after=1, en=True)
    P(doc, "【Answers】1A  2A  3B  4A  5B", size=BODY, bold=True, after=4)

    P(doc, "四、听短文填表", size=STEM, bold=True, after=2)
    P(doc, "【Listening script】", size=10, bold=True, after=1)
    P(
        doc,
        'Hi, I\'m Jack. Everyone needs many kinds of food. My mum tells me, "You are what you eat." '
        "I like to help my family to make a healthy meal plan. Here is the plan. "
        "We have bread, milk and eggs for breakfast. We eat rice, fish and vegetables for lunch. "
        "We have chicken, soup and fruit for dinner. How is my plan?",
        size=BODY,
        after=2,
        en=True,
    )
    P(doc, "【Answers】1 eggs  2 fish  3 Dinner  4 soup  5 fruit", size=BODY, bold=True, after=6)

    S(doc, "笔试部分 · 答案")
    P(doc, "五、分类：1 Food: A C F H；2 Tableware: D G I K；3 Flavour: B E J L", size=BODY, after=3)
    P(doc, "六、看图选短语：1H  2E  3C  4D  5B  6A  7G  8F", size=BODY, after=3)
    P(doc, "七、补全故事：1B  2C  3D  4A  5E", size=BODY, after=3)
    P(doc, "八、补全对话：1C  2A  3B  4E  5D", size=BODY, after=3)
    P(
        doc,
        "九·任务一：1 cabbages  2 potatoes（Mum）  3 orange juice（Brother）  "
        "4 fish（I）  5 meatballs  6 jiaozi（Dad）",
        size=BODY,
        after=2,
    )
    P(doc, "九·任务二：勾选 fish、meatballs、potatoes、cabbages、jiaozi、orange juice。", size=BODY, after=4)

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
            d = word.Documents.Open(str(docx.resolve()))
            d.SaveAs(str(pdf.resolve()), FileFormat=17)
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
    # Clean unused helper noise
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
