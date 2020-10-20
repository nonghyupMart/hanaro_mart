import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  BackHandler,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import colors from "@constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton, LogoTitle, HomeHeaderRight } from "@UI/header";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BaseScreen from "@components/BaseScreen";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
import _ from "lodash";
import HomeNotice from "@components/home/HomeNotice";
import HomeBanner from "@components/home/HomeBanner";
import NaroTube from "@components/home/NaroTube";
import StorePopup from "@components/home/StorePopup";
import AppPopup from "@components/home/AppPopup";
import * as Util from "@util";
import { setAlert, setIsLoading } from "@actions/common";

const HomeScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [fetchHomeBanner, setFetchHomeBanner] = useState(false);
  const [fetchHomeNotice, setFetchHomeNotice] = useState(false);
  const [fetchHomeNaro, setFetchHomeNaro] = useState(false);
  const [fetchStorePopup, setFetchStorePopup] = useState(false);
  const [fetchAppPopup, setFetchAppPopup] = useState(false);
  const [storePopupKey, setStorePopupKey] = useState();
  const [appPopupKey, setAppPopupKey] = useState();
  const [isReadyAppPopup, setIsReadyAppPopup] = useState(false);

  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // setAppPopupKey(Math.random());
      if (!_.isEmpty(userStore)) setStorePopupKey(userStore.storeInfo.store_cd);
    });
    return unsubscribe;
  }, [userStore]);
  useEffect(() => {
    // if (__DEV__) {
    // Util.removeStorageItem("dateForStorePopupData5");
    // Util.removeStorageItem("dateForAppPopupData5");
    // }
    dispatch(setIsLoading(true));
    if (fetchHomeBanner && fetchHomeNotice && fetchHomeNaro && fetchAppPopup) {
      dispatch(setIsLoading(false));
    }

    if (_.isEmpty(userStore) && isJoin) {
      dispatch(
        setAlert({
          message: "선택된 매장이 없습니다.\n매장을 선택해 주세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
            navigation.navigate("StoreChange");
          },
          onPressCancel: () => {
            dispatch(setAlert(null));
          },
          confirmText: "매장선택",
          cancelText: "취소",
        })
      );
    }
  }, [fetchHomeBanner, fetchHomeNotice, fetchHomeNaro, fetchAppPopup]);

  const navigateToCart = () => {
    if (_.isEmpty(userStore)) return navigation.navigate("Empty");
    navigation.navigate("Cart");
  };

  return (
    <>
      <BaseScreen style={styles.screen} contentStyle={{ paddingTop: 0 }}>
        <AppPopup
          // key={appPopupKey}
          setIsReadyAppPopup={setIsReadyAppPopup}
          setFetchAppPopup={setFetchAppPopup}
          {...props}
        />
        {isReadyAppPopup && (
          <StorePopup
            key={storePopupKey}
            setFetchStorePopup={setFetchStorePopup}
            {...props}
          />
        )}
        <HomeBanner setFetchHomeBanner={setFetchHomeBanner} />
        <Space />
        <NaroTube setFetchHomeNaro={setFetchHomeNaro} />
        <HomeNotice setFetchHomeNotice={setFetchHomeNotice} />
      </BaseScreen>
    </>
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
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    headerTitle: (props) => <LogoTitle {...props} navigator={navigation} />,
    headerLeft: (props) => <HeaderMenu {...props} navigator={navigation} />,
    headerRight: (props) => (
      <HomeHeaderRight {...props} navigator={navigation} />
    ),
  };
};
const HeaderMenu = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        iconSize={30}
        IconComponent={MaterialIcons}
        title="메뉴"
        iconName="menu"
        onPress={() => {
          props.navigator.dispatch(DrawerActions.toggleDrawer());
        }}
        color={colors.pine}
      />
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: colors.trueWhite,
  },
});

export default HomeScreen;
