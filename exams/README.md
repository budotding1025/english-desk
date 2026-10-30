# 单元练习卷（入库）

来源：四年级上册校内练习卷。扫描件在 `source/` / `Unit test/`。

## 文件

| 文件 | 说明 |
|------|------|
| `U1_Unit1_Practice.pdf` / `U1_第一单元练习.pdf` | U1 高清插图版 · 可打印 |
| `U2_Unit2_Practice.pdf` / `U2_第二单元练习.pdf` | U2 高清插图版 · 可打印 |
| `U4_Unit4_Practice.pdf` / `U4_第四单元练习.pdf` | U4 排版版（嵌原卷图裁切）· 可打印 |
| `U4_Unit4_Practice_Answers.pdf` / `U4_第四单元练习_答案.pdf` | U4 参考答案 |
| `U4_Unit4_Practice_Scan.pdf` / `U4_第四单元练习_原卷扫描.pdf` | U4 原卷高清页拼接（对照打印） |
| `source/u1-*` `u2-*` `u4-*` | 原卷扫描 / 裁切 |
| `source/crops/hq_p*.jpg` | U4 高清单页 |
| `papers/figures/hd/` | U1/U2 高清重绘图 |
| `listening/` | 官方听力材料 U1–U8 |

## 状态

| 单元 | 可打印 PDF | 答案 | 原卷照片 |
|------|------------|------|----------|
| U1 | ✅ 高清重绘 | 卷末/材料 | ✅ |
| U2 | ✅ 高清重绘 | 卷末/材料 | ✅ |
| U3 | ❌ 未入库 | — | ❌ 缺照片 |
| U4 | ✅ 排版+原图裁切 / 扫描 PDF | ✅ 单独答案 PDF | ✅ |

## 听力材料对应

| 试卷 | 听力材料 |
|------|----------|
| U1 三/四 | `listening` 第一单元三、四 |
| U2 三/四 | `listening` 第二单元三、四（Tina） |
| U4 一～五 | `listening` 第四单元一～五 |

U1 四参考答案：**1√ 2√ 3× 4× 5√**  
U2 四参考答案：**1T 2F 3T 4F 5F**  
U4 三～五 / 笔试详见 `U4_Unit4_Practice_Answers.pdf`

## 重新生成

- U1/U2 嵌高清图：`python exams/_embed_hd_figures.py`
- U4：`python exams/_gen_u4_paper.py`

## 配套音频（练习用）

Records → **试卷听力（配套音频）**（设置里选对应单元）。  
U1/U2 已接整套；U4 听力脚本已在材料中，在线加练可后续对齐。
