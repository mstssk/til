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
  const contentType = res.headers.get("content-type");
  if (
    !contentType.startsWith("video/mp4") &&
    !contentType.startsWith("application/octet-stream")
  ) {
    throw new Error(`Invalid content type: ${contentType} for ${url}`);
  }

  const mvhdBuf = Buffer.from("mvhd");
  for await (const chunk of res.body) {
    // Note: https://gist.github.com/Elements-/cf063254730cd754599e
    const buf = Buffer.from(chunk.buffer);
    const index = buf.indexOf(mvhdBuf);
    if (index >= 0) {
      const start = index + 17;
      const timescale = buf.readUInt32BE(start, 4);
      const duration = buf.readUInt32BE(start + 4, 4);
      return { duration, timescale, durationInSeconds: duration / timescale };
    }
  }
  throw new Error(`mvhd block not found for ${url}`);
}
