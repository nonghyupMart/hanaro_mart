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
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerActions } from "@react-navigation/native";
import colors from "@constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton, LogoTitle } from "@UI/header";
import { CommonActions } from "@react-navigation/native";
import { Input } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import URI from "urijs";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import BaseScreen from "@components/BaseScreen";
import Carousel from "react-native-looped-carousel";
import { useSelector, useDispatch } from "react-redux";

import { ExtendedWebView } from "@UI/ExtendedWebView";
import AwesomeAlert from "react-native-awesome-alerts";

import ScrollList from "../../components/UI/ScrollList";
import StoreListPopup from "../../components/store/StoreListPopup";
import FlyerItem from "../../components/FlyerItem";

const { width, height } = Dimensions.get("window");
import * as authActions from "@actions/auth";
import { StyleConstants } from "@UI/BaseUI";
import * as homeActions from "@actions/home";
import { IMAGE_URL } from "@constants/settings";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [page, setPage] = useState(0);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const homeBanner = useSelector((state) => state.home.homeBanner);
  const homeNotice = useSelector((state) => state.home.homeNotice);

  useEffect(() => {
    setIsLoading(true);
    const requestHomeBanner = dispatch(homeActions.fetchHomeBanner());
    const requestHomeNotice = dispatch(homeActions.fetchHomeNotice());
    Promise.all([requestHomeBanner, requestHomeNotice]).then((result) => {
      setIsLoading(false);
      // console.log(homeBanner);
    });
  }, [dispatch]);

  const state = {
    size: { width, height },
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

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

  const dispatch = useDispatch();
  const authHandler = async () => {
    // let action;
    // action = authActions.test();
    // // setError(null);
    // // setIsLoading(true);
    // try {
    //   return await dispatch(action);
    //   return new Promise((resolve) => setTimeout(resolve, 20000));
    //   // props.navigation.navigate('Shop');
    // } catch (err) {
    //   alert(err.message);
    //   // setIsLoading(false);
    // }
  };
  // const [testItem, setTestItem] = useState();

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

  return (
    <BaseScreen
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
    >
      <ScrollList
        style={{ flex: 1, width: "100%" }}
        renderItem={({ item, index, separators }) => (
          <View>
            {homeBanner ? (
              <Carousel
                delay={2000}
                style={{ flex: 1, height: width * 0.608 }}
                autoplay
                pageInfo
              >
                {homeBanner.bannerList ? (
                  homeBanner.bannerList.map((item, index) => {
                    let imageSource = {
                      uri: IMAGE_URL + item.display_img,
                    };
                    console.log("imageSource!", imageSource);
                    const onError = () => {
                      // console.log("error =====>");
                      imageSource = require("@images/m_img499.png");
                    };
                    return (
                      <View style={{ flex: 1 }}>
                        <Image
                          style={{
                            flex: 1,
                            height: width * 0.608,
                            width: width,
                          }}
                          defaultSource={require("@images/m_img499.png")}
                          resizeMode="cover"
                          // loadingIndicatorSource={require("@images/m_img499.png")}
                          source={imageSource}
                          onError={onError.bind(this)}
                        />
                      </View>
                    );
                  })
                ) : (
                  <Image
                    style={{ flex: 1, height: width * 0.608 }}
                    source={require("@images/m_img499.png")}
                    resizeMode="cover"
                  />
                )}
              </Carousel>
            ) : (
              <Image
                style={{ flex: 1, height: width * 0.608 }}
                source={require("@images/m_img499.png")}
                resizeMode="cover"
              />
            )}
            <ExtendedWebView
              style={{ flex: 1, height: width * 0.555, opacity: 0.99 }}
              source={{
                html: require("../../youtubePlayer.js")(videoId),
              }}
            />
            {homeNotice && (
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
                data={homeNotice.noticeList}
                keyExtractor={(item) => item.id + ""}
                renderItem={(itemData) => {
                  return (
                    <TouchableNativeFeedback
                      onPress={() => {
                        navigation.navigate("Notice", {
                          type: "H",
                          notice_cd: itemData.item.notice_cd,
                        });
                      }}
                    >
                      <NoticeItemContainer>
                        <View>
                          <View></View>
                          <NoticeTitle>{itemData.item.title}</NoticeTitle>
                        </View>
                        <NoticeTitle>{itemData.item.reg_date}</NoticeTitle>
                      </NoticeItemContainer>
                    </TouchableNativeFeedback>
                  );
                }}
              />
            )}
          </View>
        )}
      />
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    headerTitle: (props) => <LogoTitle {...props} />,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconSize={30}
          IconComponent={MaterialIcons}
          title="메뉴"
          iconName="menu"
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          color={colors.pine}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          IconComponent={MaterialIcons}
          iconSize={24}
          title="검색"
          iconName="search"
          onPress={() => {
            animate();
          }}
          color={colors.pine}
          style={{ marginRight: 0, marginLeft: 0 }}
        />
        <Item
          IconComponent={MaterialIcons}
          iconSize={24}
          title="알림"
          iconName="notifications-none"
          onPress={() => {
            animate();
          }}
          color={colors.pine}
        />
        <Item
          iconSize={24}
          IconComponent={MaterialCommunityIcons}
          title="장바구니"
          iconName="cart-outline"
          onPress={() => {
            animate();
          }}
          color={colors.pine}
        />
        {/* <Item
          title="Scanner"
          iconName={
            Platform.OS === "android" ? "md-qr-scanner" : "md-qr-scanner"
          }
          onPress={() => {
            navigation.navigate("BarCodeScanner");
          }}
        /> */}
      </HeaderButtons>
    ),
  };
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
