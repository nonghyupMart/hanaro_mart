import React from "react";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import _ from "lodash";
import * as RootNavigation from "../navigation/RootNavigation";
import { Icon } from "react-native-elements";
import { BaseText } from "./UI/BaseUI";

const BottomButtons = (props) => {
  const isJoin = useSelector((state) => state.auth.isJoin);
  const userStore = useSelector((state) => state.auth.userStore);
  const isBottomNavigation = useSelector(
    (state) => state.common.isBottomNavigation
  );
  if (isBottomNavigation)
    return (
      <Container>
        <ButtonContainer
          onPress={() => {
            RootNavigation.navigate("Home");
          }}
        >
          <Image source={require("../assets/images/home_icon.png")} />
          <IconText>홈</IconText>
        </ButtonContainer>
        <ButtonContainer
          onPress={() => {
            if (_.isEmpty(userStore) || !isJoin)
              return RootNavigation.navigate("Empty");
            RootNavigation.navigate("MyCoupon");
          }}
        >
          <Image source={require("../assets/images/coupon_icon.png")} />
          <IconText>나의 쿠폰</IconText>
        </ButtonContainer>
        <TouchableOpacity
          style={[styles.icons, { marginTop: 0, marginBottom: 0 }]}
          onPress={() => {
            RootNavigation.navigate("RingPicker");
          }}
        >
          <Image source={require("../assets/images/HANA_icon.png")} />
        </TouchableOpacity>
        <ButtonContainer
          onPress={() => {
            if (_.isEmpty(userStore) || !isJoin)
              return RootNavigation.navigate("Empty");
            RootNavigation.navigate("MyPage");
          }}
        >
          <Image source={require("../assets/images/mypage_icon.png")} />
          <IconText>마이페이지</IconText>
        </ButtonContainer>
        <ButtonContainer
          onPress={() => {
            if (_.isEmpty(userStore)) return RootNavigation.navigate("Empty");
            Linking.openURL("tel:" + userStore.storeInfo.support_tel);
          }}
        >
          <Image source={require("../assets/images/call_icon.png")} />
          <IconText>매장전화</IconText>
        </ButtonContainer>
      </Container>
    );
  else return <></>;
};

const ButtonContainer = styled.TouchableOpacity({
  backgroundColor: colors.trueWhite,
  height: 50,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 0,
});

const IconText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const Container = styled.View({
  height: 50,
  backgroundColor: colors.trueWhite,
  flexDirection: "row",
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  // justifyContent: "center",
  alignItems: "center",
  elevation: 10,

  // for IOS
  zIndex: 10,
  shadowColor: colors.black16,
  shadowRadius: 6,
  shadowOpacity: 0.5,
});
const styles = StyleSheet.create({
  icons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    position: "relative",
    top: -5,
  },
  center: {
    flex: 1,
  },

  ringIcons: {
    color: "green",
    backgroundColor: "green",
  },
});

export default BottomButtons;
