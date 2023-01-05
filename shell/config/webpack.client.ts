import path from "path";

import { merge } from "webpack-merge";

import sharedWebpackConfig from "./webpack.shared";
import moduleFederationPlugin from "./module-federation";

export default merge(sharedWebpackConfig, {
  // @ts-ignore
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")],
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:3000/static/",
  },
  plugins: [moduleFederationPlugin.client],
});
