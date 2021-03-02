import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Carousel from "../../components/UI/Carousel";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import {
  StyleConstants,
  BaseImage,
  BaseTouchable,
  SCREEN_WIDTH,
} from "../../components/UI/BaseUI";
import colors from "../../constants/Colors";
import * as Linking from "expo-linking";
import * as homeActions from "../../store/actions/home";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setAlert, setIsLoading } from "../../store/actions/common";
import _ from "lodash";

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
    <RoundedContainer>
      <Carousel
        delay={3000}
        style={{
          height: (SCREEN_WIDTH - 48) * 0.608,
          width: SCREEN_WIDTH - 48,
          borderRadius: 10,
          overflow: "hidden",
        }}
        arrows={_.size(homeBanner.bannerList) <= 1 ? false : true}
        arrowLeft={
          <Image source={require("../../assets/images/left_button.png")} />
        }
        arrowRight={
          <Image source={require("../../assets/images/right_button.png")} />
        }
        arrowStyle={{
          paddingLeft: 5.5,
          paddingRight: 5.5,
        }}
        autoplay
        pageInfo={true}
        // bullets={true}
        pageInfoBottomContainerStyle={{
          left: null,
          right: 8.5,
          bottom: 5.5,
          width: 35,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 20,
          paddingTop: 2,
          paddingBottom: 2,
          height: 15,
          paddingTop: 0,
          paddingBottom: 4,
        }}
        pageInfoBackgroundColor={"transparent"}
        pageInfoTextStyle={{ color: colors.trueWhite, fontSize: 12 }}
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
                height: (SCREEN_WIDTH - 48) * 0.608,
                width: SCREEN_WIDTH - 48,
              }}
            >
              <BannerItem item={item} />
            </TouchableOpacity>
          );
        })}
      </Carousel>
    </RoundedContainer>
  );
};
const RoundedContainer = styled.View({
  flex: 1,
  width: "100%",
  paddingLeft: 24,
  paddingRight: 24,
  borderRadius: 10,
  overflow: "hidden",
  marginTop: 15,
});
const BannerItem = (props) => {
  return (
    <BaseImage
      style={{
        height: (SCREEN_WIDTH - 48) * 0.608,
        width: SCREEN_WIDTH - 48,
        borderRadius: 10,
        overflow: "hidden",
      }}
      source={props.item.display_img}
    />
  );
};

export default HomeBanner;
