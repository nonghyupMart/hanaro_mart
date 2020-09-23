import React, { Fragment, useState } from "react";
import styled from "styled-components/native";
import {
  Platform,
  Text,
  Button,
  Image,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { TabRouter } from "@react-navigation/native";

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
import CustomDrawerContent from "@UI/CustomDrawerContent";
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
} from "@screens/mypage/MyReviewsScreen";
import EmptyScreen, {
  screenOptions as EmptyScreenOptions,
} from "@screens/EmptyScreen";
// const defaultStackNavOptions = {
//   headerStyle: {
//     backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
//   },
//   headerTitleStyle: {
//     fontFamily: "open-sans-bold",
//   },
//   headerBackTitleStyle: {
//     fontFamily: "open-sans",
//   },
//   headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
//   headerTitle: "A Screen",
// };
const WhiteButtonContainer = styled(BaseTouchable)({
  height: 64,

  alignItems: "center",
  paddingLeft: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.whiteTwo,
  maxWidth: 133,
  width: screenWidth * 0.369,
  backgroundColor: colors.trueWhite,
  flexDirection: "row",
  marginTop: 3,
  marginBottom: 3,
});
const WButtonText = styled.Text({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 11,
});

const couponArray = [
  { component: "CouponForTotalScreen" },
  { component: "CouponForProductScreen" },
];

const NaroCategories = [
  {
    components: NaroTubeScreen,
    title: "나로 영상",
  },
  {
    components: NaroTubeScreen,
    title: "나로 레시피",
  },
  {
    components: NaroTubeScreen,
    title: "나로 다방",
  },
  {
    components: NaroTubeScreen,
    title: "오케이쿡",
  },
];

const NaroTubeTopTabNavigator = createMaterialTopTabNavigator();
export const NaroTubeTabNavigator = () => {
  return (
    <NaroTubeTopTabNavigator.Navigator
      initialRouteName="CouponForTotal"
      swipeEnabled={false}
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: { width: 95 },
      }}
    >
      {NaroCategories.map((cate) => (
        <NaroTubeTopTabNavigator.Screen
          name={cate.title}
          component={cate.components}
          options={{ title: cate.title }}
        />
      ))}
    </NaroTubeTopTabNavigator.Navigator>
  );
};
const { width, height } = Dimensions.get("window");
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
  // console.warn("***HomeTabNavigator! =>", route.params.menuList);
  const userStore = useSelector((state) => state.auth.userStore);
  const menuList =
    Object.keys(userStore).length !== 0 ? userStore.menuList : [];
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
        onStateChange={() => {
          console.warn("state changed");
        }}
        lazy={true}
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
                name={Tab[0].name}
                component={Tab[0].components}
                options={{ title: Tab[0].title }}
              />
            );
          }
        })}
        {menuList.length === 0 &&
          TabMenus.map((tab) => (
            <HomeTopTabNavigator.Screen
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
  // console.warn("HomeNavigator! =>", route.params.menuList);
  return (
    <Fragment>
      <HomeStackNavigator.Navigator
        screenOptions={{
          cardStyle: {
            marginBottom: 60,
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
  const userStore = props.userStore;
  // console.warn(userStore);
  // return <></>;
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerStyle={drawerStyle}
      drawerContent={(props) =>
        CustomDrawerContent(
          props,
          dispatch,
          Object.keys(userStore).length !== 0 ? userStore.menuList : [],
          TabMenus
        )
      }
    >
      <Drawer.Screen name="HomeTab" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

const drawerStyle = {
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
  container: {
    flex: 1,
    backgroundColor: "#20232a",
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    color: "#61dafb",
  },
  boxContainer: {
    height: 160,
    alignItems: "center",
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: "#61dafb",
  },
  list: {
    backgroundColor: "#fff",
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f4f4f4",
    color: "#999",
    fontSize: 12,
    textTransform: "uppercase",
  },
  listRow: {
    padding: 8,
  },
});
