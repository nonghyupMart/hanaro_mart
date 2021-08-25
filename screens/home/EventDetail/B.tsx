import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import ApplyBox from "../../../components/event/ApplyBox";
import ScanBox from "../../../components/event/ScanBox";
import ResultBtn from "../../../components/event/ResultBtn";

const B = (props) => {
  return (
    <Container>
      <ApplyBox {...props} />
      <ScanBox {...props} />
      <ResultBtn {...props} />
    </Container>
  );
};

const Container = styled.View({
  paddingRight: 24,
  paddingLeft: 24,

  width: "100%",
});
export default B;
