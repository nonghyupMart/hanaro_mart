import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { StoreBox, BottomCover } from "@components/store/InfoBox";
import UserName from "@UI/UserName";
import UserPhoneNumber from "@UI/UserPhoneNumber";
import { Image, View } from "react-native";
import { BaseText } from "@UI/BaseUI";
const MemberInfo = (props) => {
  return (
    <StoreBox style={{}}>
      <MemberInfoContainer>
        <Image source={require("@images/unlocked.png")} />
        <View style={{ marginLeft: 18 }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("@images/user2.png")} />
            <Name>
              <UserName />
              <Title>님</Title>
            </Name>
          </View>
          <BlueText>
            <UserPhoneNumber />
          </BlueText>
        </View>
      </MemberInfoContainer>
      <BottomCover />
    </StoreBox>
  );
};
const Title = styled(BaseText)({
  fontSize: 20,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 29,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Name = styled(BaseText)({
  marginLeft: 8,
  fontSize: 30,
  fontWeight: "normal",
  fontStyle: "normal",
  // lineHeight: 1,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const BlueText = styled(BaseText)({
  fontSize: 22,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.cerulean,
});
const MemberInfoContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  marginTop: 48,
  marginBottom: 59,
});
export default MemberInfo;
