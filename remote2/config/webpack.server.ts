import path from "path";
import { merge } from "webpack-merge";

import sharedWebpackConfig from "./webpack.shared";
import moduleFederationPlugin from "./module-federation";

export default merge(sharedWebpackConfig, {
  // @ts-ignore
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  target: false,
  name: "server",
  plugins: [...moduleFederationPlugin.server],
});
