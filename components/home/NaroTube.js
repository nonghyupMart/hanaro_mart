import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AppState,
} from "react-native";
import Carousel from "../../components/UI/Carousel";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  SCREEN_WIDTH,
  BaseText,
} from "../../components/UI/BaseUI";
import URI from "urijs";
import * as homeActions from "../../store/actions/home";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setAlert, setIsLoading } from "../../store/actions/common";

const NaroTube = (props) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const dispatch = useDispatch();
  const [key, setKey] = useState();
  const homeNaro = useSelector((state) => state.home.homeNaro);
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };
  useEffect(() => {
    setKey("_" + Math.random().toString(36).substr(2, 9));
  }, [props.isFocused, appState]);
  useLayoutEffect(() => {
    const fetchHomeNaro = dispatch(homeActions.fetchHomeNaro());
    Promise.all([fetchHomeNaro]).then((result) => {
      dispatch(setIsLoading(false));
    });
  }, [props.isFocused]);
  if (!homeNaro || !homeNaro.naroList || homeNaro.naroCnt == 0) return <></>;
  return (
    <>
      <NaroTubeContainer>
        {/* <Carousel
          delay={3000}
          style={{ height: SCREEN_WIDTH * 0.555, width: "100%" }}
          autoplay={false}
          pageInfo={true}
          bullets={false}
          pageInfoBottomContainerStyle={{
            left: null,
            right: 18,
            bottom: 13,
            width: 50,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            borderRadius: 20,
            paddingTop: 2,
            paddingBottom: 2,
          }}
          pageInfoBackgroundColor={"transparent"}
          pageInfoTextStyle={{ color: colors.trueWhite, fontSize: 14 }}
          pageInfoTextSeparator="/"
        > */}
        {homeNaro.naroList.map((item, index) => {
          const url = URI(item.video_dir);
          let videoId = url.query(true).v;
          if (videoId == undefined || videoId == "") {
            videoId = url.filename();
          }

          return (
            <ExtendedWebView
              startInLoadingState={true}
              bounces={false}
              key={`${key}${item.naro_cd}`}
              style={{
                height: SCREEN_WIDTH * 0.555,
                opacity: 0.99,
                width: SCREEN_WIDTH - 10,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
              }}
              source={{
                html: require("../../youtubePlayer.js")(videoId),
              }}
              indicatorSize="small"
            />
          );
        })}
        {/* </Carousel> */}
      </NaroTubeContainer>
    </>
  );
};

const MoreText = styled(BaseText)({
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishThree,
  marginRight: 8,
});
const NaroMore = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
});
const NaroTitContainer = styled.View({
  flexDirection: "row",
  marginLeft: 16,
  marginRight: 16,
  marginTop: 11,
  marginBottom: 11,
  justifyContent: "space-between",
  alignItems: "center",
});
const NaroTubeTitle = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const NaroTubeContainer = styled.View({
  // marginTop: 10,
  backgroundColor: colors.trueWhite,
  width: "100%",
  // height: SCREEN_WIDTH * 0.555,
});
export default NaroTube;
