module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".js", ".ios.js", ".android.js"],
          alias: {
            "@screens": "./screens",
            "@assets": "./assets",
            "@images": "./assets/images",
            "@constants": "./constants",
            "@components": "./components",
            "@UI": "./components/UI",
            "@actions": "./store/actions",
            "@reducers": "./store/reducers",
            "@models": "./models",
            "@navigation": "./navigation"
          },
        },
      ],
      ["@babel/plugin-syntax-class-properties"],
    ],
  };
};
