import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import JsBarcode from "jsbarcode";

import { DOMImplementation, XMLSerializer } from "xmldom";
import { screenWidth, BaseButtonContainer, BaseText } from "@UI/BaseUI";
import { WhiteContainer } from "@screens/snb/StoreChangeScreen";
import MemberInfo from "@components/myPage/MemberInfo";
// import Barcode from "react-native-jsbarcode";
import {
  SafeAreaView,
  View,
  Text as TextView,
  StyleSheet,
  FlatList,
  BackHandler,
  Image,
} from "react-native";
import _ from "lodash";
import * as Util from "@util";

import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import Barcode from "@components/Barcode";
import { setAlert } from "@actions/common";

const MyInfoScreen = (props) => {
  const params = props.route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const [barcode, setBarcode] = useState();
  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      const userID = userInfo.user_id;
      const LastNumber = userID.substr(userID.length - 4);
      const userCD = Util.pad(8, userInfo.user_cd);
      setBarcode(LastNumber + userCD);
    }
  }, [userInfo]);
  const onError = () => {
    dispatch(
      setAlert({
        message: "바코드번호가 정확하지 않습니다. 고객센터에 문의해주세요.",
        onPressConfirm: () => {
          dispatch(setAlert(null));
          props.navigation.pop();
        },
      })
    );
  };
  if (!barcode || !userStore) return <></>;
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
      <MarginContainer>
        <TextContainer>
          <Text1>회원번호</Text1>
          <Text2>{userInfo.user_cd}</Text2>
        </TextContainer>
        <TextContainer>
          <Text1>주매장</Text1>
          <Text2>{userStore.storeInfo.store_nm}</Text2>
        </TextContainer>
      </MarginContainer>
      <WhiteContainer>
        <BarcodeContainer>
          <Barcode
            width={2}
            height={100}
            value={barcode}
            format="CODE128"
            flat
            text={barcode}
            onError={onError}
          />
        </BarcodeContainer>
        {/* <BlueButton
          onPress={() => {
            props.navigation.pop();
          }}
        >
         
          <BlueButtonText>확인</BlueButtonText>
        </BlueButton> */}
      </WhiteContainer>
    </BaseScreen>
  );
};
const MarginContainer = styled.View({
  marginTop: 40,
  marginBottom: 0,
});
const BaseTextStyle = styled(BaseText)({
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 29,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  alignSelf: "stretch",
});
const Text1 = styled(BaseTextStyle)({
  width: "25%",
  flexShrink: 0,
});
const Text2 = styled(BaseTextStyle)({
  width: "55%",
  flexShrink: 0,
});
Text2.defaultProps = {
  numberOfLines: 1,
};

const TextContainer = styled.View({
  flexDirection: "row",
  marginLeft: 50,
  marginRight: 50,
  width: "100%",
  alignSelf: "stretch",
});
const BarcodeContainer = styled.View({
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  borderRadius: 7,
  margin: 34,
  paddingTop: 14,
  paddingBottom: 14,
});
const BlueButtonText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
  marginLeft: 9,
});
const BlueButton = styled(BaseButtonContainer)({
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.cerulean,
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
  width: screenWidth - 18 * 2,
  alignSelf: "center",
  aspectRatio: 100 / 12.804,
});
const Warn = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 18,
  flex: 1,
});
const WarnContainer = styled.View({
  overflow: "hidden",
  marginTop: 22,
  flexDirection: "row",
  marginLeft: 28,
  marginRight: 28,
  marginBottom: 22,
  flex: 1,
});
const Now = styled(BaseText)({
  color: colors.appleGreen,
});
const TimerText = styled(BaseText)({
  marginTop: 45,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginBottom: 5,
  flex: 1,
  width: "100%",
  marginRight: 35,
});
const TimerBar = styled.View({
  width: (props) => {
    return (props.elapsedTime * props.barContainerWidth) / 120;
  },
  flex: 1,
  backgroundColor: colors.appleGreen,
});
const TimerBarContainer = styled.View({
  overflow: "hidden",

  marginBottom: 70,
  width: screenWidth - 50,
  aspectRatio: 100 / 7.042,
  backgroundColor: colors.pinkishGrey,
  borderRadius: 20,
});
const Container = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.trueWhite,
  marginTop: 7,
  paddingLeft: 18,
  paddingRight: 18,
  paddingBottom: 45,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "내정보확인",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyInfoScreen;
