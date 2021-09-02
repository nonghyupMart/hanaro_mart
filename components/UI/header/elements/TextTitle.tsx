import React from "react";
import styled from "styled-components/native";
import { BaseText } from "../../BaseUI";
import colors from "../../../../constants/Colors";

const TextTitle = (props) => {
  return (
    <Container>
      <Title>{props.children}</Title>
    </Container>
  );
};
const Container = styled.View({
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const Title = styled(BaseText)({
  fontSize: 20,
  lineHeight: 29,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.BLACK,

  flexShrink: 1,
});
Title.defaultProps = {
  numberOfLines: 1,
};

export default TextTitle;
