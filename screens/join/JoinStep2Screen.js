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
  ActionSheetIOS,
  ScrollView,
  Image,
} from "react-native";
import Constants from "expo-constants";
import BaseScreen from "@components/BaseScreen";

import { BackButton, TextTitle } from "@UI/header";
import {
  BaseSquareButtonContainer,
  ButtonText,
  BaseButtonContainer,
  StyleConstants,
  BaseText,
  BaseTextInput,
} from "@UI/BaseUI";
import { formatPhoneNumber } from "@util";

import { setIsJoin, saveIsJoinToStorage } from "../../store/actions/auth";
import * as authActions from "@actions/auth";
import * as branchesActions from "@actions/branches";
import _ from "lodash";
import * as Util from "@util";

const JoinStep2Screen = ({ navigation }) => {
  const [joinStep, setJoinStep] = useState([false, false]);
  const [selectedValue, setSelectedValue] = useState("010");
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [accessCode, setAccessCode] = useState();
  const [acCode, setAcCode] = useState();
  const [phoneNumberRef, setPhoneNumberRef] = useState();
  const [alert, setAlert] = useState();
  const [otpRef, setOtpRef] = useState();
  const pushToken = useSelector((state) => state.auth.pushToken);
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (phoneNumberRef) phoneNumberRef.focus();
  }, []);

  const onPressJoin = () => {
    let query = {
      user_id: Util.encrypt(phoneNumber),
      token: Util.encrypt(pushToken),
      os: Platform.OS === "ios" ? "I" : "A",
    };
    signup(query, dispatch, setAlert, agreedStatus);
  };

  const requestOTP = () => {
    if (!phoneNumber) {
      setAlert({
        message: "휴대폰번호를 입력해주세요.",
        onPressConfirm: () => {
          setAlert(null);
        },
      });
      return;
    }
    if (phoneNumber.length < 11) {
      setAlert({
        message: "휴대폰번호를 정확히 입력해주세요.",
        onPressConfirm: () => {
          setAlert(null);
        },
      });
      return;
    }
    const reg = /^\d+$/;
    if (!reg.test(phoneNumber)) {
      setAlert({
        message: "휴대폰번호를 정확히 입력해주세요.",
        onPressConfirm: () => {
          setAlert(null);
        },
      });
      return;
    }
    if (phoneNumber) {
      dispatch(authActions.sendSMS({ user_id: phoneNumber })).then((data) => {
        setAcCode(data.accessCode);
        setJoinStep([true, false]);
      });
    }
  };
  const validateOTP = () => {
    if (accessCode == acCode) {
      setJoinStep([true, true]);
    } else {
      setAlert({
        message: "인증번호를 확인해 주세요.",
        onPressConfirm: () => {
          setAlert(null);
        },
      });
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
              <Label
                style={{ marginLeft: 10, marginRight: 10 }}
                onPress={() => {
                  otpRef.focus();
                }}
              >
                인증번호
              </Label>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BaseTextInput
                  ref={(input) => setOtpRef(input)}
                  required
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="6자리"
                  autoFocus={true}
                  value={accessCode}
                  onChangeText={(text) => setAccessCode(text)}
                />
              </View>
            </TextInputContainer>
            <BlueButton onPress={() => validateOTP()}>
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
                인증이 완료되었습니다.{"\n"}하나로마트앱에 가입하시겠습니까?
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

export const signup = (query, dispatch, setAlert, agreedStatus) => {
  dispatch(authActions.signup(query)).then((userInfo) => {
    if (!_.isEmpty(userInfo)) {
      if (userInfo.store_cd) {
        dispatch(branchesActions.fetchBranch(userInfo.store_cd)).then(
          (storeData) => {
            authActions.saveUserStoreToStorage(storeData);
            dispatch(authActions.saveUserStore(storeData));
            setAlert({
              content: popupConetnt(agreedStatus, userInfo),
              onPressConfirm: () => {
                setAlert(null);
                dispatch(setIsJoin(true));
              },
            });
          }
        );
      } else {
        setAlert({
          content: popupConetnt(agreedStatus, userInfo),
          onPressConfirm: () => {
            setAlert(null);
            dispatch(setIsJoin(true));
          },
        });
      }
    } else {
      setAlert({
        message: "회원가입이 실패하였습니다. 고객센터에 문의해주세요.",
        onPressConfirm: () => {
          setAlert(null);
        },
      });
    }
  });
};

const ScrollContainer = styled.ScrollView({
  flex: 1,
  paddingRight: StyleConstants.defaultPadding,
  paddingLeft: StyleConstants.defaultPadding,
  marginTop: 20,
});
export const popupConetnt = (agreedStatus, userInfo) => {
  // Util.log(agreedStatus);
  const GreenText = styled(BaseText)({
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.appleGreen,
  });
  const WhiteText = styled(BaseText)({
    fontSize: 24,
    color: colors.trueWhite,
    textAlign: "center",
  });
  const Container = styled.View({
    marginTop: 60,
    paddingBottom: 30,
  });
  const Line = styled.View({
    flexDirection: "row",

    marginLeft: 29,
    marginRight: 29,
    flexShrink: 1,
  });
  const SmallText = styled(BaseText)({
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
  // Util.log(userInfo.user_id);
  return (
    <Container>
      <GreenText>전화번호 인증이 완료되었습니다.</GreenText>
      <WhiteText>
        {userInfo && userInfo.user_id
          ? formatPhoneNumber(userInfo.user_id)
          : ""}
      </WhiteText>
      {Object.keys(agreedStatus).map((keyName, index) => {
        // Util.log(Object.keys(agreedStatus).length);.
        if (agreedStatus[keyName].isChecked)
          return (
            <Line
              style={{
                marginTop: index == 0 ? 20 : 0,
                // marginBottom:
                //   index == Object.keys(agreedStatus).length - 1 ? 30 : 0,
              }}
            >
              <Icon source={require("@images/checkmark.png")} />
              <SmallText>
                {agreedStatus[keyName].title}에 동의하셨습니다.
              </SmallText>
            </Line>
          );
      })}
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

const ConfrimText = styled(BaseText)({
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
const LabelContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})({});
const LabelText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.pinkishGrey,
});
const Label = (props) => (
  <LabelContainer {...props}>
    <LabelText>{props.children}</LabelText>
  </LabelContainer>
);
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
