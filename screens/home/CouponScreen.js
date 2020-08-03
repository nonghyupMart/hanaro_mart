import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

const CouponScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let [webView, setWebview] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let provider = await Location.getProviderStatusAsync();
      // console.log(provider);
      if (location == null) {
        let location = await Location.getCurrentPositionAsync({
          maximumAge: 60000, // only for Android
          accuracy: Platform.Android
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
        });
        setLocation(location);
        // console.log(location);
      }
    })();
  });

  const _onNavigationStateChange = (obj) => {
    console.log(obj);
    if (obj.url.includes("panoId")) {
      webView.stopLoading(); //Some reference to your WebView to make it stop loading that URL
      // webView.goBack();
      Linking.openURL(obj.url);
      return false;
    }
  };
  const onMessage = (obj) => {
    // console.log(obj.nativeEvent.data);
    Linking.openURL(obj.nativeEvent.data);
  };
  return (
    <WebView
      ref={(wv) => (webView = wv)}
      key={location}
      originWhitelist={["*"]}
      allowFileAccess={true}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
      mixedContentMode="always"
      source={{ html: require("../../map.js")(location) }}
      // onNavigationStateChange={_onNavigationStateChange.bind(this)}
      startInLoadingState={false}
      onMessage={onMessage}
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
