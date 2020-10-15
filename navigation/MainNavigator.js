import React, { Fragment, useState } from "react";
import styled from "styled-components/native";
import {
  Platform,
  Text,
  Image,
  View,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  Keyboard,
} from "react-native";
import { TabRouter } from "@react-navigation/native";
import _ from "lodash";

import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { BaseTouchable, screenWidth, BaseButtonContainer } from "@UI/BaseUI";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "react-native-elements";
import * as RootNavigation from "../navigation/RootNavigation";
import colors from "@constants/colors";
import { TabMenus } from "@constants/menu";

import BottomButtons from "@components/BottomButtons";
import { CustomDrawerContent, drawerStyle } from "@UI/CustomDrawerContent";
import MeterialTopTabBar from "@UI/tabBar/MaterialTopTabBar";

import HomeScreen, {
  screenOptions as HomeScreenOptions,
} from "@screens/home/HomeScreen";

import FlyerDetailScreen, {
  screenOptions as FlyerDetailScreenOptions,
} from "@screens/home/FlyerDetailScreen";

import NaroTubeScreen from "@screens/home/NaroTubeScreen";

import EventDetailScreen, {
  screenOptions as EventDetailScreenOptions,
} from "@screens/home/EventDetailScreen";
import StoreChangeScreen, {
  screenOptions as StoreChangeScreenOptions,
} from "@screens/snb/StoreChangeScreen";
import StoreChangeDetailScreen, {
  screenOptions as StoreChangeDetailScreenOptions,
} from "@screens/snb/StoreChangeDetailScreen";
import CouponScreen, {
  screenOptions as CouponScreenOptions,
} from "@screens/home/CouponScreen";
import CouponDetailScreen, {
  screenOptions as CouponDetailScreenOptions,
} from "@screens/home/CouponDetailScreen";
import BarcodeScreen, {
  screenOptions as BarcodeScreenOptions,
} from "@screens/home/BarcodeScreen";
import BarCodeScannerScreen, {
  screenOptions as BarCodeScannerScreenOptions,
} from "@screens/BarCodeScannerScreen";
import RingPickerScreen from "@screens/RingPickerScreen";
import NoticeScreen, {
  screenOptions as NoticeScreenOptions,
} from "@screens/snb/NoticeScreen";
import InquiryScreen, {
  screenOptions as InquiryScreenOptions,
} from "@screens/snb/InquiryScreen";
import PrivacyScreen, {
  screenOptions as PrivacyScreenOptions,
} from "@screens/snb/PrivacyScreen";
import TermsScreen, {
  screenOptions as TermsScreenOptions,
} from "@screens/snb/TermsScreen";

import MyPageScreen, {
  screenOptions as MyPageScreenOptions,
} from "@screens/MyPageScreen";
import MyReviewsScreen, {
  screenOptions as MyReviewsScreenOptions,
} from "@screens/myPage/MyReviewsScreen";
import EmptyScreen, {
  screenOptions as EmptyScreenOptions,
} from "@screens/EmptyScreen";
import WithdrawalMembershipScreen, {
  screenOptions as WithdrawalMembershipScreenOptions,
} from "@screens/myPage/WithdrawalMembershipScreen";

import NotificationScreen, {
  screenOptions as NotificationScreenOptions,
} from "@screens/NotificationScreen";
import CartScreen, {
  screenOptions as CartScreenOptions,
} from "@screens/CartScreen";

import SearchProductScreen, {
  screenOptions as SearchProductScreenOptions,
} from "@screens/SearchProductScreen";

const getTabBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
};
const getSearchBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
};

let isShowSearchBar = false;
let opacity = new Animated.Value(1);
opacity.setValue(0);
const animate = () => {
  Keyboard.dismiss();
  if (!isShowSearchBar) {
    opacity.setValue(0);
  } else {
    opacity.setValue(1);
  }
  Animated.timing(opacity, {
    toValue: isShowSearchBar ? 0 : 1,
    duration: isShowSearchBar ? 200 : 400,
    easing: isShowSearchBar ? Easing.elastic(0) : Easing.elastic(0),
    useNativeDriver: false,
  }).start();
  isShowSearchBar = !isShowSearchBar;
};

const size = opacity.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 80],
});
const animatedStyles = [
  {
    width: "100%",
    height: size,
  },
];
const HomeTopTabNavigator = createMaterialTopTabNavigator();

