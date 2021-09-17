import Constants from "expo-constants";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { withdrawalFinish } from "../../../store/actions/auth";
import * as Util from "../../../utils";
import { BaseText } from "../BaseUI";

const Footer = (props) => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.auth.userStore);

  return (
    <BottomContainer>
      <GrayContainer>
        <Text1>
          사업자명 : {Util.emptyPrint(userStore?.storeInfo?.store_nm)}
        </Text1>
        <Text2>
          {`대표이사 : ${Util.emptyPrint(
            userStore?.storeInfo?.ceo
          )}\n사업자 등록 번호 ${Util.emptyPrint(
            userStore?.storeInfo?.biz_no
          )}\n고객만족센터 : ${Util.emptyPrint(
            userStore?.storeInfo?.support_tel
          )}\n개인정보관리책임자 : ${Util.emptyPrint(
            userStore?.storeInfo?.prv_manager
          )}\n주소 : ${Util.emptyPrint(userStore?.storeInfo?.addr)}`}
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
          <Text3>Version : {Constants?.manifest?.version}</Text3>
        </TouchableOpacity>
      </GrayContainer>
    </BottomContainer>
  );
};

const TextArea = styled.View({
  flexDirection: "row",
});
const Text3 = styled(BaseText)({
  fontSize: 11.5,
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN_THREE,
});
const Text2 = styled(BaseText)({
  marginTop: 6,
  marginBottom: 20,
  fontSize: 10,
  lineHeight: 14.5,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN_THREE,
});
const Text1 = styled(BaseText)({
  fontSize: 14,
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
const BottomContainer = styled.View({
  width: "100%",
  height: "auto",
  alignItems: "flex-end",
  justifyContent: "flex-end",
});

export default Footer;
