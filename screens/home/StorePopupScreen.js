import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
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
  ScaledImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import colors from "@constants/colors";
import { useDispatch, useSelector } from "react-redux";
import * as CommonActions from "@actions/common";

const StorePopupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  //   if (
  //     !props.homeBanner ||
  //     !props.homeBanner.bannerList ||
  //     props.homeBanner.bannerCnt == 0
  //   )
  //     return <></>;
  return (
    <>
      <BaseScreen isPadding={false} isBottomNavigation={false}>
        <Container>
          <ScaledImage
            source={require("@images/popup.png")}
            width={screenWidth}
          />
        </Container>
      </BaseScreen>
      <BtnContainer>
        <BtnWarpper style={{ borderRightWidth: 0 }}>
          <BtnText>1일동안 보지 않기</BtnText>
        </BtnWarpper>
        <BtnWarpper onPress={() => props.navigation.navigate("Home")}>
          <BtnText>닫기</BtnText>
        </BtnWarpper>
      </BtnContainer>
    </>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "1",
    cardStyle: {
      marginBottom: 0,
    },
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  };
};
const BtnContainer = styled.View({ flexDirection: "row" });
const BtnText = styled.Text({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
});
const BtnWarpper = styled(TouchableOpacity)({
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  width: "50%",
  padding: 13,
});
const PopupImage = styled(BaseImage)({
  width: "100%",
  height: "100%",
});
const Container = styled.View({
  width: "100%",
  height: "100%",
});

export default StorePopupScreen;
