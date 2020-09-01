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
import { useHeaderHeight } from "@react-navigation/stack";
import { setBottomNavigation } from "@actions/auth";
import Constants from "expo-constants";

import Loading from "@UI/Loading";
import Alert from "@UI/Alert";

const Contents = (props) => {
  return (
    <>
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
    </>
  );
};
const BaseScreen = (props) => {
  //   const [isVisibleAlert, setIsVisibleAlert] = useState(props.isVisibleAlert);
  //   console.log(props.alert);
  // console.log(props.style);
  const [isScroll, setIsScroll] = useState(
    props.isScroll == undefined ? true : props.isScroll
  );
  // console.log(isScroll);
  return (
    <Screen headerHeight={useHeaderHeight()} style={props.style}>
      {isScroll && (
        <ScrollList
          headerHeight={useHeaderHeight()}
          {...props}
          contentContainerStyle={[styles.scrollContainer, styles.safeAreaView]}
          data={[0]}
          keyExtractor={(item) => `${item + Math.random()}`}
          renderItem={() => (
            <ContentContainer style={[props.contentStyle]}>
              <Contents {...props} />
            </ContentContainer>
          )}
        />
      )}
      {!isScroll && <Contents {...props} />}
    </Screen>
  );
};
const scrollContainer = styled.View({});
// console.log(props);
const ScrollList = styled.FlatList({
  flex: 1,
  paddingRight: 16,

  paddingLeft: 16,
});
const ContentContainer = styled.View({
  flex: 1,
  // flexGrow: 1,
  paddingTop: (props) => {
    // console.log(props.headerHeight);

    let v = 0;
    if (!props.headerHeight || props.headerHeight == 0)
      v = Platform.OS == "ios" ? Constants.statusBarHeight : 0;
    v += 19;
    // console.log(v);
    return v;
  },
  paddingBottom: 19,
  alignItems: "flex-start",
});
const Screen = styled.View({
  flex: 1,
  backgroundColor: colors.white,
});
const styles = StyleSheet.create({
  scrollContainer: {},
  safeAreaView: {
    flexGrow: 1,
  },
});
export default BaseScreen;
