import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import {
  StyleConstants,
  BaseImage,
  ScaledImage,
  BaseTouchable,
  screenWidth,
} from "@UI/BaseUI";
import _ from "lodash";
import * as CommonActions from "@actions/common";
import { useDispatch, useSelector } from "react-redux";
const AppPopup = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isAppPopup = useSelector((state) => state.common.isAppPopup);
  const [isVisible, setIsVisible] = useState(false);
  const [appPopup, setAppPopup] = useState(true);

  useEffect(() => {
    if (isAppPopup) setIsVisible(true);
    if (!appPopup) props.setIsReadyAppPopup(true);
  }, [isAppPopup]);

  const setDisablePopup = () => {
    CommonActions.saveAppPopupToStorage();
    dispatch(CommonActions.setAppPopup(false));
    setIsVisible(false);
  };

  if (!isAppPopup) return <></>;
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
        <ScaledImage
          onLoad={() => props.setIsReadyAppPopup(true)}
          source={require("@images/test1.png")}
          width={screenWidth - 19 - 19 - 2}
        />
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
