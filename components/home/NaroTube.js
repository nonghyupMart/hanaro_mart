import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ExtendedWebView } from "@UI/ExtendedWebView";
import {
  StyleConstants,
  BaseText,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
const NaroTube = (props) => {
  return (
    <>
      <NaroTubeContainer>
        <NaroTitContainer>
          <NaroTubeTitle>모든것을 나로와 함께</NaroTubeTitle>
          <NaroMore>
            <MoreText>전체보기</MoreText>
            <Image source={require("@images/next2222.png")} />
          </NaroMore>
        </NaroTitContainer>
        <ExtendedWebView
          style={{
            flex: 1,
            height: screenWidth * 0.555,
            opacity: 0.99,
            width: screenWidth - 10,
            marginLeft: 5,
            marginRight: 5,
          }}
          source={{
            html: require("../../youtubePlayer.js")(props.videoId),
          }}
        />
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
  flex: 1,
});
export default NaroTube;
