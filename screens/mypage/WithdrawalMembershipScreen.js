import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  BaseTouchable,
  BlueButton,
  BlueButtonText,
  BaseText,
  ScaledImage,
  screenWidth,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import { StoreBox, BottomCover } from "@components/store/InfoBox";
import { WhiteContainer } from "@screens/snb/StoreChangeScreen";
import MemberInfo from "@components/myPage/MemberInfo";
import * as authActions from "@actions/auth";
import { setAlert, setIsLoading } from "@actions/common";
import { ButtonGroup } from "react-native-elements";
import * as Updates from "expo-updates";

const WithdrawalMembershipScreen = ({ navigation }) => {
  const [del_type, setDel_type] = useState();
  const [del_memo, setDel_memo] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = [
    {
      element: () => (
        <Radio text="서비스 불만" selectedIndex={selectedIndex} index={0} />
      ),
      del_type: "A",
    },
    {
      element: () => (
        <Radio text="앱속도 불만" selectedIndex={selectedIndex} index={1} />
      ),
      del_type: "B",
    },
    {
      element: () => (
        <Radio text="이용빈도 낮음" selectedIndex={selectedIndex} index={2} />
      ),
      del_type: "C",
    },
    {
      element: () => (
        <Radio text="기타" selectedIndex={selectedIndex} index={3} />
      ),
      del_type: "D",
    },
  ];
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    setDel_type(buttons[selectedIndex].del_type);
  }, [selectedIndex]);
  const onPress = () => {
    let query = { user_cd: userInfo.user_cd, del_type, del_memo };

    dispatch(
      setAlert({
        message: `회원탈퇴 유의사항을\n모두 확인하였으며,\n회원탈퇴에 동의합니다.`,
        onPressConfirm: () => {
          dispatch(authActions.withdrawal(query)).then((data) => {
            if (data.result == "success") {
              dispatch(
                setAlert({
                  message: "탈퇴 되었습니다.",
                  onPressConfirm: async () => {
                    await dispatch(setAlert(null));
                    await dispatch(authActions.withdrawalFinish());
                    await dispatch(setIsLoading(false));
                  },
                })
              );
            }
          });
        },
        onPressCancel: () => {
          dispatch(setAlert(null));
        },
      })
    );
  };
  const onPressRadio = () => {};
  return (
    <BaseScreen
      isPadding={false}
      style={{
        backgroundColor: colors.trueWhite,
      }}
      contentStyle={{
        backgroundColor: colors.trueWhite,
        marginBottom: 40,
      }}
    >
      <MemberInfo />
      <WhiteContainer style={{ padding: 23, paddingTop: 12, flex: 1 }}>
        <ScaledImage
          source={require("@images/mem_out01.png")}
          width={screenWidth - 48}
        />

        <BorderContainer2>
          <RadioButtons
            onPress={(index) => {
              setSelectedIndex(index);
            }}
            selectedIndex={selectedIndex}
            buttons={buttons}
            vertical={true}
            containerStyle={{
              // flexDirection: "column",
              // height: 120,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderWidth: 0,
              borderRadius: 0,
              margin: 0,
              padding: 0,
              marginLeft: 0,
              paddingLeft: 0,
            }}
            buttonStyle={{
              borderWidth: 0,
              marginLeft: 0,
              paddingLeft: 0,
              justifyContent: "center",
              alignItems: "flex-start",
              flex: 1,
            }}
            buttonContainerStyle={{
              borderWidth: 0,
              // width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginLeft: -15,
              paddingLeft: 0,
              flex: 1,
              height: 30,
            }}
            selectedButtonStyle={{ backgroundColor: null }}
          />
          {selectedIndex == 3 && (
            <TextBox
              placeholder={`다른 의견은 여기에 기입해 주시기 바랍니다.\n소중한 의견을 주셔서 감사합니다.`}
              onChangeText={(text) => setDel_memo(text)}
              value={del_memo}
            />
          )}
        </BorderContainer2>

        <GreenButton onPress={onPress} style={{ marginTop: 15 }}>
          <BlueButtonText>회원탈퇴</BlueButtonText>
        </GreenButton>
      </WhiteContainer>
    </BaseScreen>
  );
};
const Radio = (props) => {
  // styled.Image({});

  return (
    <View>
      <View style={{ flexDirection: "row", marginLeft: 23 }}>
        {props.selectedIndex == props.index && (
          <Image source={require("@images/check_circle_on_3.png")} />
        )}
        {props.selectedIndex != props.index && (
          <Image source={require("@images/check_circle_off_3.png")} />
        )}

        <BtnText>{props.text}</BtnText>
      </View>
    </View>
  );
};
const TextBox = styled.TextInput({
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.white,
  padding: 7,
  minHeight: 83,
  textAlignVertical: "top",
});
const BtnText = styled(BaseText)({
  fontSize: 14,

  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 6,
});
const RadioButtons = styled(ButtonGroup)({
  flex: 1,
  width: "100%",
  borderRadius: 0,
});
const BorderContainer2 = styled.View({
  borderRadius: 7,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.white,
  padding: 13,
  marginLeft: 5,
  marginRight: 2,
  marginTop: 4,
});
const GreenButton = styled(BlueButton)({
  backgroundColor: colors.pine,
});
const Text1 = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#707070",
  margin: 14,
});
const BorderContainer = styled.View({
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  margin: 16,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "회원탈퇴",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default WithdrawalMembershipScreen;
