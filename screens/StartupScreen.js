import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Image, View, ActivityIndicator } from "react-native";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
} from "@UI/BaseUI";

const StartupScreen = (props) => {
  return (
    // <View>
    //   {/* <ActivityIndicator size="large" color={colors.cerulean} /> */}
    // </View>
    <Container>
    <BgImage
        source={require("@images/img1242x2436.png")}
        resizeMode="cover"
      />
      <ActivityIndicator
        size="large"
        color={colors.cerulean}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
    </Container>
  );
};
const BgImage = styled.Image({ width: "100%", height: "100%" });
const Container = styled.View({
  width: "100%",
  height: "100%",
});
export default StartupScreen;
