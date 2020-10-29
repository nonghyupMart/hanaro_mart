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
  ScaledImage,
  screenWidth,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import { StoreBox, BottomCover } from "@components/store/InfoBox";
import { WhiteContainer } from "@screens/snb/StoreChangeScreen";
import MemberInfo from "@components/myPage/MemberInfo";
import * as authActions from "@actions/auth";
import { setAlert, setIsLoading } from "@actions/common";

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
                  onPressConfirm: async () => {
                    await dispatch(authActions.setUserInfo(null));
                    navigation.navigate("Home");
                    setTimeout(() => {
                      dispatch(setAlert(null));
                      dispatch(authActions.withdrawalFinish());
                      dispatch(setIsLoading(false));
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
      <WhiteContainer style={{ padding: 23, paddingTop: 12, flex: 1 }}>
        <ScaledImage
          source={require("@images/mem_out.png")}
          width={screenWidth - 48}
        />

        <GreenButton onPress={onPress} style={{ marginTop: 60 }}>
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
