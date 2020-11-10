import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { SERVER_URL } from "@constants/settings";

import * as CommonActions from "@actions/common";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  screenWidth,
  screenHeight,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { setAlert, setIsLoading } from "@actions/common";

const RingPickerScreen = ({ navigation: { goBack } }) => {
  const isLoading = useSelector((state) => state.common.isLoading);
  const dispatch = useDispatch();
  const [init, setInit] = useState(() => {
    dispatch(setIsLoading(false));
    dispatch(CommonActions.setBottomNavigation(false));
  });
  useEffect(() => {
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);

  return (
    <BaseScreen isPadding={false} isScroll={false}>
      <ExtendedWebView
        style={{
          height: screenHeight,
          opacity: 0.99,
          width: screenWidth,
        }}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        source={{
          uri: `${SERVER_URL}/web/about/jogdial.do`,
          // html: require("../ringPicker/index.js")(),
        }}
      />
    </BaseScreen>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: {
      marginBottom: 0,
    },
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  };
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
