import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import * as Updates from "expo-updates";
import {
  View,
  StyleSheet,
  FlatList,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  AppState,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { useHeaderHeight } from "@react-navigation/stack";
import * as CommonActions from "../store/actions/common";
import Constants from "expo-constants";
import { StyleConstants } from "../components/UI/BaseUI";
import _ from "lodash";
import * as Util from "../util";
import { setAlert, setIsLoading } from "../store/actions/common";

const Contents = (props) => {
  return <>{props.children}</>;
};
const BaseScreen = (props) => {
  const [appState, setAppState] = useState(AppState.currentState);
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
  const _handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);
  useEffect(() => {
    if (appState == "active") updateExpo(dispatch);
  }, [appState]);

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
    <Screen
      headerHeight={useHeaderHeight()}
      style={props.style}
      isPadding={isPadding}
      isCenter={props.isCenter}
    >
      {isScroll && (
        <ScrollList
          listKey="BaseScreen"
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
  );
};

export const updateExpo = (dispatch) => {
  if (!__DEV__) {
    (async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // ... notify user of update ...
          // Util.log("new update");
          await dispatch(
            setAlert({
              message: "새로운 버전이 있습니다. 앱을 재실행 해주세요.",
              confirmText: "업데이트",
              onPressConfirm: () => {
                dispatch(setAlert(null));
                Updates.reloadAsync();
              },
            })
          );
        }
      } catch (e) {
        // handle or log error
        Util.log("update error=>", e);
      }
    })();
  }
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
