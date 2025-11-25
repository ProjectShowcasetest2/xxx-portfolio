# 教育 × IT × 自動化ポートフォリオ  
### Quiet Engineer Portfolio – XXXPORTFOLIOXXX Project

このリポジトリは、教材制作現場で発生する  
**煩雑なデータ処理・構造変換・検査作業を自動化するためのスクリプト集** です。

10年以上にわたり教育教材のデジタル化（デジタル教科書・ICT教材）に携わる中で、  
現場の負担を軽減し、品質と速度を両立するための仕組みを実装してきました。
---
## 🎯 このプロジェクトの目的
手作業のミスを排除し、作業時間を大幅に短縮する  
このプロジェクトは、教材制作現場で実際に求められている  
**“実務寄りの自動化技術”** を提示するものです。
---
## 🧩 技術スタック
- **正規表現（Regex）**
- 
教育現場の “現実の課題” に対応するため、  
派手なライブラリではなく **確実に動くコア技術で構築** しています。
### ✔ 教材制作にありがちな構造崩れ
長文データは  
- 行頭の全角スペース  
- 改ページ記号  
- 句点の揺れ  
- インデント不整合  
など多くのノイズを含みます。
本スクリプトはそれらを **機械的に標準化** し、  “人が直さなくてよい状態” に持っていきます。

## 🛠 実装されている代表機能

### 🔹 1. セクション抽出
function extractSection(text, key) { ... }

🔹 2. スタイル名の統一
const STYLE_XXXPORTFOLIOXXX_01 = "style_xxx_01";

🔹 3. process_XXXPORTFOLIOXXX_* 関数群
function process_XXXPORTFOLIOXXX_00(text) { ... }
function process_XXXPORTFOLIOXXX_01(text) { ... }

🔹 4. 長文整形
text = text.replace(/\r?\n/g, "\n");

🔹 5. 自動ログ生成（確認用）
console.log(`[INFO] processed: ${sectionName}`);

※ 機密情報を避けるため、固有名詞は
XXXPORTFOLIOXXX_00 形式に自動置換済みです。
