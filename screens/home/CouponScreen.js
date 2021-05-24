import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as couponActions from "../../store/actions/coupon";
import CouponItem from "../../components/CouponItem";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { BackButton, TextTitle } from "../../components/UI/header";
import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import { setAlert, setIsLoading, setLink } from "../../store/actions/common";
import NoList from "../../components/UI/NoList";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../components/UI/BaseUI";
import CategoryButtonSmallList from "../../components/UI/CategoryButtonSmallList";
import { checkAuth } from "../../store/actions/auth";

const CouponScreen = (props) => {
  const eventCategory = [
    { type_nm: "전체", type_val: "" },
    { type_nm: "상품쿠폰", type_val: "B" },
    { type_nm: "할인쿠폰", type_val: "A" },
  ];
  const [gbn, setGbn] = useState("");
  const isFocused = useIsFocused();
  const link = useSelector((state) => state.common.link);
  const routeName = props.route.name;
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const page = useRef(1);
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  let coupon;
  if (routeName == "MyCoupon") {
    //나의쿠폰 일 경우..
    coupon = useSelector((state) => state.coupon.myCoupon);
  } else {
    coupon = useSelector((state) => state.coupon.coupon);
  }

  const ref = React.useRef(null);
  // useScrollToTop(ref);
  // global.alert(1);
  useEffect(() => {
    if (_.isEmpty(coupon) || !coupon.couponList || !link) return;
    if (link && link.category == routeName && link.link_code) {
      setTimeout(async () => {
        let item = _.filter(
          coupon.couponList,
          (o) => o.cou_cd == link.link_code
        );
        await dispatch(setLink(null));
        await onCouponItemPressed(item[0]);
      }, 500);
    }
  }, [coupon]);

  useEffect(() => {
    if (!isFocused || !userStore) return;
    if (userStore) {
      page.current = 1;
      dispatch(
        couponActions.fetchCoupon({
          store_cd: userStore.storeInfo.store_cd,
          user_cd: userInfo.user_cd,
          user_yn: routeName == "MyCoupon" ? "Y" : "N",
          gbn: gbn,
        })
      );
    }
  }, [gbn, userStore, isFocused]);

  const onCouponItemPressed = async (item, type = "B") => {
    if (!userInfo.ci) return checkAuth(dispatch, !!userInfo.ci);

    let couponList = coupon.couponList;

    const index = couponList.indexOf(item);
    switch (item.status) {
      case "00": // 미발급
        dispatch(
          couponActions.downloadCoupon({
            store_cd: userStore.storeInfo.store_cd,
            user_cd: userInfo.user_cd,
            cou_cd: item.cou_cd,
            coupon: coupon,
            index: index,
          })
        ).then(async (data) => {
          if (data.result == "success") {
            navigation.navigate("CouponDetail", {
              store_cd: userStore.storeInfo.store_cd,
              cou_cd: item.cou_cd,
              user_cd: userInfo.user_cd,
              coupon: coupon,
              index: index,
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
          coupon: coupon,
          index: index,
          routeName,
        });
      case "20": // 사용완료
        break;
    }
  };
  const loadMore = () => {
    if (!isLoading && page.current + 1 <= coupon.finalPage) {
      page.current++;
      dispatch(
        couponActions.fetchCoupon({
          store_cd: userStore.storeInfo.store_cd,
          user_cd: userInfo.user_cd,
          page: page.current,
          gbn: gbn,
        })
      );
    }
  };
  if (!coupon) return <></>;
  if (routeName == "MyCoupon" && _.size(coupon.couponList) === 0)
    return (
      <>
        <CategoryButtonSmallList
          data={eventCategory}
          value={gbn}
          setValue={setGbn}
        />
        <NoList
          source={require("../../assets/images/wallet.png")}
          text={"나의 쿠폰"}
          infoText="나의 쿠폰이 없습니다."
        />
      </>
    );
  if (routeName == "Coupon" && _.size(coupon.couponList) === 0)
    return (
      <>
        <CategoryButtonSmallList
          data={eventCategory}
          value={gbn}
          setValue={setGbn}
        />
        <NoList
          source={require("../../assets/images/ticketWhite.png")}
          text={"쿠폰"}
        />
      </>
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
      <CategoryButtonSmallList
        data={eventCategory}
        value={gbn}
        setValue={setGbn}
      />
      {coupon && (
        <>
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
                  onPress={onCouponItemPressed.bind(this, item)}
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
  marginTop: 12.5,
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite, height: "100%", width: "100%" },
});

export default CouponScreen;
