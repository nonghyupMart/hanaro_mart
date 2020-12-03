import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, StyleSheet, AppState } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "@constants/settings";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "@components/BaseScreen";
import _ from "lodash";
const NaroTubeScreen = (props) => {
  const isFocused = useIsFocused();
  const navigation = props.navigation;
  const userStore = useSelector((state) => state.auth.userStore);
  const [url, setUrl] = useState();
  const [key, setKey] = useState();
  const [appState, setAppState] = useState(AppState.currentState);
  const _handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  useEffect(() => {
    setKey(Math.random());
  }, [isFocused, appState]);
  useEffect(() => {
    let stringifyUrl;
    stringifyUrl = queryString.stringifyUrl({
      url: `${SERVER_URL}/web/community/narotube.do`,
    });
    setUrl(stringifyUrl);
  }, []);
  return (
    <BaseScreen
      key={key}
      style={styles.screen}
      isScroll={false}
      // isBottomNavigation={false}
    >
      <ExtendedWebView
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
    // cardStyle: {
    //   marginBottom: 0,
    // },
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
