const video = document.getElementById("video");
// const videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const videoSrc = getUrl();

if (video.canPlayType("application/vnd.apple.mpegurl")) {
  console.info("Native HLS support");
  video.src = videoSrc;
} else if (Hls.isSupported()) {
  console.info("HLS.js is supported");
  const hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
}

function getUrl() {
  // m3u8 をmp4ぶっ込んでHLS再生できないか試したが、ダメだったもの。
  // https://mstssk.dev/example-video-elem-controls/video.mp4
  // そもそもHLSの仕様としてmp4を食えるわけではない。
  // https://stackoverflow.com/a/31359010
  const content = `#EXTM3U
#EXT-X-STREAM-INF:PROGRAM-ID=1
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
`.trim();
  console.log(content);
  const blob = new Blob([content], { type: "application/vnd.apple.mpegurl" });
  return URL.createObjectURL(blob);
}
