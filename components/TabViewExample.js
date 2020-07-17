import * as React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const flyerRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
    <Text>111</Text>
  </View>
);

const eventRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
);
const couponRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
);

const exhibitionRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
);

const youtubeRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
);
const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "flyer", title: "행사전단" },
    { key: "event", title: "이벤트" },
    { key: "coupon", title: "나로쿠폰" },
    { key: "exhibition", title: "기획전" },
    { key: "youtube", title: "나로튜브" },
  ]);

  const renderScene = SceneMap({
    flyer: flyerRoute,
    event: eventRoute,
    coupon: couponRoute,
    exhibition: exhibitionRoute,
    youtube: youtubeRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
