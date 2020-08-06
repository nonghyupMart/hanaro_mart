import React, { useState, useRef, useEffect } from "react";

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Gallery from "react-native-image-gallery";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const FlyerDetailScreen = ({ navigation }) => {
  const [gallery, setGallery] = useState();
  const [page, setPage] = useState(0);
  const images = [
    { source: { uri: "http://i.imgur.com/XP2BE7q.jpg" } },
    { source: { uri: "http://i.imgur.com/5nltiUd.jpg" } },
    { source: { uri: "http://i.imgur.com/6vOahbP.jpg" } },
    { source: { uri: "http://i.imgur.com/kj5VXtG.jpg" } },
  ];

  const next = (page) => {
    if (page < images.length - 1) {
      const p = page + 1;
      gallery.getViewPagerInstance().scrollToPage(p);
      setPage(() => p);
    }
  };
  const prev = (page) => {
    if (page > 0) {
      const p = page - 1;
      gallery.getViewPagerInstance().scrollToPage(p);
      setPage(() => p);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text>전단 상세 페이지</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => prev(page)}>
          <AntDesign name="caretleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => next(page)}>
          <AntDesign name="caretright" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Gallery
        ref={(gal) => setGallery(gal)}
        style={{ flex: 1, backgroundColor: "black" }}
        images={images}
      />
    </SafeAreaView>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "전단 상세",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FlyerDetailScreen;
