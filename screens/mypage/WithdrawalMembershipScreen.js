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
import { setAlert } from "@actions/common";

const WithdrawalMembershipScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(
      setAlert({
        message: `회원탈퇴 유의사항을\n모두 확인하였으며,\n회원탈퇴에 동의합니다.`,
        onPressConfirm: () => {
          dispatch(authActions.withdrawal(userInfo.user_cd)).then((data) => {
            if (data.result == "success") {
              dispatch(
                setAlert({
                  message: "탈퇴 되었습니다.",
                  onPressConfirm: () => {
                    navigation.navigate("Home");
                    setTimeout(() => {
                      dispatch(setAlert(null));
                      dispatch(authActions.withdrawalFinish());
                    }, 0);
                  },
                })
              );
            }
          });
        },
        onPressCancel: () => {
          dispatch(setAlert(null));
        },
      })
    );
  };
  return (
    <BaseScreen
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
          <Text1>{` [탈퇴 유의사항]
 
 쿠폰, 스탬프 소멸
· 회원탈퇴 시 보유하고 계신 쿠폰, 스탬프가 소멸되며 복원되지 않습니다.
 
 개인정보 파기
· 회원탈퇴 시 유예기간(15일) 경과 후 이용내역은 모두 삭제처리 되며, 삭제 후 복원하여 사용할 수 없습니다.  단, 법령에 특별한 규정이 있는 경우에는 관련 법령에 따라 보유 및 이용합니다.(자세한 내용은 개인정보처리방침을 참조하시기 바랍니다.)\n`}</Text1>
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
