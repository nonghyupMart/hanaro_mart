import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar, SceneMap, ScrollPager } from "react-native-tab-view";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import FlyerContentsScreen from "./FlyerContentsScreen";
import * as flyerActions from "@actions/flyer";
import Loading from "@UI/Loading";
import { useFocusEffect } from "@react-navigation/native";
const initialLayout = { width: Dimensions.get("window").width };
import { useIsFocused } from "@react-navigation/native";
const FlyerScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userStore = useSelector((state) => state.auth.userStore, shallowEqual);
  // console.warn("==> start FlyerScreen", userStore.store_cd);
  const leaflet = useSelector((state) => state.flyer.leaflet);
  const routes = useSelector((state) =>
    state.flyer.leaflet ? state.flyer.leaflet.leafletList : []
  );
  // const [routes, setRoutes] = useState([]);
  useEffect(() => {
    // const unsubscribe = navigation.addListener("focus", () => {
    if (userStore) {
      setIsLoading(true);

      // console.warn("start FlyerScreen", userStore.store_cd);
      const fetchLeaflet = dispatch(
        flyerActions.fetchLeaflet({ store_cd: userStore.store_cd })
      );

      Promise.all([fetchLeaflet]).then(() => {
        setIsLoading(false);

        // console.log(homeBanner);
      });
    }
    // });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;
  }, [userStore]);

  const [index, setIndex] = React.useState(0);
  const handleIndexChange = (index) => {
    setIndex(() => index);
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  const goLeft = (index) => {
    if (index > 0) {
      setIndex(() => index - 1);
    }
  };
  const goRight = (index) => {
    if (index < routes.length - 1) {
      setIndex(() => index + 1);
    }
  };
  const renderScene = ({ route, jumpTo }) => {
    console.warn("renderScene -> ", route);

    return (
      <FlyerContentsScreen
        // route={route}
        jumpTo={jumpTo}
        title_img={route.title_img}
        number={routes.indexOf(route)}
        goLeft={goLeft}
        goRight={goRight}
        leaf_cd={route.leaf_cd}
        store_cd={userStore.store_cd}
      />
    );
  };

  return (
    <TabView
      // renderPager={(props) => <ScrollPager {...props} />}
      lazy
      removeClippedSubviews={true}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={initialLayout}
    />
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

export default FlyerScreen;
