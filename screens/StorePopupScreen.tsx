import * as Linking from "expo-linking";
import _ from "lodash";
import React, { useEffect } from "react";
import { Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  BaseImage,
  BaseText,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../components/UI/BaseUI";
import Carousel from "../components/UI/Carousel";
import colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SET_STORE_POPUP } from "../store/actions/actionTypes";
import * as CommonActions from "../store/actions/common";
import * as homeActions from "../store/actions/home";
import {
  defineShouldShowStorePopup,
  getDateForStorePopup,
} from "./StartupScreen";

const StorePopupScreen = () => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const storePopup = useAppSelector((state) => state.home.storePopup);
  const dateForStorePopup = useAppSelector(
    (state) => state.common.dateForStorePopup
  );

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
    if (!dateForStorePopup) return;

    if (_.isEmpty(userStore)) {
      dispatch(CommonActions.setDidTryStorePopup(true));
      return;
    }

    const shouldShowStorePopup = defineShouldShowStorePopup(
      dispatch,
      dateForStorePopup,
      userStore!
    );
    if (!shouldShowStorePopup) return;

    (async () => {
      dispatch(
        homeActions.fetchPopup({ store_cd: userStore!.storeInfo.store_cd })
      ).then(async (data) => {
        if (data.popupCnt <= 0) {
          dispatch(CommonActions.setDidTryStorePopup(true));
        }
      });
    })();
  }, [userStore, dateForStorePopup]);

  const setDisablePopup = () => {
    (async () => {
      const isPopupStoreFromStorage = await getDateForStorePopup(dispatch);
      await CommonActions.saveDateForStorePopupToStorage(
        isPopupStoreFromStorage,
        userStore!.storeInfo.store_cd,
        dispatch
      );
      await dispatch(CommonActions.setDidTryStorePopup(true));
    })();
  };
  if (
    !storePopup ||
    !userStore ||
    _.isEmpty(userStore) ||
    storePopup?.popupCnt <= 0 ||
    !dateForStorePopup ||
    _.isEmpty(storePopup)
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
        pageInfoTextStyle={{ color: colors.TRUE_WHITE, fontSize: 14 }}
        pageInfoTextSeparator="/"
      >
        {storePopup?.popupList.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.pop_cd}
              onPress={() => {
                if (item.link_url) Linking.openURL(item.link_url);
                else if (item.link_gbn) {
                  dispatch(CommonActions.setDidTryStorePopup(item));
                }
              }}
            >
              <Image
                initResizeMode="contain"
                defaultSource={require("../assets/images/p_img503.png")}
                resizeMode="contain"
                source={item.display_img}
                width={SCREEN_WIDTH}
                style={{ height: "100%", backgroundColor: "black" }}
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
            await dispatch(CommonActions.setDidTryStorePopup(true));
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
    contentStyle: {
      paddingBottom: 0,
      backgroundColor: "transparent",
    },
    headerShown: false,
    animation: "fade",
  };
};

const Image = styled(BaseImage)({
  resizeMode: "cover",
  width: SCREEN_WIDTH,
  height: () =>
    Platform.OS === "android" ? SCREEN_HEIGHT - 40 : SCREEN_HEIGHT,
});
const BtnContainer = styled.View({
  flexDirection: "row",
  flexShrink: 0,
  width: "100%",
});
const BtnText = styled(BaseText)({
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.BLACK,
});
const BtnWarpper = styled.TouchableOpacity({
  backgroundColor: colors.TRUE_WHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.PINKISH_GREY,
  width: "50%",
  padding: 13,
});
const Container = styled.View({
  backgroundColor: "transparent",
  width: "100%",
  height: "100%",
});
export default StorePopupScreen;
