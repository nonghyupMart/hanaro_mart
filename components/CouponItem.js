import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import styled from "styled-components/native";
import {
  BaseImage,
  SCREEN_WIDTH,
  BaseTouchable,
  BaseText,
} from "../components/UI/BaseUI";
import * as Util from "../util";

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
          defaultSource={require("../assets/images/n_img501.png")}
        />
        {props.item.remain_yn == "Y" && (
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
        {props.item.price_gbn == "A" ? "원 " : "% "}
        할인
      </Discount>
      <Date>
        {props.item.start_date} ~ {props.item.end_date}
      </Date>
      {props.item.status == "00" && (
        <Button
          onPress={props.onPress}
          style={{ backgroundColor: colors.TRUE_WHITE }}
        >
          <ButtonText>쿠폰 다운로드</ButtonText>
          <Icon source={require("../assets/images/ic_file_download_1.png")} />
        </Button>
      )}
      {props.item.status == "10" && (
        <Button
          onPress={props.onPress}
          style={{ backgroundColor: colors.EMERALD, borderWidth: 0 }}
        >
          <ButtonText style={{ color: colors.TRUE_WHITE }}>
            쿠폰 사용하기
          </ButtonText>
          <Icon source={require("../assets/images/ic_file_download_2.png")} />
        </Button>
      )}
      {props.item.status == "20" && (
        <Button
          style={{ backgroundColor: colors.GREYISH_TWO, borderWidth: 0 }}
          activeOpacity={1}
        >
          <ButtonText style={{ color: colors.TRUE_WHITE, marginRight: 0 }}>
            쿠폰 사용완료
          </ButtonText>
        </Button>
      )}
      {props.item.status == "30" && (
        <Button
          style={{ backgroundColor: colors.GREYISH_TWO, borderWidth: 0 }}
          activeOpacity={1}
        >
          <ButtonText style={{ color: colors.TRUE_WHITE, marginRight: 0 }}>
            쿠폰 소진완료
          </ButtonText>
        </Button>
      )}
    </Container>
  );
};
const CountContainer = styled.View({
  backgroundColor: colors.GRAPEFRUIT,
  borderRadius: 18,
  aspectRatio: 100 / 31.818,
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
const Icon = styled.Image({});
const ButtonText = styled(BaseText)({
  fontSize: 12.5,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.EMERALD,
  marginRight: 1,
  fontFamily: "Roboto-Medium",
});
const Button = styled(BaseTouchable)({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.TRUE_WHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.EMERALD,
  minHeight: Util.normalize(24),

  aspectRatio: 100 / 19.86,
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
  // marginRight: (props) => (props.index % 2 == 0 ? 5 : 0),
  marginTop: (props) => (SCREEN_WIDTH - 4 - 18 - 18) * 0.02,
});

export default CouponItem;
