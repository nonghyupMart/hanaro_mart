import React, { useEffect } from "react";
import {
  StyleSheet
} from "react-native";
import { useDispatch } from "react-redux";
import BaseScreen from "../components/BaseScreen";
import {
  SCREEN_HEIGHT, SCREEN_WIDTH
} from "../components/UI/BaseUI";
import { ExtendedWebView } from "../components/UI/ExtendedWebView";
import { SERVER_URL } from "../constants";
import * as CommonActions from "../store/actions/common";


const RingPickerScreen = ({ navigation: { goBack } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);

  return (
    <BaseScreen isPadding={false} isScroll={false}>
      <ExtendedWebView
        startInLoadingState={true}
        style={{
          height: SCREEN_HEIGHT,
          opacity: 0.99,
          width: SCREEN_WIDTH,
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
    contentStyle: {
      paddingBottom: 0,
    },
    headerShown: false,
    animation: "fade",
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
