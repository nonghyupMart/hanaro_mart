import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  BlueButton,
  BlueButtonText,
  BaseText,
  BaseTextInput,
  BaseImage,
  SCREEN_WIDTH,
} from "../../components/UI/BaseUI";
import colors from "../../constants/Colors";

const StampBox = (props) => {
  const stamp_cnt = props.eventDetail.entry.stamp_cnt;
  const stamp_type1_cnt = props.eventDetail.entry.stamp_type1_cnt;
  const stamp_type2_cnt = props.eventDetail.entry.stamp_type2_cnt;
  let stamps = [];
  for (let i = 0; i < stamp_type2_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("../../assets/images/naro.png")}
        key={Math.random()}
      />
    );
  }
  for (let i = 0; i < stamp_type1_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("../../assets/images/on_nara192.png")}
        key={Math.random()}
      />
    );
  }

  for (let i = 0; i < stamp_cnt - stamp_type1_cnt - stamp_type2_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("../../assets/images/off_nara191.png")}
        key={Math.random()}
      />
    );
  }

  const onPress = () => {
    props.navigation.navigate("BarCodeScanner", {
      setRcp_qr: props.onExchangeStamp,
      isForStaff: true,
    });
  };
  const onPressForInterim = () => {
    props.navigation.navigate("BarCodeScanner", {
      setRcp_qr: props.onInterimExchangeStamp,
      isForStaff: true,
    });
  };
  return (
    <Container>
      <StampContainer>
        {stamps.map((item, index) => {
          return item;
        })}
      </StampContainer>
      {props.eventDetail.entry.trade_btn === "Y" && (
        <BlueButton onPress={onPress}>
          <Image source={require("../../assets/images/ticket3.png")} />
          <BlueButtonText>교환처리(관리자전용)</BlueButtonText>
        </BlueButton>
      )}
      {props.eventDetail.entry.exchange_btn === "Y" && (
        <BlueButton onPress={onPressForInterim}>
          <Image source={require("../../assets/images/ticket3.png")} />
          <BlueButtonText>중간정산(관리자전용)</BlueButtonText>
        </BlueButton>
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
  backgroundColor: colors.WHITE,
  flexDirection: "row",
  flexWrap: "wrap",
  padding: 20,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 30,
  marginBottom: 30,
});
export default StampBox;
