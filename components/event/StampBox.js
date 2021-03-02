import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  CheckButton,
  TitleContainer,
  TextView,
} from "../../screens/join/AgreementScreen";

import {
  BlueButton,
  BlueButtonText,
  BaseText,
  BaseTextInput,
  BaseImage,
  SCREEN_WIDTH,
} from "../../components/UI/BaseUI";
const StampBox = (props) => {
  const stamp_cnt = props.eventDetail.entry.stamp_cnt;
  const stamp_history_cnt = props.eventDetail.entry.stamp_history_cnt;
  let stamps = [];
  for (let i = 0; i < stamp_history_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("../../assets/images/on_nara192.png")}
        key={Math.random()}
      />
    );
  }
  for (let i = 0; i < stamp_cnt - stamp_history_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("../../assets/images/off_nara191.png")}
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
      {props.eventDetail.entry.status === "10" &&
        stamp_cnt - stamp_history_cnt <= 0 && (
          <BtnContainer>
            <BlueButton onPress={onPress}>
              <Image source={require("../../assets/images/ticket3.png")} />
              <BlueButtonText>교환처리(관리자전용)</BlueButtonText>
            </BlueButton>
          </BtnContainer>
        )}
      {props.eventDetail.entry.status === "20" && (
        <BtnContainer>
          <BlueButton style={{ backgroundColor: colors.greyishThree }}>
            <Image source={require("../../assets/images/ticket3.png")} />
            <BlueButtonText>교환완료</BlueButtonText>
          </BlueButton>
        </BtnContainer>
      )}
    </Container>
  );
};
const Container = styled.View({ width: "100%" });
const BtnContainer = styled.View({
  width: "100%",
});
const StampImage = styled.Image({
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
  marginBottom: 30,
});
export default StampBox;
