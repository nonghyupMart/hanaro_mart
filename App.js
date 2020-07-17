import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ReactNativeRingPicker from "./components/ReactNativeRingPicker";
import TabViewExample from "./components/TabViewExample";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TabViewExample />

      <View style={styles.ringPickerContainer}>
        <ReactNativeRingPicker
          icons={[{ id: "action_1", title: "농협몰" }, "올원뱅크", "NH멤버스"]}
          girthAngle={120}
          iconHideOnTheBackDuration={300}
          styleIconText={{ fontWeight: "bold", color: "black" }}
        />
      </View>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={TabViewExample} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ringPickerContainer: {
    flex: 1,
    position: "absolute",
    bottom: -200,
  },
});
