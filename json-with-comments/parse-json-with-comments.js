/**
 * JSON with Commentsの簡易パース
 * https://code.visualstudio.com/docs/languages/json#_json-with-comments
 * @param {string} text
 * @returns any
 */
export function parseJsonWithComments(text) {
  // コメントとケツカンマが許容されるので、それらだけ削除する
  text = text.replace(/\/\/.*/g, ""); // Delete inline comments
  text = text.replace(/\/\*.+?\*\//gs, ""); // Delete block comments
  text = text.replace(/,(?=\s*?[\]\}])/g, ""); // Delete trailing commas
  // console.debug(text);
  return JSON.parse(text);
}
