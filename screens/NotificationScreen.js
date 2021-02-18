import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "../components/UI/header";
import { ExtendedWebView } from "../components/UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "../components/BaseScreen";
import _ from "lodash";
const NotificationScreen = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [url, setUrl] = useState();

  useEffect(() => {
    if (_.isEmpty(userStore) || !userStore.storeInfo) return;
    let stringifyUrl;
    stringifyUrl = queryString.stringifyUrl({
      url: `${SERVER_URL}/web/community/push.do`,
      query: {
        user_cd: userInfo.user_cd,
      },
    });
    setUrl(stringifyUrl);
  }, []);
  return (
    <BaseScreen style={styles.screen} isScroll={false}>
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
    cardStyle: {
      marginBottom: 0,
    },
    title: "알림",
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
export default NotificationScreen;
