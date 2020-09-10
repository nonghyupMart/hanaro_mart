import React from "react";
import styled from "styled-components/native";
import { Platform, Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch } from "react-redux";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BaseTouchable, screenWidth, BaseButtonContainer, BaseText } from "@UI/BaseUI";
import { setAgreePolicy } from "@actions/auth";

const MemberInfo = (props) => (
  <>
    <MemberInfoContainer>
      <MemberContainer>
        <Text1>회원번호</Text1>
        <MemberID style={{ flexDirection: "row" }}>
          <Image source={require("@images/user.png")} />
          <Text2>2582</Text2>
          <Text3>님</Text3>
        </MemberID>
        <Text4>010 2582 3552</Text4>
      </MemberContainer>
      <BaseTouchable onPress={() => props.navigation.closeDrawer()}>
        <Image source={require("@images/login.png")} />
      </BaseTouchable>
    </MemberInfoContainer>
    <GradientBar></GradientBar>
  </>
);
const GrayButtons = (props) => (
  <GrayContainer>
    <WhiteButtonContainer>
      <Image source={require("@images/shop1.png")} />
      <WButtonText>매장전용</WButtonText>
    </WhiteButtonContainer>
    <WhiteButtonContainer onPress={() => props.navigation.navigate("Event")}>
      <Image source={require("@images/pig.png")} />
      <WButtonText>이벤트</WButtonText>
    </WhiteButtonContainer>
    <WhiteButtonContainer onPress={() => props.navigation.navigate("Coupon")}>
      <Image source={require("@images/ticket2.png")} />
      <WButtonText>나로쿠폰</WButtonText>
    </WhiteButtonContainer>
    <WhiteButtonContainer onPress={() => props.navigation.navigate("Flyer")}>
      <Image source={require("@images/news.png")} />
      <WButtonText>행사전단</WButtonText>
    </WhiteButtonContainer>
    <WhiteButtonContainer onPress={() => props.navigation.navigate("NaroTube")}>
      <Image source={require("@images/pictures.png")} />
      <WButtonText>나로튜브</WButtonText>
    </WhiteButtonContainer>
    <WhiteButtonContainer
      onPress={() => props.navigation.navigate("Exhibition")}
    >
      <Image source={require("@images/medal2.png")} />
      <WButtonText>기획전</WButtonText>
    </WhiteButtonContainer>
  </GrayContainer>
);
const MenuList = (props) => (
  <MenuContainer>
    <MenuButtonContainer>
      <MenuButton
        onPress={() => {
          props.navigation.navigate("StoreChange");
        }}
      >
        <Icon>
          <Image source={require("@images/position.png")} />
        </Icon>
        <MenuText>매장변경</MenuText>
      </MenuButton>
    </MenuButtonContainer>
    <MenuButtonContainer>
      <MenuButton onPress={() => props.navigation.navigate("Notice")}>
        <Icon>
          <Image source={require("@images/loudspeaker-announce.png")} />
        </Icon>
        <MenuText>공지사항</MenuText>
      </MenuButton>
    </MenuButtonContainer>
    <MenuButtonContainer>
      <MenuButton onPress={() => props.navigation.navigate("Inquiry")}>
        <Icon>
          <Image source={require("@images/dialogue-balloon.png")} />
        </Icon>
        <MenuText>1:1 문의</MenuText>
      </MenuButton>
    </MenuButtonContainer>
    <MenuButtonContainer style={{ border: 0 }}>
      <MenuButton onPress={() => props.navigation.navigate("Notice")}>
        <Icon>
          <Image source={require("@images/messenger-user-avatar.png")} />
        </Icon>
        <MenuText>마이페이지</MenuText>
      </MenuButton>
    </MenuButtonContainer>
  </MenuContainer>
);

