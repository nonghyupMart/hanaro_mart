import React from "react";

import { View, Text, StyleSheet } from "react-native";

const MyEventScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MyEventScreen</Text>
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "이벤트 응모내역",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyEventScreen;
