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
import BaseScreen from "../../components/BaseScreen";
import {
  BaseTouchable,
  BaseImage,
  screenHeight,
  BaseText,
  screenWidth,
} from "../../components/UI/BaseUI";

import * as RootNavigation from "../../navigation/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "../../store/actions/flyer";
import FlyerItemColumn2 from "../../components/FlyerItemColumn2";
import CategoryButton from "../../components/UI/CategoryButton";
import ProductPopup from "../../components/ProductPopup";
import { useFocusEffect } from "@react-navigation/native";
import { IMAGE_URL } from "../../constants/settings";
import Carousel from "../../components/UI/Carousel";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { SET_PRODUCT, SET_LEAFLET } from "../../store/actions/flyer";
import _ from "lodash";
import { setIsLoading } from "../../store/actions/common";
import NoList from "../../components/UI/NoList";
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
  const [currentFlyer, setCurrentFlyer] = useState();
  const [type_val, setType_val] = useState("");
  const clearData = () => {
    dispatch({ type: SET_PRODUCT, product: null });
    setPage(1);
    setType_val("");
  };
  const init = async () => {
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
  };

  useEffect(() => {
    if (isFocused) {
      init();
    } else {
      setPageForCarousel(null);
      dispatch({ type: SET_LEAFLET, leaflet: null });
    }

    return () => {
      clearData();
      dispatch({ type: SET_LEAFLET, leaflet: null });
      setPageForCarousel(null);
    };
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) return;
    if (pageforCarousel == null || pageforCarousel == undefined) return;
    dispatch(setIsLoading(true));
    setCurrentFlyer(() => leaflet.leafletList[pageforCarousel]);
    fetchProduct(leaflet.leafletList[pageforCarousel].leaf_cd, 1).then(() => {
      dispatch(setIsLoading(false));
    });
  }, [type_val]);

  const fetchProduct = (leaf_cd, p = page) => {
    return dispatch(
      flyerActions.fetchProduct({
        store_cd: userStore.storeInfo.store_cd,
        leaf_cd: leaf_cd,
        page: p,
        type_val: type_val,
      })
    );
  };

  useEffect(() => {
    if (!isFocused) return;
    if (pageforCarousel == null || pageforCarousel == undefined) return;
    clearData();
    if (!_.isEmpty(leaflet) && _.size(leaflet.leafletList) > 0) {
      dispatch(setIsLoading(true));
      setCurrentFlyer(() => leaflet.leafletList[pageforCarousel]);
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
    return (
      <NoList
        source={require("../../assets/images/files.png")}
        text={"행사전단"}
      />
    );
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
        paddingTop: Platform.OS == "ios" ? 17 : 17,
        // paddingLeft: Platform.OS == "ios" ? 16 : 0,
        // paddingRight: Platform.OS == "ios" ? 16 : 0,
      }}
      scrollListStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      {/* <StoreListPopup isVisible={isVisible} /> */}
      <View style={{ paddingLeft: 24, paddingRight: 24, width: "100%" }}>
        <Carousel
          key={`${carouselKey}`}
          style={{
            height: (width - 48) * 0.608,
            flex: 1,
            width: "100%",
            marginBottom: 0,
          }}
          autoplay={false}
          pageInfo={false}
          bullets={false}
          arrows={_.size(leaflet.leafletList) <= 1 ? false : true}
          arrowLeft={
            <Image
              source={require("../../assets/images/left_button.png")}
              style={{ marginLeft: 4 }}
            />
          }
          arrowRight={
            <Image
              source={require("../../assets/images/right_button.png")}
              style={{ marginRight: 4 }}
            />
          }
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
                style={{ height: width * 0.608, flex: 1, width: "100%" }}
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
      {currentFlyer && currentFlyer.detail_img_cnt > 0 && (
        <FlyerDetailButton
          onPress={() =>
            RootNavigation.navigate("FlyerDetail", {
              leaf_cd: currentFlyer.leaf_cd,
            })
          }
        >
          <DetailText>전단 전체보기</DetailText>
          <Image source={require("../../assets/images/icon.png")} />
        </FlyerDetailButton>
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
            width: screenWidth - 24,
          }}
          data={currentFlyer.type_list}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.type_val}`
          }
          renderItem={(itemData) => (
            <CategoryButton
              item={itemData.item}
              type_val={type_val}
              onPress={() => setType_val(itemData.item.type_val)}
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
            <FlyerItemColumn2
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
          source={require("../../assets/images/box.png")}
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

const FlyerDetailButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  // shadowRadius: 4,
  // shadowOpacity: 0.2,
  // backgroundColor: colors.trueWhite,
  // elevation: 10,
  paddingTop: 5,
  paddingBottom: 5,
  flexDirection: "row",
});
const DetailText = styled(BaseText)({
  fontSize: 16,
  letterSpacing: -0.32,
  color: colors.emerald,
  fontFamily: "CustomFont-Bold",
  marginRight: 2,
});
export const styles = StyleSheet.create({
  flyerListColumnWrapperStyle: {
    justifyContent: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
  flyerListStyle: {
    // flexGrow: 1,
    // flex: 1,
    // height: screenHeight,
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
