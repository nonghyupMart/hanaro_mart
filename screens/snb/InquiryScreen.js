import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "@constants/settings";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "@components/BaseScreen";

const InquiryScreen = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  const [url, setUrl] = useState();

  useEffect(() => {
    if (Object.keys(userStore).length === 0) return;
    let stringifyUrl;
    stringifyUrl = queryString.stringifyUrl({
      url: `${SERVER_URL}/web/community/cstvoice.do`,
      query: { store_cd: userStore.storeInfo.store_cd },
    });
    setUrl(stringifyUrl);
  }, []);
  return (
    <BaseScreen
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
    title: "1:1 문의",
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
export default InquiryScreen;
