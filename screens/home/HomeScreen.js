import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  BackHandler,
  StatusBar,
  Platform,
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
import { useIsFocused } from "@react-navigation/native";
import BaseScreen from "@components/BaseScreen";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as Updates from "expo-updates";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

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
import * as CommonActions from "@actions/common";
import * as authActions from "@actions/auth";
import { CATEGORY } from "@constants/settings";
import { SET_NOTIFICATION } from "@actions/common";
import * as RootNavigation from "@navigation/RootNavigation";
import { TabMenus } from "@constants/menu";

const HomeScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const didTryPopup = useSelector((state) => state.common.didTryPopup);
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isFocused = useIsFocused();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const pushToken = useSelector((state) => state.auth.pushToken);

  initNotificationReceiver(routeName);
  useEffect(() => {
    if (Platform.OS == "ios") {
      setTimeout(() => {
        StatusBar.setBarStyle("dark-content");
      }, 1000);
    }
    if (!isFocused) return;
    if (!_.isEmpty(userInfo) && !_.isEmpty(userStore)) {
      // console.warn(JSON.stringify(userInfo, null, "\t"));
      updateUserInfo(dispatch, userInfo, pushToken);
    }

    return () => {
      dispatch(setIsLoading(false));
    };
  }, [isFocused]);
  useEffect(() => {
    (async () => {
      let data = await Util.getStorageItem("notificationData");
      let jsonData = await JSON.parse(data);
      if (_.isEmpty(jsonData)) return;
      await dispatch(CommonActions.setNotification(jsonData));
      await Util.removeStorageItem("notificationData");
    })();

    return () => {
      dispatch(setIsLoading(false));
    };
  }, []);

  useEffect(() => {
    if (typeof didTryPopup != "string") return;
    setTimeout(() => {
      navigation.navigate(didTryPopup);
    }, 0);
    dispatch(CommonActions.setDidTryPopup(true));
  }, [didTryPopup]);

  const navigateToCart = () => {
    if (_.isEmpty(userStore)) return navigation.navigate("Empty");
    navigation.navigate("Cart");
  };

  return (
    <>
      <BaseScreen style={styles.screen} contentStyle={{ paddingTop: 0 }}>
        <AppPopup
          isFocused={isFocused}
          // key={appPopupKey}
          {...props}
        />
        <HomeBanner isFocused={isFocused} />
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => Util.sendShareLink(userInfo.recommend)}
        >
          <Image
            source={require("@images/in730.png")}
            style={{ width: "100%" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => {
            if (!isJoin) return navigation.navigate("Empty");
            navigation.navigate("StoreChange");
          }}
        >
          <Image
            source={require("@images/mystore.png")}
            style={{ width: "100%" }}
          />
        </TouchableOpacity>
        {/* <Space /> */}
        <NaroTube isFocused={isFocused} />
        <HomeNotice isFocused={isFocused} />
      </BaseScreen>
    </>
  );
};
const initNotificationReceiver = (routeName) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isLoading = useSelector((state) => state.common.isLoading);
  const notification = useSelector((state) => state.common.notification);
  useLayoutEffect(() => {
    if (
      !isLoading &&
      notification &&
      notification.request &&
      notification.request.content &&
      notification.request.content.data
    ) {
      const category = notification.request.content.data.category;
      const store_cd = notification.request.content.data.store_cd;
      const store_nm = notification.request.content.data.store_nm;
      const cd = notification.request.content.data.cd;

      if (category) {
        if (userStore && userStore.storeInfo.store_cd == store_cd) {
          const currentTab = TabMenus.filter(
            (tab) => tab.name == CATEGORY[category]
          );
          const tab = userStore.menuList.filter(
            (menu) => menu.r_menu_nm == currentTab[0].title
          );
          if (_.isEmpty(tab)) return;

          let param = {};
          if (!!cd) param.notice_cd = cd;
          switch (category) {
            case "A":
              param.type = "C";
              break;
            case "H":
              param.type = "H";
              break;
            default:
              break;
          }

          setTimeout(() => {
            RootNavigation.navigate(CATEGORY[category], param);
          }, 0);
        } else {
          dispatch(
            setAlert({
              message: `${store_nm}에서 발송한 알림입니다.\n매장을 변경하시겠습니까?`,
              confirmText: "매장설정",
              onPressConfirm: () => {
                dispatch(setAlert(null));
                RootNavigation.navigate("Home");
                RootNavigation.navigate("StoreChange");
              },
              onPressCancel: () => {
                dispatch(setAlert(null));
              },
            })
          );
        }
      }
      dispatch({ type: SET_NOTIFICATION, notification: null });
    }
  }, [notification, isLoading]);
};
export const updateUserInfo = async (dispatch, userInfo, token) => {
  if (_.isEmpty(userInfo) || !userInfo.recommend) return;
  let tk = `${token}`.trim();
  if (!tk || tk == "") tk = (await Notifications.getExpoPushTokenAsync()).data;
  let action;
  tk = `${tk}`.trim();
  if (tk && tk != "") {
    action = authActions.updateLoginLog({
      token: token,
      user_cd: userInfo.user_cd,
      recommend: userInfo.recommend,
    });
    await dispatch(authActions.setPushToken(tk));
  } else {
    action = authActions.updateLoginLogV1({
      user_cd: userInfo.user_cd,
      recommend: userInfo.recommend,
    });
  }

  return dispatch(action).then(async (data) => {
    if (_.isEmpty(data.userInfo) || data.userInfo.user_cd != userInfo.user_cd)
      return;

    dispatch(authActions.setUserInfo(data.userInfo));
    authActions.saveUserInfoToStorage(data.userInfo);
    authActions.saveUserTelToStorage(data.userInfo.tel);

    let obj;
    if (!_.isEmpty(data.storeInfo)) {
      obj = { storeInfo: data.storeInfo, menuList: data.menuList };
    }
    dispatch(authActions.saveUserStore(obj));
    authActions.saveUserStoreToStorage(obj);
    if (_.isEmpty(obj)) {
      dispatch(CommonActions.setDidTryPopup(false));
    }
    return Promise.resolve(data);
  });
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
    cardStyle: { backgroundColor: colors.trueWhite, paddingBottom: 65 },
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
