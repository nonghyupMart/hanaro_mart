import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { View, Text, StyleSheet } from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import { ExtendedWebView } from "@UI/ExtendedWebView";

import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "@components/BaseScreen";
import Alert from "@UI/Alert";
import * as RootNavigation from "@navigation/RootNavigation";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import colors from "@constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton, LogoTitle } from "@UI/header";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { setPreview } from "@actions/auth";
import _ from "lodash";
const EmptyScreen = (props) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState();
  const [confirmText, setConfirmText] = useState();
  const [onPressConfirm, setOnPressConfirm] = useState();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // global.alert(1);
      setIsVisible(true);
      if (_.isEmpty(userStore) && isJoin) {
        setMessage("나의 매장을 설정하신 후에\n사용하실 수 있는 메뉴입니다.");
        setConfirmText("매장설정");
        setOnPressConfirm({
          confirm: () => {
            setIsVisible(false);
            props.navigation.navigate("Home");
            props.navigation.navigate("StoreChange");
          },
        });
      } else {
        setMessage("회원가입후 사용하실 수 있는 메뉴입니다.");
        setConfirmText("회원가입");
        setOnPressConfirm({
          confirm: () => {
            setIsVisible(false);
            dispatch(setPreview(false));
          },
        });
      }
      //   setMessage("회원가입후 사용하실 수 있는 메뉴입니다.");
      // or 매장 설정
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  });

  return (
    <Alert
      confirmText={confirmText}
      isVisible={isVisible}
      message={message}
      onPressConfirm={onPressConfirm && onPressConfirm.confirm}
      onPressCancel={() => {
        setIsVisible(false);
        props.navigation.navigate("Home");
      }}
    />
  );
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
