import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FlyerItem = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onPress={props.onPress}
      style={{ flex: 1 }}
    >
      <View style={styles.cartItem}>
        <View style={styles.itemData}>
          <Image
            style={{
              width: "100%",
              height: 50,
              resizeMode: "stretch",
            }}
            source={{
              uri:
                "http://img-m.nonghyupmall.com//prdimg/02/003/005/001/009//4002685492_0_320_20200428155054.jpg",
            }}
          />
          <Text style={styles.mainText}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexBasis: 0,
    flex: 0.3,
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
