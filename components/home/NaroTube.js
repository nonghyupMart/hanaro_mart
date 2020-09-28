import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-looped-carousel";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
import URI from "urijs";
import * as homeActions from "@actions/home";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const NaroTube = (props) => {
   const dispatch = useDispatch();
   const homeNaro = useSelector((state) => state.home.homeNaro);
   useEffect(() => {
     props.setFetchHomeNaro(false);
     const fetchHomeNaro = dispatch(homeActions.fetchHomeNaro());
     Promise.all([fetchHomeNaro]).then((result) => {
       props.setFetchHomeNaro(true);
     });
   }, [dispatch]);
  if (
    !homeNaro ||
    !homeNaro.naroList ||
    homeNaro.naroCnt == 0
  )
    return <></>;
  return (
    <>
      <NaroTubeContainer>
        <Carousel
          delay={3000}
          style={{ height: screenWidth * 0.555, width: "100%" }}
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
        >
          {homeNaro.naroList.map((item, index) => {
            const url = URI(item.video_dir);
            let videoId = url.query(true).v;
            if (videoId == undefined || videoId == "") {
              videoId = url.filename();
            }

            return (
              <ExtendedWebView
                key={videoId}
                style={{
                  height: screenWidth * 0.555,
                  opacity: 0.99,
                  width: screenWidth - 10,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                }}
                source={{
                  html: require("../../youtubePlayer.js")(videoId),
                }}
              />
            );
          })}
        </Carousel>
      </NaroTubeContainer>
    </>
  );
};

const MoreText = styled.Text({
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
const NaroTubeTitle = styled.Text({
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
  height: screenWidth * 0.555,
});
export default NaroTube;
