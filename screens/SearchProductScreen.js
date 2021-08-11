import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import {
  View,
  Platform,
  Image,
  FlatList,
  Dimensions,
  Keyboard,
} from "react-native";
import BaseScreen from "../components/BaseScreen";
import {
  BaseTouchable,
  BaseImage,
  BaseTextInput,
  BaseText,
} from "../components/UI/BaseUI";
import ExtendedFlatList from "../components/UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "../store/actions/flyer";
import FlyerItemColumn2 from "../components/FlyerItemColumn2";
import ProductPopup from "../components/ProductPopup";
import { BackButton, TextTitle } from "../components/UI/header";
import { SET_SEARCHED_PRODUCT } from "../store/actions/actionTypes";
import { setAlert, setIsLoading } from "../store/actions/common";
import * as CommonActions from "../store/actions/common";
import { styles } from "../screens/home/FlyerScreen";
import _ from "lodash";
import { postWish } from "../store/actions/common";

const SearchProductScreen = (props) => {
  const isLoading = useSelector((state) => state.common.isLoading);
  const [product_nm, setProduct_nm] = useState("");
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const page = useRef(1);
  const currentItem = useRef(null);

  const product = useSelector((state) => state.flyer.searchedProduct);
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  useEffect(() => {
    if (!userStore) return;

    // alert(1);
  }, [userStore]);

  useEffect(() => {
    return () => {
      dispatch({ type: SET_SEARCHED_PRODUCT, product: null });
    };
  }, []);
  // useEffect(() => {
  //   if (page > 1) fetchProduct();
  // }, [page]);

  const onSearch = () => {
    Keyboard.dismiss();
    page.current = 1;
    fetchProduct(null, 1);
  };
  const fetchProduct = (e, p = page.current) => {
    if (product_nm.length < 1) {
      return dispatch(
        setAlert({
          message: "상품명을 입력해주세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
    }

    dispatch(setIsLoading(true));
    let query = {
      store_cd: userStore.storeInfo.store_cd,
      product_nm: product_nm,
      page: p,
    };
    if (!_.isEmpty(userInfo)) query.user_cd = userInfo.user_cd;
    dispatch(flyerActions.fetchProduct(query));
  };
  const loadMore = () => {
    if (!isLoading && page.current + 1 <= product.finalPage) {
      page.current++;
      fetchProduct(null, page.current);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    currentItem.current = item;
  };

  const afterAddWishItem = (item) => {
    postWish(dispatch, product, item, SET_SEARCHED_PRODUCT, "Y");
  };
  const afterDeleteWishItem = (item) => {
    postWish(dispatch, product, item, SET_SEARCHED_PRODUCT, "N");
  };
  return (
    <BaseScreen
      style={{
        backgroundColor: colors.TRUE_WHITE,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      isPadding={Platform.OS === "ios" ? false : true}
      contentStyle={{
        backgroundColor: colors.TRUE_WHITE,
        paddingTop: Platform.OS === "ios" ? 19 : 19,
      }}
      scrollListStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        <SearchContainer>
          <SearchInput
            placeholder="검색하실 상품명을 입력해주세요."
            autoFocus={true}
            value={product_nm}
            onSubmitEditing={onSearch}
            onChangeText={(text) => setProduct_nm(text)}
          />
          <SearchBtn onPress={onSearch}>
            <SearchIcon />
          </SearchBtn>
        </SearchContainer>
      </View>
      {product && product.productList && (
        <ResultText>
          '{product_nm}'의 검색결과 (총{product.allCnt})
        </ResultText>
      )}

      {product && product.productList && (
        <ExtendedFlatList
          columnWrapperStyle={styles.flyerListColumnWrapperStyle}
          style={[styles.flyerListStyle]}
          onEndReached={loadMore}
          numColumns={2}
          data={product.productList}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.product_cd}`
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

export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.TRUE_WHITE, paddingBottom: 0 },
    title: "상품검색",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

const ScrollList = styled(ExtendedFlatList)({
  flex: 1,

  width: "100%",
  // backgroundColor: colors.BLACK,
});
const ResultText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.BLACK,
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
  backgroundColor: colors.WHITE,
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

export default SearchProductScreen;
