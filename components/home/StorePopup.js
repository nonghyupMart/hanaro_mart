import React, { useState, useEffect } from "react";
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
const StorePopup = (props) => {
  const routeName = props.route.name;
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isStorePopup = useSelector((state) => state.common.isStorePopup);
  const [isVisible, setIsVisible] = useState(false);
  const storePopup = useSelector((state) => state.home.storePopup);
  console.warn(storePopup);
  useEffect(() => {
    if (
      isStorePopup &&
      !_.isEmpty(userStore) &&
      userStore.storeInfo &&
      storePopup &&
      storePopup.popupCnt > 0
    )
      setIsVisible(true);
    else setIsVisible(false);
  }, []);
  useEffect(() => {
    if (!_.isEmpty(storePopup)) {
      props.setFetchStorePopup(true);
      return;
    }
    if (!_.isEmpty(userStore) && userStore.storeInfo) {
      props.setFetchStorePopup(false);
      dispatch(
        homeActions.fetchPopup({ store_cd: userStore.storeInfo.store_cd })
      ).then(() => {
        props.setFetchStorePopup(true);
      });
    }
  }, [userStore, storePopup]);

  const setDisablePopup = () => {
    CommonActions.saveDateForStorePopupToStorage();
    dispatch(CommonActions.setIsStorePopup(false));
    setIsVisible(false);
  };

  if (
    _.isEmpty(storePopup) ||
    _.isEmpty(userStore) ||
    !isJoin ||
    !isStorePopup ||
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
      animationInTiming={0}
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
      onBackdropPress={() => setIsVisible(false)}
      onRequestClose={() => setIsVisible(false)}
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
                <Image source={item.display_img} width={screenWidth} />
              </TouchableOpacity>
            );
          })}
        </Carousel>
      </Container>

      <BtnContainer>
        <BtnWarpper style={{ borderRightWidth: 0 }} onPress={setDisablePopup}>
          <BtnText>1일동안 보지 않기</BtnText>
        </BtnWarpper>
        <BtnWarpper onPress={() => setIsVisible(false)}>
          <BtnText>닫기</BtnText>
        </BtnWarpper>
      </BtnContainer>
    </Modal>
  );
};
const Image = styled(BaseImage)({
  resizeMode: "cover",
  width: screenWidth,
  height: () => (Platform.OS == "android" ? screenHeight - 40 : screenHeight),
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
