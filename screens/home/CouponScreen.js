import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as couponActions from "@actions/coupon";
import CouponItem from "@components/CouponItem";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import { BackButton, TextTitle } from "@UI/header";
import { useFocusEffect } from "@react-navigation/native";
// import { useScrollToTop } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
const CouponScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const [alert, setAlert] = useState();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const userStore = useSelector((state) => state.auth.userStore, shallowEqual);
  const coupon = useSelector((state) => state.coupon.coupon);
  const ref = React.useRef(null);
  // useScrollToTop(ref);
  // global.alert(1);
  useEffect(() => {
    // const unsubscribe = navigation.addListener("focus", () => {
    if (userStore) {
      // console.warn("coupon", coupon);
      setIsLoading(true);
      setPage(1);

      const fetchCoupon = dispatch(
        couponActions.fetchCoupon({
          store_cd: userStore.store_cd,
          user_cd: 49,
          user_yn: routeName == "MyCoupon" ? "Y" : "N",
        })
      );

      Promise.all([fetchCoupon]).then(() => {
        setIsLoading(false);
      });
    }
    // });
    // return unsubscribe;
  }, [userStore]);
  const onCouponItemPressed = (item) => {
    switch (item.status) {
      case "00": // 미발급
        const index = coupon.couponList.indexOf(item);
        dispatch(
          couponActions.downloadCoupon({
            store_cd: userStore.store_cd,
            user_cd: 49,
            cou_cd: item.cou_cd,
            coupon: coupon,
            index: index,
          })
        ).then((data) => {
          if (data.result == "success") {
            setAlert({
              message: "쿠폰 발급이 완료 되었습니다.",
              onPressConfirm: () => {
                setAlert({ message: null });
              },
            });
          }
          // console.warn("downloaded =>", data);
        });
        return;
      case "10": // 쿠폰이 있는 경우
        navigation.navigate("CouponDetail", {
          store_cd: userStore.store_cd,
          cou_cd: item.cou_cd,
          user_cd: 49,
        });
        return;
      case "20": // 사용완료
        return;
    }
  };
  const loadMore = () => {
    if (!isLoading && page + 1 <= coupon.finalPage) {
      console.warn("loadMore");
      dispatch(
        couponActions.fetchCoupon({
          store_cd: userStore.store_cd,
          user_cd: 49,
          page: page + 1,
        })
      );

      setPage(page + 1);
    }
  };

  return (
    <BaseScreen
      // isBottomNavigation={routeName == "MyCoupon" ? false : true}
      alert={alert}
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
    >
      {coupon && (
        <ScrollList
          ref={ref}
          numColumns={2}
          data={coupon.couponList}
          keyExtractor={(item) => item.cou_cd}
          onEndReached={() => {
            loadMore();
          }}
          columnWrapperStyle={{
            alignItems: "space-between",
            justifyContent: "space-between",
          }}
          contentContainerStyle={{}}
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
export const screenOptions = ({ navigation }) => {
  return {
    title: "나의 쿠폰",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const ScrollList = styled(ExtendedFlatList)({
  flex: 1,

  width: "100%",
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite },
});

export default CouponScreen;
