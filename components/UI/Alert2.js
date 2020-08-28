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
import AwesomeAlert from "react-native-awesome-alerts";
import Modal from "react-native-modal";
const { width, height } = Dimensions.get("window");

const Alert = (props) => {
  return (
    <View>
      <AwesomeAlert
        alertContainerStyle={styles.alertContainerStyle}
        actionContainerStyle={styles.actionContainerStyle}
        useNativeDriver={true}
        contentContainerStyle={styles.contentContainerStyle}
        contentStyle={styles.content}
        messageStyle={styles.message}
        show={props.isVisible}
        showProgress={props.showProgress}
        title={props.title}
        message={props.message}
        closeOnTouchOutside={
          props.closeOnTouchOutside ? props.closeOnTouchOutside : false
        }
        closeOnHardwareBackPress={
          props.closeOnHardwareBackPress ? closeOnHardwareBackPress : false
        }
        showCancelButton={
          props.showCancelButton ? props.showCancelButton : false
        }
        showConfirmButton={
          props.showConfirmButton ? props.showConfirmButton : true
        }
        cancelText={props.cancelText ? props.cancelText : "취소"}
        confirmText={props.confirmText ? props.confirmText : "확인"}
        confirmButtonColor={colors.appleGreen}
        cancelButtonColor={colors.cerulean}
        onCancelPressed={props.onCancelPressed}
        onConfirmPressed={props.onConfirmPressed}
        cancelButtonStyle={styles.cancelButtonStyle}
        cancelButtonTextStyle={styles.cancelButtonTextStyle}
        confirmButtonStyle={styles.confirmButtonStyle}
        confirmButtonTextStyle={styles.confirmButtonTextStyle}
      />
    </View>
  );
};
const Message = styled.Text({});
const Icon = styled.Image({});
const Container = styled.View({
  width: width - 16 * 2,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: 10,
  paddingBottom: 20,
  justifyContent: "center",
});
const styles = StyleSheet.create({
  actionContainerStyle: {
    flexDirection: "row-reverse",
  },
  contentContainerStyle: {
    width: "100%",
    // width: width - 16 * 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    margin: 0,
    // paddingLeft: 10,
  },
  message: {
    fontSize: 16,
    color: colors.trueWhite,
  },
  confirmButtonStyle: {
    borderRadius: 20,
    width: width * 0.405,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
  },
  cancelButtonStyle: {
    borderRadius: 20,
    width: width * 0.405,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonTextStyle: { fontSize: 18, color: colors.trueWhite },
  confirmButtonTextStyle: { fontSize: 18, color: colors.trueWhite },
  alertContainerStyle: {},
});

export default Alert;
