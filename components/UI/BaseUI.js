import React from "react";
import styled from "styled-components/native";
import colors from "@constants/colors";
import { Image } from "react-native-expo-image-cache";
import { IMAGE_URL } from "@constants/settings";
import * as Util from "@util";
import {
  Dimensions,
  TouchableOpacity,
  Platform,
  View,
  Text,
  TextInput,
} from "react-native";
// import ScaledImage from "@UI/ScaledImage";
export { default as ScaledImage } from "@UI/ScaledImage";
export const { width: screenWidth, height: screenHeight } = Dimensions.get(
  "window"
);
export const StyleConstants = {
  defaultPadding: 16,
  //  defaultImageLarge: require("@images/m_img499.png"),
  //  defaultImage: require("@images/b_img500.png"),
  //  defaultImage: require("@images/b_img500.png"),
  //  defaultImage: require("@images/b_img500.png"),
};
Text.defaultProps = { allowFontScaling: false };
export const BaseText = styled(Text)({
  // fontFamily: "SourceHanSansKR",
});

BaseText.defaultProps = { allowFontScaling: false };
TextInput.defaultProps = {
  allowFontScaling: false,
  underlineColorAndroid: "transparent",
};
export const BaseTextInput = styled(TextInput)({
  // fontFamily: "SourceHanSansKR",
  borderWidth: 0,
});

BaseTextInput.defaultProps = { allowFontScaling: false };
export const BaseImage = styled(Image).attrs((props) => {
  let source;
  if (typeof props.source == "string")
    source = {
      uri: IMAGE_URL + props.source,
    };
  else source = props.source;
  return {
    source: source,
  };
})((props) => {
  return {
    backgroundColor: colors.white,
  };
});

BaseImage.defaultProps = {
  defaultSource: require("@images/b_img500.png"),
  resizeMode: "cover",
};
const BaseTouchbaleOpacity = (props) => {
  const opacity = props.disabled === true ? 0.5 : 1;
  return (
    <TouchableOpacity {...props}>
      <View style={{ opacity }}>{props.children}</View>
    </TouchableOpacity>
  );
};
export const BaseTouchable = (props) => {
  const Touchbale = Util.withPreventDoubleClick(TouchableOpacity);
  return <Touchbale {...props}>{props.children}</Touchbale>;
};
export const BaseButtonContainer = styled(BaseTouchable)({
  width: screenWidth * 0.44,
  minHeight: screenHeight * 0.058,
  height: undefined,
  borderRadius: 21,
  justifyContent: "center",
  alignItems: "center",
});

export const ButtonText = styled(BaseText)({
  fontSize: 16,
  // flex: 1,
  // flexDirection: "column",
  color: colors.trueWhite,
});

export const BaseSquareButtonContainer = styled(BaseButtonContainer)({
  borderRadius: 8,
});

const DetailContainerBody = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.trueWhite,
  // marginTop: 7,
  paddingLeft: 18,
  paddingRight: 18,
  paddingBottom: 45,
});
const DetailContainerMarginTop = styled.View({
  width: "100%",
  height: 7,
  backgroundColor: colors.white,
});
export const DetailContainer = (props) => {
  return (
    <>
      <DetailContainerMarginTop />
      <DetailContainerBody {...props} />
    </>
  );
};

export const BlueButtonText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
  marginLeft: 9,
});
export const BlueButton = styled(BaseButtonContainer)({
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.cerulean,
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
  width: screenWidth - 18 * 2,
  alignSelf: "center",
  aspectRatio: 100 / 12.804,
  borderRadius: 25,
});

export const EmptyText = styled(BaseText)({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishThree,
  marginTop: 28,
});
export const EmptyScreen = styled.View({
  flex: 1,
  width: "100%",
  height: "100%",
  backgroundColor: colors.trueWhite,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
});

export const EmptyIcon = styled.Image({});
