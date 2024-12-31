import { test } from "node:test";
import { deepEqual, doesNotThrow } from "node:assert";
import { readFileSync } from "node:fs";
import { parseJsonWithComments } from "./parse-json-with-comments.js";

test("単純なパースが成功する", () => {
  const text = `{
    "name": "sample",
    "value": 42
  }`;
  const result = parseJsonWithComments(text);
  deepEqual(result, { name: "sample", value: 42 });
});

test("インラインコメントがあってもパースできる", () => {
  const text = `{
    "name": "sample", // コメント
    "value": 42
  }`;
  const result = parseJsonWithComments(text);
  deepEqual(result, { name: "sample", value: 42 });
});

test("ブロックコメントがあってもパースできる", () => {
  const text = `{
    "name": "sample", /* コメント */
    "value": 42
  }`;
  const result = parseJsonWithComments(text);
  deepEqual(result, { name: "sample", value: 42 });
});

test("ケツカンマがあってもパースできる", () => {
  const text = `{
    "name": "sample",
    "value": 42,
  }`;
  const result = parseJsonWithComments(text);
  deepEqual(result, { name: "sample", value: 42 });
});

test("複数のコメントがあってもパースできる", () => {
  const text = `{
    "name": "sample", // コメント
    "value": 42, /* コメント */
  }`;
  const result = parseJsonWithComments(text);
  deepEqual(result, { name: "sample", value: 42 });
});

test("stringの中にコメント構文があってもパースできる", () => {
  const text = `{
    "name": "sample // コメント",
    "value": 42
  }`;
  const result = parseJsonWithComments(text);
  deepEqual(result, { name: "sample // コメント", value: 42 });
});

test("stringの中にブロックコメント構文があってもパースできる", () => {
  const text = `{
    "name": "sample /* コメント */",
    "value": 42
  }`;
  const result = parseJsonWithComments(text);
  deepEqual(result, { name: "sample /* コメント */", value: 42 });
});

test("sample.jsonをパースできる", () => {
  const text = readFileSync("./sample.json", "utf-8");
  doesNotThrow(() => parseJsonWithComments(text));
});
