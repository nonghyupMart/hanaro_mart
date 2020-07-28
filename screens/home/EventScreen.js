import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const EventScreen = (props) => {
  return <WebView source={{ uri: "https://www.naver.com" }} />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EventScreen;
