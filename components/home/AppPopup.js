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
  BaseText,
} from "@UI/BaseUI";
import _ from "lodash";
import * as Linking from "expo-linking";
import * as CommonActions from "@actions/common";
import * as homeActions from "@actions/home";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
const AppPopup = (props) => {
  const dispatch = useDispatch();
  const isAppPopup = useSelector((state) => state.common.isAppPopup);
  const [isVisible, setIsVisible] = useState(false);
  const appPopup = useSelector((state) => state.home.appPopup);
  useEffect(() => {
    if (isAppPopup) setIsVisible(true);
  }, [isAppPopup]);
  useEffect(() => {
    if (!_.isEmpty(appPopup) || !isAppPopup) {
      props.setIsReadyAppPopup(true);
      props.setFetchAppPopup(true);
      return;
    }
    props.setFetchAppPopup(false);

    dispatch(homeActions.fetchPopup()).then(() => {
      props.setFetchAppPopup(true);
      if (_.isEmpty(appPopup)) {
        props.setIsReadyAppPopup(true);
      }
    });
  }, []);

  const setDisablePopup = () => {
    CommonActions.saveDateForAppPopupToStorage();
    dispatch(CommonActions.setIsAppPopup(false));
    setIsVisible(false);
  };

  if (
    !isAppPopup ||
    _.isEmpty(appPopup) ||
    appPopup.popupCnt == 0 ||
    !isVisible
  )
    return <></>;
  return (
    <Modal
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      // animationInTiming={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={false}
      onBackdropPress={() => setIsVisible(false)}
      onRequestClose={() => setIsVisible(false)}
    >
      <Container>
        <Carousel
          delay={3000}
          style={{ height: screenWidth - 24 - 24, width: "100%" }}
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
          {appPopup.popupList.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.pop_cd}
                onPress={() => {
                  if (item.link_url != "") Linking.openURL(item.link_url);
                }}
              >
                <BaseImage
                  onLoad={() => props.setIsReadyAppPopup(true)}
                  source={item.display_img}
                  style={{
                    resizeMode: "cover",
                    width: "100%",
                    height: screenWidth - 19 - 19 - 2,
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
const BtnText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
});
const BtnWarpper = styled(BaseTouchable)({
  backgroundColor: colors.black,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.blackThree,
  width: "50%",
  padding: 13,
});
const PopupImage = styled(BaseImage)({ resizeMode: "cover", width: "100%" });
const Container = styled.View({
  justifyContent: "center",
  alignItems: "center",
});
export default AppPopup;
