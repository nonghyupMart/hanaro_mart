module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-syntax-class-properties"],
      // [
      //   "module-resolver",
      //   {
      //     root: ["./"],
      //     alias: {
      //       store: "./store",
      //       screens: "./screens",
      //       assets: "./assets",
      //       images: "./assets/images",
      //       constants: "./constants",
      //       components: "./components",
      //       UI: "./components/UI",
      //       actions: "./store/actions",
      //       reducers: "./store/reducers",
      //       models: "./models",
      //       navigation: "./navigation",
      //       utils: "./utils",
      //     },
      //     extensions: [
      //       ".js",
      //       ".jsx",
      //       ".ts",
      //       ".tsx",
      //       ".android.js",
      //       ".android.tsx",
      //       ".ios.js",
      //       ".ios.tsx",
      //     ],
      //   },
      // ],
    ],
  };
};
