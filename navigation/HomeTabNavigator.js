import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MeterialTopTabBar from "../components/UI/tabBar/MaterialTopTabBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import _ from "lodash";
import { SCREEN_WIDTH } from "../components/UI/BaseUI";
import * as Screens from "../screens";
import { TabMenus } from "../constants/menu";

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
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const menuList =
    !_.isEmpty(userStore) && userStore.menuList ? userStore.menuList : [];
  // const menuList = route.params ? route.params.menuList : [];
  return (
    <HomeTopTabNavigator.Navigator
      backBehavior="initialRoute"
      onStateChange={() => {}}
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
                cardStyle: {
                  backgroundColor: colors.TRUE_WHITE,
                },
              }}
            />
          );
        }
      })}
      {_.size(menuList) === 0 &&
        TabMenus.map((tab) => {
          if (_.isEmpty(userStore))
            return (
              <HomeTopTabNavigator.Screen
                key={tab.name}
                name={tab.name}
                component={tab.subComponents}
                options={{ title: tab.title }}
              />
            );
          return;
        })}
    </HomeTopTabNavigator.Navigator>
  );
};
