import React from "react";

import { View, Text, StyleSheet } from "react-native";

const MyReviewsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MyReviewsScreen</Text>
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "나의 리뷰",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyReviewsScreen;
