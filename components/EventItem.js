import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import styled from "styled-components/native";
import {
  BaseImage,
  SCREEN_WIDTH,
  BaseTouchable,
  BaseText,
} from "../components/UI/BaseUI";

const EventItem = (props) => {
  return (
    <Container onPress={props.onPress}>
      <BaseImage
        source={props.item.title_img}
        style={{
          height: SCREEN_WIDTH * 0.316,
          borderWidth: 1,
          borderColor: colors.pinkishGrey,
        }}
        resizeModede="stretch"
        defaultSource={require("../assets/images/b_img500.png")}
      />
      <TitleContainer>
        <StatusContainer>
          {props.item.status == "O" && (
            <>
              <Image
                source={require("../assets/images/stopwatch.png")}
                style={{ height: 20 }}
              />
              <Status>진행중</Status>
            </>
          )}
          {props.item.status == "C" && (
            <>
              <Image
                source={require("../assets/images/stopwatchgray.png")}
                style={{ height: 20 }}
              />
              <Status style={{ color: colors.greyishThree }}>종료</Status>
            </>
          )}
        </StatusContainer>
        <Date>
          {props.item.start_date} ~ {props.item.end_date}
        </Date>
      </TitleContainer>
    </Container>
  );
};

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
  marginLeft: 10,
  marginTop: 5,
  marginRight: 10,
});
const Date = styled(BaseText)({
  marginLeft: 5,
  fontSize: 13,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Container = styled(BaseTouchable)({
  marginTop: 20,
  width: "100%",
});

export default EventItem;
