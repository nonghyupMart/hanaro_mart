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
  BaseText,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
const HomeBanner = (props) => {
  return (
    <>
      {props.homeBanner ? (
        <Carousel
          delay={2000}
          style={{ flex: 1, height: screenWidth * 0.608, width: "100%" }}
          autoplay
          pageInfo
        >
          {props.homeBanner.bannerList ? (
            props.homeBanner.bannerList.map((item, index) => {
              return (
                <View style={{ flex: 1 }}>
                  <BaseImage
                    style={{
                      flex: 1,
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
                flex: 1,
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
          style={{ flex: 1, height: screenWidth * 0.608, width: screenWidth }}
          source={require("@images/m_img499.png")}
          resizeMode="cover"
        />
      )}
    </>
  );
};

export default HomeBanner;
