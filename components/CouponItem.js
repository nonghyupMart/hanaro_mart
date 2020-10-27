import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import styled from "styled-components/native";
import { BaseImage, screenWidth, BaseTouchable, BaseText } from "@UI/BaseUI";
import * as Util from "@util";

const CouponItem = (props) => {
  return (
    <Container index={props.index}>
      <Discount>
        {Util.formatNumber(props.item.price)}
        {props.item.price_gbn == "A" ? "원 " : "% "}
        할인
      </Discount>
      <BaseImage
        source={props.item.title_img}
        style={{
          height: screenWidth * 0.277,
          aspectRatio: 1 / 1,
          alignSelf: "center",
        }}
        defaultSource={require("@images/n_img501.png")}
      />
      <Title>{props.item.title}</Title>
      <Date>
        {props.item.start_date}~{props.item.end_date}
      </Date>
      {props.item.status == "00" && (
        <Button
          onPress={props.onPress}
          style={{ backgroundColor: colors.cerulean }}
        >
          <ButtonText>쿠폰 다운로드</ButtonText>
          <Icon source={require("@images/ic_file_download_24px.png")} />
        </Button>
      )}
      {props.item.status == "10" && (
        <Button
          onPress={props.onPress}
          style={{ backgroundColor: colors.viridian }}
        >
          <ButtonText>사용하기</ButtonText>
          <Icon source={require("@images/ic_rotate_right_24px.png")} />
        </Button>
      )}
      {props.item.status == "20" && (
        <Button onPress={props.onPress}>
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
const ButtonText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
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
  borderWidth: 0,
  borderColor: colors.pinkishGrey,
  minHeight: 26,
  height: screenWidth * 0.072,
});
const Title = styled(BaseText)({
  marginTop: 3,
  marginBottom: 0,
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
});
const Discount = styled(BaseText)({
  fontSize: 18,
  fontFamily: "CustomFont-Bold",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: -0.45,
  textAlign: "center",
  color: colors.lipstick,
  marginBottom: 8,
});

const StatusContainer = styled.View({
  flexDirection: "row",
});

const Date = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
  marginBottom: 10,
  letterSpacing: -0.5,
});
const Container = styled.View({
  maxWidth: "50%",
  flex: 0.489,
  width: "100%",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.white,
  padding: 10,

  // marginRight: (props) => (props.index % 2 == 0 ? 5 : 0),
  marginTop: (props) => (screenWidth - 4 - 18 - 18) * 0.020,
});

export default CouponItem;
