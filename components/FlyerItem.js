import React from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const defaultImage = require("../assets/icon.png");
const FlyerItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ flex: 1 }}>
      <View style={styles.cartItem}>
        <Image
          style={{
            width: "100%",
            height: width * 0.227,
            resizeMode: "cover",
          }}
          source={{
            uri:
              "http://img-m.nonghyupmall.com//prdimg/02/003/005/001/009//4002685492_0_320_20200428155054.jpg",
          }}
          defaultSource={require("@images/p_img503.png")}
        />
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexBasis: 0,
    flex: 0.333,
    padding: 10,

    // backgroundColor: "white",

    marginHorizontal: 20,
  },
  itemData: {
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    color: "black",
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default FlyerItem;
