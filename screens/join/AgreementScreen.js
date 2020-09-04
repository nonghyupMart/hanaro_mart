import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";

import Constants from "expo-constants";

import { CheckBox } from "react-native-elements";

import { setAgreePolicy } from "@actions/auth";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { getPermissionsAsync } from "expo-notifications";

import colors from "@constants/colors";

import BaseScreen from "@components/BaseScreen";
import { BaseButtonContainer, ButtonText } from "@UI/BaseUI";

import { setPushToken, setLocation, setErrorMsg } from "@actions/auth";

const AgreementScreen = ({ navigation }) => {
  const [toggleAllheckBox, setToggleAllCheckBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [checkBoxes, setCheckBoxes] = useState([
    { id: 0, isChecked: false },
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
  ]);

  const dispatch = useDispatch();

  const handleAllChecked = (isCheckAll) => {
    let cks = [...checkBoxes];
    cks.map((el) => {
      isCheckAll ? (el.isChecked = true) : (el.isChecked = false);
    });
    setCheckBoxes(cks);
    setToggleAllCheckBox(isCheckAll);
  };
  const handleChecked = (checkBox) => {
    let cks = [...checkBoxes];
    cks[checkBox.id].isChecked = !cks[checkBox.id].isChecked;
    setCheckBoxes(cks);
    if (cks[checkBox.id].isChecked == false) {
      setToggleAllCheckBox(false);
    } else {
      let allTrue = cks.every((el) => el.isChecked);
      if (allTrue) setToggleAllCheckBox(true);
    }
  };

  const getPermissions = () => {
    return Permissions.getAsync(
      Permissions.NOTIFICATIONS,
      Permissions.LOCATION,
      Permissions.CAMERA
    )
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(
            Permissions.NOTIFICATIONS,
            Permissions.LOCATION,
            Permissions.CAMERA
          );
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return alert("권한이 거부 되었습니다.");
        }
      })
      .then(() => {
        console.log("getting token");
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        console.log("token==>" + token);
        dispatch(setPushToken(token));
        return token;
      })
      .catch((err) => {
        console.log(err);
        return alert(err);
      });
  };
  const checkAgreed = () => {
    if (checkBoxes[0].isChecked && checkBoxes[1].isChecked) {
      if (!Constants.isDevice) {
        navigation.navigate("JoinStep1");
        return;
      }
      setIsLoading(() => true);
      getPermissions().then((token) => {
        if (token) {
          navigation.navigate("JoinStep1");
        }
        setIsLoading(() => false);
      });
    } else {
      // setAlertMessage("필수 항목을 동의해 주세요.");
      setAlert({
        message: "필수 항목을 동의해 주세요.",
        onPressConfirm: () => {
          setAlert({ message: null });
        },
      });
    }
  };
  return (
    <BaseScreen isLoading={isLoading} alert={alert} headerShown={false}>
      <CheckBox
        activeOpacity={0.8}
        onPress={() => handleAllChecked(!toggleAllheckBox)}
        title="전체동의"
        textStyle={styles.text}
        containerStyle={[styles.btnBlack, { marginLeft: -1 }]}
        checkedIcon={
          <Image source={require("@images/check_circle-24on.png")} />
        }
        uncheckedIcon={
          <Image source={require("@images/check_circle-24off.png")} />
        }
        checked={toggleAllheckBox}
        style={{ margin: 0, padding: 0 }}
      />
      <TextBox style={[styles.allCheck]}>
        <CheckBox
          activeOpacity={0.8}
          containerStyle={[styles.checkbox]}
          checked={checkBoxes[0].isChecked}
          onPress={() => handleChecked(checkBoxes[0])}
          checkedIcon={<Image source={require("@images/check_box-2404.png")} />}
          uncheckedIcon={
            <Image source={require("@images/check_box-2403.png")} />
          }
        />

        <TextView>
          <TextView style={{ color: colors.cerulean }}>[필수] </TextView>{" "}
          개인정보 수집 및 이용약관{"\n"}
          수집.이용목적 : 회원가입 및 서비스 제공 수집항목 : 휴대폰 번호
        </TextView>
      </TextBox>
      <TextBox style={styles.allCheck}>
        <CheckBox
          activeOpacity={0.8}
          containerStyle={[styles.checkbox]}
          checkedIcon={<Image source={require("@images/check_box-2404.png")} />}
          uncheckedIcon={
            <Image source={require("@images/check_box-2403.png")} />
          }
          checked={checkBoxes[1].isChecked}
          onPress={() => handleChecked(checkBoxes[1])}
        />

        <TextView>
          <TextView style={{ color: colors.cerulean }}>[필수] </TextView>
          위치정보 수집동의{"\n"}수집.이용목적 : 가까운 위치에 있는 매장찾기
          서비스제공. 위치정보는 서버에 전송.저장되지 않습니다. 수집항목 :
          위치정보 (위도,경도)
        </TextView>
      </TextBox>
      <TextBox style={styles.allCheck}>
        <CheckBox
          activeOpacity={0.8}
          containerStyle={[styles.checkbox]}
          checkedIcon={<Image source={require("@images/check_box-2402.png")} />}
          uncheckedIcon={
            <Image source={require("@images/check_box-2401.png")} />
          }
          checked={checkBoxes[2].isChecked}
          onPress={() => handleChecked(checkBoxes[2])}
        />

        <TextView>
          <TextView style={{ color: colors.viridian }}>[선택] </TextView> 광고성
          정보 수집동의{"\n"}수집.이용목적 : 혜택과 할인정보 안내 PUSH 알림
        </TextView>
      </TextBox>
      <NoticeText>
        필수 항목 외에는 동의하지 않으셔도 이용이 가능하며 마이페이지에서
        언제든지 변경 가능합니다.
      </NoticeText>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <GreenButton
          style={{ marginRight: 3 }}
          onPress={() => {
            checkAgreed();
          }}
        >
          <ButtonText>확인</ButtonText>
        </GreenButton>
        <BlueButton
          style={{ marginLeft: 3 }}
          onPress={() => {
            dispatch(setAgreePolicy(true));
          }}
        >
          <ButtonText>동의 없이 보기</ButtonText>
        </BlueButton>
      </View>
    </BaseScreen>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "",
    headerShown: false,
    cardStyle: {
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    },
  };
};

