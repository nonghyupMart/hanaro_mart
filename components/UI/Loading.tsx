import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Platform, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import colors from "../../constants/Colors";
import { useAppDispatch } from "../../hooks";
import { setIsLoading } from "../../store/actions/common";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./BaseUI";

const Loading = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const timerRef = useRef();

  useEffect(() => {
    if (!isLoading) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 30000);
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current;
    };
  }, [isLoading]);
  if (Platform.OS === "android")
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
              color={colors.CERULEAN}
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
              color={colors.CERULEAN}
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
