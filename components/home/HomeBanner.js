import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Carousel from "react-native-looped-carousel";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
import colors from "@constants/colors";
const HomeBanner = (props) => {
  if (
    !props.homeBanner ||
    !props.homeBanner.bannerList ||
    props.homeBanner.bannerCnt == 0
  )
    return <></>;
  return (
    <>
      {props.homeBanner ? (
        <Carousel
          delay={3000}
          style={{ height: screenWidth * 0.608, width: "100%" }}
          autoplay
          pageInfo={true}
          // bullets={true}
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
          {props.homeBanner.bannerList ? (
            props.homeBanner.bannerList.map((item, index) => {
              return (
                <View style={{ flex: 1 }}>
                  <BaseImage
                    style={{
                      height: screenWidth * 0.608,
                      width: screenWidth,
                    }}
                    defaultSource={require("@images/m_img499.png")}
                    resizeMode="cover"
                    // loadingIndicatorSource={require("@images/m_img499.png")}
                    source={item.display_img}
                  />
                </View>
              );
            })
          ) : (
            <BaseImage
              style={{
                height: screenWidth * 0.608,
                width: screenWidth,
              }}
              source={require("@images/m_img499.png")}
              resizeMode="cover"
            />
          )}
        </Carousel>
      ) : (
        <BaseImage
          style={{ height: screenWidth * 0.608, width: screenWidth }}
          source={require("@images/m_img499.png")}
          resizeMode="cover"
        />
      )}
    </>
  );
};

export default HomeBanner;
