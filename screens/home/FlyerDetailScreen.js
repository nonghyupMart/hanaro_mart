import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import BaseScreen from "../../components/BaseScreen";

import { BackButton, TextTitle } from "../../components/UI/header";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "../../store/actions/flyer";
import { IMAGE_URL } from "../../constants";
import * as CommonActions from "../../store/actions/common";
import AutoHeightWebView from "react-native-autoheight-webview";
import {
  DetailContainer,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../../components/UI/BaseUI";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native";

const FlyerDetailScreen = (props, { navigation }) => {
  const params = props.route.params;
  const dispatch = useDispatch();
  const leafletDetail = useSelector((state) => state.flyer.leafletDetail);
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  useEffect(() => {
    dispatch(flyerActions.fetchLeafletDetail({ leaf_cd: params.leaf_cd }));
  }, [dispatch]);

  return (
    <BaseScreen
      isScroll={false}
      style={{ backgroundColor: colors.trueWhite }}
      isPadding={false}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: colors.trueWhite,
      }}
    >
      {leafletDetail && (
        <DetailContainer
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: 0,
            paddingBottom: 0,
          }}
        >
          <AutoHeightWebView
            scalesPageToFit={false}
            source={{
              html: require("../../image.js")(
                IMAGE_URL + leafletDetail.detail_img
              ),
            }}
            style={{
              flex: 1,
            }}
          />
        </DetailContainer>
      )}
    </BaseScreen>
  );
};

const Btn = styled.TouchableOpacity({
  marginLeft: 5,
  marginRight: 5,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "전단지",
  cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FlyerDetailScreen;
