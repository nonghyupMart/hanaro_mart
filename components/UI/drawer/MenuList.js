import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Platform, Text, View, StyleSheet, Image } from "react-native";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
} from "@UI/BaseUI";
const MenuList = (props) => {
  return (
    <MenuContainer>
      <MenuButtonContainer>
        <MenuButton
          onPress={() => {
            props.navigation.navigate("StoreChange");
          }}
        >
          <Icon>
            <Image source={require("@images/position.png")} />
          </Icon>
          <MenuText>매장변경</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer>
        <MenuButton
          onPress={() => {
            if (props.menuList.length === 0)
              return props.navigation.navigate("Empty");
            props.navigation.navigate("Notice");
          }}
        >
          <Icon>
            <Image source={require("@images/loudspeaker-announce.png")} />
          </Icon>
          <MenuText>공지사항</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer>
        <MenuButton
          onPress={() => {
            if (props.menuList.length === 0)
              return props.navigation.navigate("Empty");
            props.navigation.navigate("Inquiry");
          }}
        >
          <Icon>
            <Image source={require("@images/dialogue-balloon.png")} />
          </Icon>
          <MenuText>1:1 문의</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer style={{ border: 0 }}>
        <MenuButton
          onPress={() => {
            if (props.menuList.length === 0)
              return props.navigation.navigate("Empty");
            props.navigation.navigate("MyPage");
          }}
        >
          <Icon>
            <Image source={require("@images/messenger-user-avatar.png")} />
          </Icon>
          <MenuText>마이페이지</MenuText>
        </MenuButton>
      </MenuButtonContainer>
    </MenuContainer>
  );
};
const MenuContainer = styled.View({
  paddingTop: 36,
  paddingLeft: 35.5,
  paddingRight: 35.5,
  backgroundColor: colors.trueWhite,
});
const MenuButtonContainer = styled.View({
  borderBottomWidth: 1,
  borderColor: colors.white,
  flexDirection: "row",
  alignItems: "center",
});
const MenuText = styled.Text({
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 20,
});
const MenuButton = styled(BaseTouchable)({
  flexDirection: "row",
  alignItems: "center",
  marginTop: 14,
  marginBottom: 14,
  flex: 1,
});
const Icon = styled.View({
  width: 20,
});

export default MenuList;
