import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
// import Barcode from "react-native-jsbarcode";
import { Image } from "react-native";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components/native";
import BaseScreen from "../components/BaseScreen";
import MemberInfoB from "../components/myPage/MemberInfoB";
import { BaseText } from "../components/UI/BaseUI";
import { BackButton, TextTitle } from "../components/UI/header";
import colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUserData, setReference } from "../store/actions/auth";
import { setAlert, setLink } from "../store/actions/common";
import * as Util from "../utils";
import { WhiteContainer } from "./snb/StoreChangeScreen";

const MyInfoScreen = (props) => {
  const params = props.route.params;
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [isVisible, setIsVisible] = useState(false);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const [barcode, setBarcode] = useState<string>();
  const [recommend, setRecommend] = useState();
  const pushToken = useAppSelector((state) => state.auth.pushToken);
  const link = useAppSelector((state) => state.common.link);
  const routeName = props.route.name;

  useEffect(() => {
    if (link?.category === routeName && link?.link_code) {
      setTimeout(async () => {
        await setRecommend(link.link_code);
        await dispatch(setLink(null));
      }, 500);
    }
  }, [link]);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      const userID = userInfo?.user_id;
      const LastNumber = userID?.substr(userID.length - 4);
      const cd = decodeURIComponent(userInfo?.user_cd + "");
      const userCD = Util.pad(8, Util.decrypt(cd));
      setBarcode(LastNumber + userCD);
    }
  }, [userInfo]);
  const onError = () => {
    dispatch(
      setAlert({
        message: "?????????????????? ???????????? ????????????. ??????????????? ??????????????????.",
        onPressConfirm: () => {
          dispatch(setAlert(null));
          props.navigation.pop();
        },
      })
    );
  };
  const onPress = () => {
    if (userInfo?.recommend_apply === "Y" || recommend?.length <= 0)
      return props.navigation.goBack();
    dispatch(setReference({ user_cd: userInfo?.user_cd, recommend })).then(
      (data) => {
        if (data.result === "success") {
          dispatch(
            setAlert({
              message: "???????????? ?????????????????????.",
              onPressConfirm: () => {
                dispatch(setAlert(null));
                fetchUserData({
                  dispatch: dispatch,
                  userInfo: userInfo,
                  pushToken: pushToken,
                  userStore: userStore,
                });
              },
            })
          );
        }
      }
    );
  };
  const onPressEditMyInfo = () => {
    !!userInfo?.amnNo
      ? props.navigation.navigate("NHAHM", { regiDesc: "02" })
      : props.navigation.navigate("CI");
  };
  if (!barcode || _.isEmpty(userStore) || _.isEmpty(userInfo)) return <></>;
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
      <MarginContainer>
        <TextContainer
          style={{
            justifyContent: "flex-end",
            marginLeft: 0,
            paddingRight: 43,
          }}
        >
          <EditButton onPress={() => onPressEditMyInfo()}>
            <EditButtonText>????????? ??????</EditButtonText>
            <Image source={require("../assets/images/create_white_24dp.png")} />
          </EditButton>
          {!!userInfo?.amnNo && (
            <EditButton
              onPress={() =>
                props.navigation.navigate("NHAHM", {
                  regiDesc: "03",
                })
              }
              style={{
                aspectRatio: 100 / 23.4375,
                marginLeft: 9,
              }}
            >
              <EditButtonText>???????????? ??????</EditButtonText>
              <Image source={require("../assets/images/tools3.png")} />
            </EditButton>
          )}
        </TextContainer>
        <TextContainer>
          <TitleIcon source={require("../assets/images/shop1black.png")} />
          <Text1>?????????</Text1>
          <Text2>{userStore?.storeInfo.store_nm}</Text2>
        </TextContainer>
        <TextContainer>
          <TitleIcon source={require("../assets/images/heart2black.png")} />
          <Text1>?????? ???????????????</Text1>
          <Text2>{userInfo?.recommend}</Text2>
        </TextContainer>
        <TextContainer>
          <TitleIcon source={require("../assets/images/mypage_bt_off.png")} />
          {!!userInfo?.amnNo && (
            <>
              <Text1>????????????(??????)</Text1>
              <Text2>
                {moment(userInfo?.nh_reg_date).format("YYYY.MM.DD")}
              </Text2>
            </>
          )}
          {!!!userInfo?.amnNo && (
            <>
              <Text1>????????????(???)</Text1>
              <Text2>{moment(userInfo?.reg_date).format("YYYY.MM.DD")}</Text2>
            </>
          )}
        </TextContainer>
      </MarginContainer>
      {!!!userInfo?.amnNo && (
        <JoinBtn
          onPress={() => props.navigation.navigate("NHAHM", { regiDesc: "01" })}
        >
          <JoinBtnText>???????????? ????????????</JoinBtnText>
          <Image source={require("../assets/images/refresh_bt.png")} />
        </JoinBtn>
      )}
      <WhiteContainer style={{ marginTop: 10 }}>
        {userInfo?.recommend_apply !== "Y" && (
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
              <ReferenceTitle>??????????????? ????????????</ReferenceTitle>
            </ReferenceContainer>
            <ReferenceInput
              placeholder="??????????????? ?????? ????????? ??????????????? ????????????."
              onChangeText={(t) => setRecommend(t)}
              value={recommend}
            />
            <Button onPress={onPress}>
              <BtnText>??????</BtnText>
            </Button>
          </BarcodeContainer>
        )}
        {!!userInfo?.mana_qr && (
          <MangerQRCodeContainer onPress={setIsVisible.bind(this, true)}>
            <Image source={require("../assets/images/adminqr.png")} />
          </MangerQRCodeContainer>
        )}
      </WhiteContainer>

      {!!userInfo?.mana_qr && (
        <Modal
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
          isVisible={isVisible}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          onRequestClose={setIsVisible.bind(this, false)}
        >
          <ModalContainer>
            <ModalTitle>????????? QR??????</ModalTitle>
            <QRCodeContainer>
              <QRCode value={userInfo?.mana_qr} />
            </QRCodeContainer>
            <ModalCloseButton onPress={setIsVisible.bind(this, false)}>
              <Image source={require("../assets/images/closeBtn10.png")} />
              <ModalCloseText>??????</ModalCloseText>
            </ModalCloseButton>
          </ModalContainer>
        </Modal>
      )}
    </BaseScreen>
  );
};

