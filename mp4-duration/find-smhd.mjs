import { Buffer } from "node:buffer";
import { createReadStream } from "node:fs";

/**
 * Detect specified mp4/mov file has sound track.
 * @param {string} filepath
 * @returns {Promise<boolean>}
 */
export async function findSmhd(filepath) {
  if (!filepath) {
    throw new Error("Filepath is required");
  }

  const stream = createReadStream(filepath);

  let ftypChecked = false;
  /** @type {number} */
  let moovAtomSize = -1;
  /** @type {Buffer} */
  let moovBuffer;
  for await (const chunk of stream) {
    // Note: https://gist.github.com/Elements-/cf063254730cd754599e
    const buf = Buffer.from(chunk.buffer);

    if (!ftypChecked) {
      // First chunk should be 'ftyp' box.
      if (buf.indexOf(Buffer.from("ftyp")) !== 4) {
        throw new Error(`File is not mp4 or mov. 'ftyp' is missing for ${url}`);
      }
      ftypChecked = true;
    }

    // 最初に moov アトムを見つけたら、サイズを満たすまでバッファを読み込む
    if (moovAtomSize < 0) {
      const moovAtomIndex = buf.indexOf(Buffer.from("moov"));
      if (moovAtomIndex >= 0) {
        // console.log("moov", moovAtomIndex);
        moovAtomSize = buf.readUInt32BE(moovAtomIndex - 4, 4);
        // console.log("moovAtomSize", moovAtomSize);
        moovBuffer = Buffer.from(buf.subarray(moovAtomIndex - 4));
      }
    } else {
      moovBuffer = Buffer.concat([moovBuffer, buf]);
    }
    if (moovBuffer?.length >= moovAtomSize) {
      break;
    }
  }
  if (moovBuffer == null) {
    throw new Error("moov atom not found");
  }
  return moovBuffer.indexOf(Buffer.from("smhd")) >= 0;
}

console.log("'smhd' atom is exist?", await findSmhd(process.argv.at(2)));
