const esbuild = require("esbuild");
esbuild
  .build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outdir: "dist/",
    inject: ["./react-shim.js"],
    watch: true,
  })
  .catch((reason) => {
    console.error(reason);
    process.exit(1);
  });
