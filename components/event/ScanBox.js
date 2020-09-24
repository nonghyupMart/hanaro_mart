import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { BlueButton, BlueButtonText } from "@UI/BaseUI";
import { Image } from "react-native";

const ScanBox = (props) => {
  const getBarcode = (data) => {
    props.setRcp_qr(data);

    if (props.scrollRef)
      setTimeout(() => {
        props.scrollRef.scrollToEnd();
      }, 500);
  };

  const onPress = () => {
    props.navigation.navigate("BarCodeScanner", {
      setRcp_qr: getBarcode,
    });
  };
  return (
    <TextContainer1>
      <Text1>이벤트 응모방법</Text1>
      <Text2>
        {`1. 구매하신 영수증을 판매원의 QR 판독기로 스캔을 합니다. \n2. 영수증확인 후 하단에 응모하기 버튼을 클릭합니다.`}
      </Text2>
      <Text3>영수증 확인 후 응모가 가능합니다.</Text3>
      <GreenBtn onPress={onPress}>
        <Image source={require("@images/barcode2.png")} />
        <BlueButtonText>영수증 확인</BlueButtonText>
      </GreenBtn>
    </TextContainer1>
  );
};
const GreenBtn = styled(BlueButton)({
  backgroundColor: colors.appleGreen,
});
const TextContainer1 = styled.View({
  margin: 4,
  marginTop: 18,
  marginBottom: 42,
});
const Text3 = styled.Text({
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
  marginBottom: 10,
});
const Text2 = styled.Text({
  fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
  marginBottom: 35,
});
const Text1 = styled.Text({
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
});
export default ScanBox;
