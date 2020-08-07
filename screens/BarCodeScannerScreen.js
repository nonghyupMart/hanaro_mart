import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  View,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const BarCodeScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 5555,
            elevation: 5555,
            top: 150,
            marginTop: 100,
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 50,
              resizeMode: "stretch",
            }}
            source={{
              uri:
                "http://img-m.nonghyupmall.com//prdimg/02/003/005/001/009//4002685492_0_320_20200428155054.jpg",
            }}
          />
        </View>
      </BarCodeScanner>

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "바코드 촬영",
  };
};

export default BarCodeScannerScreen;
