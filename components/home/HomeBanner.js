import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Carousel from "../../components/UI/Carousel";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  screenWidth,
} from "../../components/UI/BaseUI";
import colors from "../../constants/colors";
import * as Linking from "expo-linking";
import * as homeActions from "../../store/actions/home";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setAlert, setIsLoading } from "../../store/actions/common";

const HomeBanner = (props) => {
  const dispatch = useDispatch();
  const homeBanner = useSelector((state) => state.home.homeBanner);
  useEffect(() => {
    if (!props.isFocused) return;
    dispatch(setIsLoading(true));
    const fetchHomeBanner = dispatch(homeActions.fetchHomeBanner());
    Promise.all([fetchHomeBanner]).then((result) => {
      dispatch(setIsLoading(false));
    });
  }, [props.isFocused]);
  if (!homeBanner || !homeBanner.bannerList || homeBanner.bannerCnt == 0)
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
                if (item.link_url != "") Linking.openURL(item.link_url);
              }}
              style={{
                height: screenWidth * 0.608,
                width: screenWidth,
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
    <BaseImage
      style={{
        height: screenWidth * 0.608,
        width: screenWidth,
      }}
      defaultSource={require("../../assets/images/m_img499.png")}
      resizeMode="cover"
      // loadingIndicatorSource={require("../../assets/images/m_img499.png")}
      source={props.item.display_img}
    />
  );
};

export default HomeBanner;
