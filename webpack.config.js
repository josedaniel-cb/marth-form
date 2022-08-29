const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, "postcss.config.js"),
          },
        },
      },
    ],
  },
};
