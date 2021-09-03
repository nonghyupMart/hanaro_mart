import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseScreen from "../components/BaseScreen";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/UI/BaseUI";
import { ExtendedWebView } from "../components/UI/ExtendedWebView";
import { SERVER_URL } from "../constants";
import * as CommonActions from "../store/actions/common";

const RingPickerScreen = () => {
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
export const screenOptions = () => {
  return {
    contentStyle: {
      paddingBottom: 0,
    },
    headerShown: false,
    animation: "fade",
  };
};

export default RingPickerScreen;
