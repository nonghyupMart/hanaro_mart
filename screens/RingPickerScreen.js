import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  View,
} from "react-native";

import ReactNativeRingPicker from "../components/ReactNativeRingPicker";

const RingPickerScreen = ({ navigation: { goBack } }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>모든 것을 하나로!</Text>
      <ReactNativeRingPicker
        onPress={(iconId) => alert(iconId)}
        style={styles.ringPicker}
        girthAngle={120}
        iconHideOnTheBackDuration={300}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  hide: {
    opacity: 0,
  },
  icons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  center: {
    flex: 1,
  },
  ringPicker: {
    position: "absolute",
    bottom: -150,
  },

  ringIcons: {
    color: "green",
  },
});

export default RingPickerScreen;
