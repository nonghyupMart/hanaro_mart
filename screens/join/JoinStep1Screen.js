import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, Platform } from "react-native";
import styled from "styled-components/native";
import {
  BaseButtonContainer,
  ButtonText,
  screenHeight,
  BaseTouchable,
  BaseText,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";

const JoinStep1Screen = ({ navigation }) => {
  return (
    <BaseScreen isScroll={false} style={styles.screen}>
      <Box
        style={{ marginBottom: 2.5 }}
        onPress={() => {
          navigation.navigate("CI");
        }}
      >
        <Image source={require("@images/mem1725.png")} />
      </Box>
      <Box
        style={{ marginTop: 2.5 }}
        onPress={() => {
          navigation.navigate("JoinStep2");
        }}
      >
        <Image source={require("@images/mem2725.png")} />
      </Box>
    </BaseScreen>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "회원가입",

    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
    // headerStyle: {
    //   backgroundColor: "#f4511e",
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontFamily:"CustomFont-Bold",
    // },
  };
};
const Image = styled.Image({
  flex: 1,

  resizeMode: () => (Platform.OS == "android" ? "center" : "contain"),
});
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
  // marginTop: screenHeight *  0.029,
  // marginBottom: screenHeight * 0.030,
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
  // flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // alignContent: "center",
  // height: "50%",
  width: "100%",
  flex: 1,
  borderRadius: 8,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  paddingLeft: screenHeight * 0.083,
  paddingRight: screenHeight * 0.083,
  paddingBottom: screenHeight * 0.027,
  paddingTop: screenHeight * 0.027,
  overflow: "hidden",
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

export default JoinStep1Screen;
