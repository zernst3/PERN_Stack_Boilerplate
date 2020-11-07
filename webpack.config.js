const path = require("path");

module.exports = {
  entry: "./client/app/index.js",
  output: {
    path: path.resolve(__dirname, "./client/public"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./client/app"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [],
};
