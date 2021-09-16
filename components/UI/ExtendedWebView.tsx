import { useNavigationState } from "@react-navigation/native";
import * as Linking from "expo-linking";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { SERVER_URL } from "../../constants";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as RootNavigation from "../../navigation/RootNavigation";
import * as authActions from "../../store/actions/auth";
import * as CommonActions from "../../store/actions/common";
import { setAlert, setIsLoading } from "../../store/actions/common";
import { CHANGE_SHOP } from "../../store/actions/actionTypes";

export const ExtendedWebView = (props) => {
  const dispatch = useAppDispatch();
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  const userStore = useAppSelector((state) => state.auth.userStore);
  const [isLoaded, setIsLoaded] = useState(false);
  const pushToken = useAppSelector((state) => state.auth.pushToken);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const index = useNavigationState((state) => state.index);
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const alert = useAppSelector((state) => state.common.alert);
  const backButtonEnabled = useRef(false);
  const webref = useRef();
  const onMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    parseMethod(message);
  };

  // console.log(webref.current);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (backButtonEnabled.current) {
          webref.current.goBack();
          return true;
        }
      }
    );
    return () => {
      backHandler.remove();
    };
  }, []);
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
    backButtonEnabled.current = e.canGoBack;
    if (props.onNavigationStateChange) {
      props.onNavigationStateChange();
    }
    // if (Platform.OS === "ios") return interceptStateChange(e);
  };
  const interceptStateChange = (e) => {
    if (e.url.startsWith("about")) return true;

    if (e.url.startsWith("native://")) {
      // allow normal the navigation
      const message = JSON.parse(
        decodeURIComponent(e.url.replace("native://", ""))
      );
      parseMethod(message);
      // return false to prevent webview navigate to the location of e.url
      return false;
    } else if (!e.url.startsWith("http") || !e.url.startsWith("https")) {
      let param = encodeURIComponent(e.url);
      Linking.openURL(`${SERVER_URL}/web/about/redirectURL.do?url=` + param);
      return false;
    }
    return true;
  };
  const parseMethod = async (message) => {
    switch (message.method) {
      case "openURL":
        Linking.openURL(message.value);
        break;
      case "alert":
        dispatch(
          setAlert({
            message: message.value,
            onPressConfirm: () => {
              dispatch(setAlert(null));
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
          query.user_cd = userInfo?.user_cd;
          query.recommend = userInfo?.recommend;
        }
        if (!_.isEmpty(userStore)) {
          query.store_cd = userStore?.storeInfo?.store_cd;
        }
        dispatch(authActions.loginWithUserCd(query)).then(async (data) => {
          if (data.userInfo) {
            await dispatch({ type: CHANGE_SHOP });
            await authActions.saveUserData(dispatch, data);
            if (isLoading) await dispatch(setIsLoading(false));
            if (!_.isEmpty(alert)) await dispatch(setAlert(null));
            await dispatch(CommonActions.setDidTryStorePopup(false));
            await finish();
          }
        });
        // message.value
        break;
      case "searchId":
        if (!message.value.intg_id) {
          dispatch(
            setAlert({
              message: "통합회원 가입정보가 없습니다.",
              onPressConfirm: () => {
                dispatch(setAlert(null));
              },
            })
          );
          finish();
          return;
        }
        RootNavigation.replace("FindIDResult", {
          intg_id: message.value.intg_id,
          reg_date: message.value.reg_date,
          user_cd: message.value.user_cd,
        });
        break;
      case "close":
        finish();
        break;
    }
  };

  const hasAlreadyRegistered = (user_cd) => {
    // show alert when user_cd is ""
    if (user_cd === "") {
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
        // renderError={(error) => console.log("Webview error:" + error)}
        onError={(syntheticEvent) => {
          // const { nativeEvent } = syntheticEvent;
          // console.log("WebView error: ", nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          // const { nativeEvent } = syntheticEvent;
          // console.log(
          //   "WebView received error status code: ",
          //   nativeEvent.statusCode
          // );
        }}
        renderLoading={() => {
          return (
            <ActivityIndicator
              size={props.indicatorSize ? props.indicatorSize : "large"}
              color={colors.CERULEAN}
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
