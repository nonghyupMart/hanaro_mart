import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import blueplus from "@images/plusblue.png";
const InfoBox = (props) => {
  return (
    <StoreBox style={{}}>
      <Plus />
      <BlueText>나의 매장을 설정해 주세요</BlueText>
      <BottomCover
        onLoadStart={() => {
          // setIsLoading(true);
        }}
      />
    </StoreBox>
  );
};
export const BottomCover = styled.Image({
  width: "100%",
  height: 22,
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  //   overflow: "visible",
  //   backfaceVisibility: "visible",
  //   flex: 1,
});
BottomCover.defaultProps = {
  source: require("@images/num_m.png"),
  resizeMode: "cover",
};
const BlueText = styled.Text({
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.cerulean,
  marginBottom: 50,
});
const Plus = styled.Image({ marginTop: 19, marginBottom: 10 });

Plus.defaultProps = {
  source: blueplus,
  defaultSource: blueplus,
};
export const StoreBox = styled.View({
  flex: 1,
  width: "100%",

  backgroundColor: colors.white,

  alignItems: "center",
});

export default InfoBox;
