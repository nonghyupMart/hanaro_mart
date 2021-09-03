import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { SCREEN_WIDTH } from "../components/UI/BaseUI";
import TabBarTop from "../components/UI/tabBar/MaterialTopTabBar";
import colors from "../constants/Colors";
import { TabMenus } from "../constants/menu";
import { RootState } from "../hooks";
import * as Screens from "../screens";

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
    !_.isEmpty(userStore) && userStore!.menuList ? userStore!.menuList : [];
  // const menuList = route.params ? route.params.menuList : [];

  if (_.isEmpty(userStore)) return <></>;
  return (
    <HomeTopTabNavigator.Navigator
      tabBar={(props: any) => <TabBarTop {...props} />}
      backBehavior="initialRoute"
      initialRouteName="Home"
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          // backgroundColor: colors.EMERALD,
          height: 2,
        },
        tabBarItemStyle: {
          width: "auto",
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: SCREEN_WIDTH > 320 ? 9 : 7,
          paddingRight: SCREEN_WIDTH > 320 ? 9 : 7,
        },
        tabBarLabelStyle: {
          color: colors.BLACK_TWO,
          fontSize: 15,
        },
        tabBarStyle: {
          padding: 0,
          margin: 0,
          height: 40,
          marginLeft: 0,
          zIndex: 0,
          elevation: 0,
          // marginRight: SCREEN_WIDTH > 320 ? 18 : 14,
        },
      }}
      initialLayout={{ width: SCREEN_WIDTH }}
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
              }}
            />
          );
        }
      })}
    </HomeTopTabNavigator.Navigator>
  );
};
