import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Image, ImageBackground,
  Platform, StyleSheet, Text, View
} from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../components/BaseScreen";
import {
  BaseText
} from "../components/UI/BaseUI";
import { BackButton, TextTitle } from "../components/UI/header";
import colors from "../constants/Colors";
import { useAppDispatch } from "../hooks";
import * as CommonActions from "../store/actions/common";

const DESIRED_RATIO = "16:9";

const BarCodeScannerScreen = (props) => {
  const dispatch = useAppDispatch();
  const params = props.route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const camRef = useRef();
  const [ratio, setRatio] = useState(DESIRED_RATIO);
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(false));
    };
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const prepareRatio = async () => {
    if (Platform.OS === "android" && camRef.current) {
      const ratios = await camRef.current.getSupportedRatiosAsync();
      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio =
        ratios.find((ratio) => ratio === DESIRED_RATIO) ||
        ratios[ratios.length - 1];

      setRatio(ratio);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    params.setRcp_qr(data);
    dispatch(CommonActions.setBottomNavigation(false));
    props.navigation.goBack();
    // props.navigation.navigate("BarCodeScanner", { rcp_qr: data });
  };

  if (hasPermission === null) {
    return <></>;
  }
  if (hasPermission === false) {
    return (
      <Text>
        ???????????? ?????? ????????? ????????????. ???????????? ????????? ????????? ????????? ?????????.
      </Text>
    );
  }

  return (
    <BaseScreen
      isScroll={false}
      style={{
        paddingBottom: 0,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Camera
        onCameraReady={prepareRatio} // You can only get the supported ratios when the camera is mounted
        ratio={ratio}
        ref={(cam) => (camRef.current = cam)}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        style={[StyleSheet.absoluteFill]}
      />
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[
          StyleSheet.absoluteFillObject,
          { width: "100%", height: "100%" },
        ]}
      > */}
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          elevation: 1,
          top: 0,
          left: 0,
        }}
      >
        <ImageBackground
          source={require("../assets/images/scannerBg.png")}
          style={{
            width: 300,
            height: 50,
            resizeMode: "contain",
            flexDirection: "row",
            padding: 14,
            paddingLeft: 23,
            alignItems: "center",
          }}
        >
          <Image source={require("../assets/images/barcodeWhite.png")} />
          <Text1>{params.isForStaff ? "?????????QR??????" : "?????????QR??????"}</Text1>
        </ImageBackground>
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          elevation: 1,
          bottom: 0,
          left: 0,
          width: "100%",

          backgroundColor: "rgba(0, 0, 0, 0.56)",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 35,
          padding: 24,
          paddingRight: 35,
        }}
      >
        <Image source={require("../assets/images/logo1pic478.png")} />
        <Text2>
          {params.isForStaff
            ? `????????? ??????????????? ?????????????????? ?????? -> ??????????????? -> ?????????????????? ?????? ?????????QR????????? ????????? ?????????. `
            : `????????????????????? ???????????? ????????????\nQR????????? ????????? ????????? ?????????\n???????????? ???????????????.`}
        </Text2>
      </View>
      {/* </BarCodeScanner> */}
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={setScanned.bind(this,false)} />
      )} */}
    </BaseScreen>
  );
};
const Text2 = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.TRUE_WHITE,
  marginLeft: 25.5,
});
const Text1 = styled(BaseText)({
  marginLeft: 10.8,
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.TRUE_WHITE,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "QR?????? ??????",
    contentStyle: {
      paddingBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default BarCodeScannerScreen;
