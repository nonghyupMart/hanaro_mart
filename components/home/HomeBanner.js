import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Carousel from "react-native-looped-carousel";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
import colors from "@constants/colors";
import * as Linking from "expo-linking";
import * as homeActions from "@actions/home";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const HomeBanner = (props) => {
   const dispatch = useDispatch();
  const homeBanner = useSelector((state) => state.home.homeBanner);
  useEffect(() => {
    
    props.setFetchHomeBanner(false);
    const fetchHomeBanner = dispatch(homeActions.fetchHomeBanner());
    Promise.all([fetchHomeBanner]).then(
      (result) => {
        props.setFetchHomeBanner(true);
      }
    );

  }, [dispatch]);
  if (
    !homeBanner ||
    !homeBanner.bannerList ||
    homeBanner.bannerCnt == 0
  )
    return <></>;
  return (
    <>
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
        {homeBanner.bannerList.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.display_cd}
              onPress={() => {
                // console.warn(item.link_url);
                if (item.link_url != "") Linking.openURL(item.link_url);
              }}
            >
              <BannerItem item={item} />
            </TouchableOpacity>
          );
        })}
      </Carousel>
    </>
  );
};
const BannerItem = (props) => {
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
        source={props.item.display_img}
      />
    </View>
  );
};

export default HomeBanner;
