import React, { Fragment, useState } from "react";
import {
  Platform,
  Text,
  Button,
  Icon,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";
import { DrawerActions } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Input } from "react-native-elements";
import { HeaderButton } from "@UI/header";
import BottomButtons from "../components/BottomButtons";
import CustomDrawerContent from "../components/UI/CustomDrawerContent";
import MeterialTopTabBar from "../components/UI/tabBar/MaterialTopTabBar";

import HomeScreen from "../screens/home/HomeScreen";
import FlyerScreen from "../screens/home/FlyerScreen";
import FlyerDetailScreen, {
  screenOptions as FlyerDetailScreenOptions,
} from "../screens/home/FlyerDetailScreen";
import EventScreen from "../screens/home/EventScreen";
import ExhibitionScreen from "../screens/home/ExhibitionScreen";
import NaroTubeScreen from "../screens/home/NaroTubeScreen";
import CouponForTotalScreen from "../screens/home/CouponForTotalScreen";
import CouponForProductScreen from "../screens/home/CouponForProductScreen";

import StoreChangeScreen, {
  screenOptions as StoreChangeScreenOptions,
} from "../screens/snb/StoreChangeScreen";
import CouponDetailScreen, {
  screenOptions as CouponDetailScreenOptions,
} from "../screens/home/CouponDetailScreen";
import BarCodeScannerScreen, {
  screenOptions as BarCodeScannerScreenOptions,
} from "../screens/BarCodeScannerScreen";
import RingPickerScreen from "../screens/RingPickerScreen";

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
const screens = {
  CouponForTotalScreen: CouponForTotalScreen,
  CouponForProductScreen: CouponForProductScreen,
};
const couponArray = [
  { component: "CouponForTotalScreen" },
  { component: "CouponForProductScreen" },
];

const MyCouponTopTabNavigator = createMaterialTopTabNavigator();
export const MyCouponTabNavigator = () => {
  return (
    <MyCouponTopTabNavigator.Navigator
      initialRouteName="CouponForTotal"
      swipeEnabled={false}
    >
      <MyCouponTopTabNavigator.Screen
        name="CouponForTotal"
        component={screens[couponArray[0].component]}
        options={{ title: "총액할인쿠폰" }}
      />
      <MyCouponTopTabNavigator.Screen
        name="CouponForProduct"
        component={screens[couponArray[1].component]}
        options={{ title: "상품할인쿠폰" }}
      />
    </MyCouponTopTabNavigator.Navigator>
  );
};
const CouponTopTabNavigator = createMaterialTopTabNavigator();
export const CouponTabNavigator = () => {
  return (
    <CouponTopTabNavigator.Navigator
      initialRouteName="CouponForTotal"
      swipeEnabled={false}
    >
      <CouponTopTabNavigator.Screen
        name="CouponForTotal"
        component={CouponForTotalScreen}
        options={{ title: "총액할인쿠폰" }}
      />
      <CouponTopTabNavigator.Screen
        name="CouponForProduct"
        component={CouponForProductScreen}
        options={{ title: "상품할인쿠폰" }}
      />
    </CouponTopTabNavigator.Navigator>
  );
};

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
export const HomeTabNavigator = ({ navigation }) => {
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
        tabBar={(props) => <MeterialTopTabBar {...props} />}
        initialRouteName="Home"
        swipeEnabled={false}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: { width: 85 },
          style: { marginLeft: -85 },
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
        <HomeTopTabNavigator.Screen
          name="Flyer"
          component={FlyerScreen}
          options={{
            title: "행사전단",
          }}
        />
        <HomeTopTabNavigator.Screen
          name="Event"
          component={EventScreen}
          options={{ title: "이벤트" }}
        />
        <HomeTopTabNavigator.Screen
          name="Coupon"
          component={CouponTabNavigator}
          options={{ title: "나로쿠폰" }}
        />
        <HomeTopTabNavigator.Screen
          name="Exhibition"
          component={ExhibitionScreen}
          options={{ title: "기획전" }}
        />
        <HomeTopTabNavigator.Screen
          name="NaroTube"
          component={NaroTubeTabNavigator}
          options={{ title: "나로튜브" }}
        />
      </HomeTopTabNavigator.Navigator>
    </Fragment>
  );
};

const HomeStackNavigator = createStackNavigator();
export const HomeNavigator = () => {
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
          name="home"
          component={HomeTabNavigator}
          options={HomeScreenOptions}
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
          name="CouponDetail"
          component={CouponDetailScreen}
          options={CouponDetailScreenOptions}
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
          name="MyCoupon"
          component={MyCouponTabNavigator}
        />
      </HomeStackNavigator.Navigator>
      <BottomButtons />
    </Fragment>
  );
};

export const HomeScreenOptions = ({ navigation }) => {
  return {
    headerTitle: "하나로",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Notification"
          iconName={Platform.OS === "android" ? "md-search" : "md-search"}
          onPress={() => {
            animate();
          }}
        />
        <Item
          title="Scanner"
          iconName={
            Platform.OS === "android" ? "md-qr-scanner" : "md-qr-scanner"
          }
          onPress={() => {
            navigation.navigate("BarCodeScanner");
          }}
        />
      </HeaderButtons>
    ),
  };
};

// https://reactnavigation.org/docs/drawer-navigator/
// hide drawer item - https://stackoverflow.com/questions/60395508/react-navigation-5-hide-drawer-item
const Drawer = createDrawerNavigator();
export const MainNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerStyle={drawerStyle}
      drawerContent={(props) => CustomDrawerContent(props, dispatch)}
    >
      <Drawer.Screen name="HomeTab" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

const drawerStyle = {
  backgroundColor: "#c6cbef",
  width: 240,
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
