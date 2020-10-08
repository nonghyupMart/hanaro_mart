import React, { useEffect, useState, Fragment } from "react";
import { SERVER_URL } from "@constants/settings";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { Restart } from "fiction-expo-restart";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Platform,
  Image,
} from "react-native";
import _ from "lodash";
import { BackButton, TextTitle } from "@UI/header";
import {
  BaseButtonContainer,
  BaseTouchable,
  screenWidth,
  StyleConstants,
} from "@UI/BaseUI";
import Loading from "@UI/Loading";
import { ExtendedWebView } from "@UI/ExtendedWebView";

import colors from "@constants/colors";

import StoreItem from "@components/store/StoreItem";
import BaseScreen from "@components/BaseScreen";
import * as homeActions from "@actions/home";

import * as branchesActions from "@actions/branches";
import { setUserStore } from "@actions/auth";
const StoreChangeDetailScreen = (props) => {
  const storeItem = props.route.params.item;
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isLoading, setIsLoading] = useState(false);

  const branch = useSelector((state) => state.branches.branch);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    const fetchBranch = dispatch(
      branchesActions.fetchBranch(storeItem.store_cd)
    );
    Promise.all([fetchBranch]).then(() => {
      setIsLoading(false);
      if (branch && branch.storeInfo)
        setLocation(
          `${branch.storeInfo.lname}  ${branch.storeInfo.mname} ${branch.storeInfo.addr1} ${branch.storeInfo.addr2}`
        );
    });
  }, [dispatch]);

  const [alert, setAlert] = useState();
  const storeChangeHandler = () => {
    const msg = `기존 매장에서 사용하신 스탬프와\n쿠폰은 변경매장에서 보이지 않으며\n기존매장으로 재변경시 이용가능합니다.\n변경하시겠습니까?`;
    setAlert({
      message: msg,
      onPressConfirm: () => {
        setAlert(null);
        saveStore();
      },
      onPressCancel: () => {
        setAlert(null);
      },
    });
  };
  const saveStore = () => {
    let msg;
    dispatch(
      setUserStore(
        { user_cd: userInfo.user_cd, store_cd: branch.storeInfo.store_cd },
        branch
      )
    ).then((data) => {
      if (data.result == "success") {
        msg = `${branch.storeInfo.store_nm}을 선택하셨습니다.\n나의 매장은 매장변경 메뉴에서\n변경 가능합니다.`;
        setAlert({
          message: msg,
          onPressConfirm: () => {
            setAlert(null);
            props.navigation.popToTop();
            dispatch(homeActions.clearStorePopup());
            // Restart();
          },
        });
      } else {
        msg = "매장변경에 실패하였습니다.";
        setAlert({
          message: msg,
          onPressConfirm: () => {
            setAlert(null);
            // Restart();
          },
        });
      }
    });
  };
  if (!branch) return <Loading isLoading={isLoading} />;

  return (
    <BaseScreen
      alert={alert}
      isLoading={isLoading}
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
      <StoreBox
        style={{
          height: screenWidth - 30,
          flexDirection: "row",
          overflow: "hidden",
          width: screenWidth,
        }}
      >
        <ExtendedWebView
          ref={(wv) => (webView = wv)}
          key={location}
          // url = http://dv-www.hanaromartapp.com/web/about/map.do?store_cd=
          // source={{ html: require("../../map.js")(location) }}
          source={{
            uri: `${SERVER_URL}/web/about/map.do?store_cd=${
              branch.storeInfo && branch.storeInfo.store_cd
            }`,
          }}
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
                {branch.storeInfo  && branch.storeInfo.store_nm}
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
                Tel. {branch.storeInfo  && branch.storeInfo.tel}
              </Text>
            </View>
            <BaseTouchable
              onPress={() =>
                !_.isEmpty(userStore) ? storeChangeHandler() : saveStore()
              }
            >
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
    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};
// const SearchButton = styled(BaseButtonContainer)({});

const ButtonText = styled(Text)({
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
  bottom: -1,
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
const BlueText = styled(Text)({
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
