import React, { useEffect, useState } from "react";
import { debounce } from "lodash"; // 4.0.8
import AesUtil from "@util/aes_util";
var g_keySize = 128;
var g_iterationCount = 10000;
var g_salt = "79752f1d3fd2432043c48e45b35b24645eb826a25c6f1804e9152665c345a552";
var g_iv = "2fad5a477d13ecda7f718fbd8a9f0443";
var g_passPhrase = "@__hanaro+app__!";
var aesUtil = new AesUtil(g_keySize, g_iterationCount);

export const encrypt = (val) => {
  return aesUtil.encrypt(g_salt, g_iv, g_passPhrase, val);
};
export const decrypt = (val) => {
  return aesUtil.decrypt(g_salt, g_iv, g_passPhrase, val);
};

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return "" + match[1] + "-" + match[2] + "-" + match[3];
  }
  return null;
};

export const emptyPrint = (val) => {
  return val ? val : "";
};

export const log = (...val) => {
  if (__DEV__) {
    console.warn(...val);
  }
};

export const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = debounce(this.debouncedOnPress, 3000, {
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
