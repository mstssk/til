import { Readability } from "npm:@mozilla/readability";
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import html2md from "npm:html-to-md";

const url = Deno.args.at(0) ?? "https://mstssk.dev/";
if (!url) {
  throw new Error("URL is required");
}
if (!url.startsWith("http")) {
  throw new Error("Invalid URL");
}

const res = await fetch(url);
if (!res.ok) {
  throw new Error("Failed to fetch article");
}
const text = await res.text();
const dom = new DOMParser().parseFromString(text, "text/html");
if (!dom) {
  throw new Error("Failed to parse HTML");
}

const article = new Readability(dom).parse();
if (!article) {
  throw new Error("Failed to parse article");
}
// Show all ariticle properties
// console.log({ ...article });

// @ts-expect-error: html2mdの型定義が正しく解決されない
const markdown = html2md(article.content);
console.log(markdown);
