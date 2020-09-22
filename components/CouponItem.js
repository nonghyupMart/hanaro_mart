import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import styled from "styled-components/native";
import { BaseImage, screenWidth, BaseTouchable } from "@UI/BaseUI";

const CouponItem = (props) => {
  return (
    <Container index={props.index}>
      <Discount>
        {props.item.price}
        {props.item.price_gbn == "A" ? "원 " : "% "}
        할인
      </Discount>
      <BaseImage
        source={props.item.title_img}
        style={{
          height: screenWidth * 0.333,
        }}
        defaultSource={require("@images/n_img501.png")}
      />
      <Title>{props.item.title}</Title>
      <Date>
        {props.item.start_date}~{props.item.end_date}
      </Date>
      {props.item.status == "00" && (
        <Button onPress={props.onPress}>
          <ButtonText>쿠폰 다운로드</ButtonText>
          <Icon source={require("@images/ic_file_download_24px.png")} />
        </Button>
      )}
      {props.item.status == "10" && (
        <Button onPress={props.onPress}>
          <ButtonText>사용하기</ButtonText>
          <Icon source={require("@images/ic_rotate_right_24px.png")} />
        </Button>
      )}
      {props.item.status == "20" && (
        <Button>
          <ButtonText style={{ color: colors.greyishThree }}>
            사용완료
          </ButtonText>
          <Icon source={require("@images/ic_timer_24px.png")} />
        </Button>
      )}
    </Container>
  );
};
const Icon = styled.Image({});
const ButtonText = styled.Text({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
  marginRight: 5,
});
const Button = styled(BaseTouchable).attrs({
  activeOpacity: 0.5,
})({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  borderRadius: 17,
  backgroundColor: colors.white,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  minHeight: 26,
  height: screenWidth * 0.072,
});
const Title = styled.Text({
  marginTop: 20,
  marginBottom: 40,
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
});
const Discount = styled.Text({
  fontSize: 18,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: -0.45,
  textAlign: "center",
  color: colors.lipstick,
  marginBottom: 20,
});

const StatusContainer = styled.View({
  flexDirection: "row",
});

const Date = styled.Text({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
  marginBottom: 10,
});
const Container = styled.View({
  maxWidth: "50%",
  flex: 0.483,
  width: "100%",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.white,
  padding: 18,

  // marginLeft: (props) => console.log(props),
  // marginRight: (props) => (props.index % 2 == 0 ? 5 : 0),
  marginTop: (props) => (screenWidth - 4 - 18 - 18) * 0.034,
});

export default CouponItem;
