import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MeterialTopTabBar from "../components/UI/tabBar/MaterialTopTabBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import _ from "lodash";
import { SCREEN_WIDTH } from "../components/UI/BaseUI";
import * as Screens from "../screens";
import { TabMenus } from "../constants/menu";
import { RootState } from "../hooks";
import colors from "../constants/Colors";
import * as Util from "../utils";

const HomeTopTabNavigator = createMaterialTopTabNavigator();

const getTabBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
};

export const HomeTabNavigator = ({ navigation, route }) => {
  const userStore = useSelector((state: RootState) => state.auth.userStore);
  const menuList =
    !_.isEmpty(userStore) && userStore.menuList ? userStore.menuList : [];
  // const menuList = route.params ? route.params.menuList : [];

  if (_.isEmpty(userStore)) return <></>;
  return (
    <HomeTopTabNavigator.Navigator
      backBehavior="initialRoute"
      lazy={true}
      // optimizationsEnabled={true}
      tabBar={(props) => <MeterialTopTabBar {...props} />}
      initialRouteName="Home"
      swipeEnabled={false}
      tabBarOptions={{
        renderIndicator: (props) => {
          return <></>;
        },
        scrollEnabled: true,
        tabStyle: {
          width: "auto",
          padding: 0,
          margin: 0,
          height: 40,
        },
        style: { marginLeft: SCREEN_WIDTH > 320 ? -18 : -14 },
      }}
    >
      <HomeTopTabNavigator.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={({ route }) => ({
          title: "",
          tabBarLabel: "",
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      {menuList.map((menu) => {
        {
          let Tab = TabMenus.filter((tab) => tab.title === menu.r_menu_nm);
          if (!Tab[0]) return;
          let components = Tab[0].components;
          return (
            <HomeTopTabNavigator.Screen
              key={Tab[0].name}
              name={Tab[0].name}
              component={components}
              options={{
                title: menu.menu_nm,
                // cardStyle: {
                //   backgroundColor: colors.TRUE_WHITE,
                // }
              }}
            />
          );
        }
      })}
    </HomeTopTabNavigator.Navigator>
  );
};
