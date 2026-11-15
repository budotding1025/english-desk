# 单元练习卷（入库）

来源：四年级上册校内练习卷。扫描件在 `source/` / `Unit test/`。

## 文件

| 文件 | 说明 |
|------|------|
| `U1_Unit1_Practice.pdf` / `U1_第一单元练习.pdf` | U1 高清插图版 · 可打印 |
| `U1_Unit1_Practice_Answers.pdf` / `U1_第一单元练习_答案.pdf` | U1 参考答案（完整听力原文 + 全题） |
| `U2_Unit2_Practice.pdf` / `U2_第二单元练习.pdf` | U2 高清插图版 · 可打印 |
| `U2_Unit2_Practice_Answers.pdf` / `U2_第二单元练习_答案.pdf` | U2 参考答案（完整听力原文 + 全题） |
| `U3_Unit3_Practice.pdf` / `U3_第三单元练习.pdf` | U3 排版版（嵌原卷附图）· 可打印 |
| `U3_Unit3_Practice_Answers.pdf` / `U3_第三单元练习_答案.pdf` | U3 参考答案（完整听力原文 + 全题） |
| `U3_Unit3_Practice_Scan.pdf` / `U3_第三单元练习_原卷扫描.pdf` | U3 原卷截图单页 |
| `U4_Unit4_Practice.pdf` / `U4_第四单元练习.pdf` | U4 排版版（嵌原卷图裁切）· 可打印 |
| `U4_Unit4_Practice_Answers.pdf` / `U4_第四单元练习_答案.pdf` | U4 参考答案（完整听力原文 + 全题） |
| `U4_Unit4_Practice_Scan.pdf` / `U4_第四单元练习_原卷扫描.pdf` | U4 原卷高清页拼接 |
| `U5_Unit5_Practice.pdf` / `U5_第五单元练习.pdf` | U5 排版版（嵌原卷附图）· 可打印 |
| `U5_Unit5_Practice_Answers.pdf` / `U5_第五单元练习_答案.pdf` | U5 参考答案（完整听力原文 + 全题） |
| `U5_Unit5_Practice_Scan.pdf` / `U5_第五单元练习_原卷扫描.pdf` | U5 原卷照片单页 |
| `source/u1-*` `u2-*` `u3-*` `u4-*` `u5-*` | 原卷扫描 / 裁切 |
| `papers/figures/hd/` | U1/U2 高清重绘图 |
| `listening/` | 官方听力材料 U1–U8 |

## 状态

| 单元 | 可打印 PDF | 答案 | 原卷照片 | 试卷听力音频 |
|------|------------|------|----------|--------------|
| U1 | ✅ 高清重绘 | ✅ 答案 PDF | ✅ | ✅ |
| U2 | ✅ 高清重绘 | ✅ 答案 PDF | ✅ | ✅ |
| U3 | ✅ 排版+附图 / 扫描 | ✅ 原文+全题 | ✅ | ✅ |
| U4 | ✅ 排版+裁切 / 扫描 | ✅ 原文+全题 | ✅ | ✅ |
| U5 | ✅ 排版+附图 / 扫描 | ✅ 原文+全题 | ✅ | ✅（四年级偏慢语速） |

## 听力材料对应

| 试卷 | 听力材料 |
|------|----------|
| U1 三/四 | `listening` 第一单元三、四 |
| U2 三/四 | `listening` 第二单元三、四（Tina） |
| U3 一～五 | `listening` 第三单元一～五 |
| U4 一～五 | `listening` 第四单元一～五 |
| U5 一～四 | `listening` 第五单元一～四 |

## 重新生成

- U1/U2 嵌高清图：`python exams/_embed_hd_figures.py`
- U3：`python exams/build_u3_paper.py`
- U4：`python exams/build_u4_paper.py`
- U5：`python exams/build_u5_paper.py`
- U5 听力（四年级语速）：`python exams/_gen_u5_listening_audio.py`
- 听力音频（U1–U4）：`python _gen_listening_audio.py`

## 配套音频

Records → **试卷听力（配套音频）**（设置里选 Unit 1–5）。  
答案 PDF 含完整 **Listening script** 与全部题目答案。  

## 排版约定（以后新卷照此）

- 原卷有图 → 成稿嵌图；有表 → 带边框真表格。  
- 页脚只留一点点；空白留给填空/行距，勿空一大块给页脚。  
- 分页跟原卷；难读气泡旁附小图 + 清晰文字填空。  
- 细则见 Cursor skill `exam-from-photo` 与 `reference-english-desk.md`（以 U5 `build_u5_paper.py` 为样板）。  

U5 音频按小学四年级课堂语速放慢（edge-tts约 -18%）。
