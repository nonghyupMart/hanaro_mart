import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../components/BaseScreen";
import FlyerItem from "../components/flyer/FlyerItem";
import ProductPopup from "../components/ProductPopup";
import {
  BaseText,
  BaseTextBold,
  BaseTextInput,
  BaseTouchable,
  BlueButton,
  BlueButtonText,
} from "../components/UI/BaseUI";
import ExtendedFlatList from "../components/UI/ExtendedFlatList";
import { BackButton, TextTitle } from "../components/UI/header";
import Memo from "../components/wish/Memo";
import colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SET_WISH_ITEM } from "../store/actions/actionTypes";
import * as wishActions from "../store/actions/wish";
import * as Util from "../utils";
import { styles } from "./home/FlyerScreen";

const WishProductScreen = (props) => {
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const page = useRef(1);
  const currentItem = useRef(null);
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const isFocused = useIsFocused();
  const wishItem = useAppSelector((state) => state.wish.wishItem);

  useEffect(() => {
    if (!isFocused) return;
    fetchWishItem(1);
  }, []);

  const fetchWishItem = async (p = page.current) => {
    await dispatch(
      wishActions.fetchWishItem({
        store_cd: userStore?.storeInfo.store_cd,
        user_cd: userInfo?.user_cd,
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

  const beforeAddWishItem = (item) => {
    postWish(dispatch, wishItem, item, SET_WISH_ITEM);
  };
  const beforeDeleteWishItem = (item) => {
    postWish(dispatch, wishItem, item, SET_WISH_ITEM);
  };
  return (
    <>
      <BaseScreen
        style={{
          backgroundColor: colors.TRUE_WHITE,
          paddingLeft: 0,
          paddingRight: 0,
          marginBottom: 40,
        }}
        isPadding={Platform.OS === "ios" ? false : true}
        contentStyle={{
          backgroundColor: colors.TRUE_WHITE,
          paddingTop: Platform.OS === "ios" ? 19 : 19,
        }}
        scrollListStyle={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Memo />
        {wishItem && (
          <ExtendedFlatList
            listKey={`WishList-${userStore?.storeInfo.store_cd}`}
            onEndReached={loadMore}
            columnWrapperStyle={styles.flyerListColumnWrapperStyle}
            numColumns={2}
            style={[styles.flyerListStyle, { marginTop: 40 }]}
            data={wishItem.productList}
            keyExtractor={(item) =>
              `wish-${userStore?.storeInfo.store_cd}-${item.product_cd}`
            }
            renderItem={(itemData) => (
              <FlyerItem
                onPress={popupHandler.bind(this, itemData.item)}
                item={itemData.item}
                beforeAddWishItem={beforeAddWishItem}
                beforeDeleteWishItem={beforeDeleteWishItem}
              />
            )}
          />
        )}
        {wishItem?.productList.length <= 0 && (
          <>
            <NoListContainer>
              <Image source={require("../assets/images/narocart.png")} />
              <Text1>?????? ????????? ?????????</Text1>
              <Text2>????????? ?????????????????? ???????????????.</Text2>
            </NoListContainer>
            <BackBtn onPress={() => props.navigation.navigate("Flyer")}>
              <Image source={require("../assets/images/list_ic.png")} />
              <BlueButtonText>???????????? ????????????</BlueButtonText>
            </BackBtn>
          </>
        )}

        <ProductPopup
          item={currentItem.current}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </BaseScreen>
      {wishItem?.productList.length > 0 && wishItem?.wishInfo && (
        <TotalContainer>
          <Text3>??? ??????({wishItem.wishInfo.wish_cnt}) : </Text3>
          <Text4>{Util.formatNumber(wishItem.wishInfo.wish_price)}???</Text4>
        </TotalContainer>
      )}
    </>
  );
};

const Text4 = styled(BaseTextBold)({
  fontSize: 22.5,
  color: colors.BLACK_THREE,
  marginLeft: 10,
  flex: 1,
  textAlign: "right",
  marginRight: 35,
});
const Text3 = styled(BaseText)({
  fontSize: 17.5,
  color: colors.WARM_GREY_THREE,
  marginLeft: 35,
  marginTop: 9,
  marginBottom: 9,
});
const TotalContainer = styled.View({
  borderColor: colors.GREYISH_TWO,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  width: "100%",
  backgroundColor: "#f5f5f5",
  position: "absolute",
  bottom: 50,
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
});
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
  _.remove(tempObject.productList, item);
  tempObject.wishInfo.wish_cnt--;
  tempObject.wishInfo.wish_price -=
    item.sale_price > 0 ? item.sale_price : item.price;
  dispatch({
    type: type,
    data: tempObject,
  });
};
export const screenOptions = ({ navigation }) => {
  return {
    contentStyle: { backgroundColor: colors.TRUE_WHITE, paddingBottom: 0 },
    title: "?????? ??????",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

export default WishProductScreen;
