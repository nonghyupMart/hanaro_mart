import React from "react";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  SafeAreaView,
  Platform,
} from "react-native";
import { screenHeight, screenWidth } from "@UI/BaseUI";

const Loading = (props) => {
  const isLoading = useSelector((state) => state.common.isLoading);
  if (Platform.OS == "android")
    return (
      <Modal
        backdropOpacity={0}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        isVisible={isLoading}
        useNativeDriver={true}
        hideModalContentWhileAnimating={false}
        animationIn="fadeIn"
        animationOut="fadeOut"
        // onRequestClose={() => setIsVisible(false)}
      >
        <ActivityIndicator
          size="large"
          color={colors.cerulean}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          // style={{ marginTop: -headerHeight }}
        />
      </Modal>
    );
  else
    return (
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
    );
};
export default Loading;
