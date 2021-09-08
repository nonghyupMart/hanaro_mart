import React, { useEffect, useState } from "react";
import AutoHeightWebView from "react-native-autoheight-webview";
import BaseScreen from "../../components/BaseScreen";
import { DetailContainer } from "../../components/UI/BaseUI";
import { BackButton, TextTitle } from "../../components/UI/header";
import { IMAGE_URL } from "../../constants";
import colors from "../../constants/Colors";
import { TabMenus } from "../../constants/menu";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SET_EXHIBITION_DETAIL } from "../../store/actions/actionTypes";
import * as CommonActions from "../../store/actions/common";
import { setIsLoading } from "../../store/actions/common";
import * as exclusiveActions from "../../store/actions/exclusive";
import * as exhibitionActions from "../../store/actions/exhibition";

const ExhibitionDetailScreen = (props) => {
  const routeName = props.route.name;
  const dispatch = useAppDispatch();
  const [scrollRef, setScrollRef] = useState();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const detail = useAppSelector((state) =>
    routeName === "ExhibitionDetail"
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
      (tab) => tab.name === routeName.split("Detail")[0]
    );

    const tab = userStore?.menuList.filter(
      (menu) => menu.r_menu_nm === currentTab[0].title
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
    if (routeName === "ExhibitionDetail") {
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
      style={{ backgroundColor: colors.TRUE_WHITE }}
      isPadding={false}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: colors.TRUE_WHITE,
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

export const screenOptions = () => {
  return {
    title: "기획전",
    contentStyle: {
      paddingBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default ExhibitionDetailScreen;
