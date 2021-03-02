import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, View, ActivityIndicator } from "react-native";
import Loading from "./Loading";

const Splash = (props) => {
  return (
    <BgImage
      source={require("../../assets/splash/ios/img1242x2436.png")}
      resizeMode="cover"
    />
  );
};
const BgImage = styled.Image({ width: "100%", height: "100%" });
const Container = styled.View({
  width: "100%",
  height: "100%",
});
export default Splash;
