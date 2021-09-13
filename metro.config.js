const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.minifierConfig.compress.drop_console = true;

module.exports = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, "db"],
  },
};
