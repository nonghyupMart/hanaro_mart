import React from "react";

import { View, Text, StyleSheet } from "react-native";

const CouponScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>CouponScreen</Text>
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

export default CouponScreen;
