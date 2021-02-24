import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "../../components/UI/header";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "../../components/BaseScreen";

const NoticeScreen = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  const [url, setUrl] = useState();
  let query = props.route.params;

  useEffect(() => {
    (async () => {
      let stringifyUrl;
      if (!query && userStore && userStore.storeInfo) {
        props.navigation.setOptions({
          title: "매장 공지사항",
        });
        stringifyUrl = queryString.stringifyUrl({
          url: `${SERVER_URL}/web/community/notice.do`,
          query: { type: "C", store_cd: userStore.storeInfo.store_cd },
        });
        setUrl(stringifyUrl);
      } else {
        props.navigation.setOptions({
          title: "통합 공지사항",
        });
        stringifyUrl = queryString.stringifyUrl({
          url: `${SERVER_URL}/web/community/notice.do`,
          query: props.route.params,
        });
      }
      setUrl(stringifyUrl);
    })();
  }, []);

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
    title: "공지사항",
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

export default NoticeScreen;
