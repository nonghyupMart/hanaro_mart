import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Platform, View, StyleSheet } from "react-native";
import {
  BaseTouchable,
  SCREEN_WIDTH,
  BaseButtonContainer,
  SCREEN_HEIGHT,
  BaseText,
} from "../../components/UI/BaseUI";
import Constants from "expo-constants";
import _ from "lodash";
const NoList = (props) => {
  return (
    <EmptyScreen style={[props.style]}>
      <Circle>
        <Image source={props.source} />
        <Text>{props.text}</Text>
      </Circle>
      {props.infoText && <InfoText>{props.infoText}</InfoText>}
      {!props.infoText && (
        <InfoText>{`현재 진행중인 ${props.text}\n목록이 없습니다.`}</InfoText>
      )}
    </EmptyScreen>
  );
};
export const EmptyScreen = styled.View({
  flex: 1,
  width: "100%",
  height: "100%",
  backgroundColor: colors.trueWhite,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
});

const InfoText = styled(BaseText)({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishThree,
});
const Image = styled.Image({
  marginBottom: 9,
});
const Text = styled(BaseText)({
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
});
const Circle = styled.View({
  borderRadius: 106,
  width: 106,
  height: 106,
  backgroundColor: colors.pinkishGrey,
  marginBottom: 9,
  alignItems: "center",
  justifyContent: "center",
});
export default NoList;
