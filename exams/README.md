# 单元练习卷（入库）

来源：四年级上册校内练习卷。扫描件在 `source/` / `Unit test/`。

## 文件

| 文件 | 说明 |
|------|------|
| `U1_Unit1_Practice.pdf` / `U1_第一单元练习.pdf` | U1 高清插图版 · 可打印 |
| `U2_Unit2_Practice.pdf` / `U2_第二单元练习.pdf` | U2 高清插图版 · 可打印 |
| `U3_Unit3_Practice.pdf` / `U3_第三单元练习.pdf` | U3 排版版（嵌原卷附图）· 可打印 |
| `U3_Unit3_Practice_Answers.pdf` / `U3_第三单元练习_答案.pdf` | U3 参考答案（完整听力原文 + 全题） |
| `U3_Unit3_Practice_Scan.pdf` / `U3_第三单元练习_原卷扫描.pdf` | U3 原卷截图单页 |
| `U4_Unit4_Practice.pdf` / `U4_第四单元练习.pdf` | U4 排版版（嵌原卷图裁切）· 可打印 |
| `U4_Unit4_Practice_Answers.pdf` / `U4_第四单元练习_答案.pdf` | U4 参考答案（完整听力原文 + 全题） |
| `U4_Unit4_Practice_Scan.pdf` / `U4_第四单元练习_原卷扫描.pdf` | U4 原卷高清页拼接 |
| `source/u1-*` `u2-*` `u3-*` `u4-*` | 原卷扫描 / 裁切 |
| `papers/figures/hd/` | U1/U2 高清重绘图 |
| `listening/` | 官方听力材料 U1–U8 |

## 状态

| 单元 | 可打印 PDF | 答案 | 原卷照片 | 试卷听力音频 |
|------|------------|------|----------|--------------|
| U1 | ✅ 高清重绘 | 卷末/材料 | ✅ | ✅ |
| U2 | ✅ 高清重绘 | 卷末/材料 | ✅ | ✅ |
| U3 | ✅ 排版+附图 / 扫描 | ✅ 原文+全题 | ✅ | ✅ |
| U4 | ✅ 排版+裁切 / 扫描 | ✅ 原文+全题 | ✅ | ✅ |

## 听力材料对应

| 试卷 | 听力材料 |
|------|----------|
| U1 三/四 | `listening` 第一单元三、四 |
| U2 三/四 | `listening` 第二单元三、四（Tina） |
| U3 一～五 | `listening` 第三单元一～五 |
| U4 一～五 | `listening` 第四单元一～五 |

## 重新生成

- U1/U2 嵌高清图：`python exams/_embed_hd_figures.py`
- U3：`python exams/build_u3_paper.py`
- U4：`python exams/build_u4_paper.py`
- 听力音频：`python _gen_listening_audio.py`

## 配套音频

Records → **试卷听力（配套音频）**（设置里选 Unit 1–4）。  
答案 PDF 含完整 **Listening script** 与全部题目答案。
