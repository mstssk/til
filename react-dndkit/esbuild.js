const esbuild = require("esbuild");
esbuild
  .build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outdir: "dist/",
    inject: ["./react-shim.js"],
  })
  .catch((reason) => {
    console.error(reason);
    process.exit(1);
  });
