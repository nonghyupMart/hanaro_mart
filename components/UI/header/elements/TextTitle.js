import React from "react";
import styled from "styled-components/native";

const TextTitle = (props) => {
  return <Title>{props.children}</Title>;
};

const Title = styled.Text({
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 29,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
export default TextTitle;
