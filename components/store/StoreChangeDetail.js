import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, Alert, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { WebView } from "react-native-webview";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

import * as RootNavigation from "../../navigation/RootNavigation";
import { setAgreePolicy } from "../../store/actions/auth";

const StoreChangeDetail = (props) => {
  const dispatch = useDispatch();
  const isAgreed = useSelector((state) => state.auth.isAgreed);
  let [webView, setWebview] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let provider = await Location.getProviderStatusAsync();
      // console.log(provider);
      if (location == null) {
        let location = await Location.getCurrentPositionAsync({
          maximumAge: 60000, // only for Android
          accuracy: Platform.Android
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
        });
        setLocation(location);
        // console.log(location);
      }
    })();
  });
  const onMessage = (obj) => {
    // console.log(obj.nativeEvent.data);
    Linking.openURL(obj.nativeEvent.data);
  };

  const confirmHandler = () => {
    Alert.alert(
      "",
      "기존 매장에서 사용하신 스탬프와 쿠폰은 변경매장에서 보이지 않으며 기존매장으로 재변경시 이용가능합니다.변경하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            alertConfirm();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const alertConfirm = () => {
    Alert.alert(
      "",
      props.currentItem.title +
        "을 선택하셨습니다.\n나의 매장은 매장변경 메뉴에서 변경 가능합니다.",
      [
        {
          text: "확인",
          onPress: () => {
            if (!isAgreed) dispatch(setAgreePolicy(true));
            else {
              props.setIsVisible(() => false);
              RootNavigation.popToTop();
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* <Text
        style={{
          width: "100%",
        }}
      >
        {props.currentItem && props.currentItem.title}
      </Text>
      <View style={[styles.row]}></View> */}

      <WebView
        ref={(wv) => (webView = wv)}
        key={location}
        scalesPageToFit={true}
        originWhitelist={["*"]}
        allowFileAccess={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        source={{ html: require("../../map.js")(location) }}
        // onNavigationStateChange={_onNavigationStateChange.bind(this)}
        startInLoadingState={false}
        onMessage={onMessage}
      />
      {/* <Button title="설정" onPress={confirmHandler} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
});
export default StoreChangeDetail;
