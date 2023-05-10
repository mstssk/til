const fs = require("node:fs").promises;
const path = require("node:path");
const sharp = require("sharp");
const svgo = require("svgo");

const OUT_DIR = "dist";

(async () => {
  // cleanup
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(`${OUT_DIR}/.gitignore`, "/*"); // ignore dist

  const files = [
    "fixtures/input.jpg",
    "fixtures/input.png",
    "fixtures/input.svg",
  ];
  for (const file of files) {
    await imagemin(file);
  }
})();

/**
 * @param {string} inputPath
 */
async function imagemin(inputPath) {
  console.log(inputPath);
  const result = inputPath.toLowerCase().endsWith(".svg")
    ? await imagemin_svgo(inputPath)
    : await imagemin_sharp(inputPath);
  const stat = await fs.stat(inputPath);
  console.log(stat.size, "->", result.length);
  console.log(stat.size > result.length ? "👍 Minified" : "🙆 Skipped");
  await fs.writeFile(`${OUT_DIR}/${path.basename(inputPath)}`, result);
}

async function imagemin_sharp(inputPath) {
  const sh = sharp(inputPath);
  const metadata = await sh.metadata();
  switch (metadata.format) {
    case "jpeg":
      return sh.jpeg().toBuffer();
    case "png":
      return sh.png().toBuffer();
    // case "gif":
    //   return sh.gif().toBuffer();
  }
  throw new Error(`unknown format: ${inputPath}`);
}

async function imagemin_svgo(inputPath) {
  const file = await fs.readFile(inputPath, "utf8");
  const output = svgo.optimize(file, {
    plugins: [
      {
        name: "preset-default",
        params: { overrides: { removeViewBox: false } },
      },
    ],
  });
  return output.data;
}
