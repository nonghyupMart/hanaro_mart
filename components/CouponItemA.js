import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import styled from "styled-components/native";
import { BaseImage, screenWidth, BaseTouchable, BaseText } from "@UI/BaseUI";
import * as Util from "@util";

const CouponItemA = (props) => {
  return (
    <CouponContainer index={props.index}>
      <CouponImgA source={props.item.title_img} />
      <TextContainer>
        <TitleContainer>
          <Title>{props.item.title}</Title>
          <Title>
            [{Util.formatNumber(props.item.price)}
            {props.item.price_gbn == "A" ? "원 " : "% "}
            할인]
          </Title>
          <Date>
            {props.item.start_date} ~ {props.item.end_date}
          </Date>
        </TitleContainer>
        {props.item.status == "00" && (
          <IconContainer onPress={props.onPress}>
            <Image source={require("@images/download25.png")} />
            <IconText style={{ color: colors.blueyGreen }}>쿠폰받기</IconText>
          </IconContainer>
        )}
        {props.item.status == "10" && (
          <IconContainer onPress={props.onPress}>
            <Image source={require("@images/use25.png")} />
            <IconText style={{ color: colors.booger }}>사용하기</IconText>
          </IconContainer>
        )}
        {props.item.status == "20" && (
          <IconContainer2 onPress={props.onPress}>
            <Image source={require("@images/timer25.png")} />
            <IconText style={{ color: colors.silver }}>사용완료</IconText>
          </IconContainer2>
        )}
      </TextContainer>
    </CouponContainer>
  );
};
const Date = styled(BaseText)({
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishThree,
  marginTop: 6,
});
const IconText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.cerulean,
  marginTop: 3,
});
const IconContainer2 = styled.View({
  justifyContent: "center",
  alignItems: "center",
});
const IconContainer = styled.TouchableOpacity({
  justifyContent: "center",
  alignItems: "center",
});
const Title = styled(BaseText)({
  fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const TitleContainer = styled.View({});
const TextContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
});
const CouponImgA = styled(BaseImage)({
  // flex: 0.375,
  width: screenWidth * 0.311,
  // flex: 1,
  marginRight: 15,
  // height: 100,
});

const CouponContainer = styled.View({
  width: "100%",

  flexDirection: "row",
  justifyContent: "space-between",
  //   flex: 1,
  borderWidth: 1,
  borderColor: colors.white,
  padding: 15,
  marginTop: (props) => (screenWidth - 4 - 18 - 18) * 0.02,
});
export default CouponItemA;
