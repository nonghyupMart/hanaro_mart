import * as Brightness from "expo-brightness";
import React, { useEffect, useState } from "react";
// import Barcode from "react-native-jsbarcode";
import { Image, Platform } from "react-native";
import styled from "styled-components/native";
import { DOMImplementation, XMLSerializer } from "xmldom";
import Barcode from "../../components/Barcode";
import BaseScreen from "../../components/BaseScreen";
import {
  BaseButtonContainer,
  BaseText,
  SCREEN_WIDTH,
} from "../../components/UI/BaseUI";
import { BackButton, TextTitle } from "../../components/UI/header";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as CommonActions from "../../store/actions/common";
import { setAlert } from "../../store/actions/common";

const MAXIMUM_TIME = 300;

const BarcodeScreen = (props) => {
  const params = props.route.params;
  const dispatch = useAppDispatch();
  const brightness = useAppSelector((state) => state.common.brightness);
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
    (async () => {
      const currentBrightLevel = await Brightness.getBrightnessAsync();
      await dispatch(CommonActions.setBrightness(currentBrightLevel));
      await Brightness.setBrightnessAsync(1);
    })();
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      (async () => {
        dispatch(CommonActions.setBottomNavigation(true));
        if (brightness && Platform.OS === "ios")
          await Brightness.setBrightnessAsync(brightness);
        await Brightness.useSystemBrightnessAsync();
      })();
    };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (elapsedTime < MAXIMUM_TIME) {
        setElapsedTime(() => elapsedTime + 1);
      }

      if (elapsedTime >= MAXIMUM_TIME) {
        clearInterval(timer);
        props.navigation.pop();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // return clearInterval(timer);
  }, [elapsedTime]);

  const onError = () => {
    dispatch(
      setAlert({
        message: "?????????????????? ???????????? ????????????. ??????????????? ??????????????????.",
        onPressConfirm: () => {
          dispatch(setAlert(null));
          props.navigation.pop();
        },
      })
    );
  };
  return (
    <BaseScreen
      style={{ paddingLeft: 0, paddingRight: 0 }}
      contentStyle={{ paddingTop: 0 }}
    >
      <Container>
        <TimerText>
          <Now>{elapsedTime}</Now>/{MAXIMUM_TIME}
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
          onError={onError}
        />
      </Container>
      <WarnContainer>
        <Image source={require("../../assets/images/icon60px.png")} />
        <Warn>
          ???????????? ????????? ?????? ???????????????.{"\n"}???????????? ????????? 1:1
          ??????/??????????????? ?????? ????????? ????????????.
        </Warn>
      </WarnContainer>
      <BlueButton onPress={() => props.navigation.pop()}>
        <Image source={require("../../assets/images/ic_gps_off_24px.png")} />
        <BlueButtonText>???????????? ??????</BlueButtonText>
      </BlueButton>
    </BaseScreen>
  );
};
const BlueButtonText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.TRUE_WHITE,
  marginLeft: 9,
});
const BlueButton = styled(BaseButtonContainer)({
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.CERULEAN,
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
  width: SCREEN_WIDTH - 24 * 2,
  alignSelf: "center",
  aspectRatio: 100 / 12.804,
});
const Warn = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
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
const Now = styled(BaseText)({
  color: colors.APPLE_GREEN,
});
const TimerText = styled(BaseText)({
  marginTop: 45,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.GREYISH_BROWN,
  marginBottom: 5,
  flex: 1,
  width: "100%",
  marginRight: 35,
});
const TimerBar = styled.View({
  width: (props) => {
    return (props.elapsedTime * props.barContainerWidth) / MAXIMUM_TIME;
  },
  flex: 1,
  backgroundColor: colors.APPLE_GREEN,
});
const TimerBarContainer = styled.View({
  overflow: "hidden",

  marginBottom: 70,
  width: SCREEN_WIDTH - 50,
  aspectRatio: 100 / 7.042,
  backgroundColor: colors.PINKISH_GREY,
  borderRadius: 20,
});
const Container = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.TRUE_WHITE,
  marginTop: 7,
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 45,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "??????",
    contentStyle: {
      paddingBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default BarcodeScreen;
