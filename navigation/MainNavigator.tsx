import { createDrawerNavigator } from "@react-navigation/drawer";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SCREEN_WIDTH } from "../components/UI/BaseUI";
import {
  CustomDrawerContent,
  drawerStyle,
} from "../components/UI/CustomDrawerContent";
import { RootState } from "../store/root-state";
import { HomeNavigator } from "./HomeNavigator";

// https://reactnavigation.org/docs/drawer-navigator/
// hide drawer item - https://stackoverflow.com/questions/60395508/react-navigation-5-hide-drawer-item
const Drawer = createDrawerNavigator();
export const MainNavigator = () => {
  const dispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.auth.userStore);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

  if (isInitialRender) {
    setTimeout(() => setIsInitialRender(false), 1);
  }
  const drawerWidth =
    SCREEN_WIDTH > 320 ? SCREEN_WIDTH * 0.7066 : SCREEN_WIDTH * 0.711;
  let calculatedWidth;
  if (!isInitialRender) {
    calculatedWidth = {
      width: drawerWidth,
    };
  }
  if (_.isEmpty(userStore)) return <></>;
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerStyle={[drawerStyle, calculatedWidth]}
      drawerContent={(props) =>
        CustomDrawerContent(
          props,
          dispatch,
          userStore.menuList ? userStore.menuList : []
        )
      }
    >
      <Drawer.Screen name="HomeTab" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};
