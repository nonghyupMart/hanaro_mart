import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  Platform,
  Image,
  FlatList,
  Dimensions,
  Keyboard,
} from "react-native";
import BaseScreen from "@components/BaseScreen";
import { BaseTouchable, BaseImage, BaseTextInput, BaseText } from "@UI/BaseUI";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import * as RootNavigation from "@navigation/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "@actions/flyer";
import FlyerItem from "@components/FlyerItem";
import ProductPopup from "@components/ProductPopup";
import { useFocusEffect } from "@react-navigation/native";
import { IMAGE_URL } from "@constants/settings";
import { BackButton, TextTitle } from "@UI/header";
const { width } = Dimensions.get("window");
import { SET_SEARCHED_PRODUCT } from "@actions/flyer";
import { setAlert, setIsLoading } from "@actions/common";
import * as CommonActions from "@actions/common";
import { styles } from "@screens/home/FlyerScreen";

const SearchProductScreen = (props) => {
  const isLoading = useSelector((state) => state.common.isLoading);
  const [product_nm, setProduct_nm] = useState("");
  const userStore = useSelector((state) => state.auth.userStore);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

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
    setPage(1);
    fetchProduct(null, 1);
  };
  const fetchProduct = (e, p = page) => {
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
    dispatch(
      flyerActions.fetchProduct({
        store_cd: userStore.storeInfo.store_cd,
        product_nm: product_nm,
        page: p,
      })
    ).then(() => {
      dispatch(setIsLoading(false));
    });
  };
  const loadMore = () => {
    if (!isLoading && page + 1 <= product.finalPage) {
      setPage(page + 1);
      fetchProduct(null, page + 1);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
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
          numColumns={3}
          data={product.productList}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.product_cd}`
          }
          renderItem={(itemData) => (
            <FlyerItem
              onPress={popupHandler.bind(this, itemData.item)}
              item={itemData.item}
            />
          )}
        />
      )}
      {currentItem && (
        <ProductPopup
          item={currentItem}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.trueWhite, paddingBottom: 0 },
    title: "상품검색",
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
  source: require("@images/search-24_1.png"),
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

export default React.memo(SearchProductScreen);
