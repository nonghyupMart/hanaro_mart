import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Image, TouchableOpacity, Text } from "react-native";
import * as Util from "../../util";
import { View, Text as TextView, StyleSheet, Platform } from "react-native";
import {
  DetailContainer,
  BaseImage,
  SCREEN_WIDTH,
  BaseButtonContainer,
  BlueButton,
  BlueButtonText,
  BaseText,
} from "../../components/UI/BaseUI";
import BaseScreen from "../../components/BaseScreen";
import { BackButton, TextTitle } from "../../components/UI/header";
import * as couponActions from "../../store/actions/coupon";
import * as CommonActions from "../../store/actions/common";
import _ from "lodash";
import { setAlert, setIsLoading } from "../../store/actions/common";
import { SET_COUPON_DETAIL } from "../../store/actions/actionTypes";
import Barcode from "../../components/Barcode";
import * as Brightness from "expo-brightness";

const CouponDetailScreen = (props) => {
  const params = props.route.params;
  const isNew = !!params.isNew;
  const couponDetail = useSelector((state) => state.coupon.couponDetail);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [isUsed, setIsUsed] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const brightness = useSelector((state) => state.common.brightness);
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
    return async () => {
      dispatch(CommonActions.setBottomNavigation(true));
      dispatch({
        type: SET_COUPON_DETAIL,
        couponDetail: null,
      });
      if (brightness && Platform.OS == "ios")
        await Brightness.setBrightnessAsync(brightness);
      await Brightness.useSystemBrightnessAsync();
    };
  }, []);
  useEffect(() => {
    if (!_.isEmpty(couponDetail)) {
      props.navigation.setOptions({
        title: "쿠폰",
        cardStyle: {
          marginBottom: 0,
        },
        headerLeft: () => <BackButton />,
        headerTitle: (props) => <TextTitle {...props} />,
        headerRight: (props) =>
          couponDetail.limit_yn == "N" ? (
            <></>
          ) : (
            <UseButton onPress={onPress} />
          ),
      });
    }
    (async () => {
      if (
        !couponDetail ||
        !couponDetail.barcode ||
        couponDetail.limit_yn != "N"
      )
        return;
      const currentBrightLevel = await Brightness.getBrightnessAsync();
      await dispatch(CommonActions.setBrightness(currentBrightLevel));
      await Brightness.setBrightnessAsync(1);
    })();
  }, [couponDetail]);
  useEffect(() => {
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
      msg = `직원전용 기능입니다.\n쿠폰이 사용된 것으로\n처리됩니다.`;

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
  const onError = () => {
    dispatch(
      setAlert({
        message: "바코드번호가 정확하지 않습니다. 고객센터에 문의해주세요.",
        onPressConfirm: () => {
          dispatch(setAlert(null));
          props.navigation.pop();
        },
      })
    );
  };

  if (_.isEmpty(couponDetail) || isLoading) return <></>;
  return (
    <BaseScreen
      style={{ paddingLeft: 0, paddingRight: 0 }}
      contentStyle={{ paddingTop: 0 }}
    >
      {couponDetail && (
        <DetailContainer style={{ paddingBottom: 30 }}>
          <TopBox>
            {!isUsed && !isNew && (
              <>
                <TopText
                  style={{
                    backgroundColor: colors.lipstickTwo,
                    fontSize: 18,
                    paddingTop: 14,
                    paddingBottom: 14,
                  }}
                >
                  본쿠폰을 직원에게 제시하여 주시기 바랍니다.
                </TopText>
                <Image
                  source={require("../../assets/images/num_128.png")}
                  resizeMode="cover"
                  style={{
                    width: SCREEN_WIDTH + SCREEN_WIDTH * 0.1,
                    marginLeft: "-5%",
                    marginTop: -2,
                  }}
                />
              </>
            )}
            {!isUsed && isNew && (
              <>
                <TopText>쿠폰이 발급 되었습니다.</TopText>
                <Image
                  source={require("../../assets/images/nums_128.png")}
                  resizeMode="cover"
                  style={{
                    width: SCREEN_WIDTH + SCREEN_WIDTH * 0.1,
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
                  source={require("../../assets/images/nums99.png")}
                  resizeMode="cover"
                  style={{
                    width: SCREEN_WIDTH + SCREEN_WIDTH * 0.1,
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
              width: SCREEN_WIDTH * 0.561,
              aspectRatio: 1 / 1,
              marginBottom: 25,
              backgroundColor: colors.trueWhite,
            }}
            initResizeMode="contain"
            resizeMode="contain"
            defaultSource={require("../../assets/images/p_img503.png")}
          />
          {couponDetail.barcode && couponDetail.limit_yn == "N" && (
            <Barcode
              width={3}
              height={100}
              value={couponDetail.barcode}
              format="EAN13"
              flat
              text={couponDetail.barcode}
              onError={onError}
            />
          )}
          {/* <Discount>
            {couponDetail.price}
            {couponDetail.price_gbn == "A" ? "원 " : "% "}
            할인
          </Discount>
          <Title>{couponDetail.title}</Title> */}
          <TextContainer>
            <Price>
              {couponDetail.gbn == "A" ? `쿠폰명` : `상품명`} :{" "}
              {couponDetail.title}
            </Price>
            <Price>할인가 : {Util.formatNumber(couponDetail.price)}원</Price>
            <Price>
              최소구매금액 :
              {couponDetail.m_price > 0
                ? `${Util.formatNumber(couponDetail.m_price)}원`
                : "없음"}
            </Price>
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
          {!isUsed && isNew && <Warn>쿠폰 발급이 완료 되었습니다.</Warn>}
          {!isUsed && (
            <BlueButton
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: colors.pinkishGrey,
              }}
              onPress={() => {
                dispatch(CommonActions.setBottomNavigation(true));
                props.navigation.pop();
              }}
            >
              {/* <Image source={require("../../assets/images/resize3.png")} /> */}
              <BlueButtonText style={{ color: colors.greyishBrown }}>
                닫기
              </BlueButtonText>
            </BlueButton>
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
                {/* <Image source={require("../../assets/images/resize3.png")} /> */}
                <BlueButtonText>사용완료</BlueButtonText>
              </BlueButton>
            </>
          )}
        </DetailContainer>
      )}
      <Image
        source={require("../../assets/images/pannel_n3.png")}
        style={{ width: "110%", marginLeft: "-5%", marginTop: -3 }}
        resizeMode="cover"
      />
      <DescContainer>
        <Image source={require("../../assets/images/qrcode.png")} />
        <DescText>쿠폰사용시 유의사항</DescText>
      </DescContainer>
      <Desc>
        {`- 앱쿠폰은 하나로마트앱 회원만 사용 가능합니다.
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
- 임대매장, 일부코너 상품은 사용이 불가합니다.`}
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
        <Image source={require("../../assets/images/greendot3.png")} />
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
  fontFamily: "Roboto-Bold",
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
    headerRight: (props) => <></>,
  };
};
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesome5 } from "@expo/vector-icons";
import { HeaderButton } from "../../components/UI/header/elements/HeaderButton";
const UseButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <TouchableOpacity
        onPress={() => {
          if (props.onPress) props.onPress();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            alignItems: "center",
            color: colors.appleGreen,
            fontSize: 15,
            justifyContent: "center",
            fontFamily: "Roboto-Bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          직원확인
        </Text>

        <Image
          source={require("../../assets/images/admin_ic.png")}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
      </TouchableOpacity>
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
