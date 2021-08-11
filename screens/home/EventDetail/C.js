import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import StampBox from "../../../components/event/StampBox";
import ScanBox from "../../../components/event/ScanBox";
import ApplyBox from "../../../components/event/ApplyBox";
import { BaseText } from "../../../components/UI/BaseUI";
import * as Util from "../../../util";
import colors from "../../../constants/Colors";

const C = (props) => {
  const entry_date_yn = props.eventDetail.entry.entry_date_yn;

  return (
    <View>
      <Container>
        <ApplyBox {...props} />
        <ScanBox {...props} />
        <Btn
          onPress={() =>
            props.navigation.navigate("StampHistory", {
              event_cd: props.eventDetail.event_cd,
            })
          }
        >
          <Text1>교환내역 확인</Text1>
        </Btn>
        {props.eventDetail.entry.stock_box === "Y" && (
          <RoundedView>
            {props.eventDetail.entry.stamp_stock > 0 && (
              <RoundedText>
                {Util.formatNumber(props.eventDetail.entry.stamp_stock)}개 남음
              </RoundedText>
            )}
            {props.eventDetail.entry.stamp_stock <= 0 && (
              <RoundedText>행사마감</RoundedText>
            )}
          </RoundedView>
        )}
      </Container>
      <StampBox {...props} />
    </View>
  );
};

const RoundedView = styled.View({
  width: 77,
  height: 26.5,
  backgroundColor: colors.GRAPEFRUIT,
  borderRadius: 27,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
});
const RoundedText = styled(BaseText)({
  letterSpacing: -0.41,
  color: colors.TRUE_WHITE,
  fontSize: 13.5,
  fontFamily: "Roboto-Medium",
});

const Btn = styled.TouchableOpacity({
  borderBottomWidth: 1,
  borderColor: colors.CERULEAN_2,
  alignSelf: "center",
  marginTop: 21,
  marginBottom: 7.5,
});
const Text1 = styled(BaseText)({
  color: colors.CERULEAN_2,
  fontSize: 16,

  // textDecoration: "underline",
});
const View = styled.View({
  width: "100%",
});
const Container = styled.View({
  paddingRight: 24,
  paddingLeft: 24,
  width: "100%",
});
export default C;
