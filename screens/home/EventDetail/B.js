import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import ApplyBox from "@components/event/ApplyBox";
import ScanBox from "@components/event/ScanBox";

const B = (props) => {
  return (
    <Container>
      <ScanBox
        setRcp_qr={props.setRcp_qr}
        scrollRef={props.scrollRef}
        {...props}
      />
      {props.rcp_qr && (
        <ApplyBox
          onApply={props.onApply}
          setAlert={props.setAlert}
          {...props}
        />
      )}
    </Container>
  );
};

const Container = styled.View({
  paddingRight: 18,
  paddingLeft: 18,

  width: "100%",
});
export default B;
