# -*- coding: utf-8 -*-
"""Build U1/U2 answer keys (listening scripts + full answers) as Word/PDF."""
from __future__ import annotations

import shutil
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.shared import Cm, Pt

OUT = Path(__file__).resolve().parent


def font(run, name="宋体", size=11, bold=False):
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold


def P(doc, text, *, size=11, bold=False, center=False, before=0, after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(text)
    font(r, size=size, bold=bold)
    return p


def S(doc, text):
    P(doc, text, size=12, bold=True, before=10, after=6)


def new_doc():
    doc = Document()
    for s in doc.sections:
        s.top_margin = Cm(1.6)
        s.bottom_margin = Cm(1.4)
        s.left_margin = Cm(1.8)
        s.right_margin = Cm(1.8)
    return doc


def build_u1_answers() -> Path:
    doc = new_doc()
    P(doc, "英语 · 四上 · 第一单元练习 · 参考答案", size=16, bold=True, center=True, after=6)
    P(doc, "含完整英语听力原文 + 全部题目答案（听力据《四上听力材料》第一单元）", size=10, center=True, after=12)

    S(doc, "听力部分 · 原文与答案")

    P(doc, "一、听句子，选择正确的图片", size=12, bold=True, after=4)
    P(doc, "【Listening script】", size=10, bold=True, after=2)
    for i, t in enumerate(
        [
            "The boy is happy. He got an A in the test.",
            "The boy is excited. He is going to the amusement park.",
            "The girl is worried. She can't find her new book.",
            "They are looking for the key together.",
            "Taking a walk always helps me calm down.",
            "Don't cry. Your dog will come back.",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=10, after=2)
    P(
        doc,
        "【Answers】对照练习卷附图，在与句子相符的图片方框内画 √（共 6 题）。",
        size=10,
        after=8,
    )

    P(doc, "二、听对话，给图片排序 1–4", size=12, bold=True, after=4)
    P(doc, "【Listening script】（heard in this order）", size=10, bold=True, after=2)
    for i, t in enumerate(
        [
            "How do you feel today? — I am really happy. I'm back at school.",
            "What's wrong? You look sad. — I can't find my dog.",
            "My brother is ill. I'm worried about him. — Don't worry. He will get well soon.",
            "My toy plane is broken. What should I do? — Let's try to fix it together.",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=10, after=2)
    P(doc, "【Answers】按听力顺序在附图上标 1–4。", size=10, after=8)

    P(doc, "三、听句子，选择正确的答语", size=12, bold=True, after=4)
    P(doc, "【Listening script】", size=10, bold=True, after=2)
    for i, t in enumerate(
        [
            "How do you feel today?",
            "Your brother looks sad. What's the matter?",
            "Why are you so angry?",
            "How do you feel now?",
            "Why does she look worried?",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=10, after=2)
    P(doc, "【Answers】1A  2A  3B  4A  5B", size=11, bold=True, after=2)
    P(
        doc,
        "1 How do you feel today? → I'm excited.  "
        "2 What's the matter? → He can't find his cat.  "
        "3 Why are you so angry? → I'm angry because he broke my pencil.  "
        "4 How do you feel now? → I'm happy now.  "
        "5 Why does she look worried? → She can't find her English book.",
        size=9,
        after=8,
    )

    P(doc, "四、听短文，判断正误 √ / ×", size=12, bold=True, after=4)
    P(doc, "【Listening script】", size=10, bold=True, after=2)
    P(
        doc,
        "This is my first day of school. I'm happy, because I can play with my friend in the classroom. "
        "And we can read interesting books. But my mother is angry, because my room is not tidy. "
        "So after school I clean my room. My mother is happy again.",
        size=10,
        after=4,
    )
    P(doc, "【Answers】1√  2√  3×  4×  5√", size=11, bold=True, after=2)
    P(
        doc,
        "1 第一天上学 √；2 开心因能和朋友玩、读有趣的书 √；"
        "3 妈妈生气因房间不整洁，不是没做作业 ×；"
        "4 放学后打扫房间，不是在教室玩游戏 ×；5 打扫后妈妈又开心 √。",
        size=9,
        after=10,
    )

    S(doc, "笔试部分 · 答案")
    P(doc, "五、划线发音：1√  2√  3√  4×", size=11, after=4)
    P(doc, "六、同类词：1 B/C/E（worried / sad / angry）  2 D/G/H（fix / look / find）  3 A/F/I（sunny / cloudy / rainy）", size=10, after=4)
    P(doc, "七、看图选句：1B  2A  3E  4C  5D", size=11, after=4)
    P(doc, "八、问句答语：1B  2A  3D  4E  5C", size=11, after=4)
    P(doc, "九、补全对话：1C  2B  3D  4E  5A", size=11, after=4)
    P(doc, "十·任务一：1B  2C  3A  4C  5C", size=11, after=4)
    P(
        doc,
        "十·任务二（参考）：I'm happy when I play with my friends. / "
        "I'm happy when I help others and see them smile.",
        size=10,
        after=8,
    )

    path = OUT / "U1_第一单元练习_答案.docx"
    doc.save(path)
    shutil.copy(path, OUT / "U1_Unit1_Practice_Answers.docx")
    return path


def build_u2_answers() -> Path:
    doc = new_doc()
    P(doc, "英语 · 四上 · 第二单元练习 · 参考答案", size=16, bold=True, center=True, after=6)
    P(doc, "含完整英语听力原文 + 全部题目答案（听力据《四上听力材料》第二单元）", size=10, center=True, after=12)

    S(doc, "听力部分 · 原文与答案")

    P(doc, "一、听句子，选择正确的图片", size=12, bold=True, after=4)
    P(doc, "【Listening script】", size=10, bold=True, after=2)
    for i, t in enumerate(
        [
            "I'm reading a story book at home. I love story books.",
            "My brother is writing a poem.",
            "Reading aloud is a good way to study English.",
            "My friend Amy is ill. I should call her.",
            "This book is about animals.",
            "You should drink some warm water.",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=10, after=2)
    P(
        doc,
        "【Answers】对照练习卷附图，在与句子相符的图片方框内画 √（共 6 题）。",
        size=10,
        after=8,
    )

    P(doc, "二、听对话，判断图片是否相符 √ / ×", size=12, bold=True, after=4)
    P(doc, "【Listening script】（heard in this order）", size=10, bold=True, after=2)
    for i, t in enumerate(
        [
            "What are you doing? — I'm writing a story.",
            "What's the matter? — I can't remember English words.",
            "What are you reading? — I'm reading a story book.",
            "May I speak to Lingling? — Sorry, she is not at home.",
            "You should drink some warm water. — Thank you.",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=10, after=2)
    P(doc, "【Answers】对照练习卷附图，相符画 √，不相符画 ×。", size=10, after=8)

    P(doc, "三、听问句，选择正确的答语", size=12, bold=True, after=4)
    P(doc, "【Listening script】", size=10, bold=True, after=2)
    for i, t in enumerate(
        [
            "May I speak to Sara?",
            "What's the matter, Tina?",
            "What is Mike doing?",
            "Can I read it with you?",
            "What are you doing?",
        ],
        1,
    ):
        P(doc, f"{i}. {t}", size=10, after=2)
    P(doc, "【Answers】1B  2A  3B  4A  5A", size=11, bold=True, after=2)
    P(
        doc,
        "1 May I speak to Sara? → Sorry, she is not home.  "
        "2 What's the matter, Tina? → I can't remember the poem.  "
        "3 What is Mike doing? → He is doing homework.  "
        "4 Can I read it with you? → Sure.  "
        "5 What are you doing? → I'm drawing a picture.",
        size=9,
        after=8,
    )

    P(doc, "四、听短文，判断正误 T / F", size=12, bold=True, after=4)
    P(doc, "【Listening script】", size=10, bold=True, after=2)
    P(
        doc,
        "I have a wonderful friend named Tina. We are in the same class. Every day, we walk to school together. "
        "At school, we love art class. We like drawing pictures. We often help each other. "
        "Once, I forgot my crayons, and Tina shared her crayons with me. After class, we play games. "
        "After school, we do homework at each other's homes. On weekends, we go to the park and fly kites. "
        "I'm so lucky to have Tina as my friend!",
        size=10,
        after=4,
    )
    P(doc, "【Answers】1T  2F  3T  4F  5F", size=11, bold=True, after=2)
    P(
        doc,
        "1 Tina 是好朋友 T；2 每天走路去学校，不是 by car F；3 喜欢美术课 T；"
        "4 经常互相帮助，不只在美术课 F；5 周末去公园放风筝，不是 zoo F。",
        size=9,
        after=10,
    )

    S(doc, "笔试部分 · 答案")
    P(doc, "五、画线发音：1×  2√  3×  4√", size=11, after=4)
    P(doc, "六、异类词：1C  2D  3B  4A  5A", size=11, after=2)
    P(
        doc,
        "1 hard 形容词，其余动词；2 sing 原形，其余 -ing；3 visit 动词，其余名词；"
        "4 good 形容词，其余动词；5 friend 朋友类，其余家庭成员。",
        size=9,
        after=4,
    )
    P(doc, "七、看图选句：1B  2A  3E  4C  5D", size=11, after=4)
    P(doc, "八、问句答语：1B  2D  3E  4C  5A  6F", size=11, after=4)
    P(doc, "九、补全对话：1E  2C  3B  4A  5D", size=11, after=4)
    P(doc, "十·任务一：1B  2B  3A  4C  5C", size=11, after=4)
    P(
        doc,
        "十·任务二（参考）：AnAn is my good friend. She often gives me gifts. / "
        "I often help her with English.",
        size=10,
        after=8,
    )

    path = OUT / "U2_第二单元练习_答案.docx"
    doc.save(path)
    shutil.copy(path, OUT / "U2_Unit2_Practice_Answers.docx")
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


def main():
    u1 = build_u1_answers()
    u2 = build_u2_answers()
    print("docx", u1.name, u2.name)
    export_pdfs(
        [
            OUT / "U1_Unit1_Practice_Answers.docx",
            OUT / "U2_Unit2_Practice_Answers.docx",
        ]
    )
    shutil.copy(OUT / "U1_Unit1_Practice_Answers.pdf", OUT / "U1_第一单元练习_答案.pdf")
    shutil.copy(OUT / "U2_Unit2_Practice_Answers.pdf", OUT / "U2_第二单元练习_答案.pdf")
    # keep Chinese-named docx in sync too
    shutil.copy(OUT / "U1_Unit1_Practice_Answers.docx", OUT / "U1_第一单元练习_答案.docx")
    shutil.copy(OUT / "U2_Unit2_Practice_Answers.docx", OUT / "U2_第二单元练习_答案.docx")
    print("done")


if __name__ == "__main__":
    main()
