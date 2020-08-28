import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Easing,
} from "react-native";
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";

import CouponForProductScreen from "./CouponForProductScreen";
import CouponForTotalScreen from "./CouponForTotalScreen";

import Carousel from "react-native-looped-carousel";
import { useSelector } from "react-redux";

import FlyerItem from "../../components/FlyerItem";
import FlyerDetail from "../../components/FlyerDetail";
const { width, height } = Dimensions.get("window");
const initialLayout = { width: Dimensions.get("window").width };

const FlyerContentsScreen = (props) => {
  const { navigation } = props;

  const [currentItem, setCurrentItem] = useState(null);
  const [page, setPage] = useState(0);
  const pushToken = useSelector((state) => state.auth.pushToken);
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

  const loadMore = () => {
    // if (page == 0) {
    setFlyerItems(() => [
      ...flyerItems,
      {
        id: Math.random().toString(36).substring(7),
        title: "양재점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "천안점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "마포점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "이태원점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "홍대점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "안산점" + Math.floor(Math.random() * 100),
      },
    ]);
    //   setPage(() => page + 1);
    // }
  };
  const state = {
    size: { width, height },
  };
  const images = [
    "https://placeimg.com/640/640/nature",
    "https://placeimg.com/640/640/people",
    "https://placeimg.com/640/640/animals",
    "https://placeimg.com/640/640/beer",
  ];
  const [isVisible, setIsVisible] = useState(false);

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };

  const onPressLeft = () => {};
  return (
    <SafeAreaView style={styles.screen}>
      {/* <StoreListPopup isVisible={isVisible} /> */}
      <FlatList
        keyExtractor={(item) => item + ""}
        data={[0]}
        style={{ flex: 1, width: "100%" }}
        renderItem={({ item, index, separators }) => (
          <View>
            <View style={styles.content1}>
              <Button
                title="전단 상세"
                onPress={() => navigation.navigate("FlyerDetail")}
              />
            </View>
            <Image
              style={{
                width: "100%",
                height: 100,
                resizeMode: "stretch",
              }}
              source={{
                uri:
                  "http://img-m.nonghyupmall.com//prdimg/02/003/005/001/009//4002685492_0_320_20200428155054.jpg",
              }}
            />
            <Text>{props.number}</Text>
            <View style={{ flexDirection: "row" }}>
              <Button title="<" onPress={() => props.goLeft(props.number)} />
              <Button title=">" onPress={() => props.goRight(props.number)} />
            </View>
            <FlatList
              onEndReachedThreshold={60}
              onEndReached={() => {
                // alert("onEndReached");
                loadMore();
              }}
              contentContainerStyle={{
                justifyContent: "space-between",
              }}
              numColumns={3}
              style={{ flexGrow: 1 }}
              data={flyerItems}
              keyExtractor={(item) => item.id + ""}
              renderItem={(itemData) => (
                <FlyerItem
                  onPress={popupHandler.bind(this, itemData.item)}
                  title={itemData.item.title}
                  keyExtractor={() => itemData.item.id}
                />
              )}
            />
          </View>
        )}
      />
      <FlyerDetail
        item={currentItem}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { backgroundColor: "#000", height: 350 },
  content1: {
    flex: 1,
    width: "100%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  content2: {
    width: "100%",
    height: 100,
    marginTop: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: { color: "#fff" },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSelected: {
    opacity: 1,
    color: "red",
  },
  customSlide: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: 100,
    height: 100,
  },
  tabbar: {
    height: 0,
    width: 0,
    backgroundColor: "#3f51b5",
  },
  tab: {
    width: 0,
  },
  indicator: {
    backgroundColor: "#ffeb3b",
  },
  label: {
    fontWeight: "400",
  },
});

export default FlyerContentsScreen;
