import _ from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BaseScreen from "./BaseScreen";
import { ExtendedWebView } from "./UI/ExtendedWebView";
import { BackButton, TextTitle } from "./UI/header";
import { SERVER_URL } from "../constants";
import { useAppSelector } from "../hooks";

const BaseWebViewScreen = (props: any) => {
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (_.isEmpty(userStore) || !userStore!.storeInfo) return;
    let query = {
      store_cd: userStore!.storeInfo.store_cd,
      user_cd: userInfo!.user_cd,
    };
    if (props.query) query = { query, ...props.query };

    let stringifyUrl;
    stringifyUrl = queryString.stringifyUrl({
      url: `${SERVER_URL}${props.url}`,
      query,
    });
    setUrl(stringifyUrl);

    props.navigation.setOptions({
      title: props.title,
      headerLeft: () => <BackButton />,
      headerTitle: (props: any) => <TextTitle {...props} />,
      headerRight: () => <></>,
    });
  }, [userStore]);

  if (!url) return <></>;
  return (
    <BaseScreen
      style={styles.screen}
      isScroll={false}
    >
      <ExtendedWebView
        startInLoadingState={true}
        source={{
          uri: url,
        }}
        style={{ flex: 1, height: "100%", width: "100%" }}
      />
    </BaseScreen>
  );
};

export const screenOptions = () => {
  return {
    title: "",
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
export default BaseWebViewScreen;
