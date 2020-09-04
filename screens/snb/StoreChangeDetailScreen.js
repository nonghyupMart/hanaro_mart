import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Platform,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import { BackButton, TextTitle } from "@UI/header";
import {
  BaseButtonContainer,
  BaseTouchable,
  screenWidth,
  StyleConstants,
} from "@UI/BaseUI";

import * as Location from "expo-location";
import * as Linking from "expo-linking";
import colors from "@constants/colors";

import StoreItem from "@components/store/StoreItem";
import BaseScreen from "@components/BaseScreen";
import StoreChangeDetail from "@components/store/StoreChangeDetail";

import * as branchesActions from "@actions/branches";

const StoreChangeDetailScreen = (props) => {
  const dispatch = useDispatch();
  const isAgreed = useSelector((state) => state.auth.isAgreed);

  const [isInitialized, setIsInitialized] = useState(false);

  const [selectedItem, setSelectedItem] = useState(2);

  const [isBranchSelected, setIsBranchSelected] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, title: "" });

  useEffect(() => {
    if (isAgreed)
      props.navigation.setOptions({
        title: "매장변경",
        headerLeft: (props) => <BackButton {...props} />,
      });
  }, [isAgreed]);
  const address1 = useSelector((state) => state.branches.address1);

  const onPickerSelect = (index) => {
    setSelectedItem(() => index);
  };

  const popupHandler = (item) => {
    setIsBranchSelected((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };
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

  return (
    <BaseScreen
      isInitialized={location === undefined ? false : location}
      style={{
        backgroundColor: colors.trueWhite,
        paddingRight: 0,
        paddingLeft: 0,
      }}
      contentStyle={{
        paddingTop: 0,
        backgroundColor: colors.trueWhite,
      }}
      scrollListStyle={{ paddingRight: 0, paddingLeft: 0 }}
    >
      <StoreBox style={{ height: screenWidth, flexDirection: "row" }}>
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
        <BottomCover />
      </StoreBox>
      <WhiteContainer
        style={{
          justifyContent: "flex-start",
          paddingLeft: StyleConstants.defaultPadding,
          paddingRight: StyleConstants.defaultPadding,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: 17,
            letterSpacing: 0,
            textAlign: "center",
            color: colors.greyishBrown,
          }}
        >
          매장위치 확인 후 + 설정을 눌러 주세요
        </Text>
        <View
          style={{
            marginTop: 13,
            flex: 1,
            height: 94,
            borderRadius: 13,
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: colors.cerulean,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 31,
              marginRight: 23,
              flex: 1,
            }}
          >
            <Image source={require("@images/num407.png")} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  fontStyle: "normal",
                  lineHeight: 24,
                  letterSpacing: 0,

                  color: colors.greyishBrown,
                }}
              >
                하나로마트 신촌점
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 20,
                  letterSpacing: 0,
                  textAlign: "left",
                  color: colors.appleGreen,
                }}
              >
                Tel. 0234981100
              </Text>
            </View>
            <BaseTouchable>
              <View
                style={{
                  width: 53,
                  height: 53,
                  borderRadius: 4,
                  backgroundColor: colors.cerulean,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={require("@images/locationwhite.png")} />
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 14,
                    fontWeight: "normal",
                    fontStyle: "normal",

                    letterSpacing: 0,
                    textAlign: "left",
                    color: colors.trueWhite,
                  }}
                >
                  설정
                </Text>
              </View>
            </BaseTouchable>
          </View>
        </View>
      </WhiteContainer>
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "매장설정",
    headerLeft: () => <></>,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};
// const SearchButton = styled(BaseButtonContainer)({});

const ButtonText = styled.Text({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const BaseSmallButton = styled(BaseButtonContainer)({
  width: 114,
  height: 24,
  borderRadius: 11,
});
const BlueButton = styled(BaseSmallButton)({
  backgroundColor: colors.cerulean,
});
const GrayButton = styled(BaseSmallButton)({
  backgroundColor: colors.pinkishGrey,
});
const BlueRoundView = styled.View({
  //    borderBottomLeftRadius: number
  // - borderBottomRightRadius: number
  // - borderTopLeftRadius: number
  // - borderTopRightRadius: number
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  backgroundColor: colors.cerulean,
  height: 40,
});

const WhiteContainer = styled.View({
  paddingTop: 6,
  width: "100%",
  backgroundColor: colors.trueWhite,
  flex: 1,
});
const BottomCover = styled.ImageBackground({
  width: "100%",
  height: 22,
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 3, // works on ios
  elevation: 3, // works on android
  overflow: "visible",
  backfaceVisibility: "visible",
  flex: 1,
});
BottomCover.defaultProps = {
  source: require("@images/num_m.png"),
  resizeMode: "cover",
};
const BlueText = styled.Text({
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.cerulean,
  marginBottom: 50,
});
const Plus = styled.Image({ marginTop: 19, marginBottom: 10 });

Plus.defaultProps = {
  source: require("@images/plusblue.png"),
};
const StoreBox = styled.View({
  flex: 1,
  width: "100%",
  backgroundColor: colors.white,

  alignItems: "center",
});

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
  },
  picker: {
    flexGrow: 1,

    color: colors.greyishBrown,
  },
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
export default StoreChangeDetailScreen;
