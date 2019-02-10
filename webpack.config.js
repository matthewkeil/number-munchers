const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV || "development";
const PROD = ENV === "production";

module.exports = () => {
  const config = {
    mode: PROD ? "production" : "development",
    entry: "./src/script.js",
    target: "web",
    output: {
      filename: PROD ? "bundle.[hash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: path.resolve(__dirname, "/")
    },
    resolve: {
      extensions: [".js", ".css"],
      modules: ["node_modules", path.resolve(__dirname, "src")],
      alias: {
        jquery: "jquery/src/jquery"
      }
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new HtmlWebpackPlugin({
        title: "Number Noshers",
        template: "assets/index.html"
      }),
      new CopyWebpackPlugin([
        "./src/style.css",
        "./assets/muncher.png"
        // './assets/troggle.png'
      ])
    ]
  };

  if (!PROD) {
    config.devtool = "cheap-module-source-map";
    config.devServer = {
    //   contentBase: path.join(__dirname, "assets"),
      port: 3000
    };
  }

  return config;
};
