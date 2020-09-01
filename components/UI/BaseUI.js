import styled from "styled-components/native";
import BaseTouchable from "@components/BaseTouchable";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const BaseButton = styled(BaseTouchable)({
  width: width * 0.44,
  height: 42,
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

export const BaseSquareButton = styled(BaseButton)({
  borderRadius: 8,
});
