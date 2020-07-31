import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import * as Location from "expo-location";

const CouponScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let provider = await Location.getProviderStatusAsync();
      console.log(provider);
      if (location == null) {
        let location = await Location.getCurrentPositionAsync({
          maximumAge: 60000, // only for Android
          accuracy: Platform.Android
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
        });
        setLocation(location);
        console.log(location);
      }
    })();
  });

  return (
    <WebView
      key={location}
      originWhitelist={["*"]}
      allowFileAccess={true}
      domStorageEnabled={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
      mixedContentMode="always"
      source={{ html: require("../../map.js")(location) }}
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
