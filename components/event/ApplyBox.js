import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  CheckButton,
  TitleContainer,
  TextView,
} from "@screens/join/AgreementScreen";

import {
  BlueButton,
  BlueButtonText,
  BaseText,
  BaseTextInput,
} from "@UI/BaseUI";
const ApplyBox = (props) => {
  const [checkItem, setCheckItem] = useState({
    isRequired: true,
    isChecked: false,
  });
  const [reg_num, setReg_num] = useState();

  const onPress = () => {
    if (!checkItem.isChecked) {
      props.setAlert({
        message: "개인정보 수집에 동의해주세요.",
        onPressConfirm: () => {
          props.setAlert(null);
        },
      });
      return;
    }
    if (!reg_num) {
      props.setAlert({
        message: "주민등록번호(7자리-8501011)를 입력해주세요.",
        onPressConfirm: () => {
          props.setAlert(null);
        },
      });
      return;
    }
    if (reg_num.length < 7) {
      props.setAlert({
        message: "주민등록번호(7자리-8501011)를 정확히 입력해주세요.",
        onPressConfirm: () => {
          props.setAlert(null);
        },
      });
      return;
    }

    props.onApply(reg_num);
  };
  return (
    <>
      <Container>
        <Title>개인정보 수집동의</Title>
        <TitleContainer style={{ marginTop: 13, marginBottom: 31 }}>
          <CheckButton
            value={checkItem}
            onPress={() =>
              setCheckItem({ ...checkItem, isChecked: !checkItem.isChecked })
            }
            isRequired={true}
          />
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
          placeholder="주민등록번호(7자리-8501011)"
          keyboardType="numeric"
          maxLength={7}
          value={reg_num}
          onChangeText={(text) => setReg_num(text)}
          editable={props.eventDetail.entry.status === "10"}
        />
      </Container>
      {props.eventDetail.entry.status === "10" && (
        <BlueButton onPress={onPress} style={{ marginTop: 40 }}>
          <Image source={require("@images/forward.png")} />
          <BlueButtonText>응모하기</BlueButtonText>
        </BlueButton>
      )}
      {props.eventDetail.entry.status === "20" && (
        <GrayButton style={{ marginTop: 40 }}>
          <Image source={require("@images/forward.png")} />
          <BlueButtonText>응모완료</BlueButtonText>
        </GrayButton>
      )}
    </>
  );
};
const GrayButton = styled(BlueButton).attrs({ activeOpacity: 0 })({
  backgroundColor: colors.greyishThree,
});
ApplyBox.defaultProps = {
  item: {
    id: 0,
    isRequired: true,
    isChecked: false,
  },
};

const InputText = styled(BaseTextInput)({
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

const Title = styled(BaseText)({
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
