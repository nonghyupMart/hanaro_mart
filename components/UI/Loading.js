import React from "react";
// import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Modal,
  SafeAreaView,
} from "react-native";
import { screenHeight, screenWidth } from "@UI/BaseUI";

const Loading = (props) => {
  const isLoading = useSelector((state) => state.common.isLoading);
  return (
    // <Modal
    //   backdropOpacity={0.7}
    //   isVisible={props.isLoading}
    //   animationIn="fadeIn"
    // >
    <>
      {isLoading && (
        <SafeAreaView
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            width: screenWidth,
            height: screenHeight,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 99999,
            elevation: 99999,
          }}
        >
          <ActivityIndicator
            size="large"
            color={colors.cerulean}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 88.4,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            // style={{ marginTop: -headerHeight }}
          />
        </SafeAreaView>
      )}
    </>
    // </Modal>
  );
};
export default Loading;
