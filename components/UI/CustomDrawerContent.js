import React from "react";
import styled from "styled-components/native";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Image,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
  BaseText,
} from "./BaseUI";
import { setPreview } from "../../store/actions/auth";
import colors from "../../constants/Colors";
import { TabMenus } from "../../constants/menu";
import MemberInfo from "./drawer/MemberInfo";
import GrayButtons from "./drawer/GrayButtons";
import MenuList from "./drawer/MenuList";
import LoginButtons from "./drawer/LoginButtons";
import Logo from "./drawer/Logo";
const { width, height } = Dimensions.get("window");

export const CustomDrawerContent = (props, dispatch, menuList) => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          flex: 1,
          flexShrink: 0,
          flexGrow: 1,
          width: "100%",
        }}
      >
        <DrawerContentScrollView {...props}>
          <View style={{ minHeight: screenHeight - screenHeight * 0.24 }}>
            <Logo {...props} />
            <MemberInfo {...props} />
            <MenuList {...props} menuList={menuList} />
          </View>
          <LoginButtons {...props} {...dispatch} />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};
export const drawerStyle = {
  backgroundColor: colors.trueWhite,
  width: width * 0.791,
  maxWidth: 285,
  activeTintColor: "black",
  inactiveTintColor: "black",
  labelStyle: {
    fontFamily: "montserrat",
    marginVertical: 16,
    marginHorizontal: 0,
  },
  iconContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle: {},
};

// export default CustomDrawerContent;
