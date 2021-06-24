import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Platform, _Image } from "react-native";
import BaseScreen from "../components/BaseScreen";
import {
  BaseTouchable,
  BaseImage,
  BaseTextInput,
  BaseText,
} from "../components/UI/BaseUI";
import ExtendedFlatList from "../components/UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as wishActions from "../store/actions/wish";
import ProductPopup from "../components/ProductPopup";
import { BackButton, TextTitle } from "../components/UI/header";
import { SET_WISH_ITEM } from "../store/actions/actionTypes";
import { styles } from "./home/FlyerScreen";
import _ from "lodash";
import Memo from "../components/wish/Memo";
import { useIsFocused } from "@react-navigation/native";
import FlyerItemColumn2 from "../components/FlyerItemColumn2";

const WishProductScreen = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const page = useRef(1);
  const currentItem = useRef(null);
  const isLoading = useSelector((state) => state.common.isLoading);
  const isFocused = useIsFocused();
  const wishItem = useSelector((state) => state.wish.wishItem);

  useEffect(() => {
    if (!isFocused) return;
    fetchWishItem(1);
  }, []);

  const fetchWishItem = (p = page.current) => {
    dispatch(
      wishActions.fetchWishItem({
        store_cd: userStore.storeInfo.store_cd,
        user_cd: userInfo.user_cd,
        page: p,
      })
    );
  };
  const loadMore = () => {
    if (!isLoading && page.current + 1 <= wishItem.finalPage) {
      page.current++;
      fetchWishItem(page.current);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    currentItem.current = item;
  };

  const afterAddWishItem = (item) => {
    postWish(dispatch, wishItem, item, SET_WISH_ITEM);
  };
  const afterDeleteWishItem = (item) => {
    postWish(dispatch, wishItem, item, SET_WISH_ITEM);
  };
  return (
    <BaseScreen
      style={{
        backgroundColor: colors.trueWhite,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      isPadding={Platform.OS == "ios" ? false : true}
      // scrollListStyle={{ paddingTop: Platform.OS == "ios" ? 19 : 0 }}
      contentStyle={{
        backgroundColor: colors.trueWhite,
        paddingTop: Platform.OS == "ios" ? 19 : 19,
        // paddingLeft: Platform.OS == "ios" ? 16 : 0,
        // paddingRight: Platform.OS == "ios" ? 16 : 0,
      }}
      scrollListStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Memo />
      {wishItem && (
        <ExtendedFlatList
          listKey={`WishList-${userStore.storeInfo.store_cd}`}
          onEndReached={loadMore}
          columnWrapperStyle={styles.flyerListColumnWrapperStyle}
          numColumns={2}
          style={[styles.flyerListStyle, { marginTop: 0 }]}
          data={wishItem.productList}
          keyExtractor={(item) =>
            `wish-${userStore.storeInfo.store_cd}-${item.product_cd}`
          }
          renderItem={(itemData) => (
            <FlyerItemColumn2
              onPress={popupHandler.bind(this, itemData.item)}
              item={itemData.item}
              afterAddWishItem={afterAddWishItem}
              afterDeleteWishItem={afterDeleteWishItem}
            />
          )}
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
const postWish = (dispatch, object, item, type) => {
  const tempObject = { ...object };
  const result = _.remove(tempObject.productList, item);
  dispatch({
    type: type,
    data: tempObject,
  });
};
export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.trueWhite, paddingBottom: 0 },
    title: "찜한 상품",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

const ScrollList = styled(ExtendedFlatList)({
  flex: 1,

  width: "100%",
  // backgroundColor: colors.black,
});
const ResultText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
  width: "100%",
  marginTop: 15,
  marginBottom: 15,
});
const SearchBtn = styled(BaseTouchable)({
  padding: 10,
  paddingRight: 15,
});
const SearchIcon = styled.Image({});
SearchIcon.defaultProps = {
  source: require("../assets/images/search-24_1.png"),
};
const SearchContainer = styled.View({
  width: "100%",
  backgroundColor: colors.white,
  // height: 36,
  aspectRatio: 100 / 10.975,
  borderRadius: 25,
  flexDirection: "row",
});
const SearchInput = styled(BaseTextInput)({
  flex: 1,
  marginLeft: 15,
  marginRight: 15,
});

export default WishProductScreen;
