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
} from "@UI/BaseUI";
import _ from "lodash";
import * as Linking from "expo-linking";
import * as CommonActions from "@actions/common";
import * as homeActions from "@actions/home";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
const AppPopup = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isAppPopup = useSelector((state) => state.common.isAppPopup);
  const [isVisible, setIsVisible] = useState(true);
  const appPopup = useSelector((state) => state.home.appPopup);
  useEffect(() => {
    // console.warn("isAppPopup", isAppPopup);
    if (isAppPopup) setIsVisible(true);
  }, [isAppPopup]);
  useEffect(() => {
    props.setFetchAppPopup(false);
    dispatch(homeActions.fetchPopup()).then(() => {
      props.setFetchAppPopup(true);
      if (_.isEmpty(appPopup)) {
        props.setIsReadyAppPopup(true);
      }
    });
  }, [dispatch]);

  const setDisablePopup = () => {
    CommonActions.saveDateForAppPopupToStorage();
    dispatch(CommonActions.setIsAppPopup(false));
    setIsVisible(false);
  };

  if (!isAppPopup || _.isEmpty(appPopup)) return <></>;
  return (
    <Modal
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      animationInTiming={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={false}
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
                  // console.warn(item.link_url);
                  if (item.link_url != "") Linking.openURL(item.link_url);
                }}
              >
                <BaseImage
                  onLoad={() => props.setIsReadyAppPopup(true)}
                  source={item.display_img}
                  width={screenWidth - 19 - 19 - 2}
                  style={{
                    resizeMode: "cover",
                    width: screenWidth - 19 - 19 - 2,
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
const BtnText = styled.Text({
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
