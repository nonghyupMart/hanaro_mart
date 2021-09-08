import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import FlyerItem from "../../components/flyer/FlyerItem";
import AppPopup from "../../components/home/AppPopup";
import HomeBanner from "../../components/home/HomeBanner";
import HomeEvent from "../../components/home/HomeEvent";
import HomeProductsHeader from "../../components/home/HomeProductsHeader";
import ProductPopup from "../../components/ProductPopup";
import {
  HomeHeaderLeft,
  HomeHeaderRight,
  LogoTitle,
} from "../../components/UI/header";
import colors from "../../constants/Colors";
import {
  hasUserAndStore,
  processNotifications,
  setIOSStatusBarStyle,
  useRedirectToScreenByDidTryStorePopup,
  useRedirectToScreenByLink,
} from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as actionTypes from "../../store/actions/actionTypes";
import * as authActions from "../../store/actions/auth";
import { changeWishState } from "../../store/actions/common";
import * as homeActions from "../../store/actions/home";

const HomeScreen = (props: any) => {
  const page = useRef(1);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const isFocused = useIsFocused();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const pushToken = useAppSelector((state) => state.auth.pushToken);
  const homeProducts = useAppSelector((state) => state.home.homeProducts);
  const currentItem = useRef();

  processNotifications();
  setIOSStatusBarStyle();
  useRedirectToScreenByLink();
  useRedirectToScreenByDidTryStorePopup();

  useEffect(() => {
    if (!isFocused) return;
    if (!hasUserAndStore(userInfo, userStore)) return;
    authActions.fetchUserInfo({
      dispatch: dispatch,
      userInfo: userInfo,
      pushToken: pushToken,
      userStore: userStore,
    });

    return () => {};
  }, [isFocused]);

  useEffect(() => {
    if (!userStore || !userInfo) return;

    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: page.current,
    };
    if (!_.isEmpty(userInfo)) query.user_cd = userInfo.user_cd;
    dispatch(homeActions.fetchHomeProducts(query));
  }, [userStore, userInfo]);

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

  // console.log(_.isEmpty(homeProducts));
  // console.log("***************HomeScreen rendered***************");
  if (!userStore) return <></>;
  return (
    <BaseScreen
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
      renderItem={renderItem}
      data={ homeProducts?.productList}
      numColumns={2}
      keyExtractor={(item) => `${item.product_cd}`}
      query={{
        store_cd: userStore?.storeInfo.store_cd,
        page: page.current,
      }}
      page={page.current}
      onPageChanged={onPageChanged}
      finalPage={homeProducts?.finalPage}
    >
      <AppPopup
        isFocused={isFocused}
        // key={appPopupKey}
        {...props}
      />
      <HomeBanner isFocused={isFocused} />
      {!_.isEmpty(userStore) && <HomeEvent />}
      { homeProducts?.productList.length > 0 && (
        <HomeProductsHeader />
      )}
      <ProductPopup
        item={currentItem.current}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </BaseScreen>
  );
};

export const screenOptions = ({ route, navigation }) => {
  return {
    headerTitle: (props) => (
      <LogoTitle {...props} navigator={navigation} route={route} />
    ),
    headerLeft: (props) => <HomeHeaderLeft {...props} navigator={navigation} />,
    headerRight: (props) => (
      <HomeHeaderRight {...props} navigator={navigation} />
    ),
    headerShadowVisible: false,
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
