import packageJson from "../package.json";
import { container } from "webpack";

import {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} from "@module-federation/node";

export default {
  client: new container.ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    remotes: {
      remote2: "remote2@http://localhost:3002/client/remoteEntry.js",
    },
    exposes: {
      "./Content": "./src/Content",
      "./someModule": "./src/someModule",
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
        name: "remote1",
        filename: "remoteEntry.js",
        library: { type: "commonjs-module" },
        remotes: {
          remote2: "remote2@http://localhost:3002/server/remoteEntry.js",
        },
        exposes: {
          "./Content": "./src/Content",
          "./someModule": "./src/someModule",
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
      name: "remote1",
      library: { type: "commonjs-module" },
      remotes: {
        remote2: "remote2@http://localhost:3002/server/remoteEntry.js",
      },
    }),
  ],
};
