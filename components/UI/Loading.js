import React from "react";
// import Modal from "react-native-modal";

import { StyleSheet, ActivityIndicator, View, Modal } from "react-native";
import { screenHeight, screenWidth } from "@UI/BaseUI";

const Loading = (props) => {
  const isLoading = props.is;
  return (
    // <Modal
    //   backdropOpacity={0.7}
    //   isVisible={props.isLoading}
    //   animationIn="fadeIn"
    // >
    <>
      {props.isLoading && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            width: screenWidth,
            height: screenHeight,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            left: 0,
            top: 0,
            zIndex: 99999,
            elevation: 99999,
          }}
        >
          <ActivityIndicator size="large" color={colors.cerulean} />
        </View>
      )}
    </>
    // </Modal>
  );
};
export default Loading;
