import React from "react";
import styled from "styled-components/native";
import { IMAGE_URL } from "@constants/settings";
import { Dimensions, TouchableOpacity } from "react-native";
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
export const BaseImage = styled.Image.attrs((props) => {
  let source;
  if (typeof props.source == "string")
    source = {
      uri: IMAGE_URL + props.source,
    };
  else source = props.source;
  return {
    source: source,
  };
})`
  flex: 1;
  background-color: ${colors.pinkishGrey};
`;

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
  height: 42,
  borderRadius: 21,
  justifyContent: "center",
  alignItems: "center",
});

export const BaseText = styled.Text({});
BaseText.defaultProps = {
  numberOfLines: 1,
};

export const ButtonText = styled(BaseText)({
  fontSize: 16,
  // flex: 1,
  // flexDirection: "column",
  color: colors.trueWhite,
});

export const BaseSquareButtonContainer = styled(BaseButtonContainer)({
  borderRadius: 8,
});
