import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as couponActions from "../../store/actions/coupon";
import CouponItem from "../../components/CouponItem";
import CouponItemA from "../../components/CouponItemA";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { BackButton, TextTitle } from "../../components/UI/header";
import { BaseImage, screenWidth } from "../../components/UI/BaseUI";
import { useFocusEffect } from "@react-navigation/native";
// import { useScrollToTop } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import { setAlert, setIsLoading } from "../../store/actions/common";
import NoList from "../../components/UI/NoList";

const CouponScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [page, setPage] = useState(1);
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  let couponA, coupon;
  if (routeName == "MyCoupon") {
    //나의쿠폰 일 경우..
    couponA = useSelector((state) => state.coupon.myCouponA);
    coupon = useSelector((state) => state.coupon.myCoupon);
  } else {
    couponA = useSelector((state) => state.coupon.couponA);
    coupon = useSelector((state) => state.coupon.coupon);
  }

  const ref = React.useRef(null);
  // useScrollToTop(ref);
  // global.alert(1);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (userStore) {
        dispatch(setIsLoading(true));
        setPage(1);

        const fetchCouponA = dispatch(
          couponActions.fetchCoupon({
            store_cd: userStore.storeInfo.store_cd,
            user_cd: userInfo.user_cd,
            user_yn: routeName == "MyCoupon" ? "Y" : "N",
            gbn: "A",
          })
        );
        const fetchCouponB = dispatch(
          couponActions.fetchCoupon({
            store_cd: userStore.storeInfo.store_cd,
            user_cd: userInfo.user_cd,
            user_yn: routeName == "MyCoupon" ? "Y" : "N",
            gbn: "B",
          })
        );

        Promise.all([fetchCouponA, fetchCouponB]).then(() => {
          dispatch(setIsLoading(false));
        });
      }
    });
    return unsubscribe;
  }, [userStore]);
  const onCouponItemPressed = async (item, type = "B") => {
    if (!userInfo.ci) return navigation.navigate("Empty");

    let couponList;
    switch (type) {
      case "A":
        couponList = couponA.couponList;
        break;
      case "B":
        couponList = coupon.couponList;
        break;
    }
    const index = couponList.indexOf(item);
    switch (item.status) {
      case "00": // 미발급
        await dispatch(setIsLoading(true));
        dispatch(
          couponActions.downloadCoupon({
            store_cd: userStore.storeInfo.store_cd,
            user_cd: userInfo.user_cd,
            cou_cd: item.cou_cd,
            coupon: type == "A" ? couponA : coupon,
            index: index,
            type,
          })
        ).then(async (data) => {
          await dispatch(setIsLoading(false));
          if (data.result == "success") {
            navigation.navigate("CouponDetail", {
              store_cd: userStore.storeInfo.store_cd,
              cou_cd: item.cou_cd,
              user_cd: userInfo.user_cd,
              coupon: type == "A" ? couponA : coupon,
              index: index,
              type,
              routeName,
              isNew: true,
            });
          }
        });
        break;
      case "10": // 쿠폰이 있는 경우
        navigation.navigate("CouponDetail", {
          store_cd: userStore.storeInfo.store_cd,
          cou_cd: item.cou_cd,
          user_cd: userInfo.user_cd,
          coupon: type == "A" ? couponA : coupon,
          index: index,
          type,
          routeName,
        });
      case "20": // 사용완료
        break;
    }
  };
  const loadMore = () => {
    if (!isLoading && page + 1 <= coupon.finalPage) {
      dispatch(setIsLoading(true));
      dispatch(
        couponActions.fetchCoupon({
          store_cd: userStore.storeInfo.store_cd,
          user_cd: userInfo.user_cd,
          page: page + 1,
          gbn: "B",
        })
      ).then(() => {
        dispatch(setIsLoading(false));
      });

      setPage(page + 1);
    }
  };
  if (!couponA || !coupon) return <></>;
  if (
    routeName == "MyCoupon" &&
    _.size(couponA.couponList) === 0 &&
    _.size(coupon.couponList) === 0
  )
    return (
      <NoList
        source={require("../../assets/images/wallet.png")}
        text={"나의 쿠폰"}
        infoText="나의 쿠폰이 없습니다."
      />
    );
  if (
    routeName == "Coupon" &&
    _.size(couponA.couponList) === 0 &&
    _.size(coupon.couponList) === 0
  )
    return (
      <NoList
        source={require("../../assets/images/ticketWhite.png")}
        text={"쿠폰"}
      />
    );
  return (
    <BaseScreen
      // isBottomNavigation={routeName == "MyCoupon" ? false : true}
      style={styles.screen}
      contentStyle={{
        paddingTop: 0,
        width: "100%",
        height: "100%",
        backgroundColor: colors.trueWhite,
      }}
      scrollListStyle={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: colors.trueWhite,
      }}
      // isScroll={false}
    >
      {coupon && couponA && (
        <>
          <ScrollList
            listKey={0}
            numColumns={1}
            data={couponA.couponList}
            keyExtractor={(item) =>
              `A-${userStore.storeInfo.store_cd}-${item.cou_cd}`
            }
            // columnWrapperStyle={{
            //   alignItems: "space-between",
            //   justifyContent: "space-between",
            // }}
            contentContainerStyle={{ flex: 1, width: "100%" }}
            ListHeaderComponent={() => {
              return <View style={{ height: 6 }}></View>;
            }}
            renderItem={({ item, index, separators }) => {
              return (
                <CouponItemA
                  item={item}
                  index={index}
                  onPress={() => onCouponItemPressed(item, "A")}
                />
              );
            }}
          />
          <ScrollList
            listKey={1}
            numColumns={2}
            data={coupon.couponList}
            keyExtractor={(item) =>
              `${userStore.storeInfo.store_cd}-${item.cou_cd}`
            }
            onEndReached={loadMore}
            columnWrapperStyle={{
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
            contentContainerStyle={{ flex: 1, width: "100%" }}
            // ListHeaderComponent={() => {
            //   return <View style={{ height: 6 }}></View>;
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
        </>
      )}
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "나의 쿠폰",
    cardStyle: {
      backgroundColor: colors.trueWhite,
      paddingBottom: 50,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const ScrollList = styled(ExtendedFlatList)({
  width: "100%",
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite, height: "100%", width: "100%" },
});

export default CouponScreen;
