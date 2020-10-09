import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
  BaseText,
} from "@UI/BaseUI";
import { setPreview } from "@actions/auth";
import * as Util from "@util";
import _ from "lodash";
const LoginButtons = (props) => {
  const dispatch = useDispatch();
  const storeInfo = useSelector((state) =>
    !_.isEmpty(state.auth.userStore) ? state.auth.userStore.storeInfo : {}
  );
  const isJoin = useSelector((state) => state.auth.isJoin);

  const onPressJoin = () => {
    props.navigation.closeDrawer();
    dispatch(setPreview(false));
  };
  return (
    <BottomContainer>
      <ButtonContainer>
        {/* <GreenButton>
          <ButtonText>로그인</ButtonText>
        </GreenButton> */}
        {!isJoin && (
          <BlueButton onPress={() => onPressJoin()}>
            <ButtonText>회원가입</ButtonText>
          </BlueButton>
        )}
      </ButtonContainer>

      <GrayContainer>
        <Text1>
          사업자명 : {Util.emptyPrint(storeInfo && storeInfo.store_nm)}
        </Text1>
        <Text2>
          {`대표이사 : ${Util.emptyPrint(
            storeInfo && storeInfo.ceo
          )} / 사업자 등록 번호 ${Util.emptyPrint(
            storeInfo && storeInfo.biz_no
          )} ${Util.emptyPrint(
            storeInfo && storeInfo.addr
          )} 고객만족센터 : ${Util.emptyPrint(
            storeInfo && storeInfo.support_tel
          )} / 개인정보관리책임자 : ${Util.emptyPrint(
            storeInfo && storeInfo.prv_manager
          )}`}
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
      </GrayContainer>
      <BlackContainer>
        <Info>{`하나로마트앱은 하나로마트에서 독립적으로 운영하는 서비스로서 이용자와 하나로마트간의 양자간 거래이며, 모바일앱을 공급 관리하는 농협하나로유통과는 거래당사자가 아니며 보증책임도 지지않음을 양지하여 주시기 바랍니다.`}</Info>
      </BlackContainer>
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
  color: colors.pinkishGrey,
});
const TextArea = styled.View({
  flexDirection: "row",
});
const Text3 = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Text2 = styled(BaseText)({
  marginTop: 2,
  marginBottom: 4,
  fontSize: 10,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 12,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const Text1 = styled(BaseText)({
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const GrayContainer = styled.View({
  backgroundColor: colors.white,
  paddingLeft: 21,
  paddingRight: 21,
  paddingTop: 10,
  paddingBottom: 10,
  width: "100%",
});
const BaseButton = styled(BaseButtonContainer)({
  width: screenWidth * 0.333,
  maxWidth: 120,
  marginLeft: 3,
  marginRight: 3,
});
const GreenButton = styled(BaseButton)({
  backgroundColor: colors.pine,
});

const BlueButton = styled(BaseButtonContainer)({
  width: null,
  maxWidth: null,
  flex: 1,
  marginLeft: 16,
  marginRight: 16,
  backgroundColor: colors.cerulean,
});
const ButtonText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
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
  color: colors.greyishThree,
});
const BlackBar = styled(BlackText)({});
const BlackButton = styled(BaseTouchable)({});
const BlackContainer = styled.View({
  backgroundColor: colors.black,
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
  backgroundColor: colors.trueWhite,
});
export default LoginButtons;
