window.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLInputElement} */
  const fileElem = document.querySelector("#file");
  fileElem.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      process(file).then((blob) => {
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
  const img = await loadToImageElement(objectUrl);
  const blob = await toBlobThroughCanvas(img);
  URL.revokeObjectURL(objectUrl);
  // console.log("blob: ", blob);
  return blob;

  function loadToImageElement(dataUrl) {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.src = dataUrl;
    });
  }

  function toBlobThroughCanvas(img) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toBlob
      canvas.toBlob((blob) => {
        img.remove();
        canvas.remove();
        resolve(blob);
      }, "image/png");
    });
  }
}
