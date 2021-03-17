import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import Carousel from "../../components/UI/Carousel";
import {
  StyleConstants,
  BaseImage,
  ScaledImage,
  BaseTouchable,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BaseText,
} from "../../components/UI/BaseUI";
import _ from "lodash";
import * as Linking from "expo-linking";
import * as CommonActions from "../../store/actions/common";
import * as homeActions from "../../store/actions/home";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, Platform } from "react-native";
import { SET_STORE_POPUP } from "../../store/actions/actionTypes";
import moment from "moment";

const StorePopup = (props) => {
  const routeName = props.route.name;
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isStorePopup = useSelector((state) => state.common.isStorePopup);
  const [isVisible, setIsVisible] = useState(false);
  const storePopup = useSelector((state) => state.home.storePopup);

  // useEffect(() => {
  //   if (!isVisible) {
  //     dispatch({
  //       type: SET_STORE_POPUP,
  //       storePopup: null,
  //     });
  //   }
  // }, [isVisible]);
  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: SET_STORE_POPUP,
  //       storePopup: null,
  //     });
  //   };
  // }, []);
  useEffect(() => {
    if (
      props.isFocused &&
      isStorePopup &&
      !_.isEmpty(userStore) &&
      storePopup &&
      storePopup.popupCnt > 0
    ) {
      let setDate = moment().subtract(1, "days");
      // console.warn(isStorePopup);
      if (isStorePopup[userStore.storeInfo.store_cd]) {
        setDate = moment(isStorePopup[userStore.storeInfo.store_cd]);
      }
      setIsVisible(moment(setDate).isBefore(moment(), "day"));
    } else {
      setIsVisible(false);
    }
  }, [isStorePopup, userStore, storePopup, props.isFocused]);
  useEffect(() => {
    if (!_.isEmpty(userStore)) {
      props.setFetchStorePopup(false);
      dispatch(
        homeActions.fetchPopup({ store_cd: userStore.storeInfo.store_cd })
      ).then(() => {
        props.setFetchStorePopup(true);
      });
    } else {
      props.setFetchStorePopup(true);
    }
  }, [userStore]);

  const setDisablePopup = () => {
    //userStore의 store_cd가 최신 업데이트가 않되는 경우가 있음..
    CommonActions.saveDateForStorePopupToStorage(
      isStorePopup,
      userStore.storeInfo.store_cd,
      dispatch
    );
  };

  if (
    _.isEmpty(storePopup) ||
    _.isEmpty(userStore) ||
    !isJoin ||
    storePopup.popupCnt == 0 ||
    !isVisible ||
    routeName !== "Home"
  )
    //매장이 있는 경우만 매장 팝업
    return <></>;
  return (
    <Modal
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      // animationInTiming={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
      }}
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={false}
      // onBackdropPress={() => setIsVisible(false)}
      // onRequestClose={() => setIsVisible(false)}
    >
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
                <Image source={item.display_img} width={SCREEN_WIDTH} />
              </TouchableOpacity>
            );
          })}
        </Carousel>
      </Container>

      <BtnContainer>
        <BtnWarpper style={{ borderRightWidth: 0 }} onPress={setDisablePopup}>
          <BtnText>1일동안 보지 않기</BtnText>
        </BtnWarpper>
        <BtnWarpper onPress={setIsVisible.bind(this, false)}>
          <BtnText>닫기</BtnText>
        </BtnWarpper>
      </BtnContainer>
    </Modal>
  );
};
const Image = styled(BaseImage)({
  resizeMode: "cover",
  width: SCREEN_WIDTH,
  height: () => (Platform.OS == "android" ? SCREEN_HEIGHT - 40 : SCREEN_HEIGHT),
});
const BtnContainer = styled.View({ flexDirection: "row" });
const BtnText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
});
const BtnWarpper = styled(BaseTouchable)({
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
  width: "100%",
  height: "100%",
});
export default StorePopup;
