import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "@constants/settings";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "@components/BaseScreen";
import _ from "lodash";
const NaroTubeScreen = (props) => {
  const navigation = props.navigation;
  const userStore = useSelector((state) => state.auth.userStore);
  const [url, setUrl] = useState();
  const [key, setKey] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setKey(Math.random());
    });
    const blur = navigation.addListener("blur", () => {
      setKey(Math.random());
    });
    return () => {
      unsubscribe;
      blur;
    };
  }, []);
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
