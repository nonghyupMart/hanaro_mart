import React, { useEffect, useState, Fragment } from "react";
import { SERVER_URL } from "../../constants";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import * as Updates from "expo-updates";
import { View, StyleSheet, Image } from "react-native";
import _ from "lodash";
import { BackButton, TextTitle } from "../../components/UI/header";
import {
  BaseButtonContainer,
  BaseTouchable,
  SCREEN_WIDTH,
  StyleConstants,
  BaseText,
} from "../../components/UI/BaseUI";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import * as Util from "../../utils";
import colors from "../../constants/Colors";

import StoreItem from "../../components/store/StoreItem";
import BaseScreen from "../../components/BaseScreen";
import * as homeActions from "../../store/actions/home";

import * as branchesActions from "../../store/actions/branches";
import {
  setUserStore,
  saveUserStore,
  saveUserStoreToStorage,
} from "../../store/actions/auth";
import { setAlert, setIsLoading } from "../../store/actions/common";
import { SET_BRANCH } from "../../store/actions/actionTypes";
import * as CommonActions from "../../store/actions/common";
import * as RootNavigation from "../../navigation/RootNavigation";

const StoreChangeDetailScreen = (props) => {
  const storeItem = props.route.params.item;
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.common.isLoading);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const branch = useSelector((state) => state.branches.branch);
  const [location, setLocation] = useState(null);
  const didTryPopup = useSelector((state) => state.common.didTryPopup);
  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: SET_BRANCH, branch: null });
  //   };
  // }, []);
  useEffect(() => {
    // console.warn("didTryPopup2", didTryPopup);
    if (!didTryPopup && isJoin) {
      RootNavigation.popToTop();
    }
  }, [didTryPopup]);
  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchBranch = dispatch(
      branchesActions.fetchBranch(storeItem.store_cd)
    );
    Promise.all([fetchBranch]).then(() => {
      dispatch(setIsLoading(false));
      if (branch && branch.storeInfo)
        setLocation(
          `${branch.storeInfo.lname}  ${branch.storeInfo.mname} ${branch.storeInfo.addr1} ${branch.storeInfo.addr2}`
        );
    });
  }, [dispatch]);

  const storeChangeHandler = () => {
    const msg = `기존 매장에서 사용하신\n스탬프와 쿠폰은 \n변경매장에서 보이지\n 않으며 기존매장으로 재변경시 이용가능합니다.\n변경하시겠습니까?`;
    dispatch(
      setAlert({
        message: msg,
        onPressConfirm: () => {
          dispatch(setAlert(null));
          saveStore();
        },
        onPressCancel: () => {
          dispatch(setAlert(null));
        },
      })
    );
  };
  const saveStore = async () => {
    if (!branch || !branch.storeInfo) return;
    await dispatch(setIsLoading(true));
    if (!isJoin) {
      await dispatch(saveUserStore(branch));
      await saveUserStoreToStorage(branch);
      await dispatch(CommonActions.setBottomNavigation(true));
      await dispatch(CommonActions.setDidTryPopup(false));
      await dispatch(setIsLoading(false));
      return;
    }
    let msg;
    dispatch(
      setUserStore(
        { user_cd: userInfo.user_cd, store_cd: branch.storeInfo.store_cd },
        branch
      )
    ).then((data) => {
      if (data.result === "success") {
        msg = `${branch.storeInfo.store_nm}을 선택하셨습니다.\n나의 매장은 매장설정 메뉴에서\n변경 가능합니다.`;
        dispatch(
          setAlert({
            message: msg,
            onPressConfirm: () => {
              (async () => {
                dispatch(setAlert(null));
                await props.navigation.navigate("Home");
                await dispatch(CommonActions.setDidTryPopup(false));
              })();
            },
          })
        );
      }
    });
  };
  if (!branch || isLoading) return <></>;

  return (
    <BaseScreen
      style={{
        backgroundColor: colors.TRUE_WHITE,
        paddingRight: 0,
        paddingLeft: 0,
      }}
      contentStyle={{
        paddingTop: 0,
        backgroundColor: colors.TRUE_WHITE,
      }}
      scrollListStyle={{ paddingRight: 0, paddingLeft: 0 }}
    >
      <StoreBox
        style={{
          height: SCREEN_WIDTH - 30,
          flexDirection: "row",
          overflow: "hidden",
          width: SCREEN_WIDTH,
        }}
      >
        <ExtendedWebView
          startInLoadingState={true}
          indicatorSize="small"
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
        <BaseText
          style={{
            fontSize: 12,
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: 17,
            letterSpacing: 0,
            textAlign: "center",
            color: colors.GREYISH_BROWN,
          }}
        >
          매장위치 확인 후 + 설정을 눌러 주세요
        </BaseText>
        <View
          style={{
            marginTop: 13,
            flex: 1,
            height: 94,
            borderRadius: 13,
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: colors.CERULEAN,
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
            <Image source={require("../../assets/images/num407.png")} />
            <View style={{ flex: 1 }}>
              <BaseText
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  fontStyle: "normal",
                  lineHeight: 24,
                  letterSpacing: 0,

                  color: colors.GREYISH_BROWN,
                }}
              >
                {branch.storeInfo && branch.storeInfo.store_nm}
              </BaseText>
              <BaseText
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 20,
                  letterSpacing: 0,
                  textAlign: "left",
                  color: colors.APPLE_GREEN,
                }}
              >
                Tel. {branch.storeInfo && branch.storeInfo.support_tel}
              </BaseText>
            </View>
            <BaseTouchable
              onPress={() =>
                _.isEmpty(userStore) || !isJoin
                  ? saveStore()
                  : storeChangeHandler()
              }
            >
              <View
                style={{
                  width: 53,
                  height: 53,
                  borderRadius: 4,
                  backgroundColor: colors.CERULEAN,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/locationwhite.png")}
                />
                <BaseText
                  style={{
                    marginTop: 2,
                    fontSize: 14,
                    fontWeight: "normal",
                    fontStyle: "normal",

                    letterSpacing: 0,
                    textAlign: "left",
                    color: colors.TRUE_WHITE,
                  }}
                >
                  설정
                </BaseText>
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

const ButtonText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
});
const BaseSmallButton = styled(BaseButtonContainer)({
  width: 114,
  height: 24,
  borderRadius: 11,
});
const BlueButton = styled(BaseSmallButton)({
  backgroundColor: colors.CERULEAN,
});
const GrayButton = styled(BaseSmallButton)({
  backgroundColor: colors.PINKISH_GREY,
});
const BlueRoundView = styled.View({
  //    borderBottomLeftRadius: number
  // - borderBottomRightRadius: number
  // - borderTopLeftRadius: number
  // - borderTopRightRadius: number
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  backgroundColor: colors.CERULEAN,
  height: 40,
});

const WhiteContainer = styled.View({
  paddingTop: 6,
  width: "100%",
  backgroundColor: colors.TRUE_WHITE,
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
  source: require("../../assets/images/num_m.png"),
  resizeMode: "cover",
};
const BlueBaseText = styled(BaseText)({
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.CERULEAN,
  marginBottom: 50,
});
const Plus = styled.Image({ marginTop: 19, marginBottom: 10 });

Plus.defaultProps = {
  source: require("../../assets/images/plusblue.png"),
};
const StoreBox = styled.View({
  flex: 1,
  width: "100%",
  backgroundColor: colors.WHITE,

  alignItems: "center",
});

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
  },
  picker: {
    flexGrow: 1,

    color: colors.GREYISH_BROWN,
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
  summaryBaseText: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  amount: {
    color: colors.PRIMARY,
  },
});
export default StoreChangeDetailScreen;
