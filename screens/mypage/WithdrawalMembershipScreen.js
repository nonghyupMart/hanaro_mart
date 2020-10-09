import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  BaseTouchable,
  BlueButton,
  BlueButtonText,
  BaseText,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import { StoreBox, BottomCover } from "@components/store/InfoBox";
import { WhiteContainer } from "@screens/snb/StoreChangeScreen";
import MemberInfo from "@components/myPage/MemberInfo";
import * as authActions from "@actions/auth";
const WithdrawalMembershipScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState();
  const onPress = () => {
    dispatch(authActions.withdrawal(userInfo.user_cd)).then(() => {
      navigation.navigate("Home");
      setAlert({
        message: "탈퇴 되었습니다.",
        onPressConfirm: () => {
          setAlert(null);
        },
      });
    });
  };
  return (
    <BaseScreen
      alert={alert}
      isPadding={false}
      style={{
        backgroundColor: colors.trueWhite,
      }}
      contentStyle={{
        backgroundColor: colors.trueWhite,
        marginBottom: 40,
      }}
    >
      <MemberInfo />
      <WhiteContainer>
        <BorderContainer>
          <Text1>{`탈퇴한 뒤에는 아이디 및 데이터를 복구할 수 없으니 신중히 진행해 주시기 바랍니다.\n\n내 포스타입, 포스트, 구매 항목, 포인트 충전·사용 내역, 수익 내역, 구독, 멤버십 가입 정보, 댓글, 좋아요 등 모든 기록이 재생할 수 없는 기술적 방법을 사용하여 완전히 파기됩니다. 환불 신청을 하지 않거나 환불이 처리되기 전에 탈퇴하면 환불이 불가능합니다.\n`}</Text1>
        </BorderContainer>

        <GreenButton onPress={onPress}>
          <BlueButtonText>회원탈퇴</BlueButtonText>
        </GreenButton>
      </WhiteContainer>
    </BaseScreen>
  );
};
const GreenButton = styled(BlueButton)({
  backgroundColor: colors.pine,
});
const Text1 = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#707070",
  margin: 14,
});
const BorderContainer = styled.View({
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  margin: 16,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "회원탈퇴",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default WithdrawalMembershipScreen;
