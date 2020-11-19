import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  Platform,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import BaseScreen from "@components/BaseScreen";
import { BaseTouchable, BaseImage, screenHeight } from "@UI/BaseUI";

import * as RootNavigation from "@navigation/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "@actions/flyer";
import FlyerItem from "@components/FlyerItem";
import ProductPopup from "@components/ProductPopup";
import { useFocusEffect } from "@react-navigation/native";
import { IMAGE_URL } from "@constants/settings";
import Carousel from "@UI/Carousel";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import { SET_PRODUCT, SET_LEAFLET } from "@actions/flyer";
import _ from "lodash";
import { setIsLoading } from "@actions/common";
import NoList from "@UI/NoList";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const FlyerScreen = (props) => {
  const isFocused = useIsFocused();
  const isLoading = useSelector((state) => state.common.isLoading);
  const userStore = useSelector((state) => state.auth.userStore);
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState(null);
  const [pageforCarousel, setPageForCarousel] = useState();
  const leaflet = useSelector((state) => state.flyer.leaflet);
  const product = useSelector((state) => state.flyer.product);
  const [page, setPage] = useState(1);
  const [carouselKey, setCarouselKey] = useState();

  const clearData = () => {
    dispatch({ type: SET_PRODUCT, product: null });
    setPage(1);
  };
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      clearData();
      setCarouselKey(Math.random());

      if (userStore) {
        dispatch(setIsLoading(true));

        dispatch(
          flyerActions.fetchLeaflet({
            store_cd: userStore.storeInfo.store_cd,
          })
        ).then((data) => {
          dispatch(setIsLoading(false));
          setPageForCarousel(0);
        });
      }
    });
    const blurSubscribe = props.navigation.addListener("blur", () => {
      setPageForCarousel(null);
      dispatch({ type: SET_LEAFLET, leaflet: null });
    });

    return () => {
      blurSubscribe;
      unsubscribe;
      clearData();
      dispatch({ type: SET_LEAFLET, leaflet: null });
      setPageForCarousel(null);
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

    if (!isFocused) return;
    if (pageforCarousel == null || pageforCarousel == undefined) return;
    clearData();
    if (!_.isEmpty(leaflet) && _.size(leaflet.leafletList) > 0) {
      dispatch(setIsLoading(true));
      fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, 1).then(() => {
        dispatch(setIsLoading(false));
      });
    }
  }, [pageforCarousel, isFocused]);


  const loadMore = () => {
    if (
      !isLoading &&
      page + 1 <= product.finalPage &&
      !_.isEmpty(leaflet) &&
      _.size(leaflet.leafletList) > 0
    ) {
      dispatch(setIsLoading(true));
      setPage(page + 1);
      fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, page + 1).then(
        () => {
          dispatch(setIsLoading(false));
        }
      );
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };
  if (!leaflet || !leaflet.leafletList) return <></>;
  if (!_.isEmpty(leaflet) && _.size(leaflet.leafletList) === 0)
    return <NoList source={require("@images/files.png")} text={"행사전단"} />;
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
        paddingTop: Platform.OS == "ios" ? 19 : 19,
        // paddingLeft: Platform.OS == "ios" ? 16 : 0,
        // paddingRight: Platform.OS == "ios" ? 16 : 0,
      }}
      scrollListStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      {/* <StoreListPopup isVisible={isVisible} /> */}
      <View style={{ paddingLeft: 16, paddingRight: 16, width: "100%" }}>
        <Carousel
          key={`${carouselKey}`}
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
                key={item.leaf_cd}
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
      </View>
      {/* <Text>{props.number}</Text> */}
      {product && (
        <ExtendedFlatList
          listKey={`FlyerList-${Math.random().toString(36).substr(2, 9)}`}
          onEndReached={loadMore}
          columnWrapperStyle={styles.flyerListColumnWrapperStyle}
          numColumns={3}
          style={styles.flyerListStyle}
          data={product.productList}
          keyExtractor={(item, index) =>
            "_" + Math.random().toString(36).substr(2, 9)
          }
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
        <NoList
          style={{
            backgroundColor: colors.trueWhite,
            height: screenHeight - (width * 0.283 + 250),
          }}
          source={require("@images/box.png")}
          text={"행사상품"}
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

export const styles = StyleSheet.create({
  flyerListColumnWrapperStyle: {
    justifyContent: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
  flyerListStyle: {
    flexGrow: 1,
    flex: 1,
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

export default React.memo(FlyerScreen);
