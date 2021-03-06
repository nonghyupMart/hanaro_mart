import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../../components/BaseScreen";
import { BackButton, TextTitle } from "../../components/UI/header";
import { IMAGE_URL } from "../../constants";
import { useAppDispatch } from "../../hooks";
import * as CommonActions from "../../store/actions/common";
import * as flyerActions from "../../store/actions/flyer";
import Gallery from "../../utils/react-native-image-gallery/Gallery";

const FlyerDetailScreen = (props, { navigation }) => {
  const params = props.route.params;
  const dispatch = useAppDispatch();
  const [gallery, setGallery] = useState();
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  useEffect(() => {
    dispatch(flyerActions.fetchLeafletDetail({ leaf_cd: params.leaf_cd })).then(
      (data) => {
        let arr = [];
        data.leafletInfo.detail_img.forEach((item) => {
          arr.push({ source: { uri: IMAGE_URL + item } });
        });
        setImages(arr);
      }
    );
  }, [dispatch]);

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

  const onPageSelected = (val) => {
    if (gallery) setPage(gallery.getViewPagerInstance().currentPage);
  };

  if (images.length === 0) return <></>;

  return (
    <BaseScreen isScroll={false}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Btn onPress={goFirst.bind(this)}>
          <Image source={require("../../assets/images/bef11.png")} />
        </Btn>
        <Btn onPress={prev.bind(this, page)}>
          <Image source={require("../../assets/images/bef1.png")} />
        </Btn>
        <Text style={{ width: 100, textAlign: "center" }}>
          {page + 1}/{images.length}
        </Text>
        <Btn onPress={next.bind(this, page)}>
          <Image source={require("../../assets/images/next1.png")} />
        </Btn>
        <Btn onPress={goLast.bind(this)}>
          <Image source={require("../../assets/images/next11.png")} />
        </Btn>
      </View>
      <Gallery
        onPageSelected={onPageSelected}
        ref={(gal) => setGallery(gal)}
        style={{ flex: 1, backgroundColor: "black" }}
        images={images}
      />
    </BaseScreen>
  );
};

const Btn = styled.TouchableOpacity({
  marginLeft: 5,
  marginRight: 5,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "?????????",
    contentStyle: {
      paddingBottom: 0,
    },
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
