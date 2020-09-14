import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "@constants/settings";

const TermsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ExtendedWebView
        source={{
          uri: `${SERVER_URL}/web/about/terms.do`,
        }}
      />
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "이용약관",
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

export default TermsScreen;
