import path from "path";
import { merge } from "webpack-merge";

import sharedWebpackConfig from "./webpack.shared";
import moduleFederationPlugin from "./module-federation";

export default merge(sharedWebpackConfig, {
  // @ts-ignore
  name: "server",
  target: false,
  entry: ["@babel/polyfill", path.resolve(__dirname, "../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  mode: "production",
  plugins: [...moduleFederationPlugin.server],
  stats: {
    colors: true,
  },
});
