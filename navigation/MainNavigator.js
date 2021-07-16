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
import {
  BaseTouchable,
  SCREEN_WIDTH,
  BaseButtonContainer,
} from "../components/UI/BaseUI";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PADDING_BOTTOM_MENU } from "../constants";
import * as RootNavigation from "../navigation/RootNavigation";
import colors from "../constants/Colors";
import { TabMenus } from "../constants/menu";

import BottomButtons from "../components/BottomButtons";
import {
  CustomDrawerContent,
  drawerStyle,
} from "../components/UI/CustomDrawerContent";
import MeterialTopTabBar from "../components/UI/tabBar/MaterialTopTabBar";
// import TabbarIndicator from "../components/UI/tabBarIndicator/TabBarIndicator";

import HomeScreen, {
  screenOptions as HomeScreenOptions,
} from "../screens/home/HomeScreen";

import FlyerDetailScreen, {
  screenOptions as FlyerDetailScreenOptions,
} from "../screens/home/FlyerDetailScreen";

import NaroTubeScreen from "../screens/home/NaroTubeScreen";
import ExhibitionDetailScreen, {
  screenOptions as ExhibitionDetailScreenOptions,
} from "../screens/home/ExhibitionDetailScreen";
import EventScreen, {
  screenOptions as EventScreenOptions,
} from "../screens/home/EventScreen";
import EventDetailScreen, {
  screenOptions as EventDetailScreenOptions,
} from "../screens/home/EventDetailScreen";
import StoreChangeScreen, {
  screenOptions as StoreChangeScreenOptions,
} from "../screens/snb/StoreChangeScreen";
import StoreChangeDetailScreen, {
  screenOptions as StoreChangeDetailScreenOptions,
} from "../screens/snb/StoreChangeDetailScreen";
import CouponScreen, {
  screenOptions as CouponScreenOptions,
} from "../screens/home/CouponScreen";
import CouponDetailScreen, {
  screenOptions as CouponDetailScreenOptions,
} from "../screens/home/CouponDetailScreen";
import BarcodeScreen, {
  screenOptions as BarcodeScreenOptions,
} from "../screens/home/BarcodeScreen";
import BarCodeScannerScreen, {
  screenOptions as BarCodeScannerScreenOptions,
} from "../screens/BarCodeScannerScreen";
import RingPickerScreen, {
  screenOptions as RingPickerScreenOptions,
} from "../screens/RingPickerScreen";
import NoticeScreen, {
  screenOptions as NoticeScreenOptions,
} from "../screens/snb/NoticeScreen";
import InquiryScreen, {
  screenOptions as InquiryScreenOptions,
} from "../screens/snb/InquiryScreen";
import PrivacyScreen, {
  screenOptions as PrivacyScreenOptions,
} from "../screens/snb/PrivacyScreen";
import TermsScreen, {
  screenOptions as TermsScreenOptions,
} from "../screens/snb/TermsScreen";

import MyPageScreen, {
  screenOptions as MyPageScreenOptions,
} from "../screens/MyPageScreen";
import MyReviewsScreen, {
  screenOptions as MyReviewsScreenOptions,
} from "../screens/myPage/MyReviewsScreen";
import EmptyScreen, {
  screenOptions as EmptyScreenOptions,
} from "../screens/EmptyScreen";
import WithdrawalMembershipScreen, {
  screenOptions as WithdrawalMembershipScreenOptions,
} from "../screens/myPage/WithdrawalMembershipScreen";

import NotificationScreen, {
  screenOptions as NotificationScreenOptions,
} from "../screens/NotificationScreen";
import CartScreen, {
  screenOptions as CartScreenOptions,
} from "../screens/CartScreen";

import SearchProductScreen, {
  screenOptions as SearchProductScreenOptions,
} from "../screens/SearchProductScreen";

import WishProductScreen, {
  screenOptions as WishProductScreenOptions,
} from "../screens/WishProductScreen";

import MyOrderScreen, {
  screenOptions as MyOrderScreenOptions,
} from "../screens/MyOrderScreen";

import MyInfoScreen, {
  screenOptions as MyInfoScreenOptions,
} from "../screens/MyInfoScreen";

import MyADAgreementScreen, {
  screenOptions as MyADAgreementScreenOptions,
} from "../screens/MyADAgreementScreen";

import PopupScreen, {
  screenOptions as PopupScreenOptions,
} from "../screens/PopupScreen";

import CIScreen, {
  screenOptions as CIScreenOptions,
} from "../screens/join/CIScreen";

import EventStampHistoryScreen, {
  screenOptions as EventStampHistoryScreenOptions,
} from "../screens/home/EventStampHistoryScreen";

import EventResultScreen, {
  screenOptions as EventResultScreenOptions,
} from "../screens/home/EventResultScreen";

import NHAHMScreen, {
  screenOptions as NHAHMScreenOptions,
} from "../screens/join/NHAHMScreen";


const getTabBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
};

const HomeTopTabNavigator = createMaterialTopTabNavigator();

const TabIndicator = styled.View({
  width: 100,
  height: 2,
  backgroundColor: colors.emerald,
  position: "absolute",
  bottom: 0,
  left: 0,
});
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
          if (!Tab[0]) return;
          let components = Tab[0].components;
          {
            /* if (
            !userInfo.ci &&
            (Tab[0].name == "Event" || Tab[0].name == "Coupon")
          ) {
            components = Tab[0].subComponents;
          } */
          }
          return (
            <HomeTopTabNavigator.Screen
              key={Tab[0].name}
              name={Tab[0].name}
              component={components}
              options={{
                title: menu.menu_nm,
                cardStyle: {
                  backgroundColor: colors.trueWhite,
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

const HomeStackNavigator = createStackNavigator();
export const HomeNavigator = ({ navigation, route }) => {
  return (
    <Fragment>
      <HomeStackNavigator.Navigator
        screenOptions={{
          cardStyle: {
            paddingBottom: PADDING_BOTTOM_MENU,
            backgroundColor: colors.trueWhite,
          },
          headerBackTitle: " ",
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <HomeStackNavigator.Screen
          name="HomeTab"
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
          options={RingPickerScreenOptions}
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
        <HomeStackNavigator.Screen
          name="WishProduct"
          component={WishProductScreen}
          options={WishProductScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyOrder"
          component={MyOrderScreen}
          options={MyOrderScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyInfo"
          component={MyInfoScreen}
          options={MyInfoScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyADAgreement"
          component={MyADAgreementScreen}
          options={MyADAgreementScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyEvent"
          component={EventScreen}
          options={EventScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="ExhibitionDetail"
          component={ExhibitionDetailScreen}
          options={ExhibitionDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="ForStoreDetail"
          component={ExhibitionDetailScreen}
          options={ExhibitionDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="CI"
          component={CIScreen}
          options={CIScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="StampHistory"
          component={EventStampHistoryScreen}
          options={EventStampHistoryScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="EventResult"
          component={EventResultScreen}
          options={EventResultScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="NHAHM"
          component={NHAHMScreen}
          options={NHAHMScreenOptions}
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
