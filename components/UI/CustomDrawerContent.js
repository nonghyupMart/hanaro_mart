import React from "react";
import styled from "styled-components/native";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
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
} from "@UI/BaseUI";
import { setPreview } from "@actions/auth";
import colors from "@constants/colors";
import { TabMenus } from "@constants/menu";
import MemberInfo from "@UI/drawer/MemberInfo";
import GrayButtons from "@UI/drawer/GrayButtons";
import MenuList from "@UI/drawer/MenuList";
import LoginButtons from "@UI/drawer/LoginButtons";
const { width, height } = Dimensions.get("window");

export const CustomDrawerContent = (props, dispatch, menuList) => {
  // console.warn("CustomDrawerContent==>");
  // const userStore = useSelector((state) => state.auth.userStore);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ flex: 1, flexShrink: 0, flexGrow: 1, width: "100%" }}>
        <DrawerContentScrollView {...props}>
          <MemberInfo {...props} />
          <GrayButtons {...props} menuList={menuList} />
          <MenuList {...props} menuList={menuList} />
        </DrawerContentScrollView>
      </View>
      <LoginButtons {...props} {...dispatch} />
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    padding: 5,
  },
  image: {
    resizeMode: "contain",
    width: "80%",
    height: "100%",
  },
  contactUsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    paddingLeft: 15,
  },
  logoutContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  drawerText: {
    marginLeft: 16,
  },
  logoutText: {
    color: "#b23b3b",
  },
});

// export default CustomDrawerContent;
