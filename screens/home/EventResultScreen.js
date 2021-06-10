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

const EventResultScreen = (props) => {
  const params = props.route.params;
  const eventDetail = params.eventDetail;
  let contents;
  if (!eventDetail || !eventDetail.entry.winner_rank) {
    contents = (
      <>
        <NoList>당첨자 내역에 없습니다.</NoList>
        <Image
          source={require("../../assets/images/naroC.png")}
          style={{ marginBottom: 67, alignSelf: "center" }}
        />
        <BackBtn onPress={() => props.navigation.pop()}>
          <Image source={require("../../assets/images/forward.png")} />
          <BlueButtonText>뒤로가기</BlueButtonText>
        </BackBtn>
      </>
    );
  } else if (eventDetail && eventDetail.entry.winner_rank) {
    contents = (
      <>
        <Text1>★고객님 축하드립니다!★</Text1>
        <Image
          source={require("../../assets/images/naro1.png")}
          style={{ marginBottom: 22, alignSelf: "center" }}
        />
        <Text2>하나로마트 앱 경품행사 추첨결과</Text2>
        <RowWrap>
          <Text3>{eventDetail.entry.winner_rank}등</Text3>
          <Text2>에</Text2>
        </RowWrap>
        <Text2>당첨되셨습니다.</Text2>
        <Text4>
          (경품수령을 위한 진행사항은 <B>PUSH메세지</B> 또는 <B>LMS</B>를
          확인하시기 바랍니다.)
        </Text4>
        <BackBtn onPress={() => props.navigation.pop()}>
          <Image source={require("../../assets/images/forward.png")} />
          <BlueButtonText>뒤로가기</BlueButtonText>
        </BackBtn>
      </>
    );
  }
  return (
    <BaseScreen
      style={{
        backgroundColor: colors.trueWhite,
      }}
      contentStyle={{
        backgroundColor: colors.trueWhite,
        paddingTop: 19,
      }}
    >
      {contents}
    </BaseScreen>
  );
};
const B = styled.Text({
  fontFamily: "Roboto-Bold",
});
const NoList = styled(BaseText)({
  fontSize: 25,
  fontFamily: "Roboto-Bold",
  textAlign: "center",
  width: "100%",
  marginTop: 50,
  marginBottom: 44,
});
const Text1 = styled(NoList)({
  marginTop: 45,
  marginBottom: 17,
  color: colors.blackThree,
  textAlign: "center",
});
const Text2 = styled(BaseText)({
  textAlign: "center",
  fontSize: 20,
  alignSelf: "center",
  fontFamily: "Roboto-Medium",
});
const RowWrap = styled.View({
  flexDirection: "row",
  alignItems: "baseline",
  alignSelf: "center",
  marginTop: 10,
  marginBottom: 5,
});
const Text3 = styled(BaseText)({
  fontSize: 40,
  fontFamily: "Roboto-Bold",
  color: colors.black,
});
const Text4 = styled(BaseText)({
  fontSize: 14,
  color: colors.black,
  textAlign: "center",
  marginTop: 27.5,
  marginBottom: 5,
});

const BackBtn = styled(BlueButton)({});
export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.trueWhite, paddingBottom: 0 },
    title: "이벤트 추첨결과",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

export default EventResultScreen;
