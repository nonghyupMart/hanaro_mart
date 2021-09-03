import React, { useState, useEffect, Fragment, useRef } from "react";
import styled from "styled-components/native";
import {
  View,
  Platform,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import BaseScreen from "../../components/BaseScreen";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../components/UI/BaseUI";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "../../store/actions/flyer";
import FlyerItem from "../../components/flyer/FlyerItem";
import CategoryButton from "../../components/UI/CategoryButton";
import ProductPopup from "../../components/ProductPopup";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { SET_PRODUCT, SET_LEAFLET } from "../../store/actions/actionTypes";
import _ from "lodash";
import { setIsLoading } from "../../store/actions/common";
import NoList from "../../components/UI/NoList";
import { useIsFocused } from "@react-navigation/native";
import FlyerBanner from "../../components/flyer/FlyerBanner";
import PickerViews from "../../components/flyer/PickerViews";
import { changeWishState } from "../../store/actions/common";
import colors from "../../constants/Colors";
import { RootState } from "../../hooks";
import { ProductRequest } from "../../models/product/ProductRequest";

const FlyerScreen = (props) => {
  const carouselRef = useRef();
  const isFocused = useIsFocused();
  const isLoading = useSelector((state: RootState) => state.common.isLoading);
  const userStore = useSelector((state: RootState) => state.auth.userStore);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const currentItem = useRef(null);
  const [pageforCarousel, setPageForCarousel] = useState<number>(0);
  const leaflet = useSelector((state: RootState) => state.flyer.leaflet);
  const product = useSelector((state: RootState) => state.flyer.product);
  const page = useRef(1);
  const [carouselKey, setCarouselKey] = useState<number>();
  const [currentFlyer, setCurrentFlyer] = useState();
  const [type_val, setType_val] = useState<TypeValue | "">();

  const clearData = () => {
    dispatch({ type: SET_PRODUCT, product: null });
    page.current = 1;
    setType_val("");
  };
  const init = async () => {
    clearData();
    setCarouselKey(Math.random());

    if (userStore) {
      dispatch(
        flyerActions.fetchLeaflet({
          store_cd: userStore.storeInfo.store_cd,
        })
      ).then((data) => {
        dispatch(setIsLoading(false));
        setPageForCarousel(0);
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      init();
    } else {
      clearData();
      setPageForCarousel(null);
      dispatch({ type: SET_LEAFLET, leaflet: null });
    }
  }, [isFocused]);

  const fetchProduct = (leaf_cd: string, p: number = page.current) => {
    let query: ProductRequest = {
      store_cd: userStore.storeInfo.store_cd,
      leaf_cd: leaf_cd,
      page: p,
      type_val: type_val,
    };
    if (!_.isEmpty(userInfo)) query.user_cd = userInfo.user_cd;
    return dispatch(flyerActions.fetchProduct(query));
  };

  useEffect(() => {
    if (!isFocused) return;
    if (
      pageforCarousel === null ||
      pageforCarousel === undefined ||
      !leaflet ||
      !leaflet.leafletList ||
      !leaflet.leafletList[pageforCarousel]
    )
      return;

    setCurrentFlyer(() => leaflet.leafletList[pageforCarousel]);
    fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, 1);
  }, [type_val]);

  useEffect(() => {
    if (!isFocused) return;

    clearData();
    if (
      !_.isEmpty(leaflet) &&
      _.size(leaflet.leafletList) > 0 &&
      leaflet.leafletList[pageforCarousel]
    ) {
      setCurrentFlyer(() => leaflet.leafletList[pageforCarousel]);
      fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, 1);
    }
  }, [pageforCarousel, isFocused, leaflet]);

  const loadMore = () => {
    if (
      !isLoading &&
      page.current + 1 <= product.finalPage &&
      !_.isEmpty(leaflet) &&
      _.size(leaflet.leafletList) > 0
    ) {
      page.current++;
      fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, page.current);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const beforeAddWishItem = (item) => {
    changeWishState(dispatch, product, item, SET_PRODUCT, "Y");
  };
  const beforeDeleteWishItem = (item) => {
    changeWishState(dispatch, product, item, SET_PRODUCT, "N");
  };

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    currentItem.current = item;
  };
  if (!isFocused || !leaflet || !leaflet.leafletList || _.isEmpty(userStore))
    return <></>;
  if (!_.isEmpty(leaflet) && _.size(leaflet.leafletList) === 0)
    return (
      <NoList
        source={require("../../assets/images/files.png")}
        text={"행사전단"}
      />
    );
  return (
    <BaseScreen
      page={3}
      style={{
        backgroundColor: colors.TRUE_WHITE,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      isPadding={Platform.OS === "ios" ? false : true}
      contentStyle={{
        paddingTop: Platform.OS === "ios" ? 0 : 0,
      }}
      scrollListStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      {currentFlyer && (
        <PickerViews
          carouselRef={carouselRef}
          leafletList={leaflet.leafletList}
          userStore={userStore}
          currentFlyer={currentFlyer}
          setPageForCarousel={setPageForCarousel}
        />
      )}
      {/* <StoreListPopup isVisible={isVisible} /> */}
      {currentFlyer && (
        <FlyerBanner
          carouselRef={carouselRef}
          leafletList={leaflet.leafletList}
          carouselKey={carouselKey}
          leaf_cd={currentFlyer.leaf_cd}
          detail_img_cnt={currentFlyer.detail_img_cnt}
          setPageForCarousel={setPageForCarousel}
        />
      )}
      {currentFlyer && currentFlyer.type_list && (
        <ExtendedFlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{
            marginTop: 22.5,
            marginLeft: 24,
            marginRight: 0,
            width: SCREEN_WIDTH - 24,
            marginBottom: 7,
          }}
          data={currentFlyer.type_list}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.type_val}`
          }
          renderItem={(itemData) => (
            <CategoryButton
              item={itemData.item}
              type_val={type_val}
              onPress={setType_val.bind(this, itemData.item.type_val)}
            />
          )}
        />
      )}
      {/* <Text>{props.number}</Text> */}
      {product && (
        <ExtendedFlatList
          listKey={`FlyerList-${userStore.storeInfo.store_cd}`}
          onEndReached={loadMore}
          columnWrapperStyle={styles.flyerListColumnWrapperStyle}
          numColumns={2}
          style={styles.flyerListStyle}
          data={product.productList}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.product_cd}`
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
      {!_.isEmpty(product) && product.productList.length === 0 && (
        <NoList
          style={{
            backgroundColor: colors.TRUE_WHITE,
            height: SCREEN_HEIGHT - (SCREEN_WIDTH * 0.283 + 250),
          }}
          source={require("../../assets/images/box.png")}
          text={"행사전단"}
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

export const styles = StyleSheet.create({
  flyerListColumnWrapperStyle: {
    justifyContent: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
  flyerListStyle: {
    // flexGrow: 1,
    // flex: 1,
    // height: SCREEN_HEIGHT,
    width: "97%",
    marginTop: 10,
    alignSelf: "center",
  },
});
const ArrowBtn = styled.TouchableOpacity({
  position: "absolute",
  top: "50%",
  marginTop: -16,
});

export default FlyerScreen;
