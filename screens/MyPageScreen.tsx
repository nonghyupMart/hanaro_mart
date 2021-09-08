import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../components/BaseScreen";
import MemberInfo from "../components/myPage/MemberInfo";
import { BaseText, BaseTouchable } from "../components/UI/BaseUI";
import { BackButton, TextTitle } from "../components/UI/header";
import colors from "../constants/Colors";
import { useAppSelector } from "../hooks";
import { WhiteContainer } from "./snb/StoreChangeScreen";

const MyPageScreen = ({ navigation }) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  return (
    <BaseScreen
      isPadding={false}
      style={{
        backgroundColor: colors.TRUE_WHITE,
      }}
      contentStyle={{
        backgroundColor: colors.TRUE_WHITE,
      }}
    >
      <MemberInfo amnNo={userInfo?.amnNo} />
      <WhiteContainer>
        <BtnContainer onPress={() => navigation.navigate("MyInfo")}>
          <Icon source={require("../assets/images/tools.png")} />
          <BtnText>내정보확인</BtnText>
        </BtnContainer>
        <BtnContainer onPress={() => navigation.navigate("MyADAgreement")}>
          <Icon source={require("../assets/images/adicon.png")} />
          <BtnText>광고성 정보 수신동의</BtnText>
        </BtnContainer>
        <BtnContainer onPress={() => navigation.navigate("MyReviews")}>
          <Icon source={require("../assets/images/chat3.png")} />
          <BtnText>나의리뷰</BtnText>
        </BtnContainer>
        {/* <BtnContainer onPress={() => navigation.navigate("MyOrder")}>
          <Icon source={require("../assets/images/calculator.png")} />
          <BtnText>상품주문내역</BtnText>
        </BtnContainer> */}
        <BtnContainer onPress={() => navigation.navigate("MyEvent")}>
          <Icon source={require("../assets/images/barcode.png")} />
          <BtnText>이벤트 응모내역</BtnText>
        </BtnContainer>
        <BtnContainer onPress={() => navigation.navigate("Inquiry")}>
          <Icon source={require("../assets/images/clipboard.png")} />
          <BtnText>나의 문의내역</BtnText>
        </BtnContainer>
        <BtnContainer
          style={{ borderBottomWidth: 0 }}
          onPress={() =>
            !!userInfo?.amnNo
              ? navigation.navigate("NHAHM", { regiDesc: "04" })
              : navigation.navigate("Withdrawal")
          }
        >
          <Icon source={require("../assets/images/unlocked2.png")} />
          <BtnText>회원탈퇴</BtnText>
        </BtnContainer>
        <BlackBox>
          <Image source={require("../assets/images/cogs.png")} />
          <Buttons>
            <GrayBtn onPress={() => navigation.navigate("Terms")}>
              <GrayText>이용약관</GrayText>
            </GrayBtn>
            <GrayBtn onPress={() => navigation.navigate("Privacy")}>
              <GrayText>개인정보처리방침</GrayText>
            </GrayBtn>
          </Buttons>
        </BlackBox>
      </WhiteContainer>
    </BaseScreen>
  );
};
const GrayText = styled(BaseText)({
  fontSize: 12,
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.BLACK,
  overflow: "hidden",
  width: "auto",
});
const GrayBtn = styled(BaseTouchable)({
  borderRadius: 13,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 3,
  paddingBottom: 3,
  width: "auto",
  margin: 5,
});
const Buttons = styled.View({ width: "auto" });
const BlackBox = styled.View({
  backgroundColor: colors.BLACK,
  flex: 1,
  flexDirection: "row",
  width: "100%",
  marginTop: 30,
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: 10,
  paddingLeft: 10,
});
const Icon = styled.Image.attrs({
  resizeMode: "contain",
})({
  width: 21,
});
const BtnText = styled(BaseText)({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
  marginLeft: 25,
});
const BtnContainer = styled.TouchableOpacity({
  borderBottomWidth: 1,
  borderColor: colors.WHITE,
  marginLeft: "14.44%",
  marginRight: "14.44%",
  flexDirection: "row",
  paddingTop: 15.5,
  paddingBottom: 15.5,
  paddingLeft: "13.88%",
  alignItems: "center",
});

export const screenOptions = ({ navigation }) => {
  return {
    title: "마이페이지",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default MyPageScreen;
