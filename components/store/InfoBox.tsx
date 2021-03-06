import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { BaseText } from "../UI/BaseUI";
import colors from "../../constants/Colors";

const InfoBox = (props) => {
  return (
    <StoreBox style={{}}>
      <TitleContainer>
        <Plus />
        <BlueText>나의 매장을 설정해 주세요</BlueText>
      </TitleContainer>
      <BottomCover onLoadStart={() => {}} />
    </StoreBox>
  );
};
const TitleContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 30,
});
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
  source: require("../../assets/images/num_m.png"),
  resizeMode: "cover",
};
const BlueText = styled(BaseText)({
  marginTop: 10,
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.CERULEAN,
});
const Plus = styled.Image({ marginTop: 19, marginBottom: 10 });

Plus.defaultProps = {
  source: require("../../assets/images/num4291.png"),
};
export const StoreBox = styled.View({
  flex: 1,
  width: "100%",

  backgroundColor: colors.WHITE,

  alignItems: "center",
});

export default InfoBox;
