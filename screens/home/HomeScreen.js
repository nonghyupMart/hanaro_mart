import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import colors from "../../constants/Colors";
import {
  HeaderButton,
  LogoTitle,
  HomeHeaderLeft,
  HomeHeaderRight,
} from "../../components/UI/header";
import { useIsFocused } from "@react-navigation/native";
import BaseScreen from "../../components/BaseScreen";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { SCREEN_WIDTH } from "../../components/UI/BaseUI";
import _ from "lodash";
import HomeBanner from "../../components/home/HomeBanner";
import HomeEvent from "../../components/home/HomeEvent";
import HomeProducts from "../../components/home/HomeProducts";
import AppPopup from "../../components/home/AppPopup";
import * as Util from "../../util";
import { setAlert, setIsLoading } from "../../store/actions/common";
import * as CommonActions from "../../store/actions/common";
import * as authActions from "../../store/actions/auth";
import { CATEGORY } from "../../constants";
import { SET_NOTIFICATION } from "../../store/actions/actionTypes";
import * as RootNavigation from "../../navigation/RootNavigation";
import { TabMenus } from "../../constants/menu";
import { setPreview } from "../../store/actions/auth";

const HomeScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const didTryPopup = useSelector((state) => state.common.didTryPopup);
  const userStore = useSelector((state) => state.auth.userStore);
  const isFocused = useIsFocused();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const link = useSelector((state) => state.common.link);

  initNotificationReceiver(routeName);
  useEffect(() => {
    if (!isFocused) return;
    if (!_.isEmpty(userInfo) && !_.isEmpty(userStore)) {
      // console.warn(JSON.stringify(userInfo, null, "\t"));
      authActions.updateUserInfo(dispatch, userInfo, pushToken);
    }

    return () => {
      dispatch(setIsLoading(false));
    };
  }, [isFocused]);
  useEffect(() => {
    dispatch(setIsLoading(true));
    (async () => {
      if (Platform.OS == "ios") {
        setTimeout(() => {
          StatusBar.setBarStyle("dark-content");
        }, 1000);
      }
    })();

    return () => {
      dispatch(setIsLoading(false));
    };
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      if (!link || _.isEmpty(link)) return;

      if (
        link.link_gbn == "I" &&
        (_.isEmpty(userInfo) || _.isEmpty(userStore))
      ) {
        return await dispatch(setPreview(false));
      }
      await navigation.navigate(CATEGORY[link.link_gbn]);
    }, 500);
  }, [link]);

  useEffect(() => {
    if (typeof didTryPopup != "string" && typeof didTryPopup != "object")
      return;
    dispatch(setIsLoading(true));
    setTimeout(() => {
      switch (typeof didTryPopup) {
        case "string":
          navigation.navigate(didTryPopup);
          break;
        case "object":
          dispatch(CommonActions.setLink(null));
          if (didTryPopup.link_code) {
            dispatch(
              CommonActions.setLink({
                category: CATEGORY[didTryPopup.link_gbn],
                link_code: didTryPopup.link_code,
              })
            );
          }
          navigation.navigate(CATEGORY[didTryPopup.link_gbn]);
          break;

        default:
          break;
      }
      dispatch(setIsLoading(false));
    }, 500);
    dispatch(CommonActions.setDidTryPopup(true));
  }, [didTryPopup]);

  if (!isFocused) return <></>;
  // console.log("***************HomeScreen rendered***************");
  return (
    <>
      <BaseScreen style={styles.screen} contentStyle={{ paddingTop: 0 }}>
        <AppPopup
          isFocused={isFocused}
          // key={appPopupKey}
          {...props}
        />
        <HomeBanner isFocused={isFocused} />
        {!_.isEmpty(userStore) && (
          <HomeEvent
            isFocused={isFocused}
            userStore={userStore}
            key={`HomeEvent-${userStore.storeInfo.store_cd}`}
          />
        )}
        {!_.isEmpty(userStore) && (
          <HomeProducts
            isFocused={isFocused}
            userStore={userStore}
            userInfo={userInfo}
            key={`HomeProducts-${userStore.storeInfo.store_cd}`}
          />
        )}
      </BaseScreen>
    </>
  );
};
const initNotificationReceiver = (routeName) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isLoading = useSelector((state) => state.common.isLoading);
  const notification = useSelector((state) => state.common.notification);
  useEffect(() => {
    if (
      !isLoading &&
      notification &&
      notification.request &&
      notification.request.content &&
      notification.request.content.data
    ) {
      (async () => {
        const category = notification.request.content.data.category;
        const store_cd = notification.request.content.data.store_cd;
        const store_nm = notification.request.content.data.store_nm;
        const cd = notification.request.content.data.cd;

        if (category) {
          if (userStore && userStore.storeInfo.store_cd == store_cd) {
            const currentTab = TabMenus.filter(
              (tab) => tab.name == CATEGORY[category]
            );
            const tab = userStore.menuList.filter(
              (menu) => menu.r_menu_nm == currentTab[0].title
            );
            if (_.isEmpty(tab)) return;

            let param = {};
            if (!!cd) param.link_code = cd;
            if (!!category) param.category = category;
            switch (category) {
              case "A": //매장공지
                if (!!cd) param.notice_cd = cd;
                param.type = "C";
                break;
              case "H": //통합공지
                if (!!cd) param.notice_cd = cd;
                param.type = "H";
                break;
              default:
                break;
            }
            await dispatch(
              CommonActions.setLink({
                category: CATEGORY[param.category],
                link_code: param.link_code,
              })
            );
            setTimeout(() => {
              RootNavigation.navigate(CATEGORY[param.category], param);
            }, 500);
          } else {
            dispatch(
              setAlert({
                message: `${store_nm}에서 발송한 알림입니다.\n매장을 변경하시겠습니까?`,
                confirmText: "매장설정",
                onPressConfirm: () => {
                  dispatch(setAlert(null));
                  RootNavigation.navigate("Home");
                  RootNavigation.navigate("StoreChange");
                },
                onPressCancel: () => {
                  dispatch(setAlert(null));
                },
              })
            );
          }
        }
        dispatch({ type: SET_NOTIFICATION, notification: null });
      })();
    }
  }, [notification, isLoading]);
};

const Space = styled.View({
  width: "100%",
  height: 10,
  width: SCREEN_WIDTH,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderColor: colors.pinkishGrey,
});

export const screenOptions = ({ route, navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.trueWhite, paddingBottom: 50 },
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    headerTitle: (props) => (
      <LogoTitle {...props} navigator={navigation} route={route} />
    ),
    headerLeft: (props) => <HomeHeaderLeft {...props} navigator={navigation} />,
    headerRight: (props) => (
      <HomeHeaderRight {...props} navigator={navigation} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: colors.trueWhite,
  },
});

export default HomeScreen;