export const HomeTabNavigator = ({ navigation, route }) => {
  const userStore = useSelector((state) => state.auth.userStore);
  const menuList =
    !_.isEmpty(userStore) && userStore.menuList ? userStore.menuList : [];
  // const menuList = route.params ? route.params.menuList : [];
  return (
    <Fragment>
      <Animated.View
        key={1}
        style={[
          animatedStyles,
          // {
          //   transform: [
          //     // scaleX, scaleY, scale, theres plenty more options you can find online for this.
          //     { translateY: opacity }, // this would be the result of the animation code below and is just a number.
          //   ],
          // },
        ]}
      >
        <View>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            returnKeyType="next"
            placeholder="원하시는 상품을 검색하세요!"
          />
        </View>
      </Animated.View>
      <HomeTopTabNavigator.Navigator
        backBehavior="initialRoute"
        onStateChange={() => {}}
        lazy={false}
        // optimizationsEnabled={true}
        tabBar={(props) => <MeterialTopTabBar {...props} />}
        initialRouteName="Home"
        swipeEnabled={false}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: { width: 83, padding: 0, margin: 0, height: 45 },
          style: { marginLeft: -83 },
        }}
      >
        <HomeTopTabNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            title: "",
            tabBarLabel: "",
            tabBarVisible: getTabBarVisible(route),
          })}
        />
        {menuList.map((menu) => {
          {
            let Tab = TabMenus.filter((tab) => tab.title == menu.r_menu_nm);
            return (
              <HomeTopTabNavigator.Screen
                key={Tab[0].name}
                name={Tab[0].name}
                component={Tab[0].components}
                options={{ title: menu.menu_nm }}
              />
            );
          }
        })}
        {menuList.length === 0 &&
          TabMenus.map((tab) => (
            <HomeTopTabNavigator.Screen
              key={tab.name}
              name={tab.name}
              component={tab.subComponents}
              options={{ title: tab.title }}
            />
          ))}
      </HomeTopTabNavigator.Navigator>
    </Fragment>
  );
};

const HomeStackNavigator = createStackNavigator();
export const HomeNavigator = ({ navigation, route }) => {
  return (
    <Fragment>
      <HomeStackNavigator.Navigator
        // initialRouteName={() => (isStorePopup ? "StorePopup" : "Home")}
        screenOptions={{
          cardStyle: {
            marginBottom: 70,
          },
          headerBackTitle: " ",
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <HomeStackNavigator.Screen
          name="Home"
          component={HomeTabNavigator}
          options={HomeScreenOptions}
          // initialParams={{
          //   menuList: route.params ? route.params.menuList : [],
          // }}
          // menuList={props.menuList}
        />
        <HomeStackNavigator.Screen
          name="FlyerDetail"
          component={FlyerDetailScreen}
          options={FlyerDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="BarCodeScanner"
          component={BarCodeScannerScreen}
          options={BarCodeScannerScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="StoreChange"
          component={StoreChangeScreen}
          options={StoreChangeScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="StoreChangeDetail"
          component={StoreChangeDetailScreen}
          options={StoreChangeDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyCoupon"
          component={CouponScreen}
          options={CouponScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="CouponDetail"
          component={CouponDetailScreen}
          options={CouponDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Barcode"
          component={BarcodeScreen}
          options={BarcodeScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="RingPicker"
          component={RingPickerScreen}
          options={{
            cardStyle: {
              marginBottom: 0,
            },
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
            headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          }}
        />
        <HomeStackNavigator.Screen
          name="Notice"
          component={NoticeScreen}
          options={NoticeScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Inquiry"
          component={InquiryScreen}
          options={InquiryScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={PrivacyScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Terms"
          component={TermsScreen}
          options={TermsScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={EventDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyPage"
          component={MyPageScreen}
          options={MyPageScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyReviews"
          component={MyReviewsScreen}
          options={MyReviewsScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Empty"
          component={EmptyScreen}
          options={EmptyScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Withdrawal"
          component={WithdrawalMembershipScreen}
          options={WithdrawalMembershipScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Notification"
          component={NotificationScreen}
          options={NotificationScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Cart"
          component={CartScreen}
          options={CartScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="SearchProduct"
          component={SearchProductScreen}
          options={SearchProductScreenOptions}
        />
      </HomeStackNavigator.Navigator>
      <BottomButtons />
    </Fragment>
  );
};

// https://reactnavigation.org/docs/drawer-navigator/
// hide drawer item - https://stackoverflow.com/questions/60395508/react-navigation-5-hide-drawer-item
const Drawer = createDrawerNavigator();
export const MainNavigator = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  // return <></>;
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerStyle={drawerStyle}
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
