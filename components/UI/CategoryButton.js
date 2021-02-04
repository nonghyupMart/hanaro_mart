import React from "react";
import styled from "styled-components/native";
import { BaseText } from "./BaseUI";

const CategoryButton = (props) => {
  if (props.type_val == props.item.type_val)
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
  borderColor: colors.emerald,
  borderRadius: 20,
  padding: 5,
  paddingLeft: 12,
  paddingRight: 12,
  marginRight: 6,
  aspectRatio: 1 / 0.556,
  justifyContent: "center",
  alignItems: "center",
});
const ButtonText = styled(BaseText)({
  fontSize: 17,
  letterSpacing: -0.34,
  textAlign: "center",
  color: colors.emerald,
});
const SelectedButton = styled(Button)({
  backgroundColor: colors.emerald,
});
const SelectedText = styled(ButtonText)({ color: colors.trueWhite });

export default CategoryButton;
