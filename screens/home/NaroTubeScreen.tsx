import { useIsFocused } from "@react-navigation/native";
import queryString from "query-string";
import React, { useEffect, useRef, useState } from "react";
import { AppState, StyleSheet } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import { BackButton, TextTitle } from "../../components/UI/header";
import { SERVER_URL } from "../../constants";

const NaroTubeScreen = () => {
  const isFocused = useIsFocused();
  const [url, setUrl] = useState<string>();
  const appState = useRef(AppState.currentState as string);
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

  const _handleAppStateChange = async (nextAppState: string) => {
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

  if (!isFocused || !url) return <></>;
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

export const screenOptions = () => {
  return {
    title: "나로튜브",
    headerLeft: () => <BackButton />,
    headerTitle: (props: any) => <TextTitle {...props} />,
    headerRight: () => <></>,
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
