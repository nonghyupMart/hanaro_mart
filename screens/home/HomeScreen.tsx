import { useIsFocused } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BaseScreen from "../../components/BaseScreen";
import FlyerItem from "../../components/flyer/FlyerItem";
import AppPopup from "../../components/home/AppPopup";
import HomeBanner from "../../components/home/HomeBanner";
import HomeEvent from "../../components/home/HomeEvent";
import HomeProductsHeader, {
  loadMore,
} from "../../components/home/HomeProductsHeader";
import {
  HomeHeaderLeft,
  HomeHeaderRight,
  LogoTitle,
} from "../../components/UI/header";
import { CATEGORY } from "../../constants";
import colors from "../../constants/Colors";
import { TabMenus } from "../../constants/menu";
import { hasUserAndStore } from "../../helpers";
import * as RootNavigation from "../../navigation/RootNavigation";
import { SET_NOTIFICATION } from "../../store/actions/actionTypes";
import * as authActions from "../../store/actions/auth";
import * as CommonActions from "../../store/actions/common";
import { setAlert, setIsLoading } from "../../store/actions/common";
import { RootState } from "../../hooks";
import ProductPopup from "../../components/ProductPopup";
import * as homeActions from "../../store/actions/home";
import { changeWishState } from "../../store/actions/common";
import * as actionTypes from "../../store/actions/actionTypes";

const HomeScreen = (props) => {
  const page = useRef(1);
  const navigation = props.navigation;
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const didTryStorePopup = useSelector(
    (state: RootState) => state.common.didTryStorePopup
  );
  const userStore = useSelector((state: RootState) => state.auth.userStore);
  const isFocused = useIsFocused();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const pushToken = useSelector((state: RootState) => state.auth.pushToken);
  const link = useSelector((state: RootState) => state.common.link);
  const isLoading = useSelector((state: RootState) => state.common.isLoading);
  const notification = useSelector(
    (state: RootState) => state.common.notification
  );
  const homeProducts = useSelector(
    (state: RootState) => state.home.homeProducts
  );
  const currentItem = useRef();

  useEffect(() => {
    if (!isFocused) return;
    if (!hasUserAndStore(userInfo, userStore)) return;
    authActions.fetchUserInfo({
      dispatch: dispatch,
      userInfo: userInfo,
      pushToken: pushToken,
      userStore: userStore,
    });

    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: 1,
    };
    if (!_.isEmpty(userInfo)) query.user_cd = userInfo.user_cd;
    dispatch(homeActions.fetchHomeProducts(query));

    return () => {};
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "ios") {
        setTimeout(() => {
          StatusBar.setBarStyle("dark-content");
        }, 1000);
      }
    })();
  }, []);

  useEffect(() => {
    redirectToScreen(link);
  }, [link]);

  useEffect(() => {
    if (!userStore || isLoading) return;
    processNotifications(dispatch, userStore, isLoading, notification);
    return () => {};
  }, [userStore, isLoading, notification]);

  useEffect(() => {
    if (
      typeof didTryStorePopup !== "string" &&
      typeof didTryStorePopup !== "object"
    )
      return;
    dispatch(setIsLoading(true));
    setTimeout(() => {
      switch (typeof didTryStorePopup) {
        case "string":
          navigation.navigate(didTryStorePopup);
          break;
        case "object":
          dispatch(CommonActions.setLink(null));
          if (didTryStorePopup.link_code) {
            dispatch(
              CommonActions.setLink({
                category: CATEGORY[didTryStorePopup.link_gbn],
                link_code: didTryStorePopup.link_code,
              })
            );
          }
          navigation.navigate(CATEGORY[didTryStorePopup.link_gbn]);
          break;

        default:
          break;
      }
      dispatch(setIsLoading(false));
      dispatch(CommonActions.setDidTryStorePopup(true));
    }, 500);
  }, [didTryStorePopup]);

  const redirectToScreen = (link) => {
    setTimeout(async () => {
      if (!link || _.isEmpty(link)) return;

      if (
        link.link_gbn === "I" &&
        (_.isEmpty(userInfo) || _.isEmpty(userStore))
      ) {
        return await navigation.navigate("Login");
      }
      await navigation.navigate(CATEGORY[link.link_gbn]);
    }, 500);
  };
  const onPageChanged = (p) => {
    page.current = p;
  };

  const beforeAddWishItem = (item) => {
    changeWishState(
      dispatch,
      homeProducts,
      item,
      actionTypes.SET_HOME_PRODUCTS,
      "Y"
    );
  };

  const beforeDeleteWishItem = (item) => {
    changeWishState(
      dispatch,
      homeProducts,
      item,
      actionTypes.SET_HOME_PRODUCTS,
      "N"
    );
  };
  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    currentItem.current = item;
  };
  const renderItem = (itemData) => (
    <FlyerItem
      onPress={popupHandler.bind(this, itemData.item)}
      item={itemData.item}
      beforeAddWishItem={beforeAddWishItem}
      beforeDeleteWishItem={beforeDeleteWishItem}
    />
  );
  if (!isFocused || !userStore) return <></>;
  // console.log(_.isEmpty(homeProducts));
  // console.log("***************HomeScreen rendered***************");
  return (
    <BaseScreen
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
      renderItem={renderItem}
      data={homeProducts && homeProducts.productList}
      numColumns={2}
      keyExtractor={(item) =>
        `${userStore.storeInfo.store_cd}-${item.product_cd}`
      }
      query={{ store_cd: userStore.storeInfo.store_cd, page: page.current }}
      page={page.current}
      onPageChanged={onPageChanged}
      finalPage={homeProducts && homeProducts.finalPage}
    >
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
      {homeProducts && homeProducts.productList && (
        <HomeProductsHeader
          key={`HomeProducts-${userStore.storeInfo.store_cd}`}
        />
      )}
      <ProductPopup
        item={currentItem.current}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </BaseScreen>
  );
};

const processNotifications = (dispatch, userStore, isLoading, notification) => {
  if (
    isLoading ||
    !notification ||
    !notification.request ||
    !notification.request.content ||
    !notification.request.content.data
  ) {
    return;
  }

  (async () => {
    const category = notification.request.content.data.category;
    const store_cd = notification.request.content.data.store_cd;
    const store_nm = notification.request.content.data.store_nm;
    const cd = notification.request.content.data.cd;

    if (!category) return;

    if (userStore && userStore.storeInfo.store_cd === store_cd) {
      const currentTab = TabMenus.filter(
        (tab) => tab.name === CATEGORY[category]
      );
      const tab = userStore.menuList.filter(
        (menu) => menu.r_menu_nm === currentTab[0].title
      );
      if (_.isEmpty(tab)) return;

      let param = {};
      if (!!cd) param["link_code"] = cd;
      if (!!category) param["category"] = category;
      switch (category) {
        case "A": //매장공지
          if (!!cd) param["notice_cd"] = cd;
          param["type"] = "C";
          break;
        case "H": //통합공지
          if (!!cd) param["notice_cd"] = cd;
          param["type"] = "H";
          break;
        default:
          break;
      }
      await dispatch(
        CommonActions.setLink({
          category: CATEGORY[param["category"]],
          link_code: param["link_code"],
        })
      );
      setTimeout(() => {
        RootNavigation.navigate(CATEGORY[param["category"]], param);
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
    dispatch({ type: SET_NOTIFICATION, notification: null });
  })();
};

export const screenOptions = ({ route, navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.TRUE_WHITE, paddingBottom: 50 },
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
    backgroundColor: colors.TRUE_WHITE,
  },
});

export default HomeScreen;