const LoginButtons = (props) => {
  const dispatch = useDispatch();
  const onPressJoin = () => {
    dispatch(setAgreePolicy(false));
  };
  return (
    <>
      <ButtonContainer>
        {/* <GreenButton>
          <ButtonText>로그인</ButtonText>
        </GreenButton> */}
        <BlueButton onPress={() => onPressJoin()}>
          <ButtonText>회원가입</ButtonText>
        </BlueButton>
      </ButtonContainer>
      <BlackContainer>
        <BlackButton>
          <BlackText>이용약관</BlackText>
        </BlackButton>
        <BlackBar> | </BlackBar>
        <BlackButton>
          <BlackText>개인정보처리방침</BlackText>
        </BlackButton>
      </BlackContainer>
    </>
  );
};
const CustomDrawerContent = (props, dispatch) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "100%" }}>
        <DrawerContentScrollView {...props}>
          <MemberInfo {...props} />
          <GrayButtons {...props} />
          <MenuList {...props} />
          <LoginButtons {...props} {...dispatch} />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

const BlackText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishThree,
});
const BlackBar = styled(BlackText)({});
const BlackButton = styled(BaseTouchable)({});
const BlackContainer = styled(View)({
  backgroundColor: colors.black,
  flexDirection: "row",
  paddingRight: 16,
  justifyContent: "flex-end",
  flex: 1,
  paddingTop: 13,
  alignSelf: "stretch",
  height: "100%",
  paddingBottom: 13,
  // position: "absolute",
  // bottom: 0,
  // left: 0,
  // right: 0,
  // height: 40,
});
const ButtonContainer = styled.View({
  flexDirection: "row",
  paddingTop: 70,
  justifyContent: "center",
  paddingBottom: 20,
  backgroundColor: colors.trueWhite,
});
const BaseButton = styled(BaseButtonContainer)({
  width: screenWidth * 0.333,
  maxWidth: 120,
  marginLeft: 3,
  marginRight: 3,
});
const GreenButton = styled(BaseButton)({
  backgroundColor: colors.pine,
});
const BlueButton = styled(BaseButtonContainer)({
  width: null,
  maxWidth: null,
  flex: 1,
  marginLeft: 16,
  marginRight: 16,
  backgroundColor: colors.cerulean,
});
const ButtonText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
});
const Text1 = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: "#b5b5b5",
});
const Text2 = styled(BaseText)({
  fontSize: 24,
  fontWeight: "normal",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
  marginLeft: 6,
  marginRight: 9,
});
const Text3 = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Text4 = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.pine,
});
const MemberInfoContainer = styled.View({
  backgroundColor: colors.trueWhite,
  paddingRight: 16,
  paddingLeft: 21,
  paddingBottom: 10,
  paddingTop: 5,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
const MemberContainer = styled.View({});
const GradientBar = styled(LinearGradient)({
  height: 6,
});
GradientBar.defaultProps = {
  colors: [colors.pine, colors.cerulean],
  start: { x: -1, y: 0 },
  end: { x: 1, y: 0 },
};

const GrayContainer = styled.View({
  backgroundColor: colors.white,
  justifyContent: "space-between",
  flexDirection: "row",
  flexWrap: "wrap",
  padding: 7,
});
const WhiteButtonContainer = styled(BaseTouchable)({
  height: 64,

  alignItems: "center",
  paddingLeft: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.whiteTwo,
  maxWidth: 133,
  width: screenWidth * 0.369,
  backgroundColor: colors.trueWhite,
  flexDirection: "row",
  marginTop: 3,
  marginBottom: 3,
});
const WButtonText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 11,
});
const MemberID = styled.View({
  alignItems: "center",
});
const MenuContainer = styled.View({
  paddingTop: 36,
  paddingLeft: 35.5,
  paddingRight: 35.5,
  backgroundColor: colors.trueWhite,
});
const MenuButtonContainer = styled.View({
  borderBottomWidth: 1,
  borderColor: colors.white,
  flexDirection: "row",
  alignItems: "center",
});
const MenuText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 20,
});
const MenuButton = styled(BaseTouchable)({
  flexDirection: "row",
  alignItems: "center",
  marginTop: 14,
  marginBottom: 14,
  flex: 1,
});
const Icon = styled.View({
  width: 20,
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    padding: 5,
  },
  image: {
    resizeMode: "contain",
    width: "80%",
    height: "100%",
  },
  contactUsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    paddingLeft: 15,
  },
  logoutContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  drawerText: {
    marginLeft: 16,
  },
  logoutText: {
    color: "#b23b3b",
  },
});

export default CustomDrawerContent;
