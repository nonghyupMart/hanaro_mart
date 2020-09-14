import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, FlatList, Dimensions } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { BaseTouchable, BaseImage } from "@UI/BaseUI";
import * as RootNavigation from "@navigation/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "@actions/flyer";
import FlyerItem from "../../components/FlyerItem";
import FlyerDetail from "../../components/FlyerDetail";
import { useFocusEffect } from "@react-navigation/native";
import { IMAGE_URL } from "@constants/settings";

const { width } = Dimensions.get("window");

const FlyerContentsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const [currentItem, setCurrentItem] = useState(null);

  const userStore = useSelector((state) => state.auth.userStore);
  const leaflet = useSelector((state) => state.flyer.leaflet);
  const product = useSelector((state) => state.flyer.product);
  useEffect(() => {
    setIsLoading(true);
    if (userStore && leaflet) {
      const leaf_cd = leaflet.leafletList[props.number].leaf_cd;
      console.warn(userStore.store_cd);
      const requestProduct = dispatch(
        flyerActions.fetchProduct({
          store_cd: userStore.store_cd,
          leaf_cd: leaf_cd,
        })
      );

      Promise.all([requestProduct]).then(() => {
        setIsLoading(false);
        // console.log(homeBanner);
      });
    }
  }, [props.number]);

  const loadMore = () => {};
  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };

  return (
    <BaseScreen
      style={{ backgroundColor: colors.trueWhite }}
      isLoading={isLoading}
    >
      {/* <StoreListPopup isVisible={isVisible} /> */}

      <BaseTouchable
        onPress={() =>
          RootNavigation.navigate("FlyerDetail", {
            leaf_cd: leaflet.leafletList[props.number].leaf_cd,
          })
        }
        style={{ height: width * 0.283, flex: 1, width: width }}
      >
        <BaseImage
          style={{
            flex: 1,
            resizeMode: "cover",
          }}
          source={props.title_img}
        />
      </BaseTouchable>
      <Text>{props.number}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="<" onPress={() => props.goLeft(props.number)} />
        <Button title=">" onPress={() => props.goRight(props.number)} />
      </View>
      {product && (
        <FlatList
          onEndReachedThreshold={60}
          // onEndReached={() => {
          //   // alert("onEndReached");
          //   // loadMore();
          // }}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          numColumns={3}
          style={{ flexGrow: 1, flex: 1, width: "100%" }}
          data={product.productList}
          keyExtractor={(item) => item.id + ""}
          renderItem={(itemData) => (
            <FlyerItem
              onPress={popupHandler.bind(this, itemData.item)}
              item={itemData.item}
            />
          )}
        />
      )}

      <FlyerDetail
        item={currentItem}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </BaseScreen>
  );
};

export default React.memo(FlyerContentsScreen);
