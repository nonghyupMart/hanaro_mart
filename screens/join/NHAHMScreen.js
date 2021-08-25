import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
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
import colors from "../../constants/Colors";

const NHAHMScreen = ({ navigation, route }) => {
  const params = route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));

    if (params.regiDesc !== "01") {
      let title = "";
      switch (params.regiDesc) {
        case "02":
          title = "회원정보수정";
          break;
        case "03":
          title = !_.isEmpty(params.amnNo) ? "비밀번호 변경" : "비밀번호 찾기";
          break;
        case "04":
          title = "회원탈퇴";
          break;
      }
      navigation.setOptions({
        title: title,
        cardStyle: {
          marginBottom: 0,
          // marginTop: 30,
        },
      });
    }

    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <BaseScreen isPadding={false}>
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
            uri: `${SERVER_URL}/web/access/nhahm.do?regiDesc=${
              params.regiDesc
            }&amnNo=${
              !_.isEmpty(userInfo) && !!userInfo.amnNo ? userInfo.amnNo : ""
            }`,
          }}
        />
      </BaseScreen>
    </SafeAreaView>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "회원가입",

    headerLeft: (props) => <></>,
    headerTitle: (props) => <></>,
    headerRight: (props) => <></>,
    cardStyle: {
      marginBottom: 0,
    },
    headerShown: false,
    // headerStyle: {
    //   backgroundColor: "#f4511e",
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontFamily:"Roboto-Bold",
    // },
  };
};


export default NHAHMScreen;
