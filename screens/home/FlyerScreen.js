import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Easing,
} from "react-native";
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";

import { useScrollToTop } from "@react-navigation/native";

import FlyerContentsScreen from "./FlyerContentsScreen";
import CouponForTotalScreen from "./CouponForTotalScreen";

import Carousel from "react-native-looped-carousel";
import { useSelector } from "react-redux";

import FlyerItem from "../../components/FlyerItem";
import FlyerDetail from "../../components/FlyerDetail";
const { width, height } = Dimensions.get("window");
const initialLayout = { width: Dimensions.get("window").width };

const FlyerScreen = ({ navigation }) => {
  const state = {
    size: { width, height },
  };

  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };

  const [routes] = React.useState([
    { key: 0, title: "Article" },
    { key: 1, title: "Contacts" },
    { key: 2, title: "Albums" },
    { key: 3, title: "Chat" },
  ]);

  const [index, setIndex] = React.useState(0);
  const handleIndexChange = (index) => {
    setIndex(() => index);
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  const goLeft = (index) => {
    if (index > 0) {
      setIndex(() => index - 1);
    }
  };
  const goRight = (index) => {
    if (index < routes.length - 1) {
      setIndex(() => index + 1);
    }
  };
  const renderScene = ({ route }) => {
    return (
      <FlyerContentsScreen
        number={route.key}
        goLeft={goLeft}
        goRight={goRight}
      />
    );
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { backgroundColor: "#000", height: 350 },
  content1: {
    flex: 1,
    width: "100%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  content2: {
    width: "100%",
    height: 100,
    marginTop: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: { color: "#fff" },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSelected: {
    opacity: 1,
    color: "red",
  },
  customSlide: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: 100,
    height: 100,
  },
  tabbar: {
    height: 0,
    width: 0,
    backgroundColor: "#3f51b5",
  },
  tab: {
    width: 0,
  },
  indicator: {
    backgroundColor: "#ffeb3b",
  },
  label: {
    fontWeight: "400",
  },
});

export default FlyerScreen;
