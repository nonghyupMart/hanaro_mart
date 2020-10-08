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

export const ExtendedWebView = (props) => {
  const dispatch = useDispatch();
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  const [alert, setAlert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const onMessage = (event) => {};

  const onShouldStartLoadWithRequest = (e) => {

    // allow normal the natvigation
    if (!e.url.startsWith("native://")) return true;
    const message = JSON.parse(e.url.replace("native://", ""));

    switch (message.method) {
      case "openURL":
        Linking.openURL(message.value);
        break;
      case "alert":
        setAlert({
          message: message.value,
          onPressConfirm: () => {
            setAlert(null);
          },
        });
        break;
      case "auth":


        let query = {
          user_sex: message.value.sex,
          user_id: message.value.tel,
          user_name: message.value.name,
          token: pushToken,
          os: Platform.OS === "ios" ? "I" : "A",
        };
        signup(query, dispatch, setAlert, agreedStatus);

        // message.value
        break;
      case "close":
        dispatch(CommonActions.setBottomNavigation(true));
        const canGoBack =
          props.commandType === "Push" || props.commandType === "ShowModal";
        if (canGoBack) RootNavigation.pop();
        else RootNavigation.navigate("Home");
        break;
    }
    // return false to prevent webview navitate to the location of e.url
    return false;
  };
  const hideSpinner = () => {
    setIsLoaded(true);
  };
  return (
    <>
      {alert && (
        <Alert
          isVisible={alert.content || alert.message ? true : false}
          message={alert.message}
          onPressConfirm={alert.onPressConfirm}
          onPressCancel={alert.onPressCancel}
          cancelText={alert.cancelText}
          confirmText={alert.confirmText}
          content={alert.content}
        />
      )}

      <WebView
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
              size="large"
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
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </>
  );
};
