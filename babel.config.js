const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = function (api) {
  api.cache(true);
  return {
    devtool: "source-map",
    presets: ["babel-preset-expo"],
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "hanaromart",
        project: "hanaromart",
        release: process.env.SENTRY_RELEASE,

        // webpack-specific configuration
        include: ".",
        ignore: ["node_modules", "webpack.config.js", "babel.config.js"],
      }),
      ["@babel/plugin-syntax-class-properties"],
    ],
  };
};
