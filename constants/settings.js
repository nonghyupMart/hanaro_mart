// export const SERVER_URL = "http://dv-www.hanaromartapp.com";
// export const SERVER_URL = "http://www.hanaromartapp.com";
import Constants from "expo-constants";
export const PRODUCT_SERVER_URL = "http://www.hanaromartapp.com";
import getEnvVars from "@constants/environment";
export const { SERVER_URL } = getEnvVars();

export const API_URL = `${SERVER_URL}/api`;
export const IMAGE_URL = `${SERVER_URL}/`;
