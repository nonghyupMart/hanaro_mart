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
import { BaseText } from "@UI/BaseUI";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const defaultImage = require("../assets/icon.png");
const FlyerItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ flex: 1 }}>
      <Container>
        <Image
          style={{
            width: width * 0.219,
            height: width * 0.227,
            resizeMode: "cover",
          }}
          source={{
            uri:
              "http://img-m.nonghyupmall.com//prdimg/02/003/005/001/009//4002685492_0_320_20200428155054.jpg",
          }}
          defaultSource={require("@images/p_img503.png")}
        />
        <Title>{props.item.title}</Title>
        <OriginalPrice>{props.item.price}원</OriginalPrice>
        <SalePrice>{props.item.sale_price}원</SalePrice>
      </Container>
    </TouchableOpacity>
  );
};

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
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.cerulean,
});
const OriginalPrice = styled(BaseText)({
  fontSize: 12,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
});
const Title = styled(BaseText)({
  marginTop: 20,
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
});
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
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    color: "black",
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default FlyerItem;
