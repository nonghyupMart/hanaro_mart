import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BackButton, TextTitle } from "../components/UI/header";
import { BaseTextInput, BaseButton, BaseText } from "../components/UI/BaseUI";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "../components/BaseScreen";
import * as RootNavigation from "../navigation/RootNavigation";
import colors from "../constants/Colors";
import { setPreview } from "../store/actions/auth";
import { setAlert, setIsLoading } from "../store/actions/common";
import _ from "lodash";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <BaseScreen
      isScroll={false}
      isPadding={false}
      style={{
        backgroundColor: colors.trueWhite,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
      }}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: colors.trueWhite,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Logo source={require("../assets/images/hanaromart.png")} />
      <TextInput placeholder="아이디" autoFocus={true} />
      <TextInput
        placeholder="비밀번호"
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry={true}
      />
      <RoundButton>통합회원 로그인</RoundButton>
      <UtilContainer>
        <SimpleButton>아이디 찾기</SimpleButton>
        <SimpleButton>비밀번호 찾기</SimpleButton>
        <SimpleButton style={{ borderRightWidth: 0 }}>회원가입</SimpleButton>
      </UtilContainer>
      <RoundButton2 onPress={() => props.navigation.navigate("CI")}>
        휴대폰 로그인
      </RoundButton2>
    </BaseScreen>
  );
};

const SimpleButton = (props) => {
  return (
    <TouchableOpacity
      style={[
        {
          paddingLeft: 14,
          paddingRight: 14,
          borderColor: colors.WARM_GREY_FOUR,
          borderRightWidth: 1,
          height: 15.7,
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <BaseText
        style={{
          fontSize: 14,
          letterSpacing: -0.28,
          color: colors.greyishBrown,
          fontFamily: "Roboto-Medium",
        }}
      >
        {props.children}
      </BaseText>
    </TouchableOpacity>
  );
};

const UtilContainer = styled.View({
  flexDirection: "row",
  marginTop: 28.5,
  marginBottom: 50.2,
});

const RoundButton2 = styled(BaseButton).attrs((props) => ({
  textStyle: [
    styles.font,
    {
      color: colors.emerald,
    },
  ],
}))({
  width: "100%",
  borderColor: colors.emerald,
  backgroundColor: "white",
  borderWidth: 1.5,
  aspectRatio: 100 / 14.092,
  borderRadius: 47,
});

const RoundButton = styled(BaseButton).attrs((props) => ({
  textStyle: [styles.font, {}],
}))({
  width: "100%",
  backgroundColor: colors.emerald,
  aspectRatio: 100 / 14.092,
  borderRadius: 47,
  marginTop: 30,
});

const TextInput = styled(BaseTextInput)({
  borderColor: colors.greyishThree,
  borderRadius: 7,
  borderWidth: 1.5,
  width: "100%",
  fontSize: 17.5,
  letterSpacing: -0.35,
  paddingLeft: 23.5,
  paddingTop: 10.5,
  paddingBottom: 10.5,
  marginBottom: 10,
});
const Logo = styled.Image({ marginTop: 109.7, marginBottom: 87.1 });
const Container = styled.View({
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 20,
  paddingRight: 20,
  width: "100%",
});

export const screenOptions = ({ navigation }) => {
  return {
    title: "",
    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <></>,
    headerRight: (props) => <></>,
    animationEnabled: false,
  };
};
const styles = StyleSheet.create({
  font: {
    fontSize: 17.5,
    fontFamily: "Roboto-Medium",
    letterSpacing: -0.35,
  },
});
export default LoginScreen;
