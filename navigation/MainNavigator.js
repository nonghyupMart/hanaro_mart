import React, { Fragment } from "react";
import { Platform, Text, Button, Icon, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Input } from "react-native-elements";
import HeaderButton from "../components/UI/HeaderButton";
import HomeTabBar from "../components/UI/HomeTabBar";

import FlyerScreen from "../screens/home/FlyerScreen";
import FlyerDetailScreen from "../screens/home/FlyerDetailScreen";
import EventScreen from "../screens/home/EventScreen";
import ExhibitionScreen from "../screens/home/ExhibitionScreen";
import NaroTubeScreen from "../screens/home/NaroTubeScreen";
import CouponScreen from "../screens/home/CouponScreen";
import Colors from "../constants/Colors";
import FavoritesScreen from "../screens/FavoritesScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen",
};

const HomeTopTabNavigator = createMaterialTopTabNavigator();
export const HomeTabNavigator = () => {
  return (
    <Fragment>
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
      <HomeTopTabNavigator.Navigator initialRouteName="Flyer">
        <HomeTopTabNavigator.Screen
          name="Flyer"
          component={FlyerScreen}
          options={{ title: "행사전단" }}
        />
        <HomeTopTabNavigator.Screen
          name="Event"
          component={EventScreen}
          options={{ title: "이벤트" }}
        />
        <HomeTopTabNavigator.Screen
          name="Coupon"
          component={CouponScreen}
          options={{ title: "나로쿠폰" }}
        />
        <HomeTopTabNavigator.Screen
          name="Exhibition"
          component={ExhibitionScreen}
          options={{ title: "기획전" }}
        />
        <HomeTopTabNavigator.Screen
          name="NaroTube"
          component={NaroTubeScreen}
          options={{ title: "나로튜브" }}
        />
      </HomeTopTabNavigator.Navigator>
    </Fragment>
  );
};

const FavStackNavigator = createStackNavigator();
export const FavNavigator = () => {
  return (
    <FavStackNavigator.Navigator>
      <FavStackNavigator.Screen name="Favorites" component={FavoritesScreen} />
    </FavStackNavigator.Navigator>
  );
};

export const HomeScreenOptions = (navData) => {
  return {
    headerTitle: "하나로",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Notification"
          iconName={
            Platform.OS === "android" ? "md-notifications" : "md-notifications"
          }
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
        <Item
          title="Scanner"
          iconName={
            Platform.OS === "android" ? "md-qr-scanner" : "md-qr-scanner"
          }
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const HomeStackNavigator = createStackNavigator();
export const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={HomeScreenOptions}
      />
      <HomeStackNavigator.Screen
        name="FlyerDetail"
        component={FlyerDetailScreen}
      />
    </HomeStackNavigator.Navigator>
  );
};

const MainBottomTabNavigator = createBottomTabNavigator();
export const MainTabNavigator = () => {
  return (
    <MainBottomTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "MyCoupon") {
            iconName = focused ? "md-filing" : "md-filing";
          } else if (route.name === "RingPicker") {
            iconName = focused ? "logo-chrome" : "logo-chrome";
          } else if (route.name === "MyPage") {
            iconName = focused ? "ios-person" : "ios-person";
          } else if (route.name === "Call") {
            iconName = focused ? "ios-call" : "ios-call";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <MainBottomTabNavigator.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: "홈",
        }}
      />
      <MainBottomTabNavigator.Screen
        name="MyCoupon"
        component={FavNavigator}
        options={{
          title: "나의쿠폰",
        }}
      />
      <MainBottomTabNavigator.Screen
        name="RingPicker"
        component={FavNavigator}
      />

      <MainBottomTabNavigator.Screen
        name="MyPage"
        component={FavNavigator}
        options={{
          title: "마이페이지",
        }}
      />
      <MainBottomTabNavigator.Screen
        name="Call"
        component={FavNavigator}
        options={{
          title: "매장전화",
        }}
      />
    </MainBottomTabNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTab" component={MainTabNavigator} />
      <Drawer.Screen name="Review" component={FavNavigator} />
    </Drawer.Navigator>
  );
};
