import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import JsBarcode from "jsbarcode";

import { DOMImplementation, XMLSerializer } from "xmldom";
import { screenWidth, BaseButtonContainer } from "@UI/BaseUI";

// import Barcode from "react-native-jsbarcode";
import {
  SafeAreaView,
  View,
  Text as TextView,
  StyleSheet,
  FlatList,
  BackHandler,
  Image,
} from "react-native";

import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import Barcode from "@components/Barcode";

const BarcodeScreen = (props) => {
  const [alert, setAlert] = useState();
  const params = props.route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isBarcodeSafe, setIsBarcodeSafe] = useState(false);
  const [svgBarcode, setSvgBarcode] = useState();
  const xmlSerializer = new XMLSerializer();
  const document = new DOMImplementation().createDocument(
    "http://www.w3.org/1999/xhtml",
    "html",
    null
  );
  const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // "2921117012053";
  const [barcode, setBarcode] = useState(params.barcode);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [barContainerWidth, setBarContainerWidth] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (elapsedTime < 120) {
        setElapsedTime(() => elapsedTime + 1);
      }

      if (elapsedTime >= 120) {
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // return clearInterval(timer);
  }, [elapsedTime]);

  return (
    <BaseScreen
      isBottomNavigation={false}
      alert={alert}
      isLoading={isLoading}
      style={{ paddingLeft: 0, paddingRight: 0 }}
      contentStyle={{ paddingTop: 0 }}
    >
      <Container>
        <TimerText>
          <Now>{elapsedTime}</Now>/120
        </TimerText>
        <TimerBarContainer
          onLayout={(event) =>
            setBarContainerWidth(event.nativeEvent.layout.width)
          }
        >
          <TimerBar
            elapsedTime={elapsedTime}
            barContainerWidth={barContainerWidth}
          />
        </TimerBarContainer>

        <Barcode
          width={3}
          height={100}
          value={barcode}
          format="EAN13"
          flat
          text={barcode}
          onError={() => console.warn("Barcode Error")}
        />
      </Container>
      <WarnContainer>
        <Image source={require("@images/icon60px.png")} />
        <Warn>
          해당되는 쿠폰이 사용 되었습니다.{"\n"}궁금하신 사항은 1:1
          문의/고객센터로 문의 하시기 바랍니다.
        </Warn>
      </WarnContainer>
      <BlueButton onPress={{}}>
        <Image source={require("@images/ic_gps_off_24px.png")} />
        <BlueButtonText>쿠폰확인 닫기</BlueButtonText>
      </BlueButton>
    </BaseScreen>
  );
};
const BlueButtonText = styled.Text({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
  marginLeft: 9,
});
const BlueButton = styled(BaseButtonContainer)({
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.cerulean,
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
  width: screenWidth - 18 * 2,
  alignSelf: "center",
  aspectRatio: 100 / 12.804,
});
const Warn = styled.Text({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 18,
  flex: 1,
});
const WarnContainer = styled.View({
  overflow: "hidden",
  marginTop: 22,
  flexDirection: "row",
  marginLeft: 28,
  marginRight: 28,
  marginBottom: 22,
  flex: 1,
});
const Now = styled.Text({
  color: colors.appleGreen,
});
const TimerText = styled.Text({
  marginTop: 45,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginBottom: 5,
  flex: 1,
  width: "100%",
  marginRight: 35,
});
const TimerBar = styled.View({
  width: (props) => {
    return (props.elapsedTime * props.barContainerWidth) / 120;
  },
  flex: 1,
  backgroundColor: colors.appleGreen,
});
const TimerBarContainer = styled.View({
  overflow: "hidden",

  marginBottom: 70,
  width: screenWidth - 50,
  aspectRatio: 100 / 7.042,
  backgroundColor: colors.pinkishGrey,
  borderRadius: 20,
});
const Container = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.trueWhite,
  marginTop: 7,
  paddingLeft: 18,
  paddingRight: 18,
  paddingBottom: 45,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "쿠폰",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BarcodeScreen;
