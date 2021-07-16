import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { ActivityIndicator } from "react-native";
import Alert from "../../components/UI/Alert";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { Platform } from "react-native";
import _ from "lodash";
import * as branchesActions from "../../store/actions/branches";
import * as RootNavigation from "../../navigation/RootNavigation";
import * as CommonActions from "../../store/actions/common";
import { useNavigationState } from "@react-navigation/native";
import {
  setAlert,
  setIsLoading,
  setDidTryPopup,
} from "../../store/actions/common";
import * as Notifications from "expo-notifications";
import JoinPopupContent from "../../screens/join/JoinPopupContent";
import moment from "moment";

export const ExtendedWebView = (props) => {
  const dispatch = useDispatch();
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  const userStore = useSelector((state) => state.auth.userStore);
  const [isLoaded, setIsLoaded] = useState(false);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const index = useNavigationState((state) => state.index);
  const isLoading = useSelector((state) => state.common.isLoading);
  const alert = useSelector((state) => state.common.alert);
  const webref = useRef();
  const onMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    parseMethod(message);
  };

  // useEffect(() => {
  //   webref.current.injectJavaScript(
  //     `
  //     var a = {method:"openURL", value:"http://m.nonghyupmall.com/MCAMARKETI/iapp.nh"};
  //     var event =  JSON.stringify(a);
  //     window.ReactNativeWebView.postMessage(event)
  //     `
  //   );
  // }, []);

  const onShouldStartLoadWithRequest = (e) => {
    // android용
    return interceptStateChange(e);
  };
  const onNavigationStateChange = (e) => {
    // if (Platform.OS === "ios") return interceptStateChange(e);
  };
  const interceptStateChange = (e) => {
    // allow normal the navigation
    if (!e.url.startsWith("native://")) return true;
    const message = JSON.parse(
      decodeURIComponent(e.url.replace("native://", ""))
    );
    parseMethod(message);
    // return false to prevent webview navigate to the location of e.url
    return false;
  };
  const parseMethod = async (message) => {
    switch (message.method) {
      case "openURL":
        Linking.openURL(message.value);
        break;
      case "alert":
        dispatch(
          CommonActions.setAlert({
            message: message.value,
            onPressConfirm: () => {
              dispatch(CommonActions.setAlert(null));
            },
          })
        );
        break;
      case "auth":
        await dispatch(setIsLoading(true));
        if (hasAlreadyRegistered(message.value.user_cd)) return;

        let query = {
          // os: Platform.OS === "ios" ? "I" : "A",
          user_cd: message.value.user_cd,
        };

        if (props.recommend) query.to_recommend = props.recommend;
        if (pushToken) query.token = pushToken;

        if (!_.isEmpty(userInfo)) {
          query.user_cd = userInfo.user_cd;
          query.recommend = userInfo.recommend;
        }
        if (!_.isEmpty(userStore)) {
          query.store_cd = userStore.storeInfo.store_cd;
        }
        dispatch(authActions.updateLoginLog(query)).then(async (data) => {
          if (data.userInfo) {
            await authActions.saveUserData(dispatch, data);
            if (isLoading) await dispatch(setIsLoading(false));
            if (!_.isEmpty(alert)) await dispatch(setAlert(null));
            await dispatch(CommonActions.setDidTryPopup(false));
            await dispatch(authActions.setIsJoin(true));
            await finish();
          }
        });
        // message.value
        break;
      case "close":
        finish();
        break;
    }
  };

  const hasAlreadyRegistered = (user_cd) => {
    // show alert when user_cd is ""
    if (user_cd == "") {
      return dispatch(
        CommonActions.setAlert({
          message: "가입된 정보가 없습니다. 회원가입을 해주세요.",
          onPressConfirm: async () => {
            await dispatch(setIsLoading(false));
            await dispatch(CommonActions.setAlert(null));
            finish();
          },
        })
      );
    }
    return false;
  };

  const isUnderFourteen = (birthday) => {
    // block under age 14
    var years = moment().diff(birthday, "years");
    return years < 14;
  };
  const finish = async () => {
    await dispatch(CommonActions.setBottomNavigation(true));
    if (index > 0) RootNavigation.pop();
    else RootNavigation.navigate("Home");
  };
  const hideSpinner = () => {
    setIsLoaded(true);
  };
  return (
    <>
      <WebView
        ref={(r) => (webref.current = r)}
        textZoom={100}
        onLoad={() => hideSpinner()}
        {...restProps}
        // source={newSource}
        style={[{ opacity: 0.99 }, props.style]}
        scalesPageToFit={true}
        originWhitelist={["*"]}
        allowFileAccess={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        onMessage={(event) => onMessage(event)}
        // renderError={(error) => Util.log("Webview error:" + error)}
        onError={(syntheticEvent) => {
          // const { nativeEvent } = syntheticEvent;
          // Util.log("WebView error: ", nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          // const { nativeEvent } = syntheticEvent;
          // Util.log(
          //   "WebView received error status code: ",
          //   nativeEvent.statusCode
          // );
        }}
        renderLoading={() => {
          return (
            <ActivityIndicator
              size={props.indicatorSize ? props.indicatorSize : "large"}
              color={colors.cerulean}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          );
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={onNavigationStateChange}
        cacheEnabled={true}
      />
    </>
  );
};
