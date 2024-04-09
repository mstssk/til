const res = await fetch("./manual.png");
const imgBlob = await res.blob();

const imgWidth = 2068;
// const height = 7300;
const height = 9900;

const canvas = document.createElement("canvas");
canvas.width = imgWidth * 2;
canvas.height = height;
const ctx = canvas.getContext("2d");
ctx.drawImage(await createImageBitmap(imgBlob), 0, 0);
ctx.drawImage(
  await createImageBitmap(imgBlob, 0, height, imgWidth, height),
  imgWidth,
  0
);
ctx.drawImage(
  await createImageBitmap(imgBlob, 0, 22060, imgWidth, 520),
  imgWidth,
  height - 520
);

document.body.appendChild(canvas);
