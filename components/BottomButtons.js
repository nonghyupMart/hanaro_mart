import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import * as Linking from "expo-linking";

import * as RootNavigation from "../navigation/RootNavigation";
import { Icon } from "react-native-elements";

const BottomButtons = (props) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.icons}
        onPress={() => {
          RootNavigation.navigate("Flyer");
        }}
      >
        <Icon type="ionicon" name="ios-home" />
        <Text style={styles.center}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.icons}
        onPress={() => {
          RootNavigation.navigate("Flyer");
        }}
      >
        <Icon type="material-community" name="ticket-account" />
        <Text style={styles.center}>나의 쿠폰</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback style={styles.icons}>
        <Icon
          type="font-awesome-5"
          name="chrome"
          size={55}
          onPress={() => {
            if (
              RootNavigation.navigationRef.current.getCurrentRoute().name !==
              "RingPicker"
            ) {
              RootNavigation.navigate("RingPicker");
            } else {
              RootNavigation.pop();
            }
          }}
        />
      </TouchableWithoutFeedback>
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
      {showPicker && (
        <ReactNativeRingPicker
          onPress={(iconId) => console.log(iconId)}
          style={styles.ringPicker}
          girthAngle={120}
          iconHideOnTheBackDuration={300}
        />
      )}
    </SafeAreaView>
  );
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