const JoinBtnText = styled(BaseText)({
  fontSize: 16,
  letterSpacing: -0.32,
  color: colors.GRAPEFRUIT,
  lineHeight: 23.5,
});
const JoinBtn = styled.TouchableOpacity({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 15,
  backgroundColor: "#ffffff",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.GRAPEFRUIT,
  paddingLeft: 14,
  paddingRight: 14,
  paddingTop: 2.5,
  paddingBottom: 2.5,
  alignSelf: "center",
  marginTop: 40,
  marginBottom: 20,
});

const EditButtonText = styled(BaseText)({
  fontSize: 14.5,
  letterSpacing: -0.29,
  color: colors.TRUE_WHITE,
  lineHeight: 22,
  paddingRight: 3.5,
});
const EditButton = styled.TouchableOpacity({
  backgroundColor: colors.CERULEAN_2,
  flexDirection: "row",
  paddingLeft: 11.5,
  paddingRight: 6.7,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  height: 27,
  aspectRatio: 100 / 25.9615,
  alignSelf: "flex-end",
  marginBottom: 14,
});
const ReferenceInput = styled.TextInput({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
  borderRadius: 19,
  backgroundColor: colors.WHITE,
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
  color: colors.GREYISH_BROWN,
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
  color: colors.BLACK,
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
  lineHeight: 30,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.BLACK,
  marginTop: 15,
  borderBottomWidth: 1,
  borderBottomColor: colors.WHITE,
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
  borderTopColor: colors.CERULEAN,
  borderBottomWidth: 12,
  borderBottomColor: colors.APPLE_GREEN,
  backgroundColor: colors.TRUE_WHITE,
});
const MangerQRCodeContainer = styled.TouchableOpacity({
  alignSelf: "center",
});
export const BtnText = styled(BaseText)({
  fontSize: 18,

  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.TRUE_WHITE,
  fontFamily: "Roboto-Bold",
  paddingTop: 6,
  paddingBottom: 6,
});
export const Button = styled.TouchableOpacity({
  borderRadius: 18,
  backgroundColor: colors.CERULEAN,
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
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
  alignSelf: "stretch",
});
const Text1 = styled(BaseTextStyle)({
  width: "30%",
  flexShrink: 0,
});
const Text2 = styled(BaseTextStyle)({
  flexShrink: 0,
});
Text2.defaultProps = {
  // numberOfLines: 1,
};

const TextContainer = styled.View({
  flexDirection: "row",
  marginLeft: Util.normalize(40),
  marginRight: Util.normalize(40),
  width: "100%",
  alignSelf: "stretch",
  alignItems: "center",
});
const BarcodeContainer = styled.View({
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.PINKISH_GREY,
  borderRadius: 7,
  margin: 34,
  paddingTop: 14,
  paddingBottom: 14,
});

const Container = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.TRUE_WHITE,
  marginTop: 7,
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 45,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "???????????????",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default MyInfoScreen;
