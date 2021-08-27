import * as Linking from "expo-linking";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as CommonActions from "../../store/actions/common";
import * as homeActions from "../../store/actions/home";
import { BaseImage, BaseText, SCREEN_WIDTH } from "../UI/BaseUI";
import Carousel from "../UI/Carousel";

const AppPopup = (props) => {
  const dispatch = useAppDispatch();
  const shouldShowAppPopup = useAppSelector((state) => state.common.shouldShowAppPopup);
  const [isVisible, setIsVisible] = useState(false);
  const appPopup = useAppSelector((state) => state.home.appPopup);
  const didTryStorePopup = useAppSelector(
    (state) => state.common.didTryStorePopup
  );
  useEffect(() => {
    if (shouldShowAppPopup && props.isFocused && typeof didTryStorePopup !== "string") {
      setIsVisible(true);
    }
    if (!props.isFocused) {
      setIsVisible(false);
    }
  }, [shouldShowAppPopup, props.isFocused]);
  useEffect(() => {
    if (!_.isEmpty(appPopup) || !shouldShowAppPopup || !props.isFocused) {
      return;
    }

    dispatch(homeActions.fetchPopup({}, true));
  }, [props.isFocused]);

  const setDisablePopup = () => {
    CommonActions.saveDateForAppPopupToStorage();
    dispatch(CommonActions.setShouldShowAppPopup(false));
    setIsVisible(false);
  };

  if (
    !shouldShowAppPopup ||
    _.isEmpty(appPopup) ||
    appPopup.popupCnt <= 0 ||
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
    >
      <Container>
        <Carousel
          delay={3000}
          style={{ height: SCREEN_WIDTH - 24 - 24, width: "100%" }}
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
          {appPopup.popupList.map((item, index) => {
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
                <BaseImage
                  source={item.display_img}
                  style={{
                    width: "100%",
                    height: SCREEN_WIDTH - 19 - 19 - 2,
                  }}
                  defaultSource={require("../../assets/images/p_img503.png")}
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
        <BtnWarpper onPress={setIsVisible.bind(this, false)}>
          <BtnText>닫기</BtnText>
        </BtnWarpper>
      </BtnContainer>
    </Modal>
  );
};

const BtnContainer = styled.View({ flexDirection: "row" });
const BtnText = styled(BaseText)({
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.TRUE_WHITE,
});
const BtnWarpper = styled.TouchableOpacity({
  backgroundColor: colors.BLACK,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.BLACK_THREE,
  width: "50%",
  padding: 13,
});
const Container = styled.View({
  justifyContent: "center",
  alignItems: "center",
});
export default React.memo(AppPopup);
