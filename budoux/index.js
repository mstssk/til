import { loadDefaultJapaneseParser, Parser } from "budoux";
const parser = loadDefaultJapaneseParser();
// const parser = new Parser({});
// console.log(parser.model);
// console.log(parser.parse("今日は天気です。"));

console.log(
  parser.parse(`クトゥルフ(Cthulhu)とは、クトゥルフ神話に登場する架空の神、あるいは宇宙生物である。「大いなるクトゥルフ」などとも呼ばれる。

クトゥルフ神話の名に冠されている。初出はハワード・フィリップス・ラヴクラフト（以下HPL）の小説『クトゥルフの呼び声』（The Call of Cthulhu、1926年）[2]。以降、多くの作品に登場している。人間では太刀打ちできない太古の地球の支配者であり、HPLの理念「コズミックホラー（人間の繁栄が宇宙からすれば短いものであるとした宇宙的恐怖）」を象徴するキャラクターとして、また「クトゥルフ神話」ジャンルの代名詞として知られている。

日本語では幾つかの表記がある（詳細後述）が、本項では、一般的な表記のひとつである「クトゥルフ」を用いる。`)
);
