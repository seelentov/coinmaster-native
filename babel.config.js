module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins:
      ["module-resolver", {
        "alias": {
          "@router": "./src/Router.tsx",
          "@components": "./src/components",
          "@lang": "./src/lang",
          "@screens": "./src/screens",
          "@styles": "./src/styles",
          "@config": "./src/core/config",
          "@consts": "./src/core/consts",
          "@hooks": "./src/core/hooks",
          "@store": "./src/core/store",
          "@types": "./src/core/types",
          "@utils": "./src/core/utils"
        },
        "extensions": [
          ".ts",
          ".tsx",
        ]
      }]
  };
};

