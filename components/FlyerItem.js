import React from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { BaseImage, BaseText } from "@UI/BaseUI";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { IMAGE_URL } from "@constants/settings";
import * as Util from "@util";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

const defaultImage = require("../assets/icon.png");
const FlyerItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ flex: 0.333 }}>
      <Container>
        {props.item.bogo && (
          <BogoIcon>
            <BogoText>{props.item.bogo}</BogoText>
          </BogoIcon>
        )}
        <View style={{ width: width * 0.245 }}>
          <BaseImage
            style={{
              width: width * 0.245,
              height: width * 0.227,
            }}
            source={props.item.title_img}
            defaultSource={require("@images/p_img503.png")}
          />
          {props.item.card_sdate && (
            <BadgeContainer>
              <Badge1>카드할인</Badge1>
              <Badge2>
                {moment(props.item.card_sdate).format("MM.DD")}~
                {moment(props.item.card_edate).format("MM.DD")}
              </Badge2>
            </BadgeContainer>
          )}
          {props.item.coupon_sdate && (
            <BadgeContainer>
              <Badge1 style={{ backgroundColor: colors.appleGreen }}>
                쿠폰할인
              </Badge1>
              <Badge2>
                {moment(props.item.coupon_sdate).format("MM.DD")}~
                {moment(props.item.coupon_edate).format("MM.DD")}
              </Badge2>
            </BadgeContainer>
          )}

          <Title>{props.item.title}</Title>
          <OriginalPrice>{Util.formatNumber(props.item.price)}원</OriginalPrice>
          <SalePrice>{Util.formatNumber(props.item.sale_price)}원</SalePrice>
        </View>
      </Container>
    </TouchableOpacity>
  );
};
const BogoText = styled(BaseText)({
  fontSize: 12,
  fontFamily: "CustomFont-Bold",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.trueWhite,
});
const BogoIcon = styled(LinearGradient)({
  width: 27,
  height: 27,
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  right: -0,
  top: -0,
  zIndex: 10,
  elevation: 1,
});
BogoIcon.defaultProps = {
  colors: [colors.cherry, colors.purplishRed, colors.wineRed],
  start: { x: 0, y: -1 },
  end: { x: 0, y: 1 },
};
const BadgeContainer = styled.View({
  flexDirection: "row",
  marginBottom: 1,
});
const Badge1 = styled(BaseText)({
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 13,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.trueWhite,
  backgroundColor: colors.cerulean,
});
const Badge2 = styled(BaseText)({
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 13,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
  backgroundColor: colors.black,
  flex: 1,
});
const Container = styled.View({
  // backgroundColor: colors.black,
  flexBasis: 0,
  flex: 1,
  padding: 10,

  // backgroundColor: "white",

  marginHorizontal: 5,
  justifyContent: "center",
  alignItems: "center",
});
const SalePrice = styled(BaseText)({
  fontSize: 14,
  fontFamily: "CustomFont-Bold",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  color: colors.cerulean,
});
const OriginalPrice = styled(BaseText)({
  fontSize: 14,
  fontFamily: "CustomFont-Bold",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Title = styled(BaseText)({
  marginTop: 4,
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 14,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  flex: 1,
  width: "100%",
});
Title.defaultProps = {
  numberOfLines: 1,
};
const styles = StyleSheet.create({
  cartItem: {
    flexBasis: 0,
    flex: 0.333,
    padding: 10,

    // backgroundColor: "white",

    marginHorizontal: 20,
  },
  itemData: {
    alignItems: "center",
  },
  quantity: {
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    color: "black",
    fontFamily: "CustomFont-Bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default FlyerItem;
