import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import moment from "moment";
import { BaseText } from "../../components/UI/BaseUI";
import { formatPhoneNumber } from "../../util";

const JoinPopupContent = (props) => {
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const date = moment();
  return (
    <Container>
      <GreenText>전화번호 인증이 완료되었습니다.</GreenText>
      <WhiteText>
        {userInfo && userInfo.user_id
          ? formatPhoneNumber(userInfo.user_id)
          : ""}
      </WhiteText>
      <Text6>{`고객님께서는 ${date.format("YYYY")}년 ${date.format(
        "MM"
      )}월 ${date.format("DD")}일\n아래항목에 동의하셨습니다.`}</Text6>
      <List
        data={Object.keys(agreedStatus)}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index, separators }) => {
          if (agreedStatus[item].isChecked)
            return (
              <Line
                style={{
                  marginTop: index === 0 ? 20 : 0,
                }}
              >
                <Icon source={require("../../assets/images/checkmark.png")} />
                <SmallText>{agreedStatus[item].title}</SmallText>
              </Line>
            );
        }}
      />
    </Container>
  );
};
export const List = styled.FlatList({ marginTop: -10 });
const GreenText = styled(BaseText)({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.APPLE_GREEN,
});
const WhiteText = styled(BaseText)({
  fontSize: 24,
  color: colors.TRUE_WHITE,
  textAlign: "center",
});
const Container = styled.View({
  marginTop: 0,
  paddingBottom: 30,
});
const Line = styled.View({
  flexDirection: "row",
  marginLeft: 50,
  marginRight: 50,
  flexShrink: 1,
});
export const Text6 = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.TRUE_WHITE,
  // marginLeft: 10,
  flexShrink: 1,
  marginRight: 20,
  marginTop: 10,
  marginBottom: 0,
});

const SmallText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 25,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.TRUE_WHITE,
  marginLeft: 10,
  flexShrink: 1,
});
const Icon = styled.Image({ marginTop: 5 });

export default JoinPopupContent;
