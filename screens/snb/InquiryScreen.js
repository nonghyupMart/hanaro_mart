import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import { SERVER_URL } from "@constants/settings";

export default InquiryScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ExtendedWebView
        source={{
          // uri: `https://www.naver.com`,
          uri: `${SERVER_URL}/web/community/notice.do?store_cd=4`,
        }}
      />
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "1:1 문의",
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
