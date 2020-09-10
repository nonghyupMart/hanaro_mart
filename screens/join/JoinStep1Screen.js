import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, Button } from "react-native";
import styled from "styled-components/native";
import { BaseButtonContainer, ButtonText } from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";

const GreenButton = styled(BaseButtonContainer)({
  backgroundColor: colors.appleGreen,
  marginRight: 2.5,
});
const BlueButton = styled(BaseButtonContainer)({
  backgroundColor: colors.cerulean,
  marginLeft: 2.5,
});
const JoinStep1Screen = ({ navigation }) => {
  return (
    <BaseScreen isScroll={false} style={styles.screen}>
      <Box style={{ marginBottom: 2.5 }}>
        <Symbol source={require("@images/mem_img624.png")} />
        <Info>
          농협하나로마트 APP에서는 할인쿠폰 제공 등 회원만을 위한 다양한
          서비스와 행사내용을 받을 수 있습니다.
        </Info>
        <GreenButton>
          <ButtonText>본인인증</ButtonText>
        </GreenButton>
      </Box>
      <Box style={{ marginTop: 2.5 }}>
        <Symbol source={require("@images/mob_img623.png")} />
        <Info>휴대폰 번호만으로도 이용이 가능합니다.</Info>
        <BlueButton
          title="본인인증"
          onPress={() => {
            navigation.navigate("JoinStep2");
          }}
        >
          <ButtonText>간편가입</ButtonText>
        </BlueButton>
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
    //   fontWeight: "bold",
    // },
  };
};
const Info = styled.Text({
  marginTop: 28,
  marginBottom: 22,
  marginLeft: "12%",
  marginRight: "12%",
  fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
});
const Symbol = styled.Image({});
 
const Box = styled.View({
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  width: "100%",
  flex: 1,
  borderRadius: 8,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
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
