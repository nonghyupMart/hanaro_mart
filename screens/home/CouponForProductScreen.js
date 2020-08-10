import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import CouponForProductItem from "../../components/CouponForProductItem";

const CouponForProductScreen = ({ navigation }) => {
  const [flyerItems, setFlyerItems] = useState([
    {
      id: 0,
      title: "양재점",
    },
    {
      id: 1,
      title: "천안점",
    },
    {
      id: 2,
      title: "마포점",
    },
    {
      id: 3,
      title: "이태원점",
    },
    {
      id: 4,
      title: "홍대점",
    },
    {
      id: 5,
      title: "안산점",
    },
  ]);

  const loadMore = () => {
    // if (page == 0) {
    setFlyerItems(() => [
      ...flyerItems,
      {
        id: Math.random().toString(36).substring(7),
        title: "양재점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "천안점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "마포점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "이태원점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "홍대점" + Math.floor(Math.random() * 100),
      },
      {
        id: Math.random().toString(36).substring(7),
        title: "안산점" + Math.floor(Math.random() * 100),
      },
    ]);
    //   setPage(() => page + 1);
    // }
  };
  return (
    <FlatList
      initialNumToRender={6}
      onEndReachedThreshold={60}
      onEndReached={() => {
        // alert("onEndReached");
        loadMore();
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
      }}
      numColumns={2}
      style={{ height: "100%" }}
      data={flyerItems}
      keyExtractor={(item) => item.id + ""}
      renderItem={(itemData) => (
        <CouponForProductItem
          onPress={() => navigation.navigate("CouponDetail")}
          title={itemData.item.title}
          keyExtractor={() => itemData.item.id}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CouponForProductScreen;
