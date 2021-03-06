import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../../components/BaseScreen";
import {
  BaseButtonContainer,
  BaseText,
  BaseTouchable,
  SCREEN_WIDTH,
  StyleConstants,
} from "../../components/UI/BaseUI";
import { ExtendedWebView } from "../../components/UI/ExtendedWebView";
import { BackButton, TextTitle } from "../../components/UI/header";
import { SERVER_URL } from "../../constants";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as RootNavigation from "../../navigation/RootNavigation";
import { CHANGE_SHOP } from "../../store/actions/actionTypes";
import {
  setUserStore,
  saveUserStoreToStorage,
  fetchUserStore,
} from "../../store/actions/auth";
import * as branchesActions from "../../store/actions/branches";
import * as CommonActions from "../../store/actions/common";
import { setAlert, setIsLoading } from "../../store/actions/common";

const StoreChangeDetailScreen = (props) => {
  const storeItem = props.route.params.item;
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const isJoined = useAppSelector((state) => state.auth.isJoined);
  const branch = useAppSelector((state) => state.branches.branch);
  const [location, setLocation] = useState(null);
  const didTryStorePopup = useAppSelector(
    (state) => state.common.didTryStorePopup
  );
  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: SET_BRANCH, branch: null });
  //   };
  // }, []);
  useEffect(() => {
    if (!didTryStorePopup && isJoined) {
      RootNavigation.popToTop();
    }
  }, [didTryStorePopup]);
  useEffect(() => {
    const fetchBranch = dispatch(
      branchesActions.fetchBranch(storeItem.store_cd)
    );
    Promise.all([fetchBranch]).then(() => {
      if (branch && branch.storeInfo)
        setLocation(
          `${branch.storeInfo.lname}  ${branch.storeInfo.mname} ${branch.storeInfo.addr1} ${branch.storeInfo.addr2}`
        );
    });
  }, [dispatch]);

  const storeChangeHandler = () => {
    const msg = `?????? ???????????? ????????????\n???????????? ????????? \n?????????????????? ?????????\n ????????? ?????????????????? ???????????? ?????????????????????.\n?????????????????????????`;
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
    await dispatch({ type: CHANGE_SHOP });
    if (!isJoined) {
      await dispatch(setUserStore(branch));
      await saveUserStoreToStorage(branch);
      await dispatch(CommonActions.setBottomNavigation(true));
      await dispatch(CommonActions.setDidTryStorePopup(false));
      return;
    }
    let msg;
    dispatch(
      fetchUserStore(
        { user_cd: userInfo?.user_cd, store_cd: branch?.storeInfo?.store_cd },
        branch
      )
    ).then((data) => {
      if (data.result === "success") {
        msg = `${branch.storeInfo.store_nm}??? ?????????????????????.\n?????? ????????? ???????????? ????????????\n?????? ???????????????.`;
        dispatch(
          setAlert({
            message: msg,
            onPressConfirm: () => {
              (async () => {
                await dispatch(setAlert(null));
                await dispatch(CommonActions.setDidTryStorePopup(false));
              })();
            },
          })
        );
      }
    });
  };
  if (!branch) return <></>;

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
            uri: `${SERVER_URL}/web/about/map.do?store_cd=${branch?.storeInfo?.store_cd}`,
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
          ???????????? ?????? ??? + ????????? ?????? ?????????
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
                _.isEmpty(userStore) || !isJoined
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
                  ??????
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
    title: "????????????",
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
