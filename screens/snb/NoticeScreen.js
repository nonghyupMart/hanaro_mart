import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "@constants/settings";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
const NoticeScreen = (props) => {
  // console.log("NoticeScreen == ", props.route.params);
  const [userStore, setUserStore] = useState();
  const [url, setUrl] = useState();
  let query = props.route.params;

  useEffect(() => {
    (async () => {
      let stringifyUrl;
      if (!query) {
        const userStoreData = await AsyncStorage.getItem("userStoreData");
        const data = JSON.parse(userStoreData);
        setUserStore(data);
        stringifyUrl = queryString.stringifyUrl({
          url: `${SERVER_URL}/web/community/notice.do`,
          query: { type: "C", store_cd: data.store_cd },
        });
        setUrl(stringifyUrl);
      } else {
        stringifyUrl = queryString.stringifyUrl({
          url: `${SERVER_URL}/web/community/notice.do`,
          query: props.route.params,
        });
      }
      // console.warn(stringifyUrl);
      setUrl(stringifyUrl);
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <ExtendedWebView
        source={{
          // uri: `https://www.naver.com`,
          uri: url,
        }}
      />
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "공지사항",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default NoticeScreen;
