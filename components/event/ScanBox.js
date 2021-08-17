import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  BlueButton,
  BlueButtonText,
  BaseText,
  SCREEN_WIDTH,
} from "../../components/UI/BaseUI";
import { Image } from "react-native";
import colors from "../../constants/Colors";

const ScanBox = (props) => {
  if (props.eventDetail.entry.entry_date_yn !== "Y") return <></>;
  const validateAgree = props.validateAgree;
  const getBarcode = async (data) => {
    await props.setRcp_qr(data);
    props.onApply(data);
  };

  const onPress = async () => {
    await props.setRcp_qr(null);
    if (!validateAgree()) return;
    props.navigation.navigate("BarCodeScanner", {
      setRcp_qr: getBarcode,
    });
  };
  /*
    API테스트매장
    0000000000005

    사업장코드 8808983301365
    매출일자 20210809
    POS번호 1001
    영수증번호 10001
    금액 000006000
    이벤트번호  21200001

    88089833013652021080910011000100000600021200001

    관리자 QRcode
    999999999999

 */
  return (
    <TextContainer1>
      {/* <Text1>이벤트 응모방법</Text1>
      <Text2>
        {`1. 구매하신 영수증을 판매원의 QR 판독기로 스캔을 합니다. \n2. 영수증확인 후 하단에 응모하기 버튼을 클릭합니다.`}
      </Text2> */}

      {(props.eventDetail.gbn === "C" ||
        (props.eventDetail.gbn !== "C" &&
          props.eventDetail.entry.status === "10")) && (
        <>
          <Text3>영수증 확인 후 응모가 가능합니다.</Text3>
          <GreenBtn onPress={onPress}>
            <Image source={require("../../assets/images/barcode2.png")} />
            <BlueButtonText>영수증 확인</BlueButtonText>
          </GreenBtn>
        </>
      )}
      {props.eventDetail.gbn !== "C" && props.eventDetail.entry.status === "20" && (
        <GrayButton style={{ marginTop: 40 }} activeOpacity={1}>
          <Image source={require("../../assets/images/barcode2.png")} />
          <BlueButtonText>응모완료</BlueButtonText>
        </GrayButton>
      )}
    </TextContainer1>
  );
};

const GreenBtn = styled(BlueButton)({
  aspectRatio: 100 / 12.844,
  height: 42,
  backgroundColor: colors.APPLE_GREEN,
});
const GrayButton = styled(GreenBtn)({
  backgroundColor: colors.GREYISH_THREE,
});
const TextContainer1 = styled.View({
  margin: 4,
  marginTop: 18,
});
const Text3 = styled(BaseText)({
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.BLACK,
  marginBottom: 10,
});
const Text2 = styled(BaseText)({
  fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.BLACK,
  marginBottom: 35,
});
const Text1 = styled(BaseText)({
  fontSize: 16,
  fontFamily: "Roboto-Bold",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.APPLE_GREEN,
});
export default ScanBox;
