import path from "path";

import { merge } from "webpack-merge";

import sharedWebpackConfig from "./webpack.shared";
import moduleFederationPlugin from "./module-federation";
import HtmlWebPackPlugin from "html-webpack-plugin";

export default merge(sharedWebpackConfig, {
  // @ts-ignore
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    publicPath: "http://localhost:3002/client/",
  },

  plugins: [
    moduleFederationPlugin.client,
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
