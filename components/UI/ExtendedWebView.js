import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { ActivityIndicator } from "react-native";
import Alert from "@UI/Alert";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "@actions/auth";
import { Platform } from "react-native";
import { popupConetnt } from "@screens/join/JoinStep2Screen";
import _ from "lodash";
import * as branchesActions from "@actions/branches";
import { signup } from "@screens/join/JoinStep2Screen";
import * as RootNavigation from "@navigation/RootNavigation";
import * as CommonActions from "@actions/common";
import queryString from "query-string";
import * as Util from "@util";
import Constants from "expo-constants";
import { useNavigationState } from "@react-navigation/native";

export const ExtendedWebView = (props) => {
  const dispatch = useDispatch();
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };

  const [isLoaded, setIsLoaded] = useState(false);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const index = useNavigationState((state) => state.index);
  // const onMessage = (event) => {
  //   // iOS용
  //   const message = JSON.parse(event.nativeEvent.data);
  //   parseMethod(message);
  // };

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
  const parseMethod = (message) => {
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
        let query = {
          user_sex: message.value.sex,
          user_id: message.value.tel,
          user_name: message.value.name,
          os: Platform.OS === "ios" ? "I" : "A",
          di: message.value.di,
          ci: message.value.ci,
          user_age: message.value.birthday,
        };

        if (pushToken) query.token = pushToken;
        if (_.isEmpty(userInfo) && !_.isEmpty(agreedStatus)) {
          // Only when the first signup
          query.marketing_agree = agreedStatus[3].isChecked ? "Y" : "N";
        }
        if (!_.isEmpty(userInfo)) {
          query.user_cd = userInfo.user_cd;
          query.recommend = userInfo.recommend;
        }
        signup(query, dispatch, agreedStatus).then(() => {
          if (!_.isEmpty(userInfo)) {
            dispatch(CommonActions.setBottomNavigation(true));
            if (index > 0) RootNavigation.pop();
            else RootNavigation.navigate("Home");
          }
        });

        // message.value
        break;
      case "close":
        dispatch(CommonActions.setBottomNavigation(true));
        if (index > 0) RootNavigation.pop();
        else RootNavigation.navigate("Home");
        break;
    }
  };
  const hideSpinner = () => {
    setIsLoaded(true);
  };
  return (
    <>
      <WebView
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
        // onMessage={(event) => onMessage(event)}
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
