import React from "react";

import { View, Text, StyleSheet } from "react-native";

const MyInquiriesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MyInquiriesScreen</Text>
    </View>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "나의 문의내역",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyInquiriesScreen;
