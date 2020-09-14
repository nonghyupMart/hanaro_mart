import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Image, TouchableOpacity } from "react-native";

import {
  SafeAreaView,
  View,
  Text as TextView,
  StyleSheet,
  FlatList,
  BackHandler,
} from "react-native";
import { BaseImage, screenWidth, BaseButtonContainer } from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import * as couponActions from "@actions/coupon";

const CouponDetailScreen = (props) => {
  const [alert, setAlert] = useState();
  const params = props.route.params;
  const couponDetail = useSelector((state) => state.coupon.couponDetail);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchCouponDetail = dispatch(
      couponActions.fetchCouponDetail({
        cou_cd: params.cou_cd,
        user_cd: params.user_cd ? params.user_cd : 0,
      })
    );

    Promise.all([fetchCouponDetail]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  const onPress = () => {
    const msg = `계산원 전용 기능입니다.\n쿠폰이 사용된 것으로  처리됩니다.`;
    setAlert({
      message: msg,
      onPressConfirm: () => {
        setAlert(null);
        props.navigation.navigate("Barcode", { barcode: couponDetail.barcode });
        // saveStore();
      },
      onPressCancel: () => {
        setAlert(null);
      },
    });
  };
  return (
    <BaseScreen
      isBottomNavigation={false}
      alert={alert}
      isLoading={isLoading}
      style={{ paddingLeft: 0, paddingRight: 0 }}
      contentStyle={{ paddingTop: 0 }}
    >
      {couponDetail && (
        <Container>
          <Discount>
            {couponDetail.price}
            {couponDetail.price_gbn == "A" ? "원 " : "% "}
            할인
          </Discount>
          <Title>{couponDetail.title}</Title>
          <BaseImage
            source={couponDetail.title_img}
            style={{
              width: screenWidth * 0.561,
              aspectRatio: 1 / 1,
              marginBottom: 25,
            }}
          />
          <Price>할인가 : {couponDetail.price}원</Price>
          <Price>최소구매금액 : {couponDetail.m_price}원</Price>
          <Warn>계산원이 확인 시에 사용하는 전용기능입니다.</Warn>
          <BlueButton onPress={onPress}>
            <Image source={require("@images/resize3.png")} />
            <BlueButtonText>계산원 전용</BlueButtonText>
          </BlueButton>
        </Container>
      )}
      <DescContainer>
        <Image source={require("@images/qrcode.png")} />
        <DescText>쿠폰사용시 유의사항</DescText>
      </DescContainer>
      <Desc>
        1. 쿠폰은 주문금액에 제한 없이 사용가능합니다.{"\n\n"}2. 쿠폰은 한
        주문에 한해서 쿠폰 1개만 사용이 가능합니다.{"\n\n"}3. 각 쿠폰마다
        사용기한이 정해져 있습니다.{"\n\n"}4. 주문 후 반품/환불/취소의 경우 한번
        사용하신 할인 쿠폰을 다시 사용하실 수 없습니다.{"\n\n"}5. 쿠폰
        적용품목이 한정된 쿠폰은 해당 품목에서만 사용가능 합니다.{"\n\n"}6.
        할인/적립(%) 쿠폰은 적립금할인 등을 제외한 실제 결제금액에 적용됩니다.
        {"\n\n"}7. 해당 상품에 대한 쿠폰은 해당 상품만 구매시 적용이 가능합니다.
      </Desc>
    </BaseScreen>
  );
};
const Desc = styled.Text({
  marginTop: 20,
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  paddingLeft: 18,
  paddingRight: 18,
});
const DescText = styled.Text({
  marginLeft: 7,
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const DescContainer = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  width: "100%",
  marginTop: 8,
});
const BlueButtonText = styled.Text({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
  marginLeft: 9,
});
const BlueButton = styled(BaseButtonContainer)({
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.cerulean,
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
  width: screenWidth - 18 * 2,
  alignSelf: "center",
  aspectRatio: 100 / 12.804,
});
const Warn = styled.Text({
  marginTop: 24,
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.cerulean,
});
const Price = styled.Text({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const Title = styled.Text({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
  marginBottom: 8,
});
const Discount = styled.Text({
  fontSize: 30,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 44,
  letterSpacing: -0.75,
  textAlign: "center",
  color: colors.lipstick,
  marginTop: 20,
});

const Container = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.trueWhite,
  marginTop: 7,
  paddingLeft: 18,
  paddingRight: 18,
  paddingBottom: 45,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "쿠폰",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
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
