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
} from "../components/UI/BaseUI";

const EventItem = (props) => {
  const startDate = moment(props.item.start_date)
    .locale("ko")
    .format("YYYY.MM.DD(dd)");
  const endDate = moment(props.item.end_date)
    .locale("ko")
    .format("YYYY.MM.DD(dd)");
  return (
    <Container>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View style={{ borderRadius: 10, overflow: "hidden" }}>
          <BaseImage
            source={props.item.title_img}
            style={{
              height: SCREEN_WIDTH * 0.316,
            }}
            defaultSource={require("../assets/images/b_img500.png")}
          />
        </View>
        <Title>{props.item.title}</Title>
        <TitleContainer>
          <Date>{`행사기간 : ${startDate} ~ ${endDate}`}</Date>
        </TitleContainer>
      </TouchableOpacity>
    </Container>
  );
};

const Title = styled(BaseText)({
  fontSize: 15,
  fontFamily: "Roboto-Bold",
  color: colors.black,
  lineHeight: 22.5,
  height: 25,
  marginTop: 8.5,
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
});
const Date = styled(BaseText)({
  fontSize: 11,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 16.5,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Container = styled.View({
  width: "100%",
  marginBottom: 20,
});

export default React.memo(EventItem);
