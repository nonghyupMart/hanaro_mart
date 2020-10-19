import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Platform, Image, FlatList, Dimensions } from "react-native";
import BaseScreen from "@components/BaseScreen";
import {
  BaseTouchable,
  BaseImage,
  EmptyScreen,
  EmptyText,
  screenHeight,
} from "@UI/BaseUI";

import * as RootNavigation from "@navigation/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "@actions/flyer";
import FlyerItem from "@components/FlyerItem";
import ProductPopup from "@components/ProductPopup";
import { useFocusEffect } from "@react-navigation/native";
import { IMAGE_URL } from "@constants/settings";
import Carousel from "@UI/Carousel";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import { SET_PRODUCT } from "@actions/flyer";
import _ from "lodash";

const { width } = Dimensions.get("window");

const FlyerScreen = (props) => {
  const [alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const userStore = useSelector((state) => state.auth.userStore);
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState(null);
  const [pageforCarousel, setPageForCarousel] = useState(0);
  const leaflet = useSelector((state) => state.flyer.leaflet);
  const product = useSelector((state) => state.flyer.product);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch({ type: SET_PRODUCT, product: null });
    setPage(1);
    // const unsubscribe = navigation.addListener("focus", () => {
    if (userStore) {
      setIsLoading(true);

      dispatch(
        flyerActions.fetchLeaflet({ store_cd: userStore.storeInfo.store_cd })
      ).then((data) => {
        fetchProduct(data.leafletList[0].leaf_cd, 1).then(() => {
          setIsLoading(false);
        });
      });
    }
    // });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;
    return () => {
      setPage(1);
      dispatch({ type: SET_PRODUCT, product: null });
    };
  }, [userStore]);

  const fetchProduct = (leaf_cd, p = page) => {
    return dispatch(
      flyerActions.fetchProduct({
        store_cd: userStore.storeInfo.store_cd,
        leaf_cd: leaf_cd,
        page: p,
      })
    );
  };

  useEffect(() => {
    dispatch({ type: SET_PRODUCT, product: null });
    setPage(1);
    if (leaflet) {
      setIsLoading(true);
      fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, 1).then(() => {
        setIsLoading(false);
      });
    }
  }, [pageforCarousel]);

  const loadMore = () => {
    if (!isLoading && page + 1 <= product.finalPage) {
      setPage(page + 1);
      fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, page + 1);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };
  if (!leaflet) return <></>;
  if (leaflet && leaflet.leafletList.length === 0)
    return (
      <EmptyScreen>
        <EmptyText>{`현재 진행중인 행사전단이\n없습니다.`}</EmptyText>
      </EmptyScreen>
    );
  return (
    <BaseScreen
      alert={alert}
      style={{
        backgroundColor: colors.trueWhite,
      }}
      isLoading={isLoading}
      isPadding={Platform.OS == "ios" ? false : true}
      // scrollListStyle={{ paddingTop: Platform.OS == "ios" ? 19 : 0 }}
      contentStyle={{
        paddingTop: Platform.OS == "ios" ? 19 : 19,
        paddingLeft: Platform.OS == "ios" ? 16 : 0,
        paddingRight: Platform.OS == "ios" ? 16 : 0,
      }}
    >
      {/* <StoreListPopup isVisible={isVisible} /> */}
      <Carousel
        style={{
          height: width * 0.283,
          flex: 1,
          width: "100%",
          marginBottom: 30,
        }}
        autoplay={false}
        pageInfo={false}
        bullets={true}
        arrows={true}
        pageInfoBackgroundColor={"transparent"}
        pageInfoTextStyle={{ color: colors.trueWhite, fontSize: 14 }}
        pageInfoTextSeparator="/"
        onAnimateNextPage={(p) => setPageForCarousel(p)}
        chosenBulletStyle={{
          backgroundColor: colors.yellowOrange,
          marginLeft: 3.5,
          marginRight: 3.5,
        }}
        bulletStyle={{
          backgroundColor: colors.white,
          borderWidth: 0,
          marginLeft: 3.5,
          marginRight: 3.5,
        }}
        bulletsContainerStyle={{ bottom: -30 }}
      >
        {leaflet.leafletList.map((item, index) => {
          return (
            <BaseTouchable
              onPress={() =>
                item.detail_img_cnt > 0
                  ? RootNavigation.navigate("FlyerDetail", {
                      leaf_cd: item.leaf_cd,
                    })
                  : null
              }
              style={{ height: width * 0.283, flex: 1, width: "100%" }}
            >
              <BaseImage
                style={{
                  flex: 1,
                  resizeMode: "cover",
                }}
                source={item.title_img}
              />
            </BaseTouchable>
          );
        })}
      </Carousel>
      {/* <Text>{props.number}</Text> */}
      {product && (
        <ExtendedFlatList
          onEndReached={loadMore}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          numColumns={3}
          style={{ flexGrow: 1, flex: 1, width: "100%" }}
          data={product.productList}
          keyExtractor={(item, index) => Math.random()}
          // keyExtractor={(item) => item.product_cd + ""}
          renderItem={(itemData) => (
            <FlyerItem
              onPress={popupHandler.bind(this, itemData.item)}
              item={itemData.item}
            />
          )}
        />
      )}
      {!_.isEmpty(product) && product.productList.length === 0 && (
        <EmptyScreen
          style={{
            backgroundColor: colors.trueWhite,
            height: screenHeight - (width * 0.283 + 250),
          }}
        >
          <EmptyText>{`현재 진행중인 행사상품이\n없습니다.`}</EmptyText>
        </EmptyScreen>
      )}
      {currentItem && (
        <ProductPopup
          item={currentItem}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setIsLoading={setIsLoading}
          setAlert={setAlert}
        />
      )}
    </BaseScreen>
  );
};

const ArrowBtn = styled.TouchableOpacity({
  position: "absolute",
  top: "50%",
  marginTop: -16,
});

export default React.memo(FlyerScreen);
