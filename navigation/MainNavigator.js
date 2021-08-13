import React, { useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { SCREEN_WIDTH } from "../components/UI/BaseUI";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabMenus } from "../constants/menu";
import {
  CustomDrawerContent,
  drawerStyle,
} from "../components/UI/CustomDrawerContent";
import { HomeNavigator } from "./HomeNavigator";

// https://reactnavigation.org/docs/drawer-navigator/
// hide drawer item - https://stackoverflow.com/questions/60395508/react-navigation-5-hide-drawer-item
const Drawer = createDrawerNavigator();
export const MainNavigator = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const [isInitialRender, setIsInitialRender] = useState(true);

  if (isInitialRender) {
    setTimeout(() => setIsInitialRender(false), 1);
  }
  // return <></>;
  const drawerWidth =
    SCREEN_WIDTH > 320 ? SCREEN_WIDTH * 0.7066 : SCREEN_WIDTH * 0.711;
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerStyle={[
        drawerStyle,
        {
          width: isInitialRender ? null : drawerWidth,
        },
      ]}
      drawerContent={(props) =>
        CustomDrawerContent(
          props,
          dispatch,
          !_.isEmpty(userStore) && userStore.menuList ? userStore.menuList : [],
          TabMenus
        )
      }
    >
      <Drawer.Screen name="HomeTab" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};
