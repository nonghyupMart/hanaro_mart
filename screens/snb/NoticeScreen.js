import React from "react";

import { View, Text, StyleSheet } from "react-native";

const NoticeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>NoticeScreen</Text>
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "공지사항",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoticeScreen;
