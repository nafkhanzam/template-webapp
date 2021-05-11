const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  babel: async (options) => {
    options.plugins.push(["@babel/plugin-proposal-private-property-in-object", {loose: true}]);
    return options;
  },
  webpackFinal: (config) => {
    const plugins = [new TsconfigPathsPlugin()];
    if (config.resolve.plugins) {
      config.resolve.plugins.push(...plugins);
    } else {
      config.resolve.plugins = plugins;
    }
    config.module.rules.push({
      test: /\.css$/,
      use: ["postcss-loader"],
      include: path.resolve(__dirname, "../src/styles"),
    });
    return config;
  },
};
