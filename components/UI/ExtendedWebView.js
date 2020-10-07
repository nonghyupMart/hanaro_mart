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

  const onMessage = (event) => {
    // console.log(obj.nativeEvent.data);
    const message = JSON.parse(event.nativeEvent.data);
    console.log(message);
    switch (message.method) {
      case "openURL":
        return Linking.openURL(message.value);
      case "alert":
        setAlert({
          message: message.value,
          onPressConfirm: () => {
            setAlert(null);
          },
        });
        return;
      case "auth":
        console.warn(message.value);

        let query = {
          user_sex: message.value.sex,
          user_id: message.value.tel,
          user_name: message.value.name,
          token: pushToken,
          os: Platform.OS === "ios" ? "I" : "A",
        };
        signup(query, dispatch, setAlert, agreedStatus);

        // message.value
        return;
      case "close":
        dispatch(CommonActions.setBottomNavigation(true));
        RootNavigation.pop();
        return;
    }
  };

  const onNavigationStateChange = (newNavState) => {
    // console.warn(newNavState);
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
        onMessage={(event) => onMessage(event)}
        renderError={(error) => console.warn("Webview error:" + error)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn(
            "WebView received error status code: ",
            nativeEvent.statusCode
          );
        }}
        // onShouldStartLoadWithRequest={(request) => {
        //   // console.warn(request.url);
        //   // If we're loading the current URI, allow it to load
        //   if (request.url === currentURI) return true;
        //   // We're loading a new URL -- change state first
        //   setURI(request.url);
        //   return false;
        // }}
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
        onNavigationStateChange={onNavigationStateChange}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </>
  );
};
