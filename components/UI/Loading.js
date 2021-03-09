import React, { useState, useEffect, useRef } from "react";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  SafeAreaView,
  Platform,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./BaseUI";
import { setAlert, setIsLoading } from "../../store/actions/common";
const Loading = ({ isLoading }) => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isLoading) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 1000 * 15);
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current;
    };
  }, [isLoading]);
  if (Platform.OS == "android")
    return (
      <>
        {isLoading && (
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
        )}
      </>
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
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
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
export default React.memo(Loading);
