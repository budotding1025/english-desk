# 单元练习卷（入库）

来源：四年级上册 U1 / U2 校内练习卷。扫描件在 `source/`，**图题已按原图 + 提示词重绘高清版**并嵌入 Word / PDF。

## 文件

| 文件 | 说明 |
|------|------|
| `U1_第一单元练习.docx` / `U1_Unit1_Practice.docx` | U1 清晰排版 Word（含高清插图） |
| `U2_第二单元练习.docx` / `U2_Unit2_Practice.docx` | U2 清晰排版 Word（含高清插图） |
| `U1_Unit1_Practice.pdf` / `U2_Unit2_Practice.pdf` | 同内容 PDF（可直接打印） |
| `source/u1-*.png` `source/u2-*.png` | 原卷扫描对照 |
| `papers/figures/hd/` | 高清重绘图（43 张） |
| `papers/figures/crops/` | 原卷裁切对照 |
| `listening/` | 官方听力材料 U1–U8 |

## 图题重绘

- 对照 `Unit test/U1-1.png`、`U2-1.png` 原卷裁切
- 用原图作参考 + 提示词生成高清线稿
- 图意按 `AUDIT.md` 核定（红围巾、病床旁站立、U2 发抖感冒等）
- 重新生成：`python exams/_embed_hd_figures.py`

## 听力材料对应

| 试卷 | 听力材料 |
|------|----------|
| U1 三·听选答语 / 四·短文判断 | `listening` 第一单元三、四 |
| U2 三·听选答语 / 四·Tina 短文 | `listening` 第二单元三、四 |

U1 四参考答案：**1√ 2√ 3× 4× 5√**  
U2 四参考答案：**1T 2F 3T 4F 5F**
