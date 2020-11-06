import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import Carousel from "@UI/Carousel";
import {
  StyleConstants,
  BaseImage,
  ScaledImage,
  BaseTouchable,
  screenWidth,
  screenHeight,
  BaseText,
} from "@UI/BaseUI";
import _ from "lodash";
import * as Linking from "expo-linking";
import * as CommonActions from "@actions/common";
import * as homeActions from "@actions/home";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, Platform } from "react-native";
import { SET_STORE_POPUP } from "@actions/home";
import moment from "moment";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import * as RootNavigation from "@navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { getIsStorePopup } from "@screens/StartupScreen";

const PopupScreen = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isStorePopup = useSelector((state) => state.common.isStorePopup);
  const storePopup = useSelector((state) => state.home.storePopup);
  const isPreview = useSelector((state) => state.auth.isPreview);
  let isPopupStoreFromStorage;
  (async () => {
    isPopupStoreFromStorage = await getIsStorePopup(userStore, dispatch);
  })();
  useEffect(() => {
    return () => {
      dispatch(CommonActions.setIsLoading(false));

      dispatch({
        type: SET_STORE_POPUP,
        storePopup: null,
      });
    };
  }, []);

  useEffect(() => {
    if (isPreview) {
      dispatch(CommonActions.setDidTryPopup(true));
      return;
    }
  }, [isPreview]);
  useEffect(() => {
    (async () => {
      if (!_.isEmpty(userStore)) {
        dispatch(CommonActions.setIsLoading(true));
        dispatch(
          homeActions.fetchPopup({ store_cd: userStore.storeInfo.store_cd })
        ).then(async (data) => {
          dispatch(CommonActions.setIsLoading(false));
          // console.warn("storePopup.popupCnt", data.popupCnt);
          if (data.popupCnt > 0) {
            let setDate = moment().subtract(1, "days");

            // console.warn(isPopupStoreFromStorage);
            if (isPopupStoreFromStorage[userStore.storeInfo.store_cd]) {
              setDate = moment(
                isPopupStoreFromStorage[userStore.storeInfo.store_cd]
              );
            }
            //   setIsVisible(moment(setDate).isBefore(moment(), "day"));
            if (!moment(setDate).isBefore(moment(), "day")) {
              dispatch(CommonActions.setDidTryPopup(true));
            }
          } else {
            dispatch(CommonActions.setDidTryPopup(true));
          }
        });
      } else if (_.isEmpty(userStore) && isJoin) {
        const t = setTimeout(
          () => {
            dispatch(
              CommonActions.setAlert({
                message: "선택된 매장이 없습니다.\n매장을 선택해 주세요.",
                onPressConfirm: async () => {
                  await dispatch(CommonActions.setAlert(null));
                  await dispatch(CommonActions.setDidTryPopup("StoreChange"));
                },
                onPressCancel: async () => {
                  await dispatch(CommonActions.setAlert(null));
                  await dispatch(CommonActions.setDidTryPopup(true));
                },
                confirmText: "매장선택",
                cancelText: "취소",
              })
            );
          },
          Platform.OS == "ios" ? 500 : 0
        );
      }
    })();
    return () => {};
  }, [userStore]);

  const setDisablePopup = () => {
    (async () => {
      const isPopupStoreFromStorage = await getIsStorePopup(
        userStore,
        dispatch
      );
      await CommonActions.saveDateForStorePopupToStorage(
        isPopupStoreFromStorage,
        userStore.storeInfo.store_cd,
        dispatch
      );
      await dispatch(CommonActions.setDidTryPopup(true));
    })();
  };

  if (
    _.isEmpty(storePopup) ||
    _.isEmpty(userStore) ||
    !isJoin ||
    storePopup.popupCnt == 0
  )
    //매장이 있는 경우만 매장 팝업
    return <></>;
  return (
    <Container>
      <Carousel
        delay={3000}
        style={{ flex: 1, width: "100%" }}
        autoplay
        pageInfo={true}
        // bullets={true}
        pageInfoBottomContainerStyle={{
          left: null,
          right: 18,
          bottom: 13,
          width: 50,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          borderRadius: 20,
          paddingTop: 2,
          paddingBottom: 2,
        }}
        pageInfoBackgroundColor={"transparent"}
        pageInfoTextStyle={{ color: colors.trueWhite, fontSize: 14 }}
        pageInfoTextSeparator="/"
      >
        {storePopup.popupList.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.pop_cd}
              onPress={() => {
                if (item.link_url != "") Linking.openURL(item.link_url);
              }}
            >
              <Image
                source={item.display_img}
                width={screenWidth}
                style={{ height: "100%" }}
              />
            </TouchableOpacity>
          );
        })}
      </Carousel>
      <BtnContainer>
        <BtnWarpper style={{ borderRightWidth: 0 }} onPress={setDisablePopup}>
          <BtnText>1일동안 보지 않기</BtnText>
        </BtnWarpper>
        <BtnWarpper
          onPress={async () => {
            await dispatch(CommonActions.setDidTryPopup(true));
          }}
        >
          <BtnText>닫기</BtnText>
        </BtnWarpper>
      </BtnContainer>
    </Container>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: {
      marginBottom: 0,
      backgroundColor: "transparent",
    },
    containerStyle: {
      backgroundColor: "transparent",
    },
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  };
};
const Screen = styled.View({
  backgroundColor: "transparent",
});
const Image = styled(BaseImage)({
  resizeMode: "cover",
  width: screenWidth,
  height: () => (Platform.OS == "android" ? screenHeight - 40 : screenHeight),
});
const BtnContainer = styled.View({
  flexDirection: "row",
  flexShrink: 0,
  width: "100%",
});
const BtnText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
});
const BtnWarpper = styled.TouchableOpacity({
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  width: "50%",
  padding: 13,
});
const PopupImage = styled(BaseImage)({
  width: "100%",
  height: "100%",
});
const Container = styled.View({
  backgroundColor: "transparent",
  width: "100%",
  height: "100%",
});
export default PopupScreen;
