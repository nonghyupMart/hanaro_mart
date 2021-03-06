import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { StoreBox, BottomCover } from "../store/InfoBox";
import UserName from "../UI/UserName";
import UserPhoneNumber from "../UI/UserPhoneNumber";
import { Image, View } from "react-native";
import { BaseText } from "../UI/BaseUI";
import colors from "../../constants/Colors";

const MemberInfoB = (props) => {
  return (
    <StoreBox style={{}}>
      <MemberInfoContainer>
        <View style={{}}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/images/user2.png")}
              style={{ alignSelf: "center" }}
            />
            <Name>
              <UserName />
              <Title>님</Title>
            </Name>
            <BlueText>
              <UserPhoneNumber />
            </BlueText>
          </View>
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
  color: colors.BLACK,
});
const Name = styled(BaseText)({
  marginLeft: 8,
  fontSize: 24,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.BLACK,
  // paddingTop: 5,
});
const BlueText = styled(BaseText)({
  fontSize: 22,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.PINE,
  marginLeft: 17,
});
const MemberInfoContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  marginTop: 15,
  marginBottom: 36,
});
export default MemberInfoB;
