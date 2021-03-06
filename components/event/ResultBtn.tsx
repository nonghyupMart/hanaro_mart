import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import styled from "styled-components/native";
import {
  BlueButton,
  BlueButtonText,
  BaseText,
  BaseTextInput,
} from "../UI/BaseUI";
import colors from "../../constants/Colors";

const ResultBtn = (props) => {
  if (props.eventDetail.entry.winner_yn !== "Y") return <></>;
  return (
    <GreenButton
      style={{ marginTop: 15 }}
      onPress={() =>
        props.navigation.navigate("EventResult", {
          eventDetail: props.eventDetail,
        })
      }
    >
      <BlueButtonText>추첨결과 확인</BlueButtonText>
    </GreenButton>
  );
};
const GreenButton = styled(BlueButton)({
  backgroundColor: colors.EMERALD,
});

export default ResultBtn;
