import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  SCREEN_WIDTH,
  BaseButtonContainer,
  BaseText,
} from "../components/UI/BaseUI";
import { WhiteContainer } from "../screens/snb/StoreChangeScreen";
import MemberInfoB from "../components/myPage/MemberInfoB";
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
import * as Util from "../util";

import BaseScreen from "../components/BaseScreen";
import { BackButton, TextTitle } from "../components/UI/header";
import Barcode from "../components/Barcode";
import { setAlert, setIsLoading } from "../store/actions/common";
import Modal from "react-native-modal";
import { setReference, updateUserInfo } from "../store/actions/auth";

const MyInfoScreen = (props) => {
  const params = props.route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isVisible, setIsVisible] = useState(false);
  const userStore = useSelector((state) => state.auth.userStore);
  const [barcode, setBarcode] = useState();
  const [recommend, setRecommend] = useState();
  const pushToken = useSelector((state) => state.auth.pushToken);
  const link = useSelector((state) => state.common.link);
  const routeName = props.route.name;

  useEffect(() => {
    if (link && link.category == routeName && link.link_code) {
      setTimeout(async () => {
        await setRecommend(link.link_code);
        await dispatch(CommonActions.setLink(null));
      }, 0);
    }
  }, [link]);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      dispatch(setIsLoading(true));
      updateUserInfo(dispatch, userInfo, pushToken).then((data) => {
        dispatch(setIsLoading(false));
      });
    }
  }, []);
  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      const userID = userInfo.user_id;
      const LastNumber = userID.substr(userID.length - 4);
      const cd = decodeURIComponent(userInfo.user_cd);
      const userCD = Util.pad(8, Util.decrypt(cd));
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
  const onPress = () => {
    if (userInfo.recommend_apply == "Y" || !recommend || recommend.length <= 0)
      return props.navigation.goBack();
    dispatch(setReference({ user_cd: userInfo.user_cd, recommend })).then(
      (data) => {
        if (data.result == "success") {
          dispatch(
            setAlert({
              message: "추천인이 등록되었습니다.",
              onPressConfirm: () => {
                dispatch(setAlert(null));
                dispatch(setIsLoading(true));
                updateUserInfo(dispatch, userInfo, pushToken).then((data) => {
                  dispatch(setIsLoading(false));
                });
              },
            })
          );
        }
      }
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
          <TitleIcon source={require("../assets/images/shop1black.png")} />
          <Text1>주매장</Text1>
          <Text2>{userStore.storeInfo.store_nm}</Text2>
        </TextContainer>
        <TextContainer>
          <TitleIcon source={require("../assets/images/heart2black.png")} />
          <Text1>추천인코드</Text1>
          <Text2>{userInfo.recommend}</Text2>
        </TextContainer>
      </MarginContainer>
      <WhiteContainer style={{ marginTop: 10 }}>
        {userInfo.recommend_apply != "Y" && (
          <BarcodeContainer
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 0,
              marginTop: 5,
            }}
          >
            <ReferenceContainer>
              <Image source={require("../assets/images/heart2green.png")} />
              <ReferenceTitle>추천인코드 입력하기</ReferenceTitle>
            </ReferenceContainer>
            <ReferenceInput
              placeholder="추천해주신 분의 코드를 입력하시기 바랍니다."
              onChangeText={(t) => setRecommend(t)}
              value={recommend}
            />
            <Button onPress={onPress}>
              <BtnText>확인</BtnText>
            </Button>
          </BarcodeContainer>
        )}
        <BarcodeContainer style={{ marginTop: 5 }}>
          <Barcode
            width={2}
            height={100}
            value={barcode}
            format="CODE128"
            flat
            onError={onError}
          />
        </BarcodeContainer>
        {!!userInfo.mana_qr && (
          <MangerQRCodeContainer onPress={setIsVisible.bind(this, true)}>
            <Image source={require("../assets/images/adminqr.png")} />
          </MangerQRCodeContainer>
        )}

        {/* <BlueButton
          onPress={
            props.navigation.pop.bind(this);
          }
        >
         
          <BlueButtonText>확인</BlueButtonText>
        </BlueButton> */}
      </WhiteContainer>

      {!!userInfo.mana_qr && (
        <Modal
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
          isVisible={isVisible}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          onRequestClose={setIsVisible.bind(this, false)}
        >
          <ModalContainer>
            <ModalTitle>관리자 QR코드</ModalTitle>
            <QRCodeContainer>
              <QRCode value={userInfo.mana_qr} />
            </QRCodeContainer>
            <ModalCloseButton onPress={setIsVisible.bind(this, false)}>
              <Image source={require("../assets/images/closeBtn10.png")} />
              <ModalCloseText>닫기</ModalCloseText>
            </ModalCloseButton>
          </ModalContainer>
        </Modal>
      )}
    </BaseScreen>
  );
};
const ReferenceInput = styled.TextInput({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  borderRadius: 19,
  backgroundColor: colors.white,
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 5,
  paddingBottom: 5,
  marginTop: 15,
});
const ReferenceTitle = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 15,
});
const ReferenceContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
const TitleIcon = styled.Image({ marginRight: 7.7 });
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
  fontFamily: "Roboto-Bold",
  paddingTop: 6,
  paddingBottom: 6,
});
export const Button = styled.TouchableOpacity({
  borderRadius: 18,
  backgroundColor: colors.cerulean,
  // aspectRatio: 100 / 28.346,
  alignSelf: "center",
  marginTop: 20,
  width: "100%",
});

export const MarginContainer = styled.View({
  marginTop: 20,
  marginBottom: 0,
});
const BaseTextStyle = styled(BaseText)({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
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
  alignItems: "center",
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
  width: SCREEN_WIDTH - 18 * 2,
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
  width: SCREEN_WIDTH - 50,
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
