import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "../constants";

export const storagePrefix = SERVER_URL.includes("http://dv-") ? "dev" : "prod";

export const setStorageItem = async (name, data) => {
  return await AsyncStorage.setItem(storagePrefix + name, JSON.stringify(data));
};
export const getStorageItem = async (name) => {
  let data;
  try {
    data = await AsyncStorage.getItem(storagePrefix + name);
    return await JSON.parse(data);
  } catch (e) {
    console.log(e);
    return data;
  }
};

export const removeStorageItem = (name) => {
  AsyncStorage.removeItem(storagePrefix + name);
};

export const clearAllData = async () => {
  return await AsyncStorage.clear();
};
