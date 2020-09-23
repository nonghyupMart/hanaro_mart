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

import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import BaseScreen from "@components/BaseScreen";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { setUserStore } from "@actions/auth";

import * as authActions from "@actions/auth";
import {
  StyleConstants,
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
  const [page, setPage] = useState(1);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const homeBanner = useSelector((state) => state.home.homeBanner);
  const homeNotice = useSelector((state) => state.home.homeNotice);
  const homeNaro = useSelector((state) => state.home.homeNaro);
  const userStore = useSelector((state) => state.auth.userStore);
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const [alert, setAlert] = useState();
  useEffect(() => {
    setIsLoading(true);
    const fetchHomeBanner = dispatch(homeActions.fetchHomeBanner());
    const fetchHomeNotice = dispatch(homeActions.fetchHomeNotice());
    const fetchHomeNaro = dispatch(homeActions.fetchHomeNaro());
    Promise.all([fetchHomeBanner, fetchHomeNotice, fetchHomeNaro]).then(
      (result) => {
        setIsLoading(false);
        // console.log(homeBanner);
      }
    );

    if (
      Object.keys(userStore).length === 0 &&
      Object.keys(agreedStatus).length === 0
    ) {
      setAlert({
        message: "선택된 매장이 없습니다.\n매장을 선택해 주세요.",
        onPressConfirm: () => {
          setAlert(null);
        },
        onPressCancel: () => {
          setAlert(null);
        },
        confirmText: "매장선택",
        cancelText: "취소",
      });
    }
  }, [dispatch]);

  const loadMore = () => {
    if (!isLoading && page + 1 <= homeNotice.finalPage) {
      console.warn("loadMore");
      dispatch(homeActions.fetchHomeNotice({ page: page + 1 }));
      setPage(page + 1);
    }
  };

  return (
    <BaseScreen
      alert={alert}
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
    >
      <HomeBanner homeBanner={homeBanner} />
      <Space />
      <NaroTube homeNaro={homeNaro} />
      <HomeNotice homeNotice={homeNotice} loadMore={loadMore} />
    </BaseScreen>
  );
};
const Space = styled.View({
  width: "100%",
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
