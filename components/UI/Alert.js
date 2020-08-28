import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  Button,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
const { width, height } = Dimensions.get("window");
import BaseTouchable from "@components/BaseTouchable";

const Alert = (props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <Container>
        <Icon>
          <Image source={require("@images/ic_error_outline_24px.png")} />
        </Icon>
        <Message>{props.message}</Message>
        <ButtonContainer>
          <ConfirmButton onPress={props.onPressConfirm}>
            <ButtonText>확인</ButtonText>
          </ConfirmButton>
          {props.onPressCancel && (
            <CancelButton onPress={props.onPressCancel}>
              <ButtonText>취소</ButtonText>
            </CancelButton>
          )}
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

const ButtonContainer = styled.View({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
});
const BaseButton = styled(BaseTouchable)({
  width: width * 0.405,
  height: 36,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 3,
  marginRight: 3,
});
const CancelButton = styled(BaseButton)({
  backgroundColor: colors.cerulean,
});
const ConfirmButton = styled(BaseButton)({
  backgroundColor: colors.appleGreen,
});
const ButtonText = styled.Text({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
});
const Message = styled.Text({
  fontSize: 16,
  color: colors.trueWhite,
  lineHeight: 20,
  marginBottom: 22,
  marginTop: 36,
  alignItems: "center",
  textAlign: "center",
});
const Icon = styled.View({ position: "absolute", left: 12, top: 12 });
const Container = styled.View({
  width: width - 16 * 2,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: 10,
  paddingBottom: 20,
  justifyContent: "center",
});
export default Alert;

Alert.defaultProps = {
  show: false,
  useNativeDriver: false,
  showProgress: false,
  closeOnTouchOutside: true,
  closeOnHardwareBackPress: true,
  showCancelButton: false,
  showConfirmButton: false,
  cancelText: "Cancel",
  confirmText: "Confirm",
  cancelButtonColor: "#D0D0D0",
  confirmButtonColor: "#AEDEF4",
  customView: null,
};
