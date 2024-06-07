const os = require("node:os");
const fs = require("node:fs").promises;
const path = require("node:path");
const crypto = require("node:crypto");
const exec = require("node:util").promisify(require("node:child_process").exec);

(async () => {
  const tmpDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `test-ffmpeg-${crypto.randomUUID()}`)
  );

  // 入力ファイルのダウンロード
  const tmpPath = path.join(tmpDir, `input.mp4`);
  console.log("Start download into:");
  console.log(tmpPath);
  const url = "https://mstssk.dev/example-video-elem-controls/video.mp4";
  const res = await fetch(url);
  await fs.writeFile(tmpPath, Buffer.from(await res.arrayBuffer()));
  console.log("Downloaded!\n");

  // ffmpegで変換
  const outPath = path.join(tmpDir, `output.mp4`);
  console.log("Start converting into:");
  console.log(outPath);
  const ffmpegResult = await exec(
    `./bin/ffmpeg -i ${tmpPath} -r 30 ${outPath}`
  );
  if (ffmpegResult.stdout) {
    process.stdout.write(ffmpegResult.stdout);
  }
  if (ffmpegResult.stderr) {
    process.stdout.write(ffmpegResult.stderr);
  }
  console.log("Converted!\n");

  // 出力ファイルをダウンロードフォルダに移動
  console.log("Move to Downloads dir:");
  await exec(`mv -f ${outPath} ~/Downloads/`);

  // あとかたづけ
  await fs.rm(tmpDir, { recursive: true, force: true });

  // 出力ファイルを開く
  await exec(`open ~/Downloads/`);
})();
