import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import ApplyBox from "../../../components/event/ApplyBox";
import ResultBtn from "../../../components/event/ResultBtn";
const A = (props) => {
  return (
    <Container>
      <ApplyBox {...props} isShowApplyButton={true} />
      <ResultBtn {...props} />
    </Container>
  );
};
const Container = styled.View({
  paddingRight: 24,
  paddingLeft: 24,
  flex: 1,
  width: "100%",
});
export default A;
