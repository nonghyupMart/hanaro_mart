import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import styled from "styled-components/native";
import { BaseImage, screenWidth } from "@UI/BaseUI";

const EventItem = (props) => {
  return (
    <Container>
      <BaseImage
        source={props.item.title_img}
        style={{
          height: screenWidth * 0.316,

          borderWidth: 1,
          borderColor: colors.pinkishGrey,
        }}
      />
      <TitleContainer>
        <StatusContainer>
          <Image source={require("@images/stopwatch.png")} />
          <Status>진행중</Status>
        </StatusContainer>
        <Date>
          {props.item.start_date} ~ {props.item.end_date}
        </Date>
      </TitleContainer>
    </Container>
  );
};
const Status = styled.Text({
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
const Date = styled.Text({
  marginLeft: 5,
  fontSize: 13,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Container = styled.View({
  marginTop: 20,
  flex: 1,
});

export default EventItem;
