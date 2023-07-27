const sass = require("sass");

const result = sass.compile("src/entry.scss", {
  sourceMap: true,
  sourceMapIncludeSources: true,
  verbose: true,
});

console.log(result);
