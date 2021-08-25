import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, View, ActivityIndicator } from "react-native";
import Loading from "./Loading";
import colors from "../../constants/Colors";

const Splash = (props) => {
  return (
    <>
      <BgImage
        source={require("../../assets/splash/ios/img1242x2436.png")}
        resizeMode="cover"
        {...props}
      />
      <ActivityIndicator
        size="large"
        color={colors.CERULEAN}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        // style={{ marginTop: -headerHeight }}
      />
    </>
  );
};
const BgImage = styled.Image({ width: "100%", height: "100%" });
const Container = styled.View({
  width: "100%",
  height: "100%",
});
export default Splash;
