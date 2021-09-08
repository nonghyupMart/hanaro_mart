import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
// import Barcode from "react-native-jsbarcode";
import { Image } from "react-native";
import { CheckBox } from "react-native-elements";
import styled from "styled-components/native";
import BaseScreen from "../components/BaseScreen";
import MemberInfoB from "../components/myPage/MemberInfoB";
import {
  BaseText
} from "../components/UI/BaseUI";
import { BackButton, TextTitle } from "../components/UI/header";
import colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks";
import * as authActions from "../store/actions/auth";
import { fetchUserInfo } from "../store/actions/auth";
import { setAlert } from "../store/actions/common";
import * as MyInfoScreen from "./MyInfoScreen";

const MyADAgreementScreen = (props) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const [sms, setSms] = useState(false);
  const [push, setPush] = useState(false);
  const [marketing_date, setMarketing_date] = useState();
  const pushToken = useAppSelector((state) => state.auth.pushToken);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      fetchUserInfo({
        dispatch: dispatch,
        userInfo: userInfo,
        pushToken: pushToken,
        userStore: userStore,
      }).then((data) => {
        setSms(data.userInfo.sms_agree === "Y" ? true : false);
        setPush(data.userInfo.push_agree === "Y" ? true : false);
        setMarketing_date(data.userInfo.marketing_date);
      });
    }
  }, []);
  const onPress = async () => {
    const prevPush = userInfo?.push_agree === "Y";
    const prevSms = userInfo?.sms_agree === "Y";
    if (push === prevPush && sms === prevSms) {
      dispatch(
        setAlert({
          message: "변경사항이 없습니다.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
      return;
    }
    let query = {
      user_cd: userInfo?.user_cd,
      push_agree: push ? "Y" : "N",
      sms_agree: sms ? "Y" : "N",
      user_id: await authActions.saveUserTelToStorage(),
    };
    dispatch(authActions.signUp(query)).then((data) => {
      const userInfo = data.userInfo;
      let yn = push || sms ? "동의" : "거부";
      dispatch(
        setAlert({
          message: `하나로마트앱 변경일자(${moment().format(
            "YYYY년 MM월 DD일"
          )})\n수신${yn} 처리 되었습니다.`,
          onPressConfirm: () => {
            dispatch(setAlert(null));
            setSms(userInfo.sms_agree === "Y" ? true : false);
            setPush(userInfo.push_agree === "Y" ? true : false);
            setMarketing_date(userInfo.marketing_date);
          },
        })
      );
    });
  };
  return (
    <BaseScreen
      isPadding={false}
      style={{
        backgroundColor: colors.TRUE_WHITE,
      }}
      contentStyle={{
        backgroundColor: colors.TRUE_WHITE,
        marginBottom: 40,
      }}
    >
      <MemberInfoB />
      <MyInfoScreen.MarginContainer>
        <TextContainer>
          <Desc>
            등록하신 휴대폰번호와 APP알림 받기 설정으로 제품할인정보,이벤트,
            쿠폰소식을 받으실 수 있습니다.
          </Desc>
        </TextContainer>
        <RoundBox>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>항목</Text1>
            <Text2>SMS, PUSH / 광고성 정보 수신동의</Text2>
          </TextContainer>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>이용목적</Text1>
            <Text2>서비스 및 신상품이나 이벤트 정보 등의 안내</Text2>
          </TextContainer>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>보유기간</Text1>
            <Text2>별도 동의 철회시 까지, 약관철회 후 1주일까지</Text2>
          </TextContainer>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>마케팅 동의날짜</Text1>
            <Text2>{marketing_date}</Text2>
          </TextContainer>
        </RoundBox>
        <SwitchContainer>
          <SwitchBox>
            <SwitchText>SMS</SwitchText>
            <CheckBox
              activeOpacity={0.8}
              onPress={setSms.bind(this, !sms)}
              checkedIcon={
                <Image source={require("../assets/images/ckon.png")} />
              }
              uncheckedIcon={
                <Image source={require("../assets/images/ckoff.png")} />
              }
              checked={sms}
              containerStyle={[
                {
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  paddinRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  // paddingLeft: 0,
                },
              ]}
            />
          </SwitchBox>
          <SwitchBox>
            <SwitchText>PUSH</SwitchText>
            <CheckBox
              activeOpacity={0.8}
              onPress={setPush.bind(this, !push)}
              checkedIcon={
                <Image source={require("../assets/images/ckon.png")} />
              }
              uncheckedIcon={
                <Image source={require("../assets/images/ckoff.png")} />
              }
              checked={push}
              containerStyle={[
                {
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  paddinRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  // paddingLeft: 0,
                },
              ]}
            />
          </SwitchBox>
        </SwitchContainer>
        <MyInfoScreen.Button
          onPress={onPress}
          style={{ aspectRatio: 100 / 28.346, width: null }}
        >
          <MyInfoScreen.BtnText>확인</MyInfoScreen.BtnText>
        </MyInfoScreen.Button>
      </MyInfoScreen.MarginContainer>
    </BaseScreen>
  );
};

const SwitchText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
});
const SwitchBox = styled.View({
  flexDirection: "row",
  flex: 0.5,
  justifyContent: "center",
});
const SwitchContainer = styled.View({
  flexDirection: "row",
  marginTop: 21,
  paddingLeft: 50,
  paddingRight: 50,
  width: "100%",
});
const Desc = styled(BaseText)({
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
  flex: 1,
  marginBottom: 33,
});
const RoundBox = styled.View({
  borderRadius: 14,
  backgroundColor: colors.TRUE_WHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.WHITE,
  marginLeft: 16,
  marginRight: 16,
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 16,
  paddingBottom: 16,
});
const BaseTextStyle = styled(BaseText)({
  fontSize: 12,
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
  // alignSelf: "stretch",
});
const Text1 = styled(BaseTextStyle)({
  width: "30%",
  flexShrink: 0,
  fontFamily: "Roboto-Bold",
});
const Text2 = styled(BaseTextStyle)({
  width: "70%",
  flexShrink: 0,
});
Text2.defaultProps = {
  // numberOfLines: 1,
};

const TextContainer = styled.View({
  flexDirection: "row",
  paddingLeft: 50,
  paddingRight: 50,
  width: "100%",
  alignSelf: "stretch",
  flexWrap: "wrap",
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "광고성 정보 수신동의",
    contentStyle: {
      paddingBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default MyADAgreementScreen;
