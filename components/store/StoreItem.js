import React from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StoreItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Container>
        <TitleContainer>
          <Title>{props.item.store_nm}</Title>
          <Tel>Tel. {props.item.tel}</Tel>
        </TitleContainer>
        <IconContainer>
          <Image source={require("@images/location-pin.png")} />
          <BlueText>0km</BlueText>
          <Image source={require("@images/circle-right.png")} />
        </IconContainer>
      </Container>
    </TouchableOpacity>
  );
};
const Tel = styled.Text({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
});
const BlueText = styled.Text({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.cerulean,
  marginLeft: 8,
  marginRight: 8,
  lineHeight: 17,
});
const IconContainer = styled.View({
  flexDirection: "row",
  justifyContent: "center",
});
const Container = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: 35.5,
  marginRight: 35.5,
  alignItems: "center",
  borderColor: colors.white,
  borderBottomWidth: 1,
  paddingTop: 10,
  paddingBottom: 10,
});
const TitleContainer = styled.View({});
const Title = styled.Text({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
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

export default StoreItem;
