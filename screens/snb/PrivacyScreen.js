import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "../../components/UI/header";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import { SERVER_URL, API_URL } from "../../constants";
import { setAlert, setIsLoading } from "../../store/actions/common";

const PrivacyScreen = (props) => {
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
          uri: `${SERVER_URL}/web/about/privacy.do`,
        }}
      />
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "개인정보처리방침",
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

export default PrivacyScreen;
