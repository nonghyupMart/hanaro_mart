import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerActions } from "@react-navigation/native";
import colors from "@constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton, LogoTitle } from "@UI/header";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import URI from "urijs";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import BaseScreen from "@components/BaseScreen";

import { useSelector, useDispatch } from "react-redux";

import { setUserStore } from "@actions/auth";

import * as authActions from "@actions/auth";
import {
  StyleConstants,
  BaseText,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
import * as homeActions from "@actions/home";
import { IMAGE_URL } from "@constants/settings";

import HomeNotice from "@components/home/HomeNotice";
import HomeBanner from "@components/home/HomeBanner";
import NaroTube from "@components/home/NaroTube";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [page, setPage] = useState(0);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const homeBanner = useSelector((state) => state.home.homeBanner);
  const homeNotice = useSelector((state) => state.home.homeNotice);

  useEffect(() => {
    setIsLoading(true);
    const requestHomeBanner = dispatch(homeActions.fetchHomeBanner());
    const requestHomeNotice = dispatch(homeActions.fetchHomeNotice());
    Promise.all([requestHomeBanner, requestHomeNotice]).then((result) => {
      setIsLoading(false);
      // console.log(homeBanner);
    });
  }, [dispatch]);

  const videoUrl =
    "https://www.youtube.com/watch?v=53Vxx0R-EJM&feature=youtu.be";
  const url = URI(videoUrl);
  const videoId = url.query(true).v;
  if (videoId == "") {
  }

  useEffect(() => {
    (async () => {
      const userStoreData = await AsyncStorage.getItem("userStoreData");
      const data = JSON.parse(userStoreData);
      dispatch(setUserStore(data));
    })();
  }, [dispatch]);

  return (
    <BaseScreen
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
    >
      <HomeBanner homeBanner={homeBanner} />
      <Space />
      <NaroTube videoId={videoId} />
      <HomeNotice homeNotice={homeNotice} />
    </BaseScreen>
  );
};
const Space = styled.View({
  flex: 1,
  height: 10,
  width: screenWidth,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderColor: colors.pinkishGrey,
});

export const screenOptions = ({ navigation }) => {
  return {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    headerTitle: (props) => <LogoTitle {...props} />,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconSize={30}
          IconComponent={MaterialIcons}
          title="메뉴"
          iconName="menu"
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          color={colors.pine}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          IconComponent={MaterialIcons}
          iconSize={24}
          title="검색"
          iconName="search"
          onPress={() => {
            animate();
          }}
          color={colors.pine}
          style={{ marginRight: 0, marginLeft: 0 }}
        />
        <Item
          IconComponent={MaterialIcons}
          iconSize={24}
          title="알림"
          iconName="notifications-none"
          onPress={() => {
            animate();
          }}
          color={colors.pine}
        />
        <Item
          iconSize={24}
          IconComponent={MaterialCommunityIcons}
          title="장바구니"
          iconName="cart-outline"
          onPress={() => {
            animate();
          }}
          color={colors.pine}
        />
        {/* <Item
          title="Scanner"
          iconName={
            Platform.OS === "android" ? "md-qr-scanner" : "md-qr-scanner"
          }
          onPress={() => {
            navigation.navigate("BarCodeScanner");
          }}
        /> */}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: colors.trueWhite,
  },
});

export default HomeScreen;
