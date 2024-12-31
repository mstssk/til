import { readFileSync } from "node:fs";
import { parseJsonWithComments } from "./parse-json-with-comments.js";

const text = readFileSync("./sample.json", "utf-8");

console.log(parseJsonWithComments(text));
