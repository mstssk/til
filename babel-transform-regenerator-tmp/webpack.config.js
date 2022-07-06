const config = {
  // mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ["@babel/preset-env"],
          //   // cacheDirectory: true,
          //   // cacheCompression: false,
          //   // compact: false,
          // },
        },
      },
    ],
  },
};
module.exports = config;
