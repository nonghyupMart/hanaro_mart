import React from "react";
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";

import * as RootNavigation from "../navigation/RootNavigation";
import { Icon } from "react-native-elements";

const BottomButtons = (props) => {
  const isBottomNavigation = useSelector(
    (state) => state.auth.isBottomNavigation
  );
  if (isBottomNavigation)
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            RootNavigation.navigate("Home");
          }}
        >
          <Icon type="ionicon" name="ios-home" />
          <Text style={styles.center}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            RootNavigation.navigate("MyCoupon");
          }}
        >
          <Icon type="material-community" name="ticket-account" />
          <Text style={styles.center}>나의 쿠폰</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          activeOpacity={0.7}
          onPress={() => {
            RootNavigation.navigate("RingPicker");
          }}
        >
          <Icon type="font-awesome-5" name="chrome" size={55} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            RootNavigation.navigate("Flyer");
          }}
        >
          <Icon type="octicon" name="person" />
          <Text style={styles.center}>마이페이지</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            Linking.openURL("tel:+123456789");
          }}
        >
          <Icon type="ionicon" name="ios-call" />
          <Text style={styles.center}>매장전화</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  else return <></>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  hide: {
    opacity: 0,
  },
  icons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  center: {
    flex: 1,
  },

  ringIcons: {
    color: "green",
    backgroundColor: "green",
  },
});

export default BottomButtons;
