import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import StampBox from "@components/event/StampBox";
import ScanBox from "@components/event/ScanBox";
import ApplyBox from "@components/event/ApplyBox";

const C = (props) => {
  const stamp_cnt = props.eventDetail.entry.stamp_cnt;
  const stamp_history_cnt = props.eventDetail.entry.stamp_history_cnt;
  return (
    <View>
      {stamp_cnt - stamp_history_cnt > 0 && (
        <Container>
          <ApplyBox {...props} />
          <ScanBox {...props} />
        </Container>
      )}
      <StampBox {...props} />
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
