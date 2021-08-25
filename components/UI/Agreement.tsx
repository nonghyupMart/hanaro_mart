import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Image,
} from "react-native";
import { styles } from "../join/styles";
import { CheckBox } from "react-native-elements";
import colors from "../../constants/Colors";
import {
  BaseButtonContainer,
  ButtonText,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  BaseText,
} from "./BaseUI";
import _ from "lodash";

export const CircleCheckButton = (props) => {
  const checkedIcon = require("../../assets/images/checkcircleon.png");
  const uncheckedIcon = require("../../assets/images/checkcircleoff.png");

  return (
    <CheckBox
      {...props}
      containerStyle={[styles.checkbox, { marginLeft: 0, marginRight: 0 }]}
      checkedIcon={<Image source={checkedIcon} />}
      uncheckedIcon={<Image source={uncheckedIcon} />}
    />
  );
};
export const CheckButton = (props) => {
  const checkedIcon = props.value.isRequired
    ? require("../../assets/images/check_box-2404.png")
    : require("../../assets/images/check_box-2402.png");
  const uncheckedIcon = props.value.isRequired
    ? require("../../assets/images/check_box-2403.png")
    : require("../../assets/images/check_box-2401.png");
  return (
    <CheckBox
      {...props}
      containerStyle={[styles.checkbox]}
      checked={props.value.isChecked}
      checkedIcon={<Image source={checkedIcon} />}
      uncheckedIcon={<Image source={uncheckedIcon} />}
    />
  );
};

const BulletIcon = styled(Image)({ marginTop: 3 });
BulletIcon.defaultProps = {
  source: require("../../assets/images/checkmark2.png"),
};

export const GrayDesc = styled(BaseText)({
  fontSize: 12,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_THREE,
  marginTop: 5,
  marginLeft: 16,
  marginRight: 23,
});
export const DescText1 = styled(BaseText)({
  marginLeft: 5,
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
});
export const Desc = styled.View({ marginLeft: 46, marginBottom: 5 });
export const DescTextLine = styled.View({
  flexDirection: "row",
  alignItems: "center",
});
export const TitleContainer = styled.View({
  flexDirection: "row",
  flex: 0.75,
});
// export const MarginContainer = styled.View({ marginLeft: 13 });

export const TitleArea = styled.View({
  paddingBottom: (props) => (!props.desc && props.isOpen ? 5 : 0),
  flex: 1,
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  // paddingRight: 6,
});

const NoticeText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.BLACK,
  marginRight: 30,
  marginLeft: 30,
  marginTop: 42,
  marginBottom: 48,
});

const BottonBase = styled(BaseButtonContainer)({
  borderRadius: 47,
  width: SCREEN_WIDTH * 0.43,
  aspectRatio: 100 / 22,
});
const GreenButton = styled(BottonBase)({
  backgroundColor: colors.PINE,
});
const BlueButton = styled(BottonBase)({
  backgroundColor: colors.CERULEAN,
});
const TextBox = styled.View({
  alignItems: "flex-start",
  backgroundColor: colors.TRUE_WHITE,
  justifyContent: "flex-start",
  marginBottom: 11,
  paddingBottom: 5,
  paddingTop: 5,
  // paddingRight: 5,
  width: "100%",
  borderRadius: 6,
  backgroundColor: colors.TRUE_WHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.PINKISH_GREY,
  flex: 1,
  overflow: "hidden",
});
export const TextView = styled(BaseText)({
  flexShrink: 1,
  lineHeight: 20,
  fontSize: 12,
  color: colors.GREYISH_BROWN,
  fontFamily: "Roboto-Bold",
  flexShrink: 0,
});
export const BoldText = styled(BaseText).attrs({})({
  fontFamily: "Roboto-Bold",
  lineHeight: 20,
});
