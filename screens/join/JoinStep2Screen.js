import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Button,
  Picker,
  TextInput,
  ActionSheetIOS,
  ScrollView,
  Image,
} from "react-native";

import BaseScreen from "@components/BaseScreen";

import { BackButton, TextTitle } from "@UI/header";
import {
  BaseSquareButtonContainer,
  ButtonText,
  BaseButtonContainer,
  StyleConstants,
} from "@UI/BaseUI";

import { setAgreePolicy } from "../../store/actions/auth";
import * as authActions from "@actions/auth";

const JoinStep2Screen = ({ navigation }) => {
  const [joinStep, setJoinStep] = useState([false, false]);
  const [selectedValue, setSelectedValue] = useState("010");
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberRef, setPhoneNumberRef] = useState();
  const [alert, setAlert] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    // if (phoneNumberRef) phoneNumberRef.focus();
  }, []);

  const onPressJoin = () => {
    let query = {
      user_id: "01012341234",
      store_cd: "5",
    };
    dispatch(authActions.signup(query)).then(() => {
      setAlert({
        content: popupConetnt(),
        onPressConfirm: () => {
          setAlert(null);
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: "StoreSetup" }],
          // });
          dispatch(setAgreePolicy(true));
        },
      });
    });
  };

  const requestOTP = () => {
    if (phoneNumber) {
      authActions.sendSMS(phoneNumber);
      setJoinStep([true, false]);
    }
  };

  return (
    <BaseScreen alert={alert} isScroll={false}>
      <ScrollContainer>
        <TextInputContainer style={{ marginBottom: 7 }}>
          <Image source={require("@images/ic_phone_iphone_24px.png")} />
          <Label style={{ marginLeft: 10, marginRight: 10 }}>휴대폰번호</Label>
          <InputText
            // ref={(ref) => setPhoneNumberRef(ref)}
            autoFocus={true}
            keyboardType="numeric"
            maxLength={11}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="- 없이 입력하세요."
          />
        </TextInputContainer>
        <BlackButton onPress={() => requestOTP()}>
          <ButtonText>인증번호 신청</ButtonText>
        </BlackButton>
        {joinStep[0] && (
          <View style={{ flexDirection: "row", marginTop: 57 }}>
            <TextInputContainer style={{ marginRight: 8 }}>
              <Image source={require("@images/help.png")} />
              <Label style={{ marginLeft: 10, marginRight: 10 }}>
                인증번호
              </Label>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  required
                  keyboardType="numeric"
                  maxLength={4}
                  placeholder="4자리"
                />
              </View>
            </TextInputContainer>
            <BlueButton onPress={() => setJoinStep([true, true])}>
              <ButtonText>인증번호 확인</ButtonText>
            </BlueButton>
          </View>
        )}
        {joinStep[1] && (
          <View style={{ marginTop: 57, flex: 1, width: "100%" }}>
            <TextInputContainer
              style={{
                justifyContent: "center",
                alignCenter: "center",
                marginBottom: 26,
                height: null,
              }}
            >
              <ConfrimText style={{}}>
                인증이 완료되었습니다.{"\n"}하나로플러스앱에 가입하시겠습니까?
              </ConfrimText>
            </TextInputContainer>
            <GreenButton
              style={{ width: "100%" }}
              onPress={() => {
                onPressJoin();
              }}
            >
              <ButtonText>회원가입</ButtonText>
            </GreenButton>
          </View>
        )}
      </ScrollContainer>
    </BaseScreen>
  );
};
const ScrollContainer = styled.ScrollView({
  flex: 1,
  paddingRight: StyleConstants.defaultPadding,
  paddingLeft: StyleConstants.defaultPadding,
  marginTop: 20,
});
const popupConetnt = () => {
  const GreenText = styled(Text)({
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.appleGreen,
  });
  const WhiteText = styled(Text)({
    fontSize: 24,
    color: colors.trueWhite,
    textAlign: "center",
  });
  const Container = styled.View({
    marginTop: 60,
  });
  const Line = styled.View({
    flexDirection: "row",

    marginLeft: 29,
    marginRight: 29,
    flexShrink: 1,
  });
  const SmallText = styled(Text)({
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: "left",
    color: colors.trueWhite,
    marginLeft: 10,
    flexShrink: 1,
  });
  const Icon = styled.Image({ marginTop: 5 });
  return (
    <Container>
      <GreenText>전화번호 인증이 완료되었습니다.</GreenText>
      <WhiteText>010-2643-2846</WhiteText>
      <Line style={{ marginTop: 20 }}>
        <Icon source={require("@images/checkmark.png")} />
        <SmallText>개인정보 집과 이용약관에 동의하셨습니다.</SmallText>
      </Line>
      <Line>
        <Icon source={require("@images/checkmark.png")} />
        <SmallText>위치정보 수집에 동의하셨습니다.</SmallText>
      </Line>
      <Line style={{ marginBottom: 30 }}>
        <Icon source={require("@images/checkmark.png")} />
        <SmallText>광고성 정보(혜택)에 수신을 동의하셨습니다.</SmallText>
      </Line>
    </Container>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "회원가입",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

const ConfrimText = styled(Text)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
  flexShrink: 1,
  marginTop: 5,
  marginBottom: 5,
});
const InputText = styled.TextInput({
  flex: 1,
});
const BlackButton = styled(BaseSquareButtonContainer)({
  backgroundColor: colors.greyishBrown,
  alignSelf: "center",
});
const BlueButton = styled(BaseSquareButtonContainer)({
  backgroundColor: colors.cerulean,
});

const GreenButton = styled(BaseButtonContainer)({
  backgroundColor: colors.pine,
});
const Label = styled(Text)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.pinkishGrey,
});
const TextInputContainer = styled.View({
  flex: 1,
  padding: 10,
  height: 42,
  backgroundColor: colors.trueWhite,
  shadowColor: "rgba(0, 0, 0, 0.16)",
  shadowOffset: {
    width: 1,
    height: 1,
  },
  elevation: 3,
  shadowRadius: 2,
  shadowOpacity: 1,
  flexDirection: "row",
  alignItems: "center",
  // justifyContent: "center",
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JoinStep2Screen;
