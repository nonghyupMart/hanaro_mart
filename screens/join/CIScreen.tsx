import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import styled from "styled-components/native";
import {
  BaseButtonContainer,
  ButtonText,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BaseTouchable,
  BaseText,
} from "../../components/UI/BaseUI";
import BaseScreen from "../../components/BaseScreen";
import { BackButton, TextTitle } from "../../components/UI/header";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import _ from "lodash";
import * as CommonActions from "../../store/actions/common";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL, API_URL } from "../../constants";

const CIScreen = ({ navigation, route }) => {
  const params = route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const uriRef = useRef(
    `${SERVER_URL}/web/access/auth.do?ver=${
      params && params.ver ? params.ver : "2"
    }&key=${new Date().getTime()}`
  );
  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      navigation.setOptions({
        title: "본인인증",
        cardStyle: {
          marginBottom: 0,
        },
      });
    }
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);

  return (
    <BaseScreen isScroll={false} isPadding={false}>
      <ExtendedWebView
        recommend={params ? params.recommend : null}
        startInLoadingState={true}
        key={Math.random()}
        cacheMode="LOAD_NO_CACHE"
        style={{
          height: SCREEN_HEIGHT,
          opacity: 0.99,
          width: SCREEN_WIDTH,
        }}
        source={{
          uri: uriRef.current,
          // html: require("../ringPicker/index.js")(),
        }}
      />
    </BaseScreen>
  );
};
export const screenOptions = () => {
  return {
    title: "휴대폰 본인인증",

    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
    // headerStyle: {
    //   backgroundColor: "#f4511e",
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontFamily:"Roboto-Bold",
    // },
  };
};


export default CIScreen;
