document.querySelector("input").addEventListener("change", (event) => {
  /** @type {File} */
  const file = event.target.files[0];
  if (file.size === 0) {
    alert("File is empty");
    return;
  }
  if (file.type !== "video/quicktime") {
    alert("File is not MOV");
    return;
  }
  file.arrayBuffer().then((buf) => {
    const result = walkAtoms(buf);
    console.log(file.name, result);
    if (result) {
      console.log(`video duration: ${result.duration / result.timeScale} sec`);
    }
    event.target.value = null;
  });
});

/** @param {ArrayBuffer} buf  */
function walkAtoms(buf) {
  // https://developer.apple.com/documentation/quicktime-file-format
  // MOVファイルの構造を走査して、timeScaleとdurationを取得する
  // MOV File
  // └─ 'moov' atom
  //   └─ 'mvhd' atom
  //     ├─ 'timeScale' filed
  //     └─ 'duration' filed
  let offset = 0;
  while (offset < buf.byteLength) {
    const atomSize = new DataView(buf, offset, 4).getUint32(0, false);
    const atomType = new TextDecoder().decode(
      new Uint8Array(buf, offset + 4, 4)
    );
    console.debug(atomType, atomSize);
    if (atomType === "moov") {
      const childOffset = offset + 8;
      return walkAtoms(buf.slice(childOffset, childOffset + atomSize));
    } else if (atomType === "mvhd") {
      return getFieldsFromMovieHeaderAtom(buf.slice(offset, offset + atomSize));
    }
    offset += atomSize;
  }
  return null;
}

/** @param {ArrayBuffer} buf  */
function getFieldsFromMovieHeaderAtom(buf) {
  // https://developer.apple.com/documentation/quicktime-file-format/movie_header_atom/duration
  const timeScale = new DataView(buf, 20, 4).getUint32(0, false);
  const duration = new DataView(buf, 24, 4).getUint32(0, false);
  return { timeScale, duration };
}
