import React, { useState, useEffect } from "react";
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
          title = params.amnNo ? "비밀번호 변경" : "비밀번호 찾기";
          break;
        case "04":
          title = "회원탈퇴";
          break;
      }
      navigation.setOptions({
        title: title,
        cardStyle: {
          marginBottom: 0,
        },
      });
    }

    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  return (
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
          }&amnNo=${!_.isEmpty(userInfo) ? userInfo.amnNo : ""}`,
        }}
      />
    </BaseScreen>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "회원가입",

    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
    cardStyle: {
      marginBottom: 0,
    },
    // headerStyle: {
    //   backgroundColor: "#f4511e",
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontFamily:"Roboto-Bold",
    // },
  };
};

const GreenButton = styled(BaseButtonContainer)({
  backgroundColor: colors.APPLE_GREEN,

  flex: 1,
  width: "100%",
  flexGrow: 0,
});
const BlueButton = styled(GreenButton)({
  backgroundColor: colors.CERULEAN,
});
const UpperContainer = styled.View({
  flex: 0.5,
  justifyContent: "flex-end",
  alignItems: "center",
  alignSelf: "center",
});

const Info = styled(BaseText)({
  // marginTop: SCREEN_HEIGHT *  0.029,
  // marginBottom: SCREEN_HEIGHT * 0.030,
  // marginLeft: "12%",
  // marginRight: "12%",
  fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.GREYISH_BROWN,

  flex: 0.3,
});
const LowerContainer = styled.View({
  flex: 0.2,
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "flex-start",
});
const Symbol = styled.Image.attrs({ resizeMode: "contain" })({
  alignSelf: "center",
});

const Box = styled(BaseTouchable)({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  height: "50%",
  width: "100%",
  flex: 1,
  borderRadius: 8,
  backgroundColor: colors.TRUE_WHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.PINKISH_GREY,
  paddingLeft: SCREEN_HEIGHT * 0.083,
  paddingRight: SCREEN_HEIGHT * 0.083,
  // paddingBottom:SCREEN_HEIGHT *0.027,
  // paddingTop:SCREEN_HEIGHT *0.027,
  // overflow:"hidden"
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
    height: "100%",
    padding: 24,
  },
  allCheck: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NHAHMScreen;
