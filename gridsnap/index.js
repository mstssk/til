/** 拡大率 */
const zoom = 25;

/**
 * @param {number} x X座標
 * @returns 拡大率を考慮してスナップしたX軸の値
 */
function snap(x) {
  console.log(x);
  x = parseInt(x);
  let point = Math.floor(x / zoom);
  if (x % zoom >= zoom / 2) {
    point += 1; // 四捨五入代わり
  }
  return point;
}

// $ node ./index.js 123
console.log(snap(process.argv[2]));
