import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Image, TouchableOpacity, Text } from "react-native";
import * as Util from "@util";
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
  BaseText,
} from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import * as couponActions from "@actions/coupon";
import * as CommonActions from "@actions/common";
import _ from "lodash";
import { setAlert, setIsLoading } from "@actions/common";
import { SET_COUPON_DETAIL } from "@actions/coupon";

const CouponDetailScreen = (props) => {
  const params = props.route.params;
  const couponDetail = useSelector((state) => state.coupon.couponDetail);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [isUsed, setIsUsed] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: SET_COUPON_DETAIL,
  //       couponDetail: null,
  //     });
  //   };
  // }, []);

  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);
  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchCouponDetail = dispatch(
      couponActions.fetchCouponDetail({
        cou_cd: params.cou_cd,
        user_cd: userInfo.user_cd,
      })
    );

    Promise.all([fetchCouponDetail]).then(() => {
      dispatch(setIsLoading(false));
    });
  }, [dispatch]);
  const onPress = () => {
    let msg;
    if (!isUsed) {
      msg = `계산원 전용 기능입니다.\n쿠폰이 사용된 것으로\n처리됩니다.`;

      dispatch(
        setAlert({
          message: msg,
          onPressConfirm: () => {
            if (
              couponDetail.barcode.length < 13 ||
              !Util.validateBarcode(couponDetail.barcode)
            ) {
              dispatch(
                setAlert({
                  message:
                    "바코드번호가 정확하지 않습니다. 고객센터에 문의해주세요.",
                  onPressConfirm: () => {
                    dispatch(setAlert(null));
                  },
                })
              );
              return;
            }

            dispatch(setAlert(null));
            dispatch(
              couponActions.useCoupon({
                index: params.index,
                type: params.type,
                coupon: params.coupon,
                store_cd: params.store_cd,
                user_cd: userInfo.user_cd,
                cou_cd: params.cou_cd,
                ucou_cd: couponDetail.ucou_cd,
                routeName: params.routeName,
              })
            ).then((data) => {
              if (data.result == "success") {
                setIsUsed(true);

                props.navigation.navigate("Barcode", {
                  barcode: couponDetail.barcode,
                });
              }
            });

            // saveStore();
          },
          onPressCancel: () => {
            dispatch(setAlert(null));
          },
        })
      );
    } else {
      msg = `이미 사용된 쿠폰입니다.`;
      dispatch(
        setAlert({
          message: msg,
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
    }
  };
  useEffect(() => {
    if (couponDetail) {
      props.navigation.setOptions({
        title: "쿠폰",
        cardStyle: {
          marginBottom: 0,
        },
        headerLeft: () => <BackButton />,
        headerTitle: (props) => <TextTitle {...props} />,
        headerRight: (props) => <UseButton onPress={onPress} />,
      });
    }
  }, [couponDetail]);

  if (!couponDetail || isLoading) return <></>;
  return (
    <BaseScreen
      style={{ paddingLeft: 0, paddingRight: 0 }}
      contentStyle={{ paddingTop: 0 }}
    >
      {couponDetail && (
        <DetailContainer style={{ paddingBottom: 30 }}>
          <TopBox>
            {!isUsed && (
              <>
                <TopText>쿠폰이 발급 되었습니다.</TopText>
                <Image
                  source={require("@images/nums_128.png")}
                  resizeMode="cover"
                  style={{
                    width: screenWidth + screenWidth * 0.1,
                    marginLeft: "-5%",
                    marginTop: -2,
                  }}
                />
              </>
            )}
            {isUsed && (
              <>
                <TopText style={{ backgroundColor: colors.greyishBrown }}>
                  쿠폰을 사용하셨습니다.
                </TopText>
                <Image
                  source={require("@images/nums99.png")}
                  resizeMode="cover"
                  style={{
                    width: screenWidth + screenWidth * 0.1,
                    marginLeft: "-5%",
                    marginTop: -2,
                  }}
                />
              </>
            )}
          </TopBox>

          <BaseImage
            source={couponDetail.title_img}
            // resizeMode="stretch"
            style={{
              width: screenWidth * 0.561,
              aspectRatio: 1 / 1,
              marginBottom: 25,
              resizeMode: "contain",
              backgroundColor: colors.trueWhite,
            }}
            resizeMode="contain"
          />
          {/* <Discount>
            {couponDetail.price}
            {couponDetail.price_gbn == "A" ? "원 " : "% "}
            할인
          </Discount>
          <Title>{couponDetail.title}</Title> */}
          <TextContainer>
            <Price>쿠폰명 : {couponDetail.title}</Price>
            <Price>할인가 : {Util.formatNumber(couponDetail.price)}원</Price>
            <Price>최소구매금액 : {couponDetail.m_price}원</Price>
            <Price>사용기간 : ~ {couponDetail.end_date}까지</Price>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: colors.white,
                borderBottomWidth: 1,
                borderColor: colors.white,
                marginTop: 12.5,
                marginBottom: 12.5,
              }}
            ></View>
            {!_.isEmpty(couponDetail.memo) && <Memo>{couponDetail.memo}</Memo>}
          </TextContainer>
          {!isUsed && (
            <>
              <Warn>쿠폰 발급이 완료 되었습니다.</Warn>
              <BlueButton
                onPress={() => {
                  dispatch(CommonActions.setBottomNavigation(true));
                  props.navigation.pop();
                }}
              >
                {/* <Image source={require("@images/resize3.png")} /> */}
                <BlueButtonText>확인</BlueButtonText>
              </BlueButton>
            </>
          )}
          {isUsed && (
            <>
              <Warn style={{ color: colors.greyishBrown }}>
                본 쿠폰은 사용완료 되었습니다.
              </Warn>
              <BlueButton
                onPress={() => {
                  dispatch(CommonActions.setBottomNavigation(true));
                  props.navigation.pop();
                }}
                style={{ backgroundColor: colors.greyishThree }}
              >
                {/* <Image source={require("@images/resize3.png")} /> */}
                <BlueButtonText>사용완료</BlueButtonText>
              </BlueButton>
            </>
          )}
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
const Memo = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishThree,
  paddingLeft: 12,
  paddingRight: 12,
});
const TextContainer = styled.View({
  paddingLeft: "11%",
  paddingRight: "11%",
  width: "100%",
});
const TopText = styled(BaseText)({
  color: colors.trueWhite,
  fontSize: 24,
  backgroundColor: colors.appleGreen,
  textAlign: "center",
  width: "100%",
  paddingTop: 7,
  paddingBottom: 7,
});
const TopBox = styled.View({
  width: "110%",

  marginBottom: 15,
});
const Desc = styled(BaseText)({
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
const DescText = styled(BaseText)({
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

const Warn = styled(BaseText)({
  marginTop: 20,
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.cerulean,
});
const PriceText = styled(BaseText)({
  fontSize: 16,
  lineHeight: 24,
  color: colors.greyishBrown,
  marginLeft: 7,
});
const PriceContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 12,
  marginRight: 12,
});
const Price = (props) => {
  return (
    <>
      <PriceContainer>
        <Image source={require("@images/greendot3.png")} />
        <PriceText>{props.children}</PriceText>
      </PriceContainer>
    </>
  );
};
const Title = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
  marginBottom: 8,
});
const Discount = styled(BaseText)({
  fontSize: 30,
  fontFamily: "CustomFont-Bold",
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
    headerRight: (props) => <UseButton {...props} />,
  };
};
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesome5 } from "@expo/vector-icons";
import { HeaderButton } from "@UI/header/elements/HeaderButton";
const UseButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Text
        style={{
          alignItems: "center",
          color: colors.greyishThree,
          fontSize: 12,
          justifyContent: "center",

          textAlignVertical: "center",
          textAlign: "center",
        }}
      >
        계산원 전용
      </Text>
      <Item
        IconComponent={FontAwesome5}
        iconSize={24}
        title="back"
        iconName="users-cog"
        onPress={() => {
          if (props.onPress) props.onPress();
        }}
      />
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CouponDetailScreen;
