import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import Alert from "@UI/Alert";
export const ExtendedWebView = (props) => {
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  const [alert, setAlert] = useState();
  const onMessage = (event) => {
    // console.log(obj.nativeEvent.data);
    const message = JSON.parse(event.nativeEvent.data);
    console.log(message);
    switch (message.method) {
      case "openURL":
        return Linking.openURL(message.url);
      case "alert":
        setAlert({
          message: message.message,
          onPressConfirm: () => {
            setAlert(null);
          },
        });
        return;
    }
  };
  const onNavigationStateChange = (newNavState) => {
    // console.warn(newNavState);
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
        onNavigationStateChange={onNavigationStateChange}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </>
  );
};
