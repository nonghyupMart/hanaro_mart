import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import { View, StyleSheet, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import Constants from "expo-constants";
import { StyleConstants } from "./UI/BaseUI";
import _ from "lodash";
import colors from "../constants/Colors";
import * as homeActions from "../store/actions/home";
import { useAppDispatch, useAppSelector } from "../hooks";

const Contents = (props: any) => {
  return <>{props.children}</>;
};
const BaseScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isPadding, setIsPadding] = useState(
    props.isPadding === undefined ? true : props.isPadding
  );
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const isLoading = useAppSelector((state) => state.common.isLoading);
  let { finalPage = 0, page = 1 } = props;
  const [isScroll, setIsScroll] = useState(
    props.isScroll === undefined ? true : props.isScroll
  );
  let isScrolled = false;

  const onScroll = () => {
    if (!isScrolled) isScrolled = true;
    if (props.isScrolling) props.isScrolling(true);
  };
  const onEndReached = () => {
    if (isScrolled) {
      if (props.onEndReached) props.onEndReached();
      loadMore();
    }
  };

  const loadMore = () => {
    if (!isLoading && page + 1 <= finalPage) {
      page++;
      fetchItem();
    }
  };

  const onRefresh = () => {
    page = 1;
    fetchItem();
    if (props.onRefresh) props.onRefresh();
  };

  const fetchItem = () => {
    let query = { ...props.query };
    query.page = page;
    if (!_.isEmpty(userInfo)) query.user_cd = userInfo.user_cd;
    dispatch(homeActions.fetchHomeProducts(query)).then(() => {});
    if (props.onPageChanged) props.onPageChanged(page);
  };

  if (!userInfo || !userStore) return <></>;
  return (
    <Screen
      style={props.style}
      isCenter={props.isCenter}
    >
      {isScroll && (
        <ScrollList
          decelerationRate="fast"
          refreshing={props.renderItem ? isLoading : null}
          onRefresh={props.renderItem ? onRefresh : null}
          onScroll={onScroll}
          onEndReached={onEndReached}
          // onEndReachedThreshold={0.5}
          // scrollEventThrottle={60}
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
          // keyExtractor={(item, index) => `${index}`}
          headerHeight={useHeaderHeight()}
          {...props}
          contentContainerStyle={[styles.safeAreaView]}
          ListHeaderComponent={
            <ContentContainer
              style={[props.contentStyle]}
              isPadding={isPadding}
            >
              <Contents {...props} page={page.current} />
            </ContentContainer>
          }
          // renderItem={({ item, index, separators }) => (

          // )}
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
