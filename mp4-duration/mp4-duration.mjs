import { Buffer } from "node:buffer";

/**
 * Get the duration of a mp4 video url
 * Return quickly if mp4 is 'faststart'.
 * @param {string} url
 * @returns {Promise<{duration: number, timescale: number}>}
 */
export async function mp4Duration(url) {
  if (!url) {
    throw new Error("URL is required");
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  let ftypChecked = false;
  for await (const chunk of res.body) {
    // Note: https://gist.github.com/Elements-/cf063254730cd754599e
    const buf = Buffer.from(chunk.buffer);

    if (!ftypChecked) {
      // First chunk should be 'ftyp' box.
      if (buf.indexOf(Buffer.from("ftyp")) !== 4) {
        throw new Error(`File is not mp4 or mov. 'ftyp' is missing for ${url}`);
      }
      ftypChecked = true;
    }

    const index = buf.indexOf(Buffer.from("mvhd"));
    if (index >= 0) {
      const start = index + 17;
      const timescale = buf.readUInt32BE(start, 4);
      const duration = buf.readUInt32BE(start + 4, 4);
      return { duration, timescale, durationInSeconds: duration / timescale };
    }
  }
  throw new Error(`mvhd block not found for ${url}`);
}
