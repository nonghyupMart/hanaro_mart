import * as Linking from "expo-linking";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks";
import * as RootNavigation from "../navigation/RootNavigation";
import { checkAuth, checkSetStore } from "../store/actions/auth";
import * as Util from "../utils";
import { BaseText, SCREEN_WIDTH } from "./UI/BaseUI";

const BottomButtons = () => {
  const dispatch = useAppDispatch();
  const isJoined = useAppSelector((state) => state.auth.isJoined);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const isBottomNavigation = useAppSelector(
    (state) => state.common.isBottomNavigation
  );
  if (isBottomNavigation)
    return (
      <ExtraContainer>
        <Container>
          <ButtonContainer
            onPress={() => RootNavigation.navigate("StoreChange")}
          >
            <Image source={require("../assets/images/g23.png")} />
            <IconText>매장설정</IconText>
          </ButtonContainer>
          <ButtonContainer
            onPress={async () => {
              if (await checkAuth(dispatch, isJoined)) {
                RootNavigation.navigate("MyCoupon");
              }
            }}
          >
            <Image source={require("../assets/images/coupon_icon.png")} />
            <IconText>나의 쿠폰</IconText>
          </ButtonContainer>

          <Image
            source={require("../assets/images/HANA_icon.png")}
            style={{ opacity: 0 }}
          />

          <ButtonContainer
            onPress={async () => {
              if (await checkAuth(dispatch, isJoined)) {
                RootNavigation.navigate("MyPage");
              }
            }}
          >
            <Image source={require("../assets/images/mypage_icon.png")} />
            <IconText>마이페이지</IconText>
          </ButtonContainer>
          <ButtonContainer
            onPress={async () => {
              if (await checkSetStore(dispatch, userStore)) {
                Linking.openURL("tel:" + userStore?.storeInfo?.support_tel);
              }
            }}
          >
            <Image source={require("../assets/images/call_icon.png")} />
            <IconText>매장전화</IconText>
          </ButtonContainer>
        </Container>
        <TouchableOpacity
          style={[
            styles.icons,
            {
              marginTop: 0,
              marginBottom: 0,
              zIndex: 110,
              elevation: 110,
              position: "absolute",
              width: Util.normalize(47),
              height: Util.normalize(47),
              left: SCREEN_WIDTH / 2 - Util.normalize(23.5),
            },
          ]}
          onPress={() => RootNavigation.navigate("Home")}
        >
          <Image
            source={require("../assets/images/HANA_icon.png")}
            style={{ width: Util.normalize(47), height: Util.normalize(47) }}
          />
        </TouchableOpacity>
      </ExtraContainer>
    );
  else return <></>;
};

const ButtonContainer = styled.TouchableOpacity({
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
  color: colors.GREYISH_BROWN,
});
const ExtraContainer = styled.View({
  height: 60,
  alignItems: "flex-end",
  flexDirection: "row",
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
});
const Container = styled.View({
  height: 50,
  backgroundColor: colors.TRUE_WHITE,
  flexDirection: "row",
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  // justifyContent: "center",
  alignItems: "flex-end",
  elevation: 10,

  // for IOS
  zIndex: 10,
  shadowColor: colors.BLACK16,
  shadowRadius: 6,
  shadowOpacity: 0.5,
  overflow: "visible",
});
const styles = StyleSheet.create({
  icons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    position: "relative",
    top: 0,
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
