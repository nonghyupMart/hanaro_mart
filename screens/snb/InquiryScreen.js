import React from "react";

import { View, Text, StyleSheet } from "react-native";

const InquiryScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>InquiryScreen</Text>
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "1:1 문의",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InquiryScreen;
