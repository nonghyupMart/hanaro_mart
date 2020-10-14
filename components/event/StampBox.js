import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  CheckButton,
  TitleContainer,
  TextView,
} from "@screens/join/AgreementScreen";

import {
  BlueButton,
  BlueButtonText,
  BaseText,
  BaseTextInput,
  BaseImage,
} from "@UI/BaseUI";
const StampBox = (props) => {
  const stamp_cnt = props.eventDetail.entry.stamp_cnt;
  const stamp_history_cnt = props.eventDetail.entry.stamp_history_cnt;
  let stamps = [];
  for (let i = 0; i < stamp_history_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("@images/on_nara192.png")}
        key={Math.random()}
      />
    );
  }
  for (let i = 0; i < stamp_cnt - stamp_history_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("@images/off_nara191.png")}
        key={Math.random()}
      />
    );
  }

  const onPress = () => {
    props.navigation.navigate("BarCodeScanner", {
      setRcp_qr: props.setMana_qr,
    });
  };
  return (
    <Container>
      <StampContainer>
        {stamps.map((item, index) => {
          return item;
        })}
      </StampContainer>
      <BtnContainer>
        <BlueButton onPress={onPress}>
          <Image source={require("@images/ticket3.png")} />
          <BlueButtonText>교환처리(관리자전용)</BlueButtonText>
        </BlueButton>
      </BtnContainer>
    </Container>
  );
};
const Container = styled.View({ width: "100%" });
const BtnContainer = styled.View({
  marginTop: 30,
  width: "100%",
});
const StampImage = styled(BaseImage)({
  margin: 15,
});
const StampContainer = styled.View({
  width: "100%",
  backgroundColor: colors.white,
  flexDirection: "row",
  flexWrap: "wrap",
  padding: 20,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 30,
});
export default StampBox;
