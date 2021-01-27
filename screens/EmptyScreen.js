import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "../components/UI/header";
import { ExtendedWebView } from "../components/UI/ExtendedWebView";

import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "../components/BaseScreen";
import Alert from "../components/UI/Alert";
import * as RootNavigation from "../navigation/RootNavigation";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import colors from "../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton, LogoTitle } from "../components/UI/header";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { setPreview } from "../store/actions/auth";
import { setAlert, setIsLoading } from "../store/actions/common";
import { useNavigationState } from "@react-navigation/native";

import _ from "lodash";
const EmptyScreen = (props) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState();
  const [confirmText, setConfirmText] = useState();
  const [onPressConfirm, setOnPressConfirm] = useState();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const index = useNavigationState((state) => state.index);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(setIsLoading(false));
      // global.alert(1);
      setIsVisible(true);
      if (
        !_.isEmpty(userInfo) &&
        _.isEmpty(userInfo.ci) &&
        !_.isEmpty(userStore) &&
        isJoin
      ) {
        return dispatch(
          setAlert({
            message: "본인인증후에\n사용하실 수 있는 메뉴입니다.",
            confirmText: "본인인증",
            onPressConfirm: () => {
              dispatch(setAlert(null));
              if (index > 0) RootNavigation.pop();
              else RootNavigation.navigate("Home");
              props.navigation.navigate("CI");
            },
            onPressCancel: () => {
              dispatch(setAlert(null));
              if (index > 0) RootNavigation.pop();
              else RootNavigation.navigate("Home");
            },
          })
        );
      }
      if (_.isEmpty(userStore) && isJoin) {
        dispatch(
          setAlert({
            message: "나의 매장을 설정하신 후에\n사용하실 수 있는 메뉴입니다.",
            confirmText: "매장설정",
            onPressConfirm: () => {
              dispatch(setAlert(null));
              props.navigation.navigate("Home");
              props.navigation.navigate("StoreChange");
            },
            onPressCancel: () => {
              dispatch(setAlert(null));
              props.navigation.navigate("Home");
            },
          })
        );
      } else {
        dispatch(
          setAlert({
            message: "휴대폰인증후 사용하실 수\n있는 메뉴입니다.",
            confirmText: "휴대폰인증",
            onPressConfirm: () => {
              dispatch(setAlert(null));
              dispatch(setPreview(false));
            },
            onPressCancel: () => {
              dispatch(setAlert(null));
              props.navigation.navigate("Home");
            },
          })
        );
      }

      //   setMessage("회원가입후 사용하실 수 있는 메뉴입니다.");
      // or 매장 설정
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  });

  return <></>;
};

export const screenOptions = ({ navigation }) => {
  return {
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    headerShown: false,
    headerStyle: { elevation: 0, shadowOpacity: 0 },
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default EmptyScreen;
