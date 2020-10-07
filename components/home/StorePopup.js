import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import Carousel from "react-native-looped-carousel";
import {
  StyleConstants,
  BaseImage,
  ScaledImage,
  BaseTouchable,
  screenWidth,
  screenHeight,
} from "@UI/BaseUI";
import _ from "lodash";
import * as Linking from "expo-linking";
import * as CommonActions from "@actions/common";
import * as homeActions from "@actions/home";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
const StorePopup = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isStorePopup = useSelector((state) => state.common.isStorePopup);
  const [isVisible, setIsVisible] = useState(true);
  const storePopup = useSelector((state) => state.home.storePopup);
  useEffect(() => {
    if (isStorePopup) setIsVisible(true);
  }, [isStorePopup]);
  useEffect(() => {
    props.setFetchStorePopup(false);
    dispatch(
      homeActions.fetchPopup({ store_cd: userStore.storeInfo.store_cd })
    ).then(() => {
      props.setFetchStorePopup(true);
    });
  }, [dispatch]);

  const setDisablePopup = () => {
    CommonActions.saveDateForStorePopupToStorage();
    dispatch(CommonActions.setStorePopup(false));
    setIsVisible(false);
  };

  //매장이 있는 경우만 매장 팝업
  if (_.isEmpty(storePopup) || _.isEmpty(userStore) || !isJoin || !isStorePopup)
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
                  // console.warn(item.link_url);
                  if (item.link_url != "") Linking.openURL(item.link_url);
                }}
              >
                <BaseImage
                  source={item.display_img}
                  width={screenWidth}
                  style={{
                    resizeMode: "cover",
                    width: screenWidth,
                    height: screenHeight - 40,
                  }}
                />
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

const BtnContainer = styled.View({ flexDirection: "row" });
const BtnText = styled.Text({
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
