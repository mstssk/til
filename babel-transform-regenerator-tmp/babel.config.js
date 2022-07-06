// const config = {
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//         // targets: {
//         //   // node: "current",
//         //   chrome: "last 1 version",
//         // },
//         targets: "last 1 chrome version",
//         modules: "commonjs",
//         forceAllTransforms: true,
//       },
//     ],
//   ],
//   plugins: [
//     [
//       "@babel/plugin-transform-regenerator",
//       {
//         async: false,
//       },
//     ],
//   ],
// };

const config = { presets: ["@babel/preset-env"] };

module.exports = config;
