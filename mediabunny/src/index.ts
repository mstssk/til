import {
  Output,
  BufferTarget,
  WebMOutputFormat,
  MediaStreamVideoTrackSource,
  MediaStreamAudioTrackSource,
  QUALITY_MEDIUM,
} from "mediabunny";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  startButton!.addEventListener("click", () => {
    console.log("Recording started");
    startRecording();
  });
  console.log("ready");
});

async function startRecording() {
  const userMedia = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true,
  });

  const videoTrack = userMedia.getVideoTracks()[0];
  const audioTrack = userMedia.getAudioTracks()[0];

  const output = new Output({
    format: new WebMOutputFormat(),
    target: new BufferTarget(),
  });

  if (videoTrack) {
    const source = new MediaStreamVideoTrackSource(videoTrack, {
      codec: "vp9",
      bitrate: QUALITY_MEDIUM,
    });
    output.addVideoTrack(source);
  }

  if (audioTrack) {
    const source = new MediaStreamAudioTrackSource(audioTrack, {
      codec: "opus",
      bitrate: QUALITY_MEDIUM,
    });
    output.addAudioTrack(source);
  }

  await output.start();

  // Wait...
  await new Promise((resolve) => setTimeout(resolve, 5100));

  await output.finalize();

  // ストリームの終了
  userMedia.getTracks().forEach((track) => {
    track.stop();
  });

  if (output.target.buffer) {
    const mimeType = await output.getMimeType();
    const blobUrl = URL.createObjectURL(new Blob([output.target.buffer]));
    console.log(mimeType, blobUrl);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `video-${getTimestampStr()}.webm`;
    a.type = mimeType;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl); // 後片付け
  }
}

/**
 * @returns `YYYY-MM-DD-HH-mm-ss`
 */
function getTimestampStr() {
  const now = new Date();
  return now.toISOString().replace(/T/, "-").replace(/:/g, "-").slice(0, 19);
}
