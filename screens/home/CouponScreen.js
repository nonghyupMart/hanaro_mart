import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const CouponScreen = (props) => {
  return (
    <WebView
      originWhitelist={["*"]}
      allowFileAccess={true}
      domStorageEnabled={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
      mixedContentMode="always"
      source={{ html: require("../../map.js")() }}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CouponScreen;
