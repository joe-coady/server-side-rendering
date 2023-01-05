import packageJson from "../package.json";
import { container } from "webpack";

import {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} from "@module-federation/node";

export default {
  client: new container.ModuleFederationPlugin({
    name: "shell",
    filename: "container.js",
    remotes: {
      remote1: "remote1@http://localhost:3001/client/remoteEntry.js",
    },
    shared: [
      {
        react: packageJson.dependencies.react,
        "react-dom": packageJson.dependencies["react-dom"],
      },
    ],
  }),
  server: [
    new NodeFederationPlugin(
      {
        name: "shell",
        library: { type: "commonjs-module" },
        filename: "remoteEntry.js",
        remotes: {
          remote1: "remote1@http://localhost:3001/server/remoteEntry.js",
        },
        shared: [
          {
            react: packageJson.dependencies.react,
            "react-dom": packageJson.dependencies["react-dom"],
          },
        ],
      },
      {
        ModuleFederationPlugin: container.ModuleFederationPlugin,
      }
    ),
    new StreamingTargetPlugin({
      name: "shell",
      library: { type: "commonjs-module" },
      remotes: {
        remote1: "remote1@http://localhost:3001/server/remoteEntry.js",
      },
    }),
  ],
};
