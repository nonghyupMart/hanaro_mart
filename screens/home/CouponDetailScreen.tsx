import * as Brightness from "expo-brightness";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import styled from "styled-components/native";
import Barcode from "../../components/Barcode";
import BaseScreen from "../../components/BaseScreen";
import {
  BaseImage,
  BaseText,
  BlueButton,
  BlueButtonText,
  DetailContainer,
  SCREEN_WIDTH,
} from "../../components/UI/BaseUI";
import { BackButton, TextTitle } from "../../components/UI/header";
import HeaderButton from "../../components/UI/header/elements/HeaderButton";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SET_COUPON_DETAIL } from "../../store/actions/actionTypes";
import * as CommonActions from "../../store/actions/common";
import { setAlert } from "../../store/actions/common";
import * as couponActions from "../../store/actions/coupon";
import * as Util from "../../utils";

const CouponDetailScreen = (props) => {
  const params = props.route.params;
  const isNew = !!params.isNew;
  const couponDetail = useAppSelector((state) => state.coupon.couponDetail);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const [isUsed, setIsUsed] = useState(false);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const brightness = useAppSelector((state) => state.common.brightness);

  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      (async () => {
        dispatch(CommonActions.setBottomNavigation(true));
        dispatch({
          type: SET_COUPON_DETAIL,
          couponDetail: null,
        });
        if (brightness && Platform.OS === "ios")
          await Brightness.setBrightnessAsync(brightness);
        await Brightness.useSystemBrightnessAsync();
      })();
    };
  }, []);
  useEffect(() => {
    if (!_.isEmpty(couponDetail)) {
      props.navigation.setOptions({
        title: "??????",
        contentStyle: {
          paddingBottom: 0,
        },
        headerLeft: () => <BackButton />,
        headerTitle: (props) => <TextTitle {...props} />,
        headerRight: (props) =>
          couponDetail.limit_yn === "N" ? (
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
        couponDetail.limit_yn !== "N"
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
  }, [dispatch]);
  const onPress = () => {
    let msg;
    if (!isUsed) {
      msg = `???????????? ???????????????.\n????????? ????????? ?????????\n???????????????.`;

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
                    "?????????????????? ???????????? ????????????. ??????????????? ??????????????????.",
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
              if (data.result === "success") {
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
      msg = `?????? ????????? ???????????????.`;
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
        message: "?????????????????? ???????????? ????????????. ??????????????? ??????????????????.",
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
            {!isUsed && (
              <>
                <TopText
                  style={{
                    backgroundColor: colors.LIPSTICK_TWO,
                    fontSize: 18,
                    paddingTop: 14,
                    paddingBottom: 14,
                  }}
                >
                  ???????????? ???????????? ???????????? ????????? ????????????.
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
            {isUsed && (
              <>
                <TopText style={{ backgroundColor: colors.GREYISH_BROWN }}>
                  ????????? ?????????????????????.
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
              backgroundColor: colors.TRUE_WHITE,
            }}
            initResizeMode="contain"
            resizeMode="contain"
            defaultSource={require("../../assets/images/p_img503.png")}
          />
          {couponDetail.barcode && couponDetail.limit_yn === "N" && (
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
          <TextContainer>
            <Price>
              {couponDetail.gbn === "A" ? `?????????` : `?????????`} :{" "}
              {couponDetail.title}
            </Price>
            <Price>????????? : {Util.formatNumber(couponDetail.price)}???</Price>
            <Price>
              ?????????????????? :
              {couponDetail.m_price > 0
                ? `${Util.formatNumber(couponDetail.m_price)}???`
                : "??????"}
            </Price>
            <Price>???????????? : ~ {couponDetail.end_date}??????</Price>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: colors.WHITE,
                borderBottomWidth: 1,
                borderColor: colors.WHITE,
                marginTop: 12.5,
                marginBottom: 12.5,
              }}
            ></View>
            {!_.isEmpty(couponDetail.memo) && <Memo>{couponDetail.memo}</Memo>}
          </TextContainer>
          {!isUsed && isNew && <Warn>?????? ????????? ?????? ???????????????.</Warn>}
          {!isUsed && (
            <BlueButton
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: colors.PINKISH_GREY,
              }}
              onPress={() => {
                dispatch(CommonActions.setBottomNavigation(true));
                props.navigation.pop();
              }}
            >
              {/* <Image source={require("../../assets/images/resize3.png")} /> */}
              <BlueButtonText style={{ color: colors.GREYISH_BROWN }}>
                ??????
              </BlueButtonText>
            </BlueButton>
          )}
          {isUsed && (
            <>
              <Warn style={{ color: colors.GREYISH_BROWN }}>
                ??? ????????? ???????????? ???????????????.
              </Warn>
              <BlueButton
                onPress={() => {
                  dispatch(CommonActions.setBottomNavigation(true));
                  props.navigation.pop();
                }}
                style={{ backgroundColor: colors.GREYISH_THREE }}
              >
                {/* <Image source={require("../../assets/images/resize3.png")} /> */}
                <BlueButtonText>????????????</BlueButtonText>
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
        <DescText>??????????????? ????????????</DescText>
      </DescContainer>
      <Desc>
        {`- ???????????? ?????????????????? ????????? ?????? ???????????????.
- ????????? ??????????????? ??????????????? ?????? ???????????????.
- ?????? ??????????????? ??? ????????? ????????? ?????????.
- ?????? ????????? ?????????????????? ???????????? ???????????????.
- ?????? ????????? ??????????????? ???????????????.
- ????????? ?????? ??? ??????????????? ????????? ??? ????????????.
- ????????? ???????????? ????????? ????????? ???????????????.
- ???????????? ????????? ?????? ???????????????.
- ????????? ????????? ??????????????? ???????????????.
- ??????????????? ????????? ???????????????.
- ?????? ?????? ???, ??? ???????????? ?????????????????? ????????? ???????????? ???????????? ????????? ??? ????????????.
- ????????????, ???????????? ????????? ????????? ???????????????.`}
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
  color: colors.GREYISH_THREE,
  paddingLeft: 12,
  paddingRight: 12,
});
const TextContainer = styled.View({
  paddingLeft: "11%",
  paddingRight: "11%",
  width: "100%",
});
const TopText = styled(BaseText)({
  color: colors.TRUE_WHITE,
  fontSize: 24,
  backgroundColor: colors.APPLE_GREEN,
  textAlign: "center",
  width: "110%",
  paddingTop: 7,
  paddingBottom: 7,
  marginLeft: "-5%",
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
  color: colors.GREYISH_BROWN,
  paddingLeft: 25,
  paddingRight: 25,
});
const DescText = styled(BaseText)({
  marginLeft: 7,
  fontSize: 18,
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
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
  color: colors.CERULEAN,
});
const PriceText = styled(BaseText)({
  fontSize: 16,
  lineHeight: 24,
  color: colors.GREYISH_BROWN,
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
  color: colors.GREYISH_BROWN,
  marginBottom: 8,
});
const Discount = styled(BaseText)({
  fontSize: 30,
  fontFamily: "Roboto-Bold",
  fontStyle: "normal",
  lineHeight: 44,
  letterSpacing: -0.75,
  textAlign: "center",
  color: colors.LIPSTICK,
  marginTop: 20,
});

export const screenOptions = ({ navigation }) => {
  return {
    title: "??????",
    contentStyle: {
      paddingBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};
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
            color: colors.APPLE_GREEN,
            fontSize: 15,
            justifyContent: "center",
            fontFamily: "Roboto-Bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          POS??????
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
