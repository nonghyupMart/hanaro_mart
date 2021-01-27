import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import { useSelector, useDispatch } from "react-redux";
import * as exhibitionActions from "../../store/actions/exhibition";
import * as exclusiveActions from "../../store/actions/exclusive";
import { BackButton, TextTitle } from "../../components/UI/header";
import { IMAGE_URL } from "../../constants/settings";
import AutoHeightWebView from "react-native-autoheight-webview";
import { SET_EXHIBITION_DETAIL } from "../../store/actions/exhibition";
import {
  DetailContainer,
  BaseImage,
  ScaledImage,
  screenWidth,
  BaseButtonContainer,
} from "../../components/UI/BaseUI";

import { setAlert, setIsLoading } from "../../store/actions/common";
import * as CommonActions from "../../store/actions/common";
import { TabMenus } from "../../constants/menu";

const ExhibitionDetailScreen = (props, { navigation }) => {
  const routeName = props.route.name;
  const [isZoom, setIsZoom] = useState(false);
  const dispatch = useDispatch();
  const [scrollRef, setScrollRef] = useState();
  const isLoading = useSelector((state) => state.common.isLoading);

  const [imageHeight, setImageHeight] = useState(0);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const detail = useSelector((state) =>
    routeName == "ExhibitionDetail"
      ? state.exhibition.exhibitionDetail
      : state.exclusive.exclusiveDetail
  );

  const params = props.route.params;

  useEffect(() => {
    return () => {
      dispatch({
        type: SET_EXHIBITION_DETAIL,
        exhibitionDetail: null,
      });
    };
  }, []);
  useEffect(() => {
    const currentTab = TabMenus.filter(
      (tab) => tab.name == routeName.split("Detail")[0]
    );

    const tab = userStore.menuList.filter(
      (menu) => menu.r_menu_nm == currentTab[0].title
    );

    if (tab[0].menu_nm) {
      props.navigation.setOptions({
        title: tab[0].menu_nm,
      });
    }

    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  useEffect(() => {
    fetchDetail();
  }, [dispatch]);

  const fetchDetail = () => {
    dispatch(setIsLoading(true));
    if (routeName == "ExhibitionDetail") {
      dispatch(
        exhibitionActions.fetchExhibitionDetail({
          event_cd: params.event_cd,
        })
      ).then(() => {
        dispatch(setIsLoading(false));
      });
    } else {
      dispatch(
        exclusiveActions.fetchExclusiveDetail({
          event_cd: params.event_cd,
        })
      ).then(() => {
        dispatch(setIsLoading(false));
      });
    }
  };

  if (!detail) return <></>;
  return (
    <BaseScreen
      isScroll={false}
      setScrollRef={setScrollRef}
      style={{ backgroundColor: colors.trueWhite }}
      isPadding={false}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: colors.trueWhite,
      }}
    >
      {detail && (
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
              html: require("../../image.js")(IMAGE_URL + detail.detail_img),
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

export const screenOptions = ({ navigation }) => {
  return {
    title: "기획전",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: colors.trueWhite,
  },
});

export default ExhibitionDetailScreen;
