import React from "react";
import styled from "styled-components/native";
import colors from "@constants/colors";
import { IMAGE_URL } from "@constants/settings";
import { Dimensions, TouchableOpacity, Image } from "react-native";
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
  // console.warn(JSON.stringify(props, null, "\t"));

  return {
    backgroundColor: colors.white,
  };
});

BaseImage.defaultProps = {
  defaultSource: require("@images/b_img500.png"),
  resizeMode: "cover",
};
export const BaseTouchable = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};
export const BaseButtonContainer = styled(BaseTouchable)({
  width: screenWidth * 0.44,
  minHeight: screenHeight * 0.058,
  height: undefined,
  borderRadius: 21,
  justifyContent: "center",
  alignItems: "center",
});

export const ButtonText = styled.Text({
  fontSize: 16,
  // flex: 1,
  // flexDirection: "column",
  color: colors.trueWhite,
});

export const BaseSquareButtonContainer = styled(BaseButtonContainer)({
  borderRadius: 8,
});

export const DetailContainer = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.trueWhite,
  marginTop: 7,
  paddingLeft: 18,
  paddingRight: 18,
  paddingBottom: 45,
});

export const BlueButtonText = styled.Text({
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
