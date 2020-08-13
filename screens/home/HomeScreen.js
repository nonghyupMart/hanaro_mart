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
} from "react-native";

import Carousel from "react-native-looped-carousel";
import { useSelector } from "react-redux";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import StoreListPopup from "../../components/store/StoreListPopup";
import FlyerItem from "../../components/FlyerItem";
import FlyerDetail from "../../components/FlyerDetail";
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
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

  const triggerNotificationHandler = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is the first local notification we are sending!',
    //     data: { mySpecialData: 'Some text' },
    //   },
    //   trigger: {
    //     seconds: 10,
    //   },
    // });
    console.log("triggerNotificationHandler");
    console.log("FlyerScreen PushToken ==>" + pushToken);
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        data: { extraData: "Some data" },
        title: "Sent via the app",
        body: "This push notification was sent via the app!",
      }),
    });
  };

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };
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
            <Carousel
              delay={2000}
              style={{ flex: 1, height: 100 }}
              autoplay
              pageInfo
            >
              <View style={[{ backgroundColor: "#BADA55" }, state.size]}>
                <Text>1</Text>
              </View>
              <View style={[{ backgroundColor: "red" }, state.size]}>
                <Text>2</Text>
              </View>
              <View style={[{ backgroundColor: "blue" }, state.size]}>
                <Text>3</Text>
              </View>
            </Carousel>

            <View style={styles.content2}>
              <Button
                title="팝업"
                onPress={() => {
                  setIsVisible((isVisible) => !isVisible);
                }}
              />
            </View>
            <View style={styles.content2}>
              <Button
                title="Trigger Notification"
                onPress={() => triggerNotificationHandler()}
              />
            </View>
            <FlatList
              initialNumToRender={6}
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
      ></FlatList>
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
});

export default HomeScreen;
