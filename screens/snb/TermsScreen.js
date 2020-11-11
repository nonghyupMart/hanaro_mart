import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "@constants/settings";
import { setAlert, setIsLoading } from "@actions/common";

const TermsScreen = (props) => {
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(() =>
    dispatch(setIsLoading(false))
  );
  // const isLoading = useSelector((state) => state.common.isLoading);
  // if (isLoading) return <></>;

  return (
    <View style={styles.screen}>
      <ExtendedWebView
        startInLoadingState={true}
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
