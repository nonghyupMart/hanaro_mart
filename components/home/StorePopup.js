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
const StorePopup = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const isStorePopup = useSelector((state) => state.common.isStorePopup);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isStorePopup) setIsVisible(true);
  }, [isStorePopup]);

  const setStorePopup = () => {
    CommonActions.saveStorePopupToStorage();
    dispatch(CommonActions.setStorePopup(false));
    setIsVisible(false);
  };

  //매장이 있는 경우만 매장 팝업
  if (_.isEmpty(userStore) || !isJoin || !isStorePopup) return <></>;
  return (
    <Modal
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
        <ScaledImage
          source={require("@images/popup.png")}
          width={screenWidth}
        />
      </Container>

      <BtnContainer>
        <BtnWarpper style={{ borderRightWidth: 0 }} onPress={setStorePopup}>
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