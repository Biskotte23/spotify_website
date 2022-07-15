const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    download: path.join(__dirname, "src/pages/download/download.js"),
    login: path.join(__dirname, "src/pages/login/login.js"),
    premium: path.join(__dirname, "src/pages/premium/premium.js"),
    signin: path.join(__dirname, "src/pages/signin/signin.js"),
    support: path.join(__dirname, "src/pages/support/support.js"),

    header: path.join(__dirname, "src/assets/javascript/header.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images/*",
          to: "assets/images/[name][ext]",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src/index.html"),
      chunks: ["main", "header"],
    }),
    new HtmlWebpackPlugin({
      filename: "download.html",
      template: path.join(__dirname, "src/pages/download/download.html"),
      chunks: ["download", "header"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: path.join(__dirname, "src/pages/login/login.html"),
      chunks: ["login", "header"],
    }),
    new HtmlWebpackPlugin({
      filename: "premium.html",
      template: path.join(__dirname, "src/pages/premium/premium.html"),
      chunks: ["premium", "header"],
    }),
    new HtmlWebpackPlugin({
      filename: "signin.html",
      template: path.join(__dirname, "src/pages/signin/signin.html"),
      chunks: ["signin", "header"],
    }),
    new HtmlWebpackPlugin({
      filename: "support.html",
      template: path.join(__dirname, "src/pages/support/support.html"),
      chunks: ["support", "header"],
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    port: 4000,
  },
};
