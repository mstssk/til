import { mp4Duration } from "./mp4-duration.mjs";

const url = process.argv.at(2);
console.log(await mp4Duration(url));
