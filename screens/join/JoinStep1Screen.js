import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, Button } from "react-native";
import styled from "styled-components/native";
import { BaseButtonContainer, ButtonText, screenHeight } from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";

const JoinStep1Screen = ({ navigation }) => {
  return (
    <BaseScreen isScroll={false} style={styles.screen}>
      <Box style={{ marginBottom: 2.5 }}>
        <UpperContainer>
          <Symbol source={require("@images/ads636.png")} />
        </UpperContainer>
        <Info>
          농협하나로마트 APP에서는 할인쿠폰 제공 등 회원만을 위한 다양한
          서비스와 행사내용을 받을 수 있습니다.
        </Info>

        <LowerContainer>
          <GreenButton>
            <ButtonText>본인인증</ButtonText>
          </GreenButton>
        </LowerContainer>
      </Box>
      <Box style={{ marginTop: 2.5 }}>
        <UpperContainer>
          <Symbol source={require("@images/simple646.png")} />
        </UpperContainer>
        <Info>휴대폰 번호만으로도 이용이 가능합니다.</Info>

        <LowerContainer>
          <BlueButton
            title="본인인증"
            onPress={() => {
              navigation.navigate("JoinStep2");
            }}
          >
            <ButtonText>간편가입</ButtonText>
          </BlueButton>
        </LowerContainer>
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
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
});

const Info = styled.Text({
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

const Box = styled.View({
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "space-between",
  height: "50%",
  width: "100%",
  flex: 1,
  borderRadius: 8,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  paddingLeft: screenHeight * 0.083,
  paddingRight: screenHeight * 0.083,
  // paddingBottom:screenHeight *0.027,
  // paddingTop:screenHeight *0.027,
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

export default JoinStep1Screen;
