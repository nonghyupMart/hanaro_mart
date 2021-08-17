import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  BaseTouchable,
  SCREEN_WIDTH,
  BaseButtonContainer,
  SCREEN_HEIGHT,
  BaseText,
} from "../BaseUI";
import { withdrawalFinish } from "../../../store/actions/auth";
import * as Util from "../../../utils";
import _ from "lodash";
import Constants from "expo-constants";
import colors from "../../../constants/Colors";

const Footer = (props) => {
  const dispatch = useDispatch();
  const storeInfo = useSelector((state) =>
    !_.isEmpty(state.auth.userStore) ? state.auth.userStore.storeInfo : {}
  );

  return (
    <BottomContainer>
      <GrayContainer>
        <Text1>
          사업자명 : {Util.emptyPrint(storeInfo && storeInfo.store_nm)}
        </Text1>
        <Text2>
          {`대표이사 : ${Util.emptyPrint(
            storeInfo && storeInfo.ceo
          )}\n사업자 등록 번호 ${Util.emptyPrint(
            storeInfo && storeInfo.biz_no
          )}\n고객만족센터 : ${Util.emptyPrint(
            storeInfo && storeInfo.support_tel
          )}\n개인정보관리책임자 : ${Util.emptyPrint(
            storeInfo && storeInfo.prv_manager
          )}\n주소 : ${Util.emptyPrint(storeInfo && storeInfo.addr)}`}
        </Text2>
        <TextArea>
          <TouchableOpacity onPress={() => props.navigation.navigate("Terms")}>
            <Text3>이용약관</Text3>
          </TouchableOpacity>
          <Text3> / </Text3>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Privacy")}
          >
            <Text3>개인정보처리방침</Text3>
          </TouchableOpacity>
        </TextArea>

        <TouchableOpacity
          delayLongPress={3000}
          onLongPress={() => {
            props.navigation.closeDrawer();
            dispatch(withdrawalFinish());
          }}
        >
          <Text3>Version : {Constants.manifest.version}</Text3>
        </TouchableOpacity>
      </GrayContainer>
    </BottomContainer>
  );
};
const Info = styled(BaseText)({
  margin: 9,
  fontSize: 10,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 12,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.PINKISH_GREY,
});
const TextArea = styled.View({
  flexDirection: "row",
});
const Text3 = styled(BaseText)({
  fontSize: 11.5,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN_THREE,
});
const Text2 = styled(BaseText)({
  marginTop: 6,
  marginBottom: 20,
  fontSize: 10,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 14.5,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN_THREE,
});
const Text1 = styled(BaseText)({
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN_THREE,
});
const GrayContainer = styled.View({
  backgroundColor: colors.WHITE2,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 16,
  paddingBottom: 10,
  width: "100%",
});
const BaseButton = styled(BaseButtonContainer)({
  width: SCREEN_WIDTH * 0.333,
  maxWidth: 120,
  marginLeft: 3,
  marginRight: 3,
});
const GreenButton = styled(BaseButton)({
  backgroundColor: colors.PINE,
});

const BlueButton = styled(BaseButtonContainer)({
  width: null,
  maxWidth: null,
  flex: 1,
  marginLeft: 16,
  marginRight: 16,
  backgroundColor: colors.CERULEAN,
});
const ButtonText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.TRUE_WHITE,
});

const BottomContainer = styled.View({
  width: "100%",
  height: "auto",
  alignItems: "flex-end",
  justifyContent: "flex-end",
});
const BlackText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_THREE,
});
const BlackBar = styled(BlackText)({});
const BlackButton = styled(BaseTouchable)({});
const BlackContainer = styled.View({
  backgroundColor: colors.BLACK,
  flexDirection: "row",
  paddingRight: 16,
  justifyContent: "flex-end",

  alignSelf: "stretch",

  // position: "absolute",
  // bottom: 0,
  // left: 0,
  // right: 0,
  // height: 40,
});
const ButtonContainer = styled.View({
  flexDirection: "row",
  paddingTop: 25,
  justifyContent: "center",
  paddingBottom: 20,
  backgroundColor: colors.TRUE_WHITE,
});
export default Footer;
