import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import { View, StyleSheet, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import Constants from "expo-constants";
import { StyleConstants } from "../components/UI/BaseUI";
import _ from "lodash";
import colors from "../constants/Colors";

const Contents = (props) => {
  return <>{props.children}</>;
};
const BaseScreen = (props) => {
  const [isPadding, setIsPadding] = useState(
    props.isPadding === undefined ? true : props.isPadding
  );
  const dispatch = useDispatch();
  const [isScroll, setIsScroll] = useState(
    props.isScroll === undefined ? true : props.isScroll
  );

  return (
    <Screen
      headerHeight={useHeaderHeight()}
      style={props.style}
      isPadding={isPadding}
      isCenter={props.isCenter}
    >
      {isScroll && (
        <ScrollList
          listKey="BaseScreen"
          // onScroll={onScroll}
          isPadding={isPadding}
          ref={(ref) => (props.setScrollRef ? props.setScrollRef(ref) : null)}
          nestedScrollEnabled={true}
          // keyboardDismissMode="none"
          // keyboardShouldPersistTaps="always"
          removeClippedSubviews={false}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
          windowSize={props.windowSize ? props.windowSize : 5}
          style={props.scrollListStyle}
          data={[0]}
          keyExtractor={(item, index) => `${index}`}
          headerHeight={useHeaderHeight()}
          {...props}
          contentContainerStyle={[styles.safeAreaView]}
          renderItem={({ item, index, separators }) => (
            <ContentContainer
              style={[props.contentStyle]}
              isPadding={isPadding}
            >
              <Contents {...props} />
            </ContentContainer>
          )}
        />
      )}
      {!isScroll && <Contents {...props} />}
    </Screen>
  );
};

const ScrollList = styled.FlatList.attrs({
  removeClippedSubviews: false,
})({
  flex: 1,
  paddingRight: (props) =>
    props.isPadding ? StyleConstants.defaultPadding : 0,
  paddingLeft: (props) => (props.isPadding ? StyleConstants.defaultPadding : 0),
});
const ContentContainer = styled.View({
  // flex: 1,
  // flexGrow: 1,
  paddingTop: (props) => {
    let v = 0;
    if (!props.headerHeight || props.headerHeight === 0)
      v = Platform.OS === "ios" ? Constants.statusBarHeight : 0;
    v += 19;
    if (!props.isPadding) v = 0;
    return v;
  },
  paddingBottom: (props) => (props.isPadding ? 19 : 0),
  alignItems: "flex-start",
});
const Screen = styled(View).attrs({
  behavior: "padding",
  enabled: true,
})({
  flex: 1,
  width: "100%",
  height: (props) => (props.isCenter ? "100%" : "auto"),
  backgroundColor: colors.WHITE,
  justifyContent: (props) => (props.isCenter ? "center" : "flex-start"),
  alignItems: (props) => (props.isCenter ? "center" : "stretch"),
  alignSelf: (props) => (props.isCenter ? "center" : "auto"),
});
const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
});
export default BaseScreen;
