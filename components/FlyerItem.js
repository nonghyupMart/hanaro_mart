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
import _ from "lodash";

const defaultImage = require("../assets/icon.png");
const FlyerItem = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 0.333,
        width: "100%",
        maxWidth: "33.3333%",
      }}
    >
      {!_.isEmpty(props.item.bogo) && (
        <BogoIcon>
          <BogoText>{props.item.bogo}</BogoText>
        </BogoIcon>
      )}
      <Container>
        <BaseImage
          style={{
            width: width * 0.285,
            // height: width * 0.227,
            aspectRatio: 100 / 103.797,
          }}
          source={props.item.title_img}
          defaultSource={require("@images/p_img503.png")}
        />
        {props.item.card_price != 0 && (
          <BadgeContainer>
            <Badge1>카드할인</Badge1>
            {!_.isEmpty(props.item.card_sdate) && (
              <Badge2>
                {moment(props.item.card_sdate).format("MM.DD")}~
                {moment(props.item.card_edate).format("MM.DD")}
              </Badge2>
            )}
          </BadgeContainer>
        )}
        {props.item.coupon_price != 0 && (
          <BadgeContainer>
            <Badge1 style={{ backgroundColor: colors.appleGreen }}>
              쿠폰할인
            </Badge1>
            {!_.isEmpty(props.item.coupon_sdate) && (
              <Badge2>
                {moment(props.item.coupon_sdate).format("MM.DD")}~
                {moment(props.item.coupon_edate).format("MM.DD")}
              </Badge2>
            )}
          </BadgeContainer>
        )}
        {props.item.members_price != 0 && (
          <BadgeContainer>
            <Badge1 style={{ backgroundColor: colors.waterBlue }}>
              NH멤버스
            </Badge1>
            {!_.isEmpty(props.item.members_sdate) && (
              <Badge2>
                {moment(props.item.members_sdate).format("MM.DD")}~
                {moment(props.item.members_edate).format("MM.DD")}
              </Badge2>
            )}
          </BadgeContainer>
        )}

        <Title>{props.item.title}</Title>
        <OriginalPrice>{Util.formatNumber(props.item.price)}원</OriginalPrice>
        {props.item.sale_price > 0 && (
          <SalePrice>{Util.formatNumber(props.item.sale_price)}원</SalePrice>
        )}
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
  right: -5,
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
  width: "100%",
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
  paddingLeft: 3,
  paddingRight: 3,
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
  // flexBasis: 0,

  // flex: 1,
  // padding: 10,
  paddingTop: 10,
  paddingBottom: 10,
  width: width * 0.285,

  // backgroundColor: "white",

  marginHorizontal: 5,
  justifyContent: "flex-start",
  alignItems: "center",
});
const SalePrice = styled(BaseText)({
  fontSize: 14,
  fontFamily: "CustomFont-Bold",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  width: "100%",
  color: colors.cerulean,
});
const OriginalPrice = styled(BaseText)({
  fontSize: 14,
  fontFamily: "CustomFont-Bold",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  width: "100%",
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

  width: "100%",
  height: 14,
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
