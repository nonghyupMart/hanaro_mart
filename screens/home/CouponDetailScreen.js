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
import {
  DetailContainer,
  BaseImage,
  screenWidth,
  BaseButtonContainer,
  BlueButton,
  BlueButtonText,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import * as couponActions from "@actions/coupon";

const CouponDetailScreen = (props) => {
  const [alert, setAlert] = useState();
  const params = props.route.params;
  const couponDetail = useSelector((state) => state.coupon.couponDetail);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchCouponDetail = dispatch(
      couponActions.fetchCouponDetail({
        cou_cd: params.cou_cd,
        user_cd: 49,
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
         dispatch(
          couponActions.useCoupon({
            store_cd: params.store_cd,
            user_cd: 49,
            cou_cd: params.cou_cd,
            ucou_cd:couponDetail.ucou_cd
          })
        ).then((data) => {
          if (data.result == "success") {
            setIsUsed(true);
               props.navigation.navigate("Barcode", { barcode: couponDetail.barcode });
          }
        });
     
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
        <DetailContainer>
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
          
          {!isUsed &&
          <>
            <Warn>계산원이 확인 시에 사용하는 전용기능입니다.</Warn>
            <BlueButton onPress={onPress}>
              <Image source={require("@images/resize3.png")} />
              <BlueButtonText>계산원 전용</BlueButtonText>
            </BlueButton>
          </>
          }
          {isUsed && 
          <>
            <Warn style={{color: colors.greyishBrown}}>본 쿠폰은 사용완료 되었습니다.</Warn>
            <BlueButton style={{backgroundColor: colors.greyishThree}} >
              <Image source={require("@images/resize3.png")} />
              <BlueButtonText>사용완료</BlueButtonText>
            </BlueButton>
          </>
          }
        </DetailContainer>
      )}
      <Image
        source={require("@images/pannel_n3.png")}
        style={{ width: "110%", marginLeft: "-5%", marginTop: -2 }}
        resizeMode="cover"
      />
      <DescContainer>
        <Image source={require("@images/qrcode.png")} />
        <DescText>쿠폰사용시 유의사항</DescText>
      </DescContainer>
      <Desc>
        {`- 앱쿠폰은 하나로마트 회원만 사용 가능합니다.
- 쿠폰은 다운받으신 매장에서만 사용 가능합니다.
- 매장 계산대에서 본 쿠폰을 제시해 주세요.
- 할인 조건은 최종결제금액 기준으로 적용됩니다.
- 일부 쿠폰과 중복사용이 불가합니다.
- 쿠폰의 상품 및 사용조건은 변동될 수 있습니다.
- 현금과 교환되지 않으며 양도가 불가합니다.
- 사용하신 쿠폰은 즉시 소멸됩니다.
- 재결제 시에는 쿠폰적용이 불가합니다.
- 일부품목은 적용이 제외됩니다.
- 쿠폰 적용 시, 타 영수증과 합산불가하며 한개의 영수증을 분할하여 사용할 수 없습니다.
- 식자재매장, 임대매장, 일부코너 상품은 사용이 불가합니다.`}
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
  paddingLeft: 25,
  paddingRight: 25,
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
