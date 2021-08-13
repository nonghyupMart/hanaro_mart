import React from "react";
import styled from "styled-components/native";
import { BaseText } from "./BaseUI";
import * as Util from "../../utils";

const CategoryButton = (props) => {
  if (props.type_val === props.item.type_val)
    return (
      <SelectedButton onPress={props.onPress}>
        <SelectedText>{props.item.type_nm}</SelectedText>
      </SelectedButton>
    );
  else
    return (
      <Button onPress={props.onPress}>
        <ButtonText>{props.item.type_nm}</ButtonText>
      </Button>
    );
};
const Button = styled.TouchableOpacity({
  borderWidth: 1,
  borderColor: colors.EMERALD,
  borderRadius: 30,
  paddingLeft: 12,
  paddingRight: 12,
  marginRight: 6,
  justifyContent: "center",
  alignItems: "center",
  height: Util.normalize(28.5),
});
const ButtonText = styled(BaseText)({
  fontSize: Util.normalize(14),
  letterSpacing: -0.34,
  textAlign: "center",
  color: colors.EMERALD,
  fontFamily: "Roboto-Bold",
});
const SelectedButton = styled(Button)({
  backgroundColor: colors.EMERALD,
});
const SelectedText = styled(ButtonText)({ color: colors.TRUE_WHITE });

export default CategoryButton;
