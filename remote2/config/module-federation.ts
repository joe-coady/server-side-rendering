import packageJson from "../package.json";
import { container } from "webpack";

import {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} from "@module-federation/node";

export default {
  client: new container.ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    remotes: {},
    exposes: {
      "./Image": "./src/Image",
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        singleton: true,
        requiredVersion: packageJson.dependencies.react,
      },
      "react-dom": {
        singleton: true,
        requiredVersion: packageJson.dependencies["react-dom"],
      },
    },
  }),
  server: [
    new NodeFederationPlugin(
      {
        name: "remote2",
        filename: "remoteEntry.js",
        library: { type: "commonjs-module" },
        remotes: {},
        exposes: {
          "./Image": "./src/Image",
        },
        shared: {
          ...packageJson.dependencies,
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: packageJson.dependencies["react-dom"],
          },
        },
      },
      {
        ModuleFederationPlugin: container.ModuleFederationPlugin,
      }
    ),
    new StreamingTargetPlugin({
      name: "remote2",
      library: { type: "commonjs-module" },
      remotes: {},
    }),
  ],
};
