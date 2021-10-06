import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "../constants";

export const storagePrefix = SERVER_URL.includes("http://dv-") ? "dev" : "prod";

export const setStorageItem = async (name: string, data: any) => {
  return await AsyncStorage.setItem(storagePrefix + name, JSON.stringify(data));
};
export const getStorageItem = async (name: string) => {
  let data;
  data = await AsyncStorage.getItem(storagePrefix + name);
  if (data) return await JSON.parse(data);
  return data;
};

export const removeStorageItem = (name: string) => {
  AsyncStorage.removeItem(storagePrefix + name);
};

export const clearAllData = async () => {
  return await AsyncStorage.clear();
};
