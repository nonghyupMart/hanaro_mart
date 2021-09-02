import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import * as Util from "../../utils";
import { BaseImage, BaseText, SCREEN_WIDTH } from "../UI/BaseUI";
import CouponButton from "./CouponButton";

const CouponItem = (props) => {
  return (
    <Container index={props.index}>
      <View>
        <BaseImage
          source={props.item.title_img}
          style={{
            height: SCREEN_WIDTH * 0.328,
            aspectRatio: 1 / 1,
            alignSelf: "center",
          }}
          resizeMode="contain"
          initResizeMode="contain"
          defaultSource={require("../../assets/images/n_img501.png")}
        />
        {props.item.remain_yn === "Y" && (
          <CountContainer>
            <Count>{props.item.current_remain}개 남음</Count>
          </CountContainer>
        )}
      </View>
      <Title numberOfLines={1}>{props.item.title}</Title>
      <Discount
        numberOfLines={1}
        style={{
          color: props.item.status > 10 ? colors.GREYISH_TWO : colors.EMERALD,
        }}
      >
        {Util.formatNumber(props.item.price)}
        {props.item.price_gbn === "A" ? "원 " : "% "}
        할인
      </Discount>
      <Date>
        {props.item.start_date} ~ {props.item.end_date}
      </Date>
      <CouponButton status={props.item.status} onPress={props.onPress} />
    </Container>
  );
};
const CountContainer = styled.View({
  backgroundColor: colors.GRAPEFRUIT,
  borderRadius: 18,
  aspectRatio: (100 / 31.818) as any,
  height: 17.5,
  justifyContent: "center",
  alignSelf: "center",
  position: "absolute",
  bottom: 0,
});
const Count = styled(BaseText)({
  lineHeight: 12,
  letterSpacing: -0.27,
  textAlign: "center",
  fontSize: 9,
  color: colors.TRUE_WHITE,
  fontFamily: "Roboto-Medium",
});

const Title = styled(BaseText)({
  marginTop: 3,
  marginBottom: 0,
  fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.BLACK,
  // minHeight: 40,
  fontFamily: "Roboto-Bold",
});
const Discount = styled(BaseText)({
  fontSize: 17,
  fontFamily: "Roboto-Bold",
  fontStyle: "normal",

  letterSpacing: -0.51,
  textAlign: "center",
  color: colors.EMERALD,
});

const StatusContainer = styled.View({
  flexDirection: "row",
});

const Date = styled(BaseText)({
  fontSize: 10,
  lineHeight: 17,
  color: colors.GREYISH_TWO,
  marginBottom: 6.5,
  letterSpacing: -0.3,
  textAlign: "center",
});
const Container = styled.View({
  maxWidth: "50%",
  flex: 0.489,
  width: "100%",
  padding: 10,

  alignSelf: "flex-start",
  marginTop: (props) => (SCREEN_WIDTH - 4 - 18 - 18) * 0.02,
});

export default CouponItem;
