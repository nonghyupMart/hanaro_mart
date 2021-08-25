import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { View, Platform, Image } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import {
  BaseText,
  BlueButton,
  BlueButtonText,
} from "../../components/UI/BaseUI";
import { BackButton, TextTitle } from "../../components/UI/header";
import _ from "lodash";
import colors from "../../constants/Colors";

const FindIDResultScreen = (props) => {
  const params = props.route.params;
  const eventDetail = params.eventDetail;

  return (
    <BaseScreen
      style={{
        backgroundColor: colors.TRUE_WHITE,
      }}
      contentStyle={{
        backgroundColor: colors.TRUE_WHITE,
        paddingTop: 0,
      }}
    >
      <Text0>사용자 정보와 일치하는 아이디입니다.</Text0>
      <Box>
        <Text1>아이디 : {params.intg_id}</Text1>
        <Text1>가입일 : {params.reg_date}</Text1>
      </Box>
      <BackBtn onPress={() => props.navigation.pop()}>
        <BtnText>확인</BtnText>
      </BackBtn>
    </BaseScreen>
  );
};
const Box = styled.View({
  borderWidth: 0.5,
  borderRadius: 13,
  borderColor: colors.WARM_GREY_THREE,
  width: "100%",
  padding: 23,
  marginBottom: 36,
});
const Text0 = styled(BaseText)({
  fontSize: 17,
  fontFamily: "Roboto-Medium",
  textAlign: "center",
  width: "100%",
  marginTop: 50,
  marginBottom: 59,
  color: colors.BLACK_THREE,
});
const Text1 = styled(Text0)({
  fontSize: 15,
  marginTop: 0,
  marginBottom: 6,
});

const BtnText = styled(BlueButtonText)({
  color: colors.EMERALD,
  fontSize: 17.5,
  fontFamily: "Roboto-Medium",
  letterSpacing: -0.35,
});
const BackBtn = styled(BlueButton)({
  backgroundColor: colors.TRUE_WHITE,
  borderWidth: 1.5,
  borderColor: colors.EMERALD,
  borderRadius: 47,
  aspectRatio: 100 / 32.081,
  height: 47,
});
export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.TRUE_WHITE, paddingBottom: 0 },
    title: "아이디 찾기",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

export default FindIDResultScreen;
