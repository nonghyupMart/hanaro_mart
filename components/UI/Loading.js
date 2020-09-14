import React from "react";
import Modal from "react-native-modal";
import { StyleSheet, ActivityIndicator, View } from "react-native";

const Loading = (props) => {
  return (
    <Modal
      backdropOpacity={0.7}
      isVisible={props.isLoading}
      animationIn="fadeIn"
    >
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: "100%",
        }}
      >
        <ActivityIndicator size="large" color="#006dbb" />
      </View>
    </Modal>
  );
};
export default Loading;