import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Button, StyleSheet, View, Image, Dimensions } from "react-native";
import Modal from "react-native-modal";
const { width, height } = Dimensions.get("window");
import { BaseTouchable, BaseText } from "./BaseUI";
import colors from "../../constants/Colors";

const Alert = ({ alert, confirmText, cancelText }) => {
  const onPressConfirm = () => {
    if (alert.onPressConfirm) alert.onPressConfirm();
    // else setIsVisible(() => false);
  };
  if (!alert) return <></>;
  return (
    <Modal
      // backdropOpacity={0.1}
      isVisible={alert.content || alert.message ? true : false}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onModalHide={() => {}}
    >
      <Container>
        <TitleContainer message={alert.message}>
          <Icon>
            <Image
              source={require("../../assets/images/ic_error_outline_24px.png")}
            />
          </Icon>
          {alert.message && <Message>{alert.message}</Message>}
        </TitleContainer>
        {alert.content && <ContentContainer>{alert.content}</ContentContainer>}
        <ButtonContainer>
          <ConfirmButton onPress={onPressConfirm}>
            <ButtonText>
              {alert.confirmText ? alert.confirmText : confirmText}
            </ButtonText>
          </ConfirmButton>
          {alert.onPressCancel && (
            <CancelButton onPress={alert.onPressCancel}>
              <ButtonText>
                {alert.cancelText ? alert.cancelText : cancelText}
              </ButtonText>
            </CancelButton>
          )}
        </ButtonContainer>
      </Container>
    </Modal>
  );
};
const ContentContainer = styled.View({});
const TitleContainer = styled.View({
  flexDirection: "row",
  width: "100%",
  flexWrap: "wrap",
  paddingRight: (props) => (props.message ? 45 : 0),
});
const ButtonContainer = styled.View({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
});
const BaseButton = styled(BaseTouchable)({
  width: width * 0.405,
  aspectRatio: 100 / 24.65,
  // height: 36,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 3,
  marginRight: 3,
});
const CancelButton = styled(BaseButton)({
  backgroundColor: colors.CERULEAN,
});
const ConfirmButton = styled(BaseButton)({
  backgroundColor: colors.APPLE_GREEN,
});
const ButtonText = styled(BaseText)({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.TRUE_WHITE,
});
const Message = styled(BaseText)({
  fontSize: 16,
  color: colors.TRUE_WHITE,
  lineHeight: 22,
  marginBottom: 22,
  marginTop: 36,
  alignItems: "center",
  textAlign: "center",
  marginLeft: 18,
  marginRight: 18,
  flex: 1,
});
const Icon = styled.View({
  marginTop: 12,
  marginLeft: 12,
  // position: "absolute", left: 12, top: 12
});
const Container = styled.View({
  // width: width - 16 * 2,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: 10,
  paddingBottom: 25,
  justifyContent: "center",
});
export default React.memo(Alert);

Alert.defaultProps = {
  useNativeDriver: false,
  showProgress: false,
  closeOnTouchOutside: true,
  closeOnHardwareBackPress: true,
  showCancelButton: false,
  showConfirmButton: false,
  cancelText: "취소",
  confirmText: "확인",
  cancelButtonColor: "#D0D0D0",
  confirmButtonColor: "#AEDEF4",
  customView: null,
};
