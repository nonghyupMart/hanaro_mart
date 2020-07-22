import React from "react";

import { View, Text, StyleSheet, Button } from "react-native";

const FlyerDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>전단 상세 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FlyerDetailScreen;
