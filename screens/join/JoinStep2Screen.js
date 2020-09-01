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
  Image,
} from "react-native";

import BaseScreen from "@components/BaseScreen";
import Modal from "react-native-modal";
import { BackButton, TextTitle } from "@UI/header";
import { BaseSquareButton, ButtonText, BaseButton } from "@UI/BaseUI";

import { setAgreePolicy } from "../../store/actions/auth";
const JoinStep2Screen = ({ navigation }) => {
  const [joinStep, setJoinStep] = useState([false, false]);
  const [selectedValue, setSelectedValue] = useState("010");
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [alert, setAlert] = useState();

  const dispatch = useDispatch();

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["취소", "010", "011"],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setSelectedValue("010");
        } else if (buttonIndex === 2) {
          setSelectedValue("011");
        }
      }
    );
  const onPressJoin = () => {
    setAlert({
      message: "필수 항목을 동의해 주세요.",
      onPressConfirm: () => {
        setAlert({ message: null });
        navigation.replace("StoreSetup");
      },
    });
  };

  return (
    <BaseScreen alert={alert}>
      <TextInputContainer style={{ marginBottom: 7 }}>
        <Image source={require("@images/ic_phone_iphone_24px.png")} />
        <Label style={{ marginLeft: 10, marginRight: 10 }}>휴대폰번호</Label>
        {/* {Platform.OS === "android" && (
          <Picker
            selectedValue={selectedValue}
            style={{ height: 30, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="010" value="010" />
            <Picker.Item label="011" value="011" />
          </Picker>
        )}
        {Platform.OS === "ios" && (
          <Button onPress={onPress} title={selectedValue} />
        )} */}
        <InputText
          required
          keyboardType="numeric"
          maxLength={11}
          value={phoneNumber}
          placeholder="- 없이 입력하세요."
        />
      </TextInputContainer>
      <BlackButton onPress={() => setJoinStep([true, false])}>
        <ButtonText>인증번호 신청</ButtonText>
      </BlackButton>
      {joinStep[0] && (
        <View style={{ flexDirection: "row", marginTop: 57 }}>
          <TextInputContainer style={{ marginRight: 8 }}>
            <Image source={require("@images/help.png")} />
            <Label style={{ marginLeft: 10, marginRight: 10 }}>인증번호</Label>
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
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "회원가입",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
  };
};

const ConfrimText = styled.Text({
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
const BlackButton = styled(BaseSquareButton)({
  backgroundColor: colors.greyishBrown,
  alignSelf: "center",
});
const BlueButton = styled(BaseSquareButton)({
  backgroundColor: colors.cerulean,
});

const GreenButton = styled(BaseButton)({
  backgroundColor: colors.pine,
});
const Label = styled.Text({
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
  // height: 42,
  backgroundColor: colors.trueWhite,
  shadowColor: "rgba(0, 0, 0, 0.16)",
  shadowOffset: {
    width: 1,
    height: 1,
  },
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
