import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";

const Splash = (props: any) => {
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

export default Splash;
