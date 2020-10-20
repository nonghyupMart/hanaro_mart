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
  Keyboard,
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
import moment from "moment";

import { setAlert, setIsLoading } from "@actions/common";
import { setIsJoin, saveIsJoinToStorage } from "../../store/actions/auth";
import * as authActions from "@actions/auth";
import * as branchesActions from "@actions/branches";
import _ from "lodash";
import * as Util from "@util";

const TEST_PHONE_NUMBER = "01999999999";

const JoinStep2Screen = ({ navigation }) => {
  const [joinStep, setJoinStep] = useState([false, false]);
  const [selectedValue, setSelectedValue] = useState("010");
  const isLoading = useSelector((state) => state.common.isLoading);
  const [phoneNumber, setPhoneNumber] = useState();
  const [accessCode, setAccessCode] = useState();
  const [acCode, setAcCode] = useState();
  const [phoneNumberRef, setPhoneNumberRef] = useState();
  const [otpRef, setOtpRef] = useState();
  const [isRequestedJoin, setIsRequestedJoin] = useState(false);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    // if (phoneNumberRef) phoneNumberRef.focus();
  }, []);
  useEffect(() => {
    return () => {
      // console.warn("distroy", timer);
      clearInterval(timer);
    };
  }, []);

  const startTimer = () => {
    clearInterval(timer);
    const eventTime = moment().add(2, "minutes"); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
    const currentTime = moment(); // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
    const diffTime = eventTime.diff(currentTime, "seconds");
    let duration = moment.duration(diffTime * 1000, "milliseconds");
    const interval = 1000;
    duration = moment.duration(duration - interval, "milliseconds");
    setMinutes(duration.minutes());
    setSeconds(duration.seconds());

    return setInterval(() => {
      duration = moment.duration(duration - interval, "milliseconds");
      setMinutes(duration.minutes());
      setSeconds(duration.seconds());
      if (duration.minutes() <= 0 && duration.seconds() <= 0) {
        clearInterval(timer);
      }
      // console.warn(minutes, seconds, duration.minutes(), duration.seconds());
    }, interval);
  };

  const onPressJoin = () => {
    dispatch(setIsLoading(true));
    Keyboard.dismiss();
    if (isRequestedJoin) return;
    let query = {
      user_id: Util.encrypt(phoneNumber),
      token: Util.encrypt(pushToken),
      os: Platform.OS === "ios" ? "I" : "A",
    };
    signup(query, dispatch, agreedStatus, setIsLoading);
    setIsRequestedJoin(true);
  };
  const pad = (num = 0) => {
    while (num.length < 2) num = "0" + num;
    return num;
  };

  const requestOTP = () => {
    if (minutes > 0 || seconds > 0) return;

    if (!phoneNumber) {
      dispatch(
        setAlert({
          message: "휴대폰번호를 입력해주세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
      return;
    }
    if (phoneNumber.length < 10) {
      dispatch(
        setAlert({
          message: "휴대폰번호를 정확히 입력해주세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
      return;
    }
    const reg = /^\d+$/;
    if (!reg.test(phoneNumber)) {
      dispatch(
        setAlert({
          message: "휴대폰번호를 정확히 입력해주세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
      return;
    }
    if (phoneNumber) {
      dispatch(authActions.sendSMS({ user_id: phoneNumber })).then((data) => {
        setTimer(startTimer());
        setAcCode(data.accessCode);
        setJoinStep([true, false]);
      });
    }
  };
  const validateOTP = () => {
    Keyboard.dismiss();
    if (!accessCode || accessCode.length == 0) {
      return dispatch(
        setAlert({
          message: "인증번호를 입력하세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
    }
    if (phoneNumber != TEST_PHONE_NUMBER) {
      if (accessCode != acCode) {
        Util.log(accessCode, acCode);
        return dispatch(
          setAlert({
            message: "인증번호를 확인해 주세요.",
            onPressConfirm: () => {
              dispatch(setAlert(null));
            },
          })
        );
      }
    }
    setJoinStep([true, true]);
  };

  return (
    <BaseScreen isScroll={false}>
      <ScrollContainer keyboardShouldPersistTaps="handled">
        <DescText>{`아래의 휴대폰번호로 SMS 인증번호 6자리를\n보내드립니다.`}</DescText>
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
            onSubmitEditing={Keyboard.dismiss}
            placeholder="- 없이 입력하세요."
          />
        </TextInputContainer>
        {(minutes > 0 || seconds > 0) && (
          <BlackButton
            style={{ marginTop: 10, backgroundColor: colors.greyishThree }}
          >
            <ButtonText>
              {minutes}분 {pad(seconds)}초 후 재전송
            </ButtonText>
          </BlackButton>
        )}
        {minutes <= 0 && seconds <= 0 && (
          <BlackButton onPress={() => requestOTP()} style={{ marginTop: 10 }}>
            <ButtonText>인증번호 신청</ButtonText>
          </BlackButton>
        )}
        {joinStep[0] && (
          <View style={{ marginTop: 22 }}>
            <DescText>{`통신사의 사정에 따라 SMS 전송시간이 다소 지연될 수 있습니다.`}</DescText>
            <View style={{ flexDirection: "row" }}>
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
                    flexWrap: "wrap",
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
                    style={{ lineHeight: 18, width: "100%" }}
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={(text) => setAccessCode(text)}
                  />
                </View>
              </TextInputContainer>

              <BlueButton onPress={() => validateOTP()}>
                <ButtonText>인증번호 확인</ButtonText>
              </BlueButton>
            </View>
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
              <ConfirmText style={{}}>
                인증이 완료되었습니다.{"\n"}하나로마트앱에 가입하시겠습니까?
              </ConfirmText>
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

export const signup = (query, dispatch, agreedStatus, setIsLoading) => {
  dispatch(authActions.signup(query)).then((userInfo) => {
    if (!_.isEmpty(userInfo)) {
      if (userInfo.store_cd) {
        dispatch(branchesActions.fetchBranch(userInfo.store_cd)).then(
          (storeData) => {
            dispatch(setIsLoading(false));
            authActions.saveUserStoreToStorage(storeData);
            dispatch(authActions.saveUserStore(storeData));
            dispatch(
              setAlert({
                content: popupConetnt(agreedStatus, userInfo),
                onPressConfirm: () => {
                  dispatch(setAlert(null));
                  dispatch(setIsJoin(true));
                },
              })
            );
          }
        );
      } else {
        dispatch(setIsLoading(false));
        dispatch(
          setAlert({
            content: popupConetnt(agreedStatus, userInfo),
            onPressConfirm: () => {
              dispatch(setAlert(null));
              dispatch(setIsJoin(true));
            },
          })
        );
      }
    } else {
      dispatch(setIsLoading(false));
      dispatch(
        setAlert({
          message: "회원가입이 실패하였습니다. 고객센터에 문의해주세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
    }
  });
};
const DescText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginBottom: 17,
  marginLeft: 20,
  marginRight: 20,
});
const ScrollContainer = styled.ScrollView({
  flex: 1,
  paddingRight: StyleConstants.defaultPadding,
  paddingLeft: StyleConstants.defaultPadding,
  marginTop: 20,
});
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
  marginTop: 0,
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
export const popupConetnt = (agreedStatus, userInfo) => {
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
              key={index}
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

const ConfirmText = styled(BaseText)({
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
const InputText = styled(BaseTextInput)({
  flex: 1,
  // lineHeight: 20,
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
  color: colors.greyishBrown,
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
