import React from "react";
import styled from "styled-components/native";
import { BaseText } from "@UI/BaseUI";

const TextTitle = (props) => {
  return (
    <Container>
      <Title>{props.children}</Title>
    </Container>
  );
};
const Container = styled.View({
  flex: 1,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const Title = styled(BaseText)({
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 29,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,

  flexShrink: 1,
});
export default TextTitle;
