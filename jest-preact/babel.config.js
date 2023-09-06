module.exports = {
  env: {
    test: {
      plugins: [
        [
          // spec.tsx も変換する
          "@babel/plugin-transform-react-jsx",
          {
            runtime: "automatic",
            importSource: "preact",
          },
        ],
      ],
    },
  },
};
