import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { Icon } from "react-native-elements";
import * as RootNavigation from "../navigation/RootNavigation";
import ReactNativeRingPicker from "../components/ReactNativeRingPicker";
import { setBottomNavigation } from "../store/actions/auth";

const RingPickerScreen = ({ navigation: { goBack } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBottomNavigation(false));
  }, []);

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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          dispatch(setBottomNavigation(true));
          RootNavigation.pop();
        }}
        style={[styles.icons, { position: "absolute", bottom: 0 }]}
      >
        <Icon type="font-awesome-5" name="chrome" size={55} />
      </TouchableOpacity>
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
    elevation: 1000,
    zIndex: 1000,
  },
  center: {
    flex: 1,
  },
  ringPicker: {
    position: "absolute",
    bottom: -130,
  },

  ringIcons: {
    color: "green",
  },
});

export default RingPickerScreen;
