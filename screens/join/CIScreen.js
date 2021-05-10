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

const CIScreen = ({ navigation, route }) => {
  const params = route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
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
          uri:
            "https://www.hanaromartapp.com/web/access/auth.do?key=" +
            new Date().getTime(),
          // html: require("../ringPicker/index.js")(),
        }}
      />
    </BaseScreen>
  );
};
export const screenOptions = ({ navigation }) => {
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

const GreenButton = styled(BaseButtonContainer)({
  backgroundColor: colors.appleGreen,

  flex: 1,
  width: "100%",
  flexGrow: 0,
});
const BlueButton = styled(GreenButton)({
  backgroundColor: colors.cerulean,
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
  color: colors.greyishBrown,

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
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
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
    padding: 18,
  },
  allCheck: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CIScreen;
