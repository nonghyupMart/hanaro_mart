import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import "moment/min/locales";
import {
  BaseImage,
  SCREEN_WIDTH,
  BaseTouchable,
  BaseText,
} from "../../components/UI/BaseUI";
import colors from "../../constants/Colors";

const BoardItem = (props) => {
  return (
    <Container>
      <Img source={require("../../assets/images/path5.png")} />
      <TitleContainer>
        <Date>일자 : {props.item.reg_date}</Date>
      </TitleContainer>
      <Title>내용 : {props.item.trade_nm}</Title>
    </Container>
  );
};

const Img = styled.Image({
  position: "absolute",
  right: 0,
  top: 0,
});
const Title = styled(BaseText)({
  fontSize: 15,
  fontFamily: "Roboto-Bold",
  color: colors.black,
});
const Status = styled(BaseText)({
  fontSize: 13,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
  marginLeft: 3,
});
const StatusContainer = styled.View({
  flexDirection: "row",
});
const TitleContainer = styled.View({
  flexDirection: "row",
  marginBottom: 10,
});
const Date = styled(BaseText)({
  fontSize: 15,
  fontFamily: "Roboto-Bold",
  color: colors.black,
});
const Container = styled.View({
  width: "100%",
  marginBottom: 13,
  borderLeftWidth: 5,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderRightWidth: 1,
  borderColor: colors.white2,
  borderLeftColor: colors.greyishTwo,
  paddingLeft: 17,
  paddingTop: 17,
  paddingBottom: 17,
});

export default React.memo(BoardItem);
