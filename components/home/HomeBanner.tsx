import { useIsFocused } from "@react-navigation/native";
import * as Linking from "expo-linking";
import _ from "lodash";
import React, { useEffect } from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as RootNavigation from "../../navigation/RootNavigation";
import * as CommonActions from "../../store/actions/common";
import { setAlert } from "../../store/actions/common";
import * as homeActions from "../../store/actions/home";
import { BaseImage, SCREEN_WIDTH } from "../UI/BaseUI";
import Carousel from "../UI/Carousel";

const HomeBanner = (props: any) => {
  const dispatch = useAppDispatch();
  const homeBanner = useAppSelector((state) => state.home.homeBanner);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    dispatch(homeActions.fetchHomeBanner());
  }, [isFocused]);

  const onPressMembershipBanner = () => {
    if (!!userInfo?.amnNo) {
      dispatch(
        setAlert({
          message: "이미 통합회원 가입하셨습니다.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
      return;
    }
    RootNavigation.navigate("NHAHM", {
      regiDesc: "01",
    });
  };
  if (!homeBanner?.bannerList) return <></>;

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
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderRadius: 20,
          height: 15,
          paddingTop: 0,
          paddingBottom: 4,
        }}
        pageInfoBackgroundColor={"transparent"}
        pageInfoTextStyle={{ color: colors.TRUE_WHITE, fontSize: 12 }}
        pageInfoTextSeparator="/"
      >
        <MembershipBanner
          dispatch={dispatch}
          key="membershipBanner"
          onPress={onPressMembershipBanner}
        />
        {homeBanner.bannerList.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.display_cd}
              onPress={() => {
                if (item.link_url) Linking.openURL(item.link_url);
                else if (item.link_gbn) {
                  dispatch(CommonActions.setDidTryStorePopup(item));
                }
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

const MembershipBanner = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{
        height: (SCREEN_WIDTH - 48) * 0.608,
        width: SCREEN_WIDTH - 48,
      }}
    >
      <BannerItem
        item={{
          display_img: require("../../assets/images/main_banner2.jpg"),
        }}
      />
    </TouchableOpacity>
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
        backgroundColor:
          Platform.OS === "android" ? colors.WHITE : "transparent",
      }}
      source={props.item.display_img}
      defaultSource={require("../../assets/images/m_img499.png")}
    />
  );
};

export default HomeBanner;
