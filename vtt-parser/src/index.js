const outputElem = document.getElementById("output");

document.forms[0].addEventListener("reset", () => {
  console.debug("reset");
  outputElem.innerHTML = "";
});

document.getElementById("input-url").addEventListener("change", (e) => {
  const url = e.target.value;
  fetch(url)
    .then((response) => response.blob())
    .then(processVtt);
});

document.getElementById("input-file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  processVtt(file);
});

async function processVtt(blob) {
  const blobUrl = URL.createObjectURL(blob);
  try {
    const result = await parseVttBlob(blobUrl);
    outputElem.innerHTML = JSON.stringify(result, null, 2);
  } catch (error) {
    console.error(error);
    outputElem.innerHTML = "Error loading VTT file";
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

/**
 * @param {string} blobUrl
 * @returns
 */
function parseVttBlob(blobUrl) {
  return new Promise((resolve, reject) => {
    const trackElem = document.createElement("track");
    trackElem.src = blobUrl;
    trackElem.kind = "subtitles";
    trackElem.srclang = "ja";
    trackElem.default = true;

    const audioElem = document.createElement("audio");
    audioElem.preload = "auto";
    audioElem.appendChild(trackElem);
    audioElem.addEventListener("loadeddata", () => {
      console.debug("loadeddata");
      const result = [];
      Array.from(audioElem.textTracks[0].cues).forEach((cue) => {
        console.debug(cue);
        result.push({
          start: cue.startTime,
          end: cue.endTime,
          text: cue.text,
        });
      });
      resolve(result);
    });
    audioElem.addEventListener("error", (e) => {
      reject(e);
    });
    // ダミーの0.001秒のAACファイルを読み込む
    audioElem.src =
      "data:audio/aac;base64,//FQQAOf/N4CAExhdmM2MS4xOS4xMDAAAjBADv/xUEABf/wBGCAH";
  });

  // return new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.onload = function () {
  //     const text = reader.result;
  //     resolve(text);
  //   };
  //   reader.onerror = reject;
  //   reader.readAsText(blob);
  // });
}
