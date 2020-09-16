import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  CheckButton,
  TitleContainer,
  TextView,
} from "@screens/join/AgreementScreen";

import { BlueButton, BlueButtonText } from "@UI/BaseUI";
const ApplyBox = (props) => {
  return (
    <>
      <Container>
        <Title>개인정보 수집동의</Title>
        <TitleContainer style={{ marginTop: 13, marginBottom: 31 }}>
          <CheckButton value={props.item} />
          <TextView
            style={{
              fontWeight: "normal",
              fontSize: 14,
              flexGrow: 1,
              flexShrink: 0,
              color: props.item.isRequired ? colors.cerulean : colors.viridian,
            }}
          >
            {props.item.isRequired ? "[필수] " : "[선택] "}
          </TextView>
          <TextView2>
            {`개인정보 수집 및 이용약관\n수집.이용목적 : 회원가입 및 서비스 제공\n수집항목 : 휴대폰 번호 / 주민 번호`}
          </TextView2>
        </TitleContainer>
        <InputText
          placeholder="주민등록번호 입력 바랍니다.(앞7자리)"
          keyboardType="numeric"
          maxLength={7}
        />
      </Container>
      <BlueButton onPress={props.onPress} style={{ marginTop: 40 }}>
        <Image source={require("@images/forward.png")} />
        <BlueButtonText>응모하기</BlueButtonText>
      </BlueButton>
    </>
  );
};

ApplyBox.defaultProps = {
  item: {
    id: 0,
    isRequired: true,
    isChecked: false,
  },
};

const InputText = styled.TextInput({
  borderRadius: 16,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.greyishThree,
  marginLeft: 34,
  marginRight: 34,
  minHeight: 34,
  padding: 0,
  height: 35,
  textAlign: "center",
});

const TextView2 = styled(TextView)({
  flexGrow: 1,
  marginRight: 22,
  justifyContent: "flex-start",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});

const Title = styled.Text({
  flex: 1,
  fontSize: 15,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
  backgroundColor: colors.greyishBrown,
  width: "100%",
  padding: 4,
});
const Container = styled.View({
  marginTop: 42,
  flex: 1,
  width: "100%",
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.greyishThree,
  borderRadius: 12,
  overflow: "hidden",
  paddingBottom: 28,
});

export default ApplyBox;
