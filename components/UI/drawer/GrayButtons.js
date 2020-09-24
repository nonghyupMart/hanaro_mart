import React from "react";
import styled from "styled-components/native";
import { Platform, Text, View, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
} from "@UI/BaseUI";
import { TabMenus } from "@constants/menu";
const GrayButtons = (props) => {
  // console.warn(props.menuList);
  return (
    <GrayContainer>
      {props.menuList.map((menu) => {
        let Tab = TabMenus.filter((tab) => tab.title == menu.r_menu_nm);
        return (
          <WhiteButtonContainer
            onPress={() => props.navigation.navigate(Tab[0].name)}
          >
            <Image source={Tab[0].icon} />
            <WButtonText>{Tab[0].title}</WButtonText>
          </WhiteButtonContainer>
        );
      })}
      {props.menuList.length === 0 &&
        TabMenus.map((tab) => {
          return (
            <WhiteButtonContainer
              onPress={() => props.navigation.navigate(tab.name)}
            >
              <Image source={tab.icon} />
              <WButtonText>{tab.title}</WButtonText>
            </WhiteButtonContainer>
          );
        })}
    </GrayContainer>
  );
};
const WhiteButtonContainer = styled(BaseTouchable)({
  height: 64,

  alignItems: "center",
  paddingLeft: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.whiteTwo,
  maxWidth: 133,
  width: screenWidth * 0.369,
  backgroundColor: colors.trueWhite,
  flexDirection: "row",
  marginTop: 3,
  marginBottom: 3,
});
const WButtonText = styled.Text({
  fontSize: 16,
  fontWeight: "500",

  color: colors.greyishBrown,
  marginLeft: 11,
});

const GrayContainer = styled.View({
  backgroundColor: colors.white,
  justifyContent: "space-between",
  flexDirection: "row",
  flexWrap: "wrap",
  padding: 7,
});

export default GrayButtons;