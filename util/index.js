import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash"; // 4.0.8
import Barcoder from "./barcode";
import { Share, Dimensions, PixelRatio } from "react-native";
import { SERVER_URL } from "../constants";
import _ from "lodash";

import AesUtil from "./aes_util";
var g_keySize = 128;
var g_iterationCount = 10000;
var g_salt = "79752f1d3fd2432043c48e45b35b24645eb826a25c6f1804e9152665c345a552";
var g_iv = "2fad5a477d13ecda7f718fbd8a9f0443";
var g_passPhrase = "@__hanaro+app__!";
var aesUtil = new AesUtil(g_keySize, g_iterationCount);

export const validateBarcode = (barcode) => {
  var validator = new Barcoder("ean13");
  return validator.validate(barcode);
};
export const encrypt = (val) => {
  return aesUtil.encrypt(g_salt, g_iv, g_passPhrase, val);
};
export const decrypt = (val) => {
  return aesUtil.decrypt(g_salt, g_iv, g_passPhrase, val);
};

export const formatNumber = (num) => {
  if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  var match2 = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "" + match[1] + "-" + match[2] + "-" + match[3];
  } else if (match2) {
    return "" + match2[1] + "-" + match2[2] + "-" + match2[3];
  }
  return phoneNumberString;
};

export const emptyPrint = (val) => {
  return val ? val : "";
};

export const log = (...val) => {
  if (__DEV__) {
    console.log(...val);
    // console.warn(JSON.stringify(userStore, null, "\t"));
  }
};
export const warn = (...val) => {
  if (__DEV__) {
    console.warn(...val);
    // console.warn(JSON.stringify(userStore, null, "\t"));
  }
};

export const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = debounce(this.debouncedOnPress, 0, {
      leading: true,
      trailing: false,
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  PreventDoubleClick.displayName = `withPreventDoubleClick(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return PreventDoubleClick;
};
const storagePrefix = SERVER_URL.includes("http://dv-") ? "dev" : "prod";
export const setStorageItem = (name, data) => {
  return AsyncStorage.setItem(storagePrefix + name, data);
};
export const getStorageItem = (name) => {
  try {
    return AsyncStorage.getItem(storagePrefix + name);
  } catch (e) {
    return null;
  }
};

export const removeStorageItem = (name) => {
  AsyncStorage.removeItem(storagePrefix + name);
};

export const sendShareLink = async (recommend) => {
  try {
    let message = `모든 것을 하나로마트 - ${SERVER_URL}/web/about/appStore2.do`;
    if (recommend) {
      message += `?recommend=${recommend}\n\n추천인코드: ${recommend}`;
    }
    const result = await Share.share({
      message: message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const pad = (n, number) => {
  return new Array(n).join("0").slice((n || 2) * -1) + number;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const versionCompare = (v1, v2, options) => {
  var lexicographical = options && options.lexicographical,
    zeroExtend = options && options.zeroExtend,
    v1parts = v1.split("."),
    v2parts = v2.split(".");

  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");
    while (v2parts.length < v1parts.length) v2parts.push("0");
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
};

export const clearAllData = async () => {
  return await AsyncStorage.getAllKeys().then(async (keys) => {
    if (_.isEmpty(keys)) return;
    await AsyncStorage.multiRemove(keys);
  });
  // .then(() => alert('success'));
};
