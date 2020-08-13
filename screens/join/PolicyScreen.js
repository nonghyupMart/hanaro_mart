import React from "react";

import { SafeAreaView, View, Text, StyleSheet } from "react-native";

const PolicyScreen = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>PolicyScreen</Text>
    </SafeAreaView>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "이용약관 및 개인정보처리방침",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PolicyScreen;
