import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  View,
  ImageBackground,
  Platform,
} from "react-native";
import BaseScreen from "../components/BaseScreen";
import { BackButton, TextTitle } from "../components/UI/header";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import {
  BaseTouchable,
  SCREEN_WIDTH,
  BaseButtonContainer,
  SCREEN_HEIGHT,
  BaseText,
} from "../components/UI/BaseUI";
import * as CommonActions from "../store/actions/common";
import { useSelector, useDispatch } from "react-redux";

const DESIRED_RATIO = "16:9";

const BarCodeScannerScreen = (props) => {
  const dispatch = useDispatch();
  const params = props.route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const camRef = useRef();
  const [ratio, setRatio] = useState("16:9");
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(false));
    };
  }, []);
  useEffect(() => {
    (async () => {
      const {
        status,
      } = await BarCodeScanner.requestForegroundPermissionsAsync();
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

      setState({ ratio });
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
        카메라에 접근 권한이 없습니다. 설정에서 카메라 권한을 승인해 주세요.
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
          <Text1>{params.isForStaff ? "관리자QR코드" : "영수증QR코드"}</Text1>
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
          padding: 18,
          paddingRight: 35,
        }}
      >
        <Image source={require("../assets/images/logo1pic478.png")} />
        <Text2>
          {params.isForStaff
            ? `관리자 휴대폰에서 하나로마트앱 실행 -> 마이페이지 -> 내정보확인에 있는 관리자QR코드를 촬영해 주세요. `
            : `하나로마트에서 구매하신 영수증의\nQR코드를 화면의 중앙에 비추면\n자동으로 인식합니다.`}
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
  color: colors.trueWhite,
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
  color: colors.trueWhite,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "QR코드 촬영",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default BarCodeScannerScreen;
