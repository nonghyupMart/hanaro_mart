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
import * as CommonActions from "@actions/common";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  screenWidth,
  screenHeight,
} from "@UI/BaseUI";
import BaseScreen from "../components/BaseScreen";
const RingPickerScreen = ({ navigation: { goBack } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);

  return (
    <BaseScreen isPadding={false} isScroll={false} isBottomNavigation={false}>
      <ExtendedWebView
        style={{
          height: screenHeight,
          opacity: 0.99,
          width: screenWidth,
        }}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        source={{
          uri: "http://test.ontwinsoft.co.kr:9222/hanaro_jogdial/",
          // html: require("../ringPicker/index.js")(),
        }}
      />
    </BaseScreen>
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
