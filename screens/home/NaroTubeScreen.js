import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    let stringifyUrl;
    stringifyUrl = queryString.stringifyUrl({
      url: `${SERVER_URL}/web/community/narotube.do`,
    });
    setUrl(stringifyUrl);
  }, []);

  if (!isFocused) return <></>;
  return (
    <BaseScreen
      style={styles.screen}
      isScroll={false}
      // isBottomNavigation={false}
    >
      <ExtendedWebView
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
