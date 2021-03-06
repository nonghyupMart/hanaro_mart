//* environment.js
import Constants from "expo-constants";

const ENV = {
  dev: {
    // SERVER_URL: "http://dv-www.hanaromartapp.com",
    SERVER_URL: "https://www.hanaromartapp.com",
  },
  develop: {
    SERVER_URL: "http://dv-www.hanaromartapp.com",
  },
  stage: {
    SERVER_URL: "https://www.hanaromartapp.com",
  },
  default: {
    SERVER_URL: "https://www.hanaromartapp.com",
    // Add other keys you want here
  },
  prod: {
    SERVER_URL: "https://www.hanaromartapp.com",
    // Add other keys you want hereㅎ
  },
};
export const getEnv = (env = Constants.manifest?.releaseChannel) => {
  return env;
};

const getEnvVars = (env = Constants.manifest?.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "develop") {
    return ENV.develop;
  } else if (env === "stage") {
    return ENV.stage;
  } else if (env === "prod") {
    return ENV.prod;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
