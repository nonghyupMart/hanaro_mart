import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { useHeaderHeight } from "@react-navigation/stack";
import * as CommonActions from "@actions/common";
import Constants from "expo-constants";

import Loading from "@UI/Loading";
import Alert from "@UI/Alert";
import { StyleConstants } from "@UI/BaseUI";
import _ from "lodash";

const Contents = (props) => {
  // if (props.alert) console.log(props.alert.content);
  return (
    <>
      <Loading isLoading={props.isLoading} />
      {props.alert && (
        <Alert
          isVisible={props.alert.content || props.alert.message ? true : false}
          message={props.alert.message}
          onPressConfirm={props.alert.onPressConfirm}
          onPressCancel={props.alert.onPressCancel}
          cancelText={props.alert.cancelText}
          confirmText={props.alert.confirmText}
          content={props.alert.content}
        />
      )}
      {props.children}
    </>
  );
};
const BaseScreen = (props) => {
  const [isPadding, setIsPadding] = useState(
    props.isPadding == undefined ? true : props.isPadding
  );

  const isBottomNavigation =
    props.isBottomNavigation == undefined ? true : props.isBottomNavigation;
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(CommonActions.setBottomNavigation(isBottomNavigation));
    }, 0);

    const backAction = () => {
      dispatch(CommonActions.setBottomNavigation(isBottomNavigation));
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, []);
  //   const [isVisibleAlert, setIsVisibleAlert] = useState(props.isVisibleAlert);
  //   console.log(props.alert);
  // console.log(props.style);
  const [isScroll, setIsScroll] = useState(
    props.isScroll == undefined ? true : props.isScroll
  );
  // console.log(isScroll);
  if (props.isInitialized !== undefined && props.isInitialized === false) {
    return (
      <Screen headerHeight={useHeaderHeight()} style={props.style}>
        <Loading isLoading={props.isLoading} />
      </Screen>
    );
  }

  return (
    <Screen
      headerHeight={useHeaderHeight()}
      style={props.style}
      isPadding={isPadding}
      isCenter={props.isCenter}
    >
      {isScroll && (
        <ScrollList
          isPadding={isPadding}
          ref={(ref) => (props.setScrollRef ? props.setScrollRef(ref) : null)}
          nestedScrollEnabled={true}
          // keyboardDismissMode="none"
          // keyboardShouldPersistTaps="always"
          removeClippedSubviews={false}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
          windowSize={props.windowSize ? props.windowSize : 5}
          style={props.scrollListStyle}
          data={[0]}
          keyExtractor={(item, index) => `${index}`}
          headerHeight={useHeaderHeight()}
          {...props}
          contentContainerStyle={[styles.safeAreaView]}
          renderItem={({ item, index, separators }) => (
            <ContentContainer
              style={[props.contentStyle]}
              isPadding={isPadding}
            >
              <Contents {...props} />
            </ContentContainer>
          )}
        />
      )}
      {!isScroll && <Contents {...props} />}
    </Screen>
  );
};

const ScrollList = styled.FlatList.attrs({
  removeClippedSubviews: false,
})({
  flex: 1,
  paddingRight: (props) =>
    props.isPadding ? StyleConstants.defaultPadding : 0,
  paddingLeft: (props) => (props.isPadding ? StyleConstants.defaultPadding : 0),
});
const ContentContainer = styled.View({
  // flex: 1,
  // flexGrow: 1,
  paddingTop: (props) => {
    // console.log(props.headerHeight);

    let v = 0;
    if (!props.headerHeight || props.headerHeight == 0)
      v = Platform.OS == "ios" ? Constants.statusBarHeight : 0;
    v += 19;
    if (!props.isPadding) v = 0;
    // console.log(v);
    return v;
  },
  paddingBottom: (props) => (props.isPadding ? 19 : 0),
  alignItems: "flex-start",
});
const Screen = styled(View).attrs({
  behavior: "padding",
  enabled: true,
})({
  flex: 1,
  width: "100%",
  height: (props) => (props.isCenter ? "100%" : "auto"),
  backgroundColor: colors.white,
  justifyContent: (props) => (props.isCenter ? "center" : "flex-start"),
  alignItems: (props) => (props.isCenter ? "center" : "stretch"),
  alignSelf: (props) => (props.isCenter ? "center" : "auto"),
});
const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
});
export default BaseScreen;
