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
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <GreenButton
          onPress={() => {
            navigation.navigate("JoinStep2");
          }}
        >
          <ButtonText>간편가입</ButtonText>
        </GreenButton>
        <BlueButton title="본인인증">
          <ButtonText>본인인증</ButtonText>
        </BlueButton>
      </View>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
    height: "100%",
  },
  allCheck: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JoinStep1Screen;
