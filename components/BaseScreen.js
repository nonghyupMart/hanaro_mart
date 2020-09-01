import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  BackHandler,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { setBottomNavigation } from "@actions/auth";
import Constants from "expo-constants";

import Loading from "@UI/Loading";
import Alert from "@UI/Alert";

const BaseScreen = (props) => {
  //   const [isVisibleAlert, setIsVisibleAlert] = useState(props.isVisibleAlert);
  console.log(props.alert);
  return (
    <Screen {...props} style={[props.style, styles.safeAreaView]}>
      <Loading isLoading={props.isLoading} />
      {props.alert && (
        <Alert
          isVisible={props.alert.message ? true : false}
          message={props.alert.message}
          onPressConfirm={props.alert.onPressConfirm}
          onPressCancel={props.alert.onPressCancel}
        />
      )}
      {props.children}
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
  padding-top: ${(props) => {
   props.headerShown;
    return ;
  }};
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${colors.white};
`;
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
export default BaseScreen;
