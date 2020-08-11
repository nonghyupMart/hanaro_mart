import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { View, Text, StyleSheet, FlatList, BackHandler } from "react-native";
import BaseDetailScreen from "../../components/BaseDetailScreen";
import BackButton from "../../components/UI/BackButton";

const CouponDetailScreen = (props) => {
  const dispatch = useDispatch();

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
    <BaseDetailScreen>
      <Text>쿠폰상세</Text>
    </BaseDetailScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "쿠폰 상세",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CouponDetailScreen;
