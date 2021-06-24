import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Platform, Image } from "react-native";
import BaseScreen from "../components/BaseScreen";
import {
  BaseTouchable,
  BaseImage,
  BaseTextInput,
  BaseTextBold,
  BaseText,
  BlueButton,
  BlueButtonText,
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
      {wishItem && wishItem.productList.length <= 0 && (
        <>
          <NoListContainer>
            <Image source={require("../assets/images/narocart.png")} />
            <Text1>찜한 상품이 없어요</Text1>
            <Text2>금주의 전단광고에서 찜해보세요.</Text2>
          </NoListContainer>
          <BackBtn onPress={() => props.navigation.navigate("Flyer")}>
            <Image source={require("../assets/images/list_ic.png")} />
            <BlueButtonText>전단광고 보러가기</BlueButtonText>
          </BackBtn>
        </>
      )}

      <ProductPopup
        item={currentItem.current}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </BaseScreen>
  );
};
const BackBtn = styled(BlueButton)({ marginBottom: 65.6 });
const Text1 = styled(BaseTextBold)({
  letterSpacing: -0.32,
  fontSize: 21.5,
  textAlign: "center",
});
const Text2 = styled(BaseText)({
  marginTop: 5.5,
  fontSize: 16,
  color: colors.WARM_GREY_THREE,
  lineHeight: 17.5,
  letterSpacing: -0.24,
  height: 23.5,
  textAlign: "center",
  marginBottom: 20.5,
});
const NoListContainer = styled.View({
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 34.5,
  width: "100%",
});

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
