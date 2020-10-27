import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import StampBox from "@components/event/StampBox";
import ScanBox from "@components/event/ScanBox";

const C = (props) => {
  return (
    <View>
      <Container>
        <ScanBox
          setRcp_qr={props.setRcp_qr}
          scrollRef={props.scrollRef}
          eventDetail={props.eventDetail}
          {...props}
        />
      </Container>

      <StampBox
        onApply={props.onApply}
        eventDetail={props.eventDetail}
        {...props}
      />
    </View>
  );
};
const View = styled.View({
  width: "100%",
});
const Container = styled.View({
  paddingRight: 18,
  paddingLeft: 18,
  width: "100%",
});
export default C;
