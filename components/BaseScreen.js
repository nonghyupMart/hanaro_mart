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
import { setBottomNavigation } from "@actions/auth";
import Constants from "expo-constants";

import Loading from "@UI/Loading";
import Alert from "@UI/Alert";
import { StyleConstants } from "@UI/BaseUI";

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
          content={props.alert.content}
        />
      )}
      {props.children}
    </>
  );
};
const BaseScreen = (props) => {
  const isBottomNavigation =
    props.isBottomNavigation == undefined ? true : props.isBottomNavigation;
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setBottomNavigation(isBottomNavigation));
    }, 0);

    const backAction = () => {
      dispatch(setBottomNavigation(isBottomNavigation));
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
    <Screen headerHeight={useHeaderHeight()} style={props.style}>
      {isScroll && (
        <ScrollList
          nestedScrollEnabled={true}
          // keyboardDismissMode="none"
          // keyboardShouldPersistTaps="always"
          removeClippedSubviews={false}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
          windowSize={props.windowSize ? props.windowSize : 5}
          style={props.scrollListStyle}
          headerHeight={useHeaderHeight()}
          {...props}
          contentContainerStyle={[styles.safeAreaView]}
          ListHeaderComponent={
            <ContentContainer style={[props.contentStyle]}>
              <Contents {...props} />
            </ContentContainer>
          }
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
  paddingRight: StyleConstants.defaultPadding,
  paddingLeft: StyleConstants.defaultPadding,
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
const Screen = styled(View).attrs({
  behavior: "padding",
  enabled: true,
})({
  flex: 1,
  backgroundColor: colors.white,
});
const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
});
export default BaseScreen;
