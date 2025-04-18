import { extract, toMarkdown } from "npm:@mizchi/readability";

const url = Deno.args.at(0) ?? "https://example.com/";
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
const extracted = extract(text);
const parsed = toMarkdown(extracted.root);
console.log(parsed);
