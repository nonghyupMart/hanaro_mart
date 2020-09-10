import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, FlatList, Dimensions } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { BaseTouchable } from "@UI/BaseUI";
import * as RootNavigation from "@navigation/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "@actions/flyer";
import FlyerItem from "../../components/FlyerItem";
import FlyerDetail from "../../components/FlyerDetail";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const FlyerContentsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const [currentItem, setCurrentItem] = useState(null);

  const [flyerItems, setFlyerItems] = useState([
    {
      id: 0,
      title: "양재점",
    },
    {
      id: 1,
      title: "천안점",
    },
    {
      id: 2,
      title: "마포점",
    },
    {
      id: 3,
      title: "이태원점",
    },
    {
      id: 4,
      title: "홍대점",
    },
    {
      id: 5,
      title: "안산점",
    },
    {
      id: 6,
      title: "양재점",
    },
    {
      id: 7,
      title: "천안점",
    },
    {
      id: 8,
      title: "마포점",
    },
    {
      id: 9,
      title: "이태원점",
    },
    {
      id: 10,
      title: "홍대점",
    },
    {
      id: 11,
      title: "안산점",
    },
  ]);
  const userStore = useSelector((state) => state.auth.userStore);
  const leaflet = useSelector((state) => state.flyer.leaflet);
  const product = useSelector((state) => state.flyer.product);
  useEffect(() => {
    console.log("props **** ", props);
    setIsLoading(true);
    if (userStore && leaflet) {
      const leaf_cd = leaflet.leafletList[props.number].leaf_cd;

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
        onPress={() => RootNavigation.navigate("FlyerDetail")}
        style={{ height: width * 0.283, flex: 1, width: width }}
      >
        <Image
          style={{
            flex: 1,
            resizeMode: "cover",
          }}
          source={{
            uri:
              "http://img-m.nonghyupmall.com//prdimg/02/003/005/001/009//4002685492_0_320_20200428155054.jpg",
          }}
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
