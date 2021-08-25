import React from "react";
import { View, Dimensions } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import { SCREEN_HEIGHT } from "./BaseUI";
import colors from "../../constants/Colors";
import MemberInfo from "./drawer/MemberInfo";
import MenuList from "./drawer/MenuList";
import Footer from "./drawer/Footer";
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
          <View style={{ minHeight: SCREEN_HEIGHT - SCREEN_HEIGHT * 0.24 }}>
            <Logo {...props} />
            <MemberInfo {...props} />
            <MenuList {...props} menuList={menuList} />
          </View>
          <Footer {...props} {...dispatch} />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};
export const drawerStyle = {
  backgroundColor: colors.TRUE_WHITE,
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
