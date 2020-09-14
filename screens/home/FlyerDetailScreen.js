import React, { useState, useRef, useEffect } from "react";

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BaseScreen from "@components/BaseScreen";
import Gallery from "react-native-image-gallery";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackButton, TextTitle } from "@UI/header";
import { useSelector, useDispatch } from "react-redux";
import * as flyerActions from "@actions/flyer";
const FlyerDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const leafletDetail = useSelector((state) => state.flyer.leafletDetail);
  const userStore = useSelector((state) => state.auth.userStore);
  const [isLoading, setIsLoading] = useState(true);
  const [gallery, setGallery] = useState();
  const [page, setPage] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    if (userStore) {
      const requestLeafletDetail = dispatch(
        flyerActions.fetchLeafletDetail({ leaf_cd: props.leaf_cd })
      );

      Promise.all([requestLeafletDetail]).then(() => {
        setIsLoading(false);
      });
    }
  }, [userStore]);
  if (leafletDetail) {
    //
  }
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

  const goFirst = () => {
    gallery.getViewPagerInstance().scrollToPage(0);
    setPage(() => 0);
  };
  const goLast = () => {
    gallery.getViewPagerInstance().scrollToPage(images.length - 1);
    setPage(() => images.length - 1);
  };

  return (
    <BaseScreen isLoading={isLoading} isScroll={false}>
      <Text>전단 상세 페이지</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => goFirst()}>
          <AntDesign name="caretleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => prev(page)}>
          <AntDesign name="caretleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => next(page)}>
          <AntDesign name="caretright" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goLast()}>
          <AntDesign name="caretright" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Gallery
        ref={(gal) => setGallery(gal)}
        style={{ flex: 1, backgroundColor: "black" }}
        images={images}
      />
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "전단지",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
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
