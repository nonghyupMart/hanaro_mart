import React from "react";
import styled from "styled-components/native";
import { Platform, Text, View, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  BaseTouchable,
  SCREEN_WIDTH,
  BaseButtonContainer,
  SCREEN_HEIGHT,
  BaseText,
} from "../../UI/BaseUI";
import _ from "lodash";
import { TabMenus } from "../../../constants/menu";

const GrayButtons = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  return (
    <>
      <GrayContainer>
        {props.menuList.map((menu) => {
          let Tab = TabMenus.filter((tab) => tab.title == menu.r_menu_nm);
          if (!Tab[0]) return;
          return (
            <WhiteButtonContainer
              key={Tab[0].name}
              onPress={() => props.navigation.navigate(Tab[0].name)}
            >
              <Icon source={Tab[0].icon} />
              <WButtonText>{menu.menu_nm}</WButtonText>
            </WhiteButtonContainer>
          );
        })}
        {props.menuList.length === 0 &&
          TabMenus.map((tab) => {
            if (_.isEmpty(userStore))
              return (
                <WhiteButtonContainer
                  key={tab.name}
                  onPress={() => props.navigation.navigate(tab.name)}
                >
                  <Icon source={tab.icon} />
                  <WButtonText>{tab.title}</WButtonText>
                </WhiteButtonContainer>
              );
            return;
          })}
      </GrayContainer>
      <Image
        source={require("../../../assets/images/menubar.png")}
        style={{ marginTop: -1 }}
      />
    </>
  );
};
const Icon = styled.Image({
  flexShrink: 0,
  alignSelf: "center",
});
const WhiteButtonContainer = styled(BaseTouchable)({
  minHeight: 50,

  alignItems: "center",
  paddingLeft: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.whiteTwo,
  maxWidth: 133,
  width: SCREEN_WIDTH * 0.369,
  backgroundColor: colors.trueWhite,
  flexDirection: "row",
  marginTop: 3,
  marginBottom: 3,
});
const WButtonText = styled(BaseText)({
  fontSize: 16,
  color: colors.greyishBrown,
  marginLeft: 11,
  flex: 1,
});
WButtonText.defaultProps = {
  numberOfLines: 2,
};

const GrayContainer = styled.View({
  backgroundColor: colors.white,
  justifyContent: "space-between",
  flexDirection: "row",
  flexWrap: "wrap",
  padding: 7,
  paddingBottom: 0,
});

export default GrayButtons;
