import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
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
  TouchableNativeFeedback,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Input } from "react-native-elements";
import URI from "urijs";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import BaseScreen from "@components/BaseScreen";
import Carousel from "react-native-looped-carousel";
import { useSelector, useDispatch } from "react-redux";

import { WebView } from "react-native-webview";
import AwesomeAlert from "react-native-awesome-alerts";

import ScrollList from "../../components/UI/ScrollList";
import StoreListPopup from "../../components/store/StoreListPopup";
import FlyerItem from "../../components/FlyerItem";
import FlyerDetail from "../../components/FlyerDetail";
const { width, height } = Dimensions.get("window");
import * as authActions from "@actions/auth";
import { StyleConstants } from "@UI/BaseUI";

const HomeScreen = ({ navigation }) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [page, setPage] = useState(0);
  const pushToken = useSelector((state) => state.auth.pushToken);

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
  const [isAlertVisible, setIsAlertVisible] = useState(false);
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
    alert("PushToken ==>" + pushToken);
    // if (!pushToken) alert("권한이 없거나 로그인되지 않았습니다.")
    // pushToken is null 일때 서버에 알려야함.

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
  const videoUrl =
    "https://www.youtube.com/watch?v=53Vxx0R-EJM&feature=youtu.be";
  const url = URI(videoUrl);
  const videoId = url.query(true).v;
  if (videoId == "") {
  }
  // const videoId = "";
  let offset = 0;
  const onScrollHandler = (e) => {
    console.log(navigation);
    const currentOffset = e.nativeEvent.contentOffset.y;
    var direction = currentOffset > offset ? "down" : "up";
    offset = currentOffset;
    if (direction === "down") {
      navigation.dispatch(
        CommonActions.setParams({
          tabBarVisible: false,
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.setParams({
          tabBarVisible: true,
        })
      );
    }
  };
  const dispatch = useDispatch();
  const authHandler = async () => {
    let action;

    action = authActions.test();
    // setError(null);
    // setIsLoading(true);
    try {
      return await dispatch(action);
      return new Promise((resolve) => setTimeout(resolve, 20000));
      // props.navigation.navigate('Shop');
    } catch (err) {
      alert(err.message);
      // setIsLoading(false);
    }
  };
  // const [testItem, setTestItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const testItem = useSelector((state) => state.auth.testItem);
  useEffect(() => {
    setIsLoading(true);
    authHandler().then(() => {
      setIsLoading(false);
      // console.log("authHandler().then(() => ", testItem);
    });

    // setTestItem();
    // const dispatch = useDispatch();
  }, [dispatch]);

  // console.log(testItem);
  if (
    isLoading ||
    (testItem && testItem.lnameList && testItem.lnameList.length === 0)
  )
    return <></>;
  if (!isLoading)
    return (
      <BaseScreen style={styles.screen} contentStyle={{ paddingTop: 0 }}>
        <ScrollList
          onScroll={onScrollHandler.bind(this)}
          style={{ flex: 1, width: "100%" }}
          renderItem={({ item, index, separators }) => (
            <View>
              <Carousel
                delay={2000}
                style={{ flex: 1, height: width * 0.608 }}
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
              <WebView
                style={{ flex: 1, height: width * 0.555, opacity: 0.99 }}
                javaScriptEnabled={true}
                source={{
                  html: require("../../youtubePlayer.js")(videoId),
                }}
              />

              <FlatList
                initialNumToRender={6}
                onEndReachedThreshold={60}
                onEndReached={() => {
                  // alert("onEndReached");
                  // loadMore();
                }}
                contentContainerStyle={{
                  justifyContent: "space-between",
                }}
                numColumns={1}
                style={{
                  flexGrow: 1,
                  marginLeft: StyleConstants.defaultPadding,
                  marginRight: StyleConstants.defaultPadding,
                  marginTop: 8,
                }}
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={(item) => item.id + ""}
                renderItem={(itemData) => (
                  <TouchableNativeFeedback onPress={() => {}}>
                    <NoticeItemContainer>
                      <View>
                        <View></View>
                        <NoticeTitle>
                          2020년 고객 감사 영수증 이벤트
                        </NoticeTitle>
                      </View>
                      <NoticeTitle>2020.07.20</NoticeTitle>
                    </NoticeItemContainer>
                  </TouchableNativeFeedback>
                )}
              />
            </View>
          )}
        />
      </BaseScreen>
    );
};
const NoticeTitle = styled.Text({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const NoticeItemContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  marginTop: 3,
  marginBottom: 3,

  justifyContent: "space-between",
});
const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: colors.trueWhite,
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
