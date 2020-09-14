import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { useSelector, useDispatch } from "react-redux";
import * as couponActions from "@actions/coupon";
import CouponItem from "@components/CouponItem";
const CouponScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const userStore = useSelector((state) => state.auth.userStore);
  const coupon = useSelector((state) => state.coupon.coupon);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      if (userStore) {
        const requestCoupon = dispatch(
          couponActions.fetchCoupon({ store_cd: userStore.store_cd })
        );

        Promise.all([requestCoupon]).then(() => {
          setIsLoading(false);
        });
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [userStore]);
  const onCouponItemPressed = (item) => {
    navigation.navigate("CouponDetail", { cou_cd: item.cou_cd, user_cd: 0 });
  };
  // const loadMore = () => {
  //   if (!isLoading) {
  //     const currentPage = page + 1;
  //     setPage(() => currentPage);
  //     setIsLoading(true);

  //     const requestEvent = dispatch(
  //       eventActions.fetchEvent({
  //         store_cd: userStore.store_cd,
  //         offset: currentPage,
  //       })
  //     );

  //     Promise.all([requestEvent]).then(() => {
  //       setIsLoading(false);
  //     });
  //   }
  // };

  return (
    <BaseScreen
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
    >
      {coupon && (
        <ScrollList
          numColumns={2}
          data={coupon.couponList}
          keyExtractor={(item) => item.cou_cd}
          // onEndReached={() => {
          //   loadMore();
          // }}
          renderItem={({ item, index, separators }) => {
            return (
              <CouponItem
                item={item}
                index={index}
                onPress={() => onCouponItemPressed(item)}
              />
            );
          }}
        />
      )}
    </BaseScreen>
  );
};
const ScrollList = styled.FlatList({
  flex: 1,

  width: "100%",
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite },
});

export default CouponScreen;
