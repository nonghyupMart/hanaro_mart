import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, StyleSheet, AppState } from "react-native";
import { BackButton, TextTitle } from "../../components/UI/header";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "../../components/BaseScreen";
import _ from "lodash";

const NaroTubeScreen = (props) => {
  const isFocused = useIsFocused();
  const [url, setUrl] = useState();
  const appState = useRef(AppState.currentState);
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    let stringifyUrl;
    stringifyUrl = queryString.stringifyUrl({
      url: `${SERVER_URL}/web/community/narotube.do`,
    });
    setUrl(stringifyUrl);
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // console.log("App has come to the foreground!");
    } else {
      // console.log("App has come to the background!2");
      setKey(Math.random());
    }
    appState.current = nextAppState;
  };

  if (!isFocused) return <></>;
  return (
    <BaseScreen
      style={styles.screen}
      isScroll={false}
      // isBottomNavigation={false}
    >
      <ExtendedWebView
        key={key}
        startInLoadingState={true}
        source={{
          // uri: `https://www.naver.com`,
          uri: url,
        }}
        style={{ flex: 1, height: "100%", width: "100%" }}
      />
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "나로튜브",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default NaroTubeScreen;
