import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../../components/BaseScreen";
import CouponItem from "../../components/coupon/CouponItem";
import CouponRegistrationForm from "../../components/coupon/CouponRegistrationForm";
import CategoryButtonSmallList from "../../components/UI/CategoryButtonSmallList";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { BackButton, TextTitle } from "../../components/UI/header";
import NoList from "../../components/UI/NoList";
import { PADDING_BOTTOM_MENU } from "../../constants";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { checkAuth } from "../../store/actions/auth";
import { setLink } from "../../store/actions/common";
import * as couponActions from "../../store/actions/coupon";

const CouponScreen = (props) => {
  const eventCategory = [
    { type_nm: "전체", type_val: "" },
    { type_nm: "상품쿠폰", type_val: "B" },
    { type_nm: "할인쿠폰", type_val: "A" },
  ];
  const [gbn, setGbn] = useState("");
  const isFocused = useIsFocused();
  const link = useAppSelector((state) => state.common.link);
  const routeName = props.route.name;
  const navigation = props.navigation;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const page = useRef(1);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  let coupon;
  if (routeName === "MyCoupon") {
    //나의쿠폰 일 경우..
    coupon = useAppSelector((state) => state.coupon.myCoupon);
  } else {
    coupon = useAppSelector((state) => state.coupon.coupon);
  }

  const ref = React.useRef(null);
  // useScrollToTop(ref);
  // global.alert(1);
  useEffect(() => {
    if (!coupon?.couponList || !link) return;
    if (link?.category === routeName && link.link_code) {
      setTimeout(async () => {
        let item = _.filter(
          coupon?.couponList,
          (o) => o.cou_cd === link.link_code
        );
        await dispatch(setLink(null));
        await onCouponItemPressed(item[0]);
      }, 500);
    }
  }, [coupon]);

  useEffect(() => {
    if (!isFocused || _.isEmpty(userStore)) return;

    page.current = 1;
    dispatch(
      couponActions.fetchCoupon({
        store_cd: userStore?.storeInfo.store_cd,
        user_cd: userInfo?.user_cd,
        user_yn: routeName === "MyCoupon" ? "Y" : "N",
        gbn: gbn,
      })
    );
  }, [gbn, userStore, isFocused]);

  const onCouponItemPressed = async (item, type = "B") => {
    if (!userInfo?.ci) {
      checkAuth(dispatch, !!userInfo?.ci);
      return;
    }

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
          if (data.result === "success") {
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
          store_cd: userStore?.storeInfo.store_cd,
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
          store_cd: userStore?.storeInfo.store_cd,
          user_cd: userInfo?.user_cd,
          page: page.current,
          gbn: gbn,
        })
      );
    }
  };
  if (!coupon || _.isEmpty(userStore)) return <></>;
  if (routeName === "MyCoupon" && _.size(coupon.couponList) === 0)
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
  if (routeName === "Coupon" && _.size(coupon.couponList) === 0)
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
      style={styles.screen}
      contentStyle={{
        paddingTop: 0,
        width: "100%",
        height: "100%",
        backgroundColor: colors.TRUE_WHITE,
      }}
      scrollListStyle={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: colors.TRUE_WHITE,
      }}
      // isScroll={false}
    >
      <CategoryButtonSmallList
        data={eventCategory}
        value={gbn}
        setValue={setGbn}
      />
      <CouponRegistrationForm/>
      {coupon && (
        <>
          <ScrollList
            listKey={1}
            numColumns={2}
            data={coupon.couponList}
            keyExtractor={(item) =>
              `${userStore?.storeInfo.store_cd}-${item.cou_cd}`
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
    contentStyle: {
      backgroundColor: colors.TRUE_WHITE,
      paddingBottom: PADDING_BOTTOM_MENU,
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
  screen: { backgroundColor: colors.TRUE_WHITE, height: "100%", width: "100%" },
});

export default CouponScreen;
