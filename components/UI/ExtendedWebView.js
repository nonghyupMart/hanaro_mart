import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";

export const ExtendedWebView = (props) => {
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  return (
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
      // onShouldStartLoadWithRequest={(request) => {
      //   // console.warn(request.url);
      //   // If we're loading the current URI, allow it to load
      //   if (request.url === currentURI) return true;
      //   // We're loading a new URL -- change state first
      //   setURI(request.url);
      //   return false;
      // }}
      startInLoadingState={false}
    />
  );
};
