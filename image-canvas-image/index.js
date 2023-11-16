window.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLInputElement} */
  const fileElem = document.querySelector("#file");
  fileElem.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      process(file).then((blob) => {
        /** @type {HTMLImageElement} */
        const output = document.querySelector("#output");
        output.src = URL.createObjectURL(blob);
      });
    }
  });
});

/**
 *
 * @param {File} file
 */
async function process(file) {
  // console.log("file: ", file);
  const objectUrl = URL.createObjectURL(file);
  const img = await loadImage(objectUrl);
  URL.revokeObjectURL(objectUrl);

  const canvas = drawCanvas(img);
  const blob = await toBlob(canvas);

  // cleanup
  img.remove();
  canvas.remove();

  // console.log("blob: ", blob);
  return blob;

  /**
   *
   * @param {string} dataUrl
   * @returns Promise<HTMLImageElement>
   */
  function loadImage(dataUrl) {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.src = dataUrl;
    });
  }

  /**
   *
   * @param {HTMLImageElement} img
   * @returns HTMLCanvasElement
   */
  function drawCanvas(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    return canvas;
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @returns Promise<Blob>
   */
  function toBlob(canvas) {
    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toBlob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  }
}
