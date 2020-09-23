import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
} from "@UI/BaseUI";
import { setPreview } from "@actions/auth";

const LoginButtons = (props) => {
  const dispatch = useDispatch();
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const onPressJoin = () => {
    props.navigation.closeDrawer();
    dispatch(setPreview(false));
  };
  return (
    <BottomContainer>
      {(!agreedStatus || Object.keys(agreedStatus).length === 0) && (
        <ButtonContainer>
          {/* <GreenButton>
          <ButtonText>로그인</ButtonText>
        </GreenButton> */}
          <BlueButton onPress={() => onPressJoin()}>
            <ButtonText>회원가입</ButtonText>
          </BlueButton>
        </ButtonContainer>
      )}
      <BlackContainer>
        <BlackButton onPress={() => props.navigation.navigate("Terms")}>
          <BlackText>이용약관</BlackText>
        </BlackButton>
        <BlackBar> | </BlackBar>
        <BlackButton onPress={() => props.navigation.navigate("Privacy")}>
          <BlackText>개인정보처리방침</BlackText>
        </BlackButton>
      </BlackContainer>
    </BottomContainer>
  );
};
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
const ButtonText = styled.Text({
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
const BlackText = styled.Text({
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
  paddingTop: 13,
  alignSelf: "stretch",

  paddingBottom: 13,
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
