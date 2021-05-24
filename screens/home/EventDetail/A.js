import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import ApplyBox from "../../../components/event/ApplyBox";
const A = (props) => {
  return (
    <Container>
      <ApplyBox {...props} isShowApplyButton={true} />
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
