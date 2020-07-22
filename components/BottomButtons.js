import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { Icon } from "react-native-elements";

const BottomButtons = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={styles.icons}>
        <Icon type="ionicon" name="ios-home" />
        <Text style={styles.center}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.icons}>
        <Icon type="material-community" name="ticket-account" />
        <Text style={styles.center}>나의 쿠폰</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.icons}>
        <Icon type="font-awesome-5" name="chrome" size={45} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.icons}>
        <Icon type="octicon" name="person" />
        <Text style={styles.center}>마이페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.icons}>
        <Icon type="ionicon" name="ios-call" />
        <Text style={styles.center}>매장전화</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
  },
  icons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
  },
});

export default BottomButtons;
