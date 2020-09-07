import React from "react";
import styled from "styled-components/native";
import {
  Platform,
  Text,
  Button,
  Icon,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  Keyboard,
  Image,
} from "react-native";
const LogoTitle = (props) => {
  return (
    <Container>
      <Image source={require("@images/hanalogo_off.png")} />
      <BranchName>양재점</BranchName>
    </Container>
  );
};

const Container = styled.View({
  flex: 1,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
});
const BranchName = styled.Text({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
  marginLeft: 5.5,
  marginTop: 3.5,
});
export default LogoTitle;
