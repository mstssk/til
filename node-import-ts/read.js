// Usage: node --experimental-strip-types read.js
// 必要: Node.js v22

// dirフォルダの下のtsファイルを動的にimportして内容を出力する
import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadModules() {
  const dir = join(__dirname, "dir");
  const files = await readdir(dir);
  for (const file of files) {
    if (file.endsWith(".ts")) {
      const module = await import(join(dir, file));
      console.log(module.config);
    }
  }
}

loadModules();
