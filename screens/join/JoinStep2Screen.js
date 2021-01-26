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
import * as Notifications from "expo-notifications";

import { setAlert, setIsLoading } from "@actions/common";
import { setIsJoin, saveIsJoinToStorage } from "../../store/actions/auth";
import * as authActions from "@actions/auth";
import * as branchesActions from "@actions/branches";
import * as CommonActions from "@actions/common";
import _ from "lodash";
import * as Util from "@util";

const TEST_PHONE_NUMBER = "01999999999";

const JoinStep2Screen = ({ navigation }) => {
  const userStore = useSelector((state) => state.auth.userStore);
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
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

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
    }, interval);
  };

  const onPressJoin = async () => {
    await dispatch(setIsLoading(true));
    await Keyboard.dismiss();
    if (isRequestedJoin) return;
    let query = {
      user_id: await Util.encrypt(phoneNumber),
      token: await Util.encrypt(pushToken),
      os: Platform.OS === "ios" ? "I" : "A",
      marketing_agree: agreedStatus[3].isChecked ? "Y" : "N",
    };
    if (!_.isEmpty(userStore)) {
      query.store_cd = userStore.storeInfo.store_cd;
    }
    try {
      await signup(query, dispatch, agreedStatus);
      setIsRequestedJoin(true);
    } catch (error) {
      setIsRequestedJoin(false);
    }
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
            accessibilityLabel="phoneNumber"
            testID="phoneNumber"
            autoFocus={true}
            keyboardType="numeric"
            maxLength={11}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            onSubmitEditing={Keyboard.dismiss}
            placeholder="- 없이 입력하세요."
            secureTextEntry={secureTextEntry1}
            onFocus={() => setSecureTextEntry1(false)}
            onBlur={() => setSecureTextEntry1(true)}
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
                    accessibilityLabel="accessCode"
                    testID="accessCode"
                    required
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder="6자리"
                    autoFocus={true}
                    value={accessCode}
                    style={{ lineHeight: 18, width: "100%" }}
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={(text) => setAccessCode(text)}
                    secureTextEntry={secureTextEntry2}
                    onFocus={() => setSecureTextEntry2(false)}
                    onBlur={() => setSecureTextEntry2(true)}
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

export const signup = async (query, dispatch, agreedStatus) => {
  query.token = `${query.token}`.trim();
  if (!query.token || query.token == "") {
    query.token = (await Notifications.getExpoPushTokenAsync()).data;
  }
  query.token = `${query.token}`.trim();
  if (!query.token || query.token == "") {
    return new Promise((resolve, reject) => {
      dispatch(
        setAlert({
          message:
            "서버통신지연으로 인하여 잠시 후 다시 실행해주시기 바랍니다.",
          onPressConfirm: async () => {
            await dispatch(setIsLoading(false));
            await dispatch(setAlert(null));
            reject(false);
          },
        })
      );
    });
  }
  return dispatch(authActions.signup(query)).then(async (userInfo) => {
    if (!_.isEmpty(userInfo)) {
      await authActions.saveUserTelToStorage(query.user_id);
      if (userInfo.store_cd) {
        dispatch(branchesActions.fetchBranch(userInfo.store_cd)).then(
          async (storeData) => {
            await dispatch(setIsLoading(false));
            await authActions.saveUserStoreToStorage(storeData);
            await dispatch(authActions.saveUserStore(storeData));
            dispatch(
              setAlert({
                content: await popupConetnt(agreedStatus, userInfo),
                onPressConfirm: async () => {
                  await dispatch(setAlert(null));
                  await dispatch(CommonActions.setDidTryPopup(false));
                  dispatch(setIsJoin(true));
                },
              })
            );
          }
        );
      } else {
        await dispatch(setIsLoading(false));
        dispatch(
          setAlert({
            content: await popupConetnt(agreedStatus, userInfo),
            onPressConfirm: async () => {
              await dispatch(setAlert(null));
              await dispatch(CommonActions.setDidTryPopup(false));
              dispatch(setIsJoin(true));
            },
          })
        );
      }
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
  marginLeft: 50,
  marginRight: 50,
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
  const date = moment();
  return (
    <Container>
      <GreenText>전화번호 인증이 완료되었습니다.</GreenText>
      <WhiteText>
        {userInfo && userInfo.user_id
          ? formatPhoneNumber(userInfo.user_id)
          : ""}
      </WhiteText>
      <Text6>{`고객님께서는 ${date.format("YYYY")}년 ${date.format(
        "MM"
      )}월 ${date.format("DD")}일\n아래항목에 동의하셨습니다.`}</Text6>
      <List
        data={Object.keys(agreedStatus)}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index, separators }) => {
          if (agreedStatus[item].isChecked)
            return (
              <Line
                style={{
                  marginTop: index == 0 ? 20 : 0,
                  // marginBottom:
                  //   index == Object.keys(agreedStatus).length - 1 ? 30 : 0,
                }}
              >
                <Icon source={require("@images/checkmark.png")} />
                <SmallText>{agreedStatus[item].title}</SmallText>
              </Line>
            );
        }}
      />
    </Container>
  );
};
export const Text6 = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
  // marginLeft: 10,
  flexShrink: 1,
  marginRight: 20,
  marginTop: 10,
  marginBottom: 0,
});
export const List = styled.FlatList({ marginTop: -10 });
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
