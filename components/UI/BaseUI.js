import React from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableOpacity } from "react-native";
export const { width: screenWidth, height: screenHeight } = Dimensions.get(
  "window"
);
export const StyleConstants = { defaultPadding: 16 };
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
