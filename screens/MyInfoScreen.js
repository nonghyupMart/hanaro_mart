import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { screenWidth, BaseButtonContainer, BaseText } from "@UI/BaseUI";
import { WhiteContainer } from "@screens/snb/StoreChangeScreen";
import MemberInfoB from "@components/myPage/MemberInfoB";
import QRCode from "react-native-qrcode-svg";
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
import Modal from "react-native-modal";

const MyInfoScreen = (props) => {
  const params = props.route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isVisible, setIsVisible] = useState(false);
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
  const onPressShowQRCode = () => {};
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
      <MemberInfoB />
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
        {userInfo.mana_qr && (
          <MangerQRCodeContainer onPress={() => setIsVisible(true)}>
            <Image source={require("@images/adminqr.png")} />
          </MangerQRCodeContainer>
        )}

        {/* <BlueButton
          onPress={() => {
            props.navigation.pop();
          }}
        >
         
          <BlueButtonText>확인</BlueButtonText>
        </BlueButton> */}
      </WhiteContainer>
      <Button onPress={() => props.navigation.goBack()}>
        <BtnText>확인</BtnText>
      </Button>
      {userInfo.mana_qr && (
        <Modal
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
          isVisible={isVisible}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          onRequestClose={() => setIsVisible(false)}
        >
          <ModalContainer>
            <ModalTitle>관리자 QR코드</ModalTitle>
            <QRCodeContainer>
              <QRCode value={userInfo.mana_qr} />
            </QRCodeContainer>
            <ModalCloseButton onPress={() => setIsVisible(false)}>
              <Image source={require("@images/closeBtn10.png")} />
              <ModalCloseText>닫기</ModalCloseText>
            </ModalCloseButton>
          </ModalContainer>
        </Modal>
      )}
    </BaseScreen>
  );
};
const ModalCloseText = styled(BaseText)({
  fontSize: 16,
  lineHeight: 30,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
  marginLeft: 5,
});
const ModalCloseButton = styled.TouchableOpacity({
  alignItems: "center",
  flexDirection: "row",
  marginBottom: 20,
  alignSelf: "center",
});
const QRCodeContainer = styled.View({
  alignSelf: "center",
  marginBottom: 30,
});
const ModalTitle = styled(BaseText)({
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 30,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
  marginTop: 15,
  borderBottomWidth: 1,
  borderBottomColor: colors.white,
  marginLeft: 10,
  marginRight: 10,
  paddingBottom: 10,
  marginBottom: 20,
});

const ModalContainer = styled.View({
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  borderBottomLeftRadius: 5,
  overflow: "hidden",
  borderTopWidth: 12,
  borderTopColor: colors.cerulean,
  borderBottomWidth: 12,
  borderBottomColor: colors.appleGreen,
  backgroundColor: colors.trueWhite,
});
const MangerQRCodeContainer = styled.TouchableOpacity({
  alignSelf: "center",
});
export const BtnText = styled(BaseText)({
  fontSize: 18,

  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
  fontFamily: "CustomFont-Bold",
  paddingTop: 6,
  paddingBottom: 6,
});
export const Button = styled.TouchableOpacity({
  borderRadius: 18,
  backgroundColor: colors.greyishBrown,
  aspectRatio: 100 / 28.346,
  alignSelf: "center",
  marginTop: 65,
});

export const MarginContainer = styled.View({
  marginTop: 24,
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
  // numberOfLines: 1,
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
