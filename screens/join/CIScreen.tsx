import _ from "lodash";
import React, { useEffect, useRef } from "react";
import BaseScreen from "../../components/BaseScreen";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../components/UI/BaseUI";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import { BackButton, TextTitle } from "../../components/UI/header";
import { SERVER_URL } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as CommonActions from "../../store/actions/common";

const CIScreen = ({ navigation, route }: any) => {
  const params = route.params;
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const uriRef = useRef(
    `${SERVER_URL}/web/access/auth.do?ver=${
      params?.ver ? params.ver : "2"
    }&key=${new Date().getTime()}`
  );
  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      navigation.setOptions({
        title: "본인인증",
        contentStyle: {
          paddingBottom: 0,
        },
      });
    }
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);

  return (
    <BaseScreen isScroll={false} isPadding={false}>
      <ExtendedWebView
        recommend={params ? params.recommend : null}
        startInLoadingState={true}
        key={Math.random()}
        cacheMode="LOAD_NO_CACHE"
        style={{
          height: SCREEN_HEIGHT,
          opacity: 0.99,
          width: SCREEN_WIDTH,
        }}
        source={{
          uri: uriRef.current,
          // html: require("../ringPicker/index.js")(),
        }}
      />
    </BaseScreen>
  );
};
export const screenOptions = () => {
  return {
    title: "휴대폰 본인인증",

    headerLeft: (props: any) => <BackButton {...props} />,
    headerTitle: (props: any) => <TextTitle {...props} />,
    headerRight: () => <></>,
    contentStyle: {
      paddingBottom: 0,
    },
    // headerStyle: {
    //   backgroundColor: "#f4511e",
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontFamily:"Roboto-Bold",
    // },
  };
};

export default CIScreen;
