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
import { setAlert, setIsLoading } from "../../store/actions/common";
import * as Notifications from "expo-notifications";
import JoinPopupContent from "../../screens/join/JoinPopupContent";

export const ExtendedWebView = (props) => {
  const dispatch = useDispatch();
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  const userStore = useSelector((state) => state.auth.userStore);
  const [isLoaded, setIsLoaded] = useState(false);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const index = useNavigationState((state) => state.index);
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
        dispatch(setIsLoading(true));
        let query = {
          user_sex: message.value.sex,
          user_id: message.value.tel,
          user_name: message.value.name,
          os: Platform.OS === "ios" ? "I" : "A",
          di: message.value.di,
          ci: message.value.ci,
        };

        if (pushToken) query.token = pushToken;
        if (_.isEmpty(userInfo) && !_.isEmpty(agreedStatus)) {
          // Only when the first signup
          query.marketing_agree = agreedStatus[3].isChecked ? "Y" : "N";
          if (agreedStatus[3].isChecked)
            query.user_age = message.value.birthday;
        }
        if (!_.isEmpty(userInfo)) {
          query.user_cd = userInfo.user_cd;
          query.recommend = userInfo.recommend;
        }
        const user_id = await authActions.saveUserTelToStorage();
        if (query.user_id != user_id) {
          delete query.user_cd;
        }
        if (!_.isEmpty(userStore)) {
          query.store_cd = userStore.storeInfo.store_cd;
        }
        requestSignup(query, dispatch, agreedStatus).then(() => {
          if (!_.isEmpty(userInfo)) {
            dispatch(CommonActions.setBottomNavigation(true));
            if (index > 0) RootNavigation.pop();
            else RootNavigation.navigate("Home");
          }
          dispatch(setIsLoading(false));
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

export const requestSignup = async (query, dispatch, agreedStatus) => {
  query.token = `${query.token}`.trim();
  if (!query.token || query.token == "") {
    query.token = (await Notifications.getExpoPushTokenAsync()).data;
  }
  query.token = `${query.token}`.trim();
  if (!query.token || query.token == "") {
    return new Promise((resolve, reject) => {
      dispatch(
        setAlert({
          message:
            "서버통신지연으로 인하여 잠시 후 다시 실행해주시기 바랍니다.",
          onPressConfirm: async () => {
            await dispatch(setIsLoading(false));
            await dispatch(setAlert(null));
            reject(false);
          },
        })
      );
    });
  }
  return dispatch(authActions.signup(query)).then(async (data) => {
    const userInfo = data.userInfo;
    if (!_.isEmpty(userInfo)) {
      await authActions.saveUserTelToStorage(query.user_id);
      if (userInfo.store_cd) {
        await dispatch(setIsLoading(false));

        let obj;
        if (!_.isEmpty(data.storeInfo)) {
          obj = { storeInfo: data.storeInfo, menuList: data.menuList };
        }
        dispatch(authActions.saveUserStore(obj));
        authActions.saveUserStoreToStorage(obj);
        dispatch(
          setAlert({
            content: <JoinPopupContent />,
            onPressConfirm: async () => {
              await dispatch(setAlert(null));
              await dispatch(CommonActions.setDidTryPopup(false));
              dispatch(authActions.setIsJoin(true));
            },
          })
        );
      } else {
        await dispatch(setIsLoading(false));
        dispatch(
          setAlert({
            content: <JoinPopupContent />,
            onPressConfirm: async () => {
              await dispatch(setAlert(null));
              await dispatch(CommonActions.setDidTryPopup(false));
              dispatch(authActions.setIsJoin(true));
            },
          })
        );
      }
    }
  });
};
