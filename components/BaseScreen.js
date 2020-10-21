import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import {
  View,
  StyleSheet,
  FlatList,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { useHeaderHeight } from "@react-navigation/stack";
import * as CommonActions from "@actions/common";
import Constants from "expo-constants";
import { StyleConstants } from "@UI/BaseUI";
import _ from "lodash";

const Contents = (props) => {
  return <>{props.children}</>;
};
const BaseScreen = (props) => {
  const isBottomNavigation = useSelector(
    (state) => state.common.isBottomNavigation
  );
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);
  const [isPadding, setIsPadding] = useState(
    props.isPadding == undefined ? true : props.isPadding
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      dispatch(CommonActions.setBottomNavigation(isBottomNavigation));
      dispatch(CommonActions.setIsLoading(false));
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, [isBottomNavigation]);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardOn(true);
    // dispatch(CommonActions.setBottomNavigation(false));
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOn(false);
    // dispatch(CommonActions.setBottomNavigation(isBottomNavigation));
  };
  const onScroll = () => {
    // if (isBottomNavigationFromRedux != isBottomNavigation)
    //   dispatch(CommonActions.setBottomNavigation(isBottomNavigation));
    // if (isKeyboardOn) Keyboard.dismiss();
  };
  //   const [isVisibleAlert, setIsVisibleAlert] = useState(props.isVisibleAlert);

  const [isScroll, setIsScroll] = useState(
    props.isScroll == undefined ? true : props.isScroll
  );

  return (
    <>
      <Screen
        headerHeight={useHeaderHeight()}
        style={props.style}
        isPadding={isPadding}
        isCenter={props.isCenter}
      >
        {isScroll && (
          <ScrollList
            // onScroll={onScroll}
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
    </>
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
    let v = 0;
    if (!props.headerHeight || props.headerHeight == 0)
      v = Platform.OS == "ios" ? Constants.statusBarHeight : 0;
    v += 19;
    if (!props.isPadding) v = 0;
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