const NoticeText = styled.Text({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
  marginRight: 30,
  marginLeft: 30,
  marginTop: 42,
  marginBottom: 48,
});

const GreenButton = styled(BaseButtonContainer)({
  backgroundColor: colors.pine,
});
const BlueButton = styled(BaseButtonContainer)({
  backgroundColor: colors.cerulean,
});
const TextBox = styled.View({
  alignItems: "flex-start",
  backgroundColor: colors.trueWhite,
  justifyContent: "flex-start",
  marginBottom: 11,
  paddingBottom: 11,
  paddingTop: 5,
  paddingRight: 5,
  width: "100%",
});
const TextView = styled.Text({
  flexShrink: 1,
  lineHeight: 20,
  fontSize: 14,
  color: colors.greyishBrown,
});
const styles = StyleSheet.create({
  checkbox: {
    justifyContent: "flex-start",
    margin: 0,
    alignItems: "flex-start",
    padding: 0,
  },
  text2: {
    margin: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,

    color: colors.trueWhite,
  },
  btnBlack: {
    width: 158,
    height: 36,
    backgroundColor: colors.black,
    borderRadius: 17,
    padding: 0,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
  },

  screen: {
    paddingTop: 19,
    paddingLeft: 16,
    paddingRight: 16,
    // paddingTop: Constants.statusBarHeight,
    flex: 1,

    backgroundColor: colors.white,
  },
  allCheck: {
    flexDirection: "row",
  },
});

export default AgreementScreen;
