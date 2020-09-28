import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { ActivityIndicator } from "react-native";
import Alert from "@UI/Alert";
export const ExtendedWebView = (props) => {
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  const [alert, setAlert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
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
        // message.value
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
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        sharedCookiesEnabled={true}
        onMessage={(event) => onMessage(event)}
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
