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
import { useIsFocused } from "@react-navigation/native";
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
import * as CommonActions from "@actions/common";
import * as authActions from "@actions/auth";
import * as Updates from "expo-updates";

const HomeScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const didTryPopup = useSelector((state) => state.common.didTryPopup);

  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isFocused = useIsFocused();
  const userInfo = useSelector((state) => state.auth.userInfo);
  let timer;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!__DEV__) {
        (async () => {
          try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
              await Updates.fetchUpdateAsync();
              // ... notify user of update ...
              Util.log("new update");
              await dispatch(
                setAlert({
                  message: "새로운 버전이 있습니다. 앱을 재실행 해주세요.",
                  confirmText: "업데이트",
                  onPressConfirm: () => {
                    dispatch(setAlert(null));
                    Updates.reloadAsync();
                  },
                  onPressCancel: () => {
                    dispatch(setAlert(null));
                  },
                })
              );
            }
          } catch (e) {
            // handle or log error
            Util.log("update error=>", e);
            dispatch(
              setAlert({
                message: "새로운 버전이 있습니다. 앱을 재실행 해주세요.",
                confirmText: "업데이트",
                onPressConfirm: () => {
                  dispatch(setAlert(null));
                  Updates.reloadAsync();
                },
                onPressCancel: () => {
                  dispatch(setAlert(null));
                },
              })
            );
          }
        })();
      }

      if (!_.isEmpty(userInfo) && !_.isEmpty(userStore)) {
        // console.warn(JSON.stringify(userInfo, null, "\t"));
        updateUserInfo(dispatch, userInfo);
      }
    });
    return () => {
      dispatch(setIsLoading(false));
      unsubscribe;
    };
  }, [navigation]);
  useEffect(() => {
    if (typeof didTryPopup == "string") {
      timer = setTimeout(() => {
        navigation.navigate(didTryPopup);
      }, 0);
      dispatch(CommonActions.setDidTryPopup(true));
    }

    return () => {
      dispatch(setIsLoading(false));
      clearTimeout(timer);
      timer;
    };
  }, []);

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
        <Space />
        <NaroTube isFocused={isFocused} />
        <HomeNotice isFocused={isFocused} />
      </BaseScreen>
    </>
  );
};
export const updateUserInfo = (dispatch, userInfo) => {
  return dispatch(
    authActions.updateLoginLog({ user_cd: userInfo.user_cd })
  ).then((data) => {
    if (!_.isEmpty(data.userInfo)) {
      dispatch(authActions.setUserInfo(data.userInfo));
      authActions.saveUserInfoToStorage(data.userInfo);
    }
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
