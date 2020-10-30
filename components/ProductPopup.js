import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  Button,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { BaseImage, screenWidth, screenHeight, BaseText } from "@UI/BaseUI";
import * as flyerActions from "@actions/flyer";
import {
  BaseTouchable,
  BaseSquareButtonContainer,
  ButtonText,
  BaseTextInput,
} from "./UI/BaseUI";
import * as Util from "@util";
import * as RootNavigation from "@navigation/RootNavigation";
import { setAlert } from "@actions/common";
import _ from "lodash";

const ProductPopup = (props) => {
  if (!props.item) return <></>;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const productDetail = useSelector((state) => state.flyer.productDetail);
  const [item_amount, setItem_amount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(props.item.sale_price);

  useEffect(() => {
    setTotalPrice(props.item.sale_price);
  }, [props.item.sale_price]);

  useEffect(() => {
    if (!props.isVisible) return;
    setItem_amount(1);
    dispatch(
      flyerActions.fetchProductDetail({ product_cd: props.item.product_cd })
    );
  }, [props.isVisible]);

  const onAddCart = () => {
    dispatch(
      flyerActions.addCart({
        store_cd: props.item.store_cd,
        user_cd: userInfo.user_cd,
        product_cd: props.item.product_cd,
        leaf_cd: props.item.leaf_cd,
        item_amount: item_amount ? item_amount : 1,
      })
    ).then((data) => {
      if (data.result == "success")
        dispatch(
          setAlert({
            message: "장바구니에 추가되었습니다.",
            confirmText: "확인",
            cancelText: "장바구니로 이동",
            onPressConfirm: () => {
              dispatch(setAlert(null));
            },
            onPressCancel: () => {
              dispatch(setAlert(null));
              props.setIsVisible(false);
              RootNavigation.navigate("Cart");
            },
          })
        );
    });
  };

  return (
    <Modal
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      // animationOutTiming={0}
      // onBackdropPress={() => props.setIsVisible(false)}
      onRequestClose={() => props.setIsVisible(false)}
      isVisible={props.isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      {productDetail && (
        <Container>
          <Header>
            {/* <TouchableOpacity
              onPress={props.setIsVisible.bind(this, !props.isVisible)}
            >
              <Image source={require("@images/cross.png")} />
            </TouchableOpacity> */}
          </Header>
          <Body contentContainerStyle={{ alignItems: "center" }}>
            <BaseImage
              style={{
                width: screenWidth * 0.566,
                height: screenWidth * 0.566,
                aspectRatio: 1 / 1,
                marginTop: 18,
              }}
              source={props.item.title_img}
              resizeMode="cover"
            />
            <BorderLine />
            <Title>{props.item.title}</Title>
            <SalePrice>{Util.formatNumber(props.item.price)}원</SalePrice>
            <PriceContainer style={{}}>
              <PriceUnit>최종혜택가 </PriceUnit>
              <Price>{Util.formatNumber(props.item.sale_price)}원</Price>
            </PriceContainer>
            {/* <QuantityContainer>
              <QContainer>
                <Image source={require("@images/clipboard02.png")} />
                <QuantityTitle>수량</QuantityTitle>
              </QContainer>
              <QButtonContainer>
                <TouchableOpacity
                  onPress={() => setItem_amount(parseInt(item_amount) + 1)}
                >
                  <Image source={require("@images/sp107.png")} />
                </TouchableOpacity>
                <QInput
                  keyboardType="numeric"
                  value={`${item_amount}`}
                  onChangeText={(val) => setItem_amount(val)}
                />
                <TouchableOpacity
                  onPress={() =>
                    item_amount > 1 ? setItem_amount(item_amount - 1) : null
                  }
                >
                  <Image source={require("@images/sp108.png")} />
                </TouchableOpacity>
              </QButtonContainer>
            </QuantityContainer>
            <TotalContainer>
              <TotalUnit>합계 : </TotalUnit>
              <Total>{Util.formatNumber(totalPrice * item_amount)}원</Total>
            </TotalContainer> */}
            <NoticeContainer>
              <NoticeTitleContainer>
                <NoticeIcon />
                <NoticeTitle>혜택 및 상품 정보안내</NoticeTitle>
              </NoticeTitleContainer>
              {productDetail.card_price != 0 && (
                <NoticeRow>
                  <Notice0 style={{ backgroundColor: colors.cerulean }}>
                    카드할인
                  </Notice0>
                  <NoticeRight>
                    <Notice2
                      style={{ color: colors.cerulean, paddingLeft: 15 }}
                    >
                      {Util.formatNumber(productDetail.card_price)}원
                    </Notice2>
                    <Notice2
                      style={{
                        textAlign: "right",
                        color: colors.cerulean,
                        paddingRight: 4,
                      }}
                    >
                      {`카드할인가 ${Util.formatNumber(
                        productDetail.price - productDetail.card_price
                      )}원`}
                    </Notice2>
                  </NoticeRight>
                </NoticeRow>
              )}
              {!_.isEmpty(productDetail.card_info) && (
                <NoticeRow>
                  <Notice1 style={{ textAlign: "center" }}>
                    {productDetail.card_info}
                    {productDetail.card_limit
                      ? " / " + productDetail.card_limit
                      : ""}
                  </Notice1>
                </NoticeRow>
              )}
              {productDetail.coupon_price != 0 && (
                <NoticeRow>
                  <Notice0 style={{ backgroundColor: colors.appleGreen }}>
                    쿠폰할인
                  </Notice0>
                  <NoticeRight>
                    <Notice2
                      style={{ color: colors.appleGreen, paddingLeft: 15 }}
                    >
                      {Util.formatNumber(productDetail.coupon_price)}원
                    </Notice2>
                    <Notice2
                      style={{
                        textAlign: "right",
                        color: colors.appleGreen,
                        paddingRight: 4,
                      }}
                    >
                      {`쿠폰할인가 ${Util.formatNumber(
                        productDetail.price - productDetail.coupon_price
                      )}원`}
                    </Notice2>
                  </NoticeRight>
                </NoticeRow>
              )}
              {!_.isEmpty(productDetail.bogo) && (
                <NoticeRow>
                  <Notice0 style={{ backgroundColor: colors.cherry }}>
                    다다익선
                  </Notice0>
                  <NoticeRight>
                    <Notice2
                      style={{
                        color: colors.cherry,
                        paddingLeft: 15,
                        flexGrow: 0.3,
                        flexShrink: 0,
                      }}
                    >
                      {productDetail.bogo}
                    </Notice2>
                    <Notice2
                      style={{
                        textAlign: "right",
                        color: colors.cherry,
                        paddingRight: 4,
                      }}
                    >
                      {productDetail.bogo_info}
                    </Notice2>
                  </NoticeRight>
                </NoticeRow>
              )}
              {productDetail.members_price != 0 && (
                <NoticeRow>
                  <Notice0 style={{ backgroundColor: colors.waterBlue }}>
                    NH멤버스
                  </Notice0>
                  <NoticeRight>
                    <Notice2
                      style={{ color: colors.waterBlue, paddingLeft: 15 }}
                    >
                      {Util.formatNumber(productDetail.members_price)}원
                    </Notice2>
                    <Notice2
                      style={{
                        textAlign: "right",
                        color: colors.waterBlue,
                        paddingRight: 4,
                      }}
                    >
                      {`NH멤버스가 ${Util.formatNumber(
                        productDetail.price - productDetail.members_price
                      )}원`}
                    </Notice2>
                  </NoticeRight>
                </NoticeRow>
              )}
            </NoticeContainer>
            <InfoContainer>
              <InfoListContainer>
                <InfoListRow>
                  <InfoText>※</InfoText>
                </InfoListRow>
                <InfoListText>
                  <InfoText>
                    상품의 가격 및 내용은 공급자 사정에 따라 다소 변경될 수
                    있으며 조기품절 될 수도 있습니다.
                  </InfoText>
                </InfoListText>
              </InfoListContainer>
              <InfoListContainer>
                <InfoListRow>
                  <InfoText>※</InfoText>
                </InfoListRow>
                <InfoListText>
                  <InfoText>일부 상품사진은 이미지컷입니다.</InfoText>
                </InfoListText>
              </InfoListContainer>
              <InfoListContainer>
                <InfoListRow>
                  <InfoText>※</InfoText>
                </InfoListRow>
                <InfoListText>
                  <InfoText>
                    카드/쿠폰할인,다다익선은 매장방문고객에 한합니다.
                  </InfoText>
                </InfoListText>
              </InfoListContainer>
            </InfoContainer>

            <BtnContainer style={{}}>
              {/* <BlueBtn onPress={onAddCart}>
                <Image
                  source={require("@images/baseline-shopping_cart-24px.png")}
                />
                <BtnText>장바구니</BtnText>
              </BlueBtn> */}
              <GreenBtn
                onPress={props.setIsVisible.bind(this, !props.isVisible)}
              >
                <Image
                  source={require("@images/baseline-backspace-24px.png")}
                />
                <BtnText>닫기</BtnText>
              </GreenBtn>
            </BtnContainer>
          </Body>
        </Container>
      )}
    </Modal>
  );
};
const NoticeRight = styled.View({
  flexDirection: "row",
  flex: 1,
});
const Notice0 = styled(BaseText)({
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 13,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
  backgroundColor: colors.white,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 1,
  paddingBottom: 1,
  marginRight: 2,
  width: "20%",
});
const Notice1 = styled(BaseText)({
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 13,
  letterSpacing: 0,
  color: colors.greyishBrown,
  backgroundColor: colors.white,
  paddingTop: 1,
  paddingBottom: 1,
  flex: 1,
});
const Notice2 = styled(BaseText)({
  fontSize: 9,
  fontFamily: "CustomFont-Bold",
  lineHeight: 13,
  letterSpacing: 0,

  color: colors.greyishBrown,
  backgroundColor: colors.white,
  paddingTop: 1,
  paddingBottom: 1,
  flex: 1,
  borderWidth: 0,
  marginRight: 0,

  marginLeft: 0,
});
const NoticeRow = styled.View({
  flexDirection: "row",
  marginBottom: 2,
});
const InfoListContainer = styled.View({
  flexDirection: "row",
  alignItems: "flex-start",
  flexWrap: "wrap",
  // flex: 1,
  width: "100%",
  // height: "a",
});
const InfoListRow = styled.View({
  // flex: 1,
  flexShrink: 0,
});
const InfoListText = styled.View({
  flex: 1,
});
const InfoText = styled(BaseText)({
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const InfoContainer = styled.View({
  paddingLeft: 34,
  paddingRight: 34,
  paddingTop: 4,
});
const NoticeTitleContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 5,
});
const NoticeIcon = styled.View({
  width: 4,
  height: 11,
  backgroundColor: colors.blackThree,
  marginRight: 4,
});
const NoticeTitle = styled(BaseText)({
  fontSize: 11,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Notice = styled(BaseText)({
  borderLeftWidth: 3,
  borderColor: colors.greyishThree,
  borderRightWidth: 3,
  backgroundColor: colors.white,
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
  paddingLeft: 11,
  paddingRight: 11,
  paddingTop: 5,
  paddingBottom: 5,
  marginBottom: 3,
});
const NoticeContainer = styled.View({
  marginTop: 12,
  width: screenWidth - 20.5 - 20.5 - 50,
});
const BorderLine = styled.View({
  marginTop: 6.5,
  width: screenWidth - 20.5 - 20.5 - 50,
  height: 1,
  backgroundColor: colors.white,
});
const BtnText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
  marginLeft: 6,
});
const BlueBtn = styled(BaseSquareButtonContainer)({
  backgroundColor: colors.cerulean,
  height: screenWidth * 0.1,
  flexDirection: "row",
  flexGrow: 0,
  width: screenWidth * 0.333,
  marginLeft: 2.5,
  marginRight: 2.5,
});
const GreenBtn = styled(BlueBtn)({
  backgroundColor: colors.appleGreen,
});
const BtnContainer = styled.View({
  marginTop: 13,
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-end",
  marginBottom: 0,
});
const PriceUnit = styled(BaseText)({
  fontSize: 12,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.pine,
});
const TotalUnit = styled(BaseText)({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishThree,
});
const Total = styled(BaseText)({
  fontSize: 22,
  fontFamily: "CustomFont-Bold",
  fontStyle: "normal",
  lineHeight: 32,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.black,
});
const TotalContainer = styled.View({
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  marginTop: 5,
});
const QInput = styled(BaseTextInput)({
  width: 65,
  fontSize: 21,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 30,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
});
const QButtonContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginTop: 7,
  marginBottom: 7,
});
const QContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  borderRightWidth: 1,
  borderColor: colors.white,
  paddingRight: 20.5,
  marginRight: 25.5,
});
const QuantityTitle = styled(BaseText)({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginLeft: 11,
});
const QuantityContainer = styled.View({
  paddingLeft: 18.5,
  paddingRight: 28,
  alignItems: "center",
  borderRadius: 23,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.white,

  marginLeft: 25,
  marginRight: 25,
  justifyContent: "center",
  flexDirection: "row",
  // width: () => `calc(100% -20)`,
});
const SalePrice = styled(BaseText)({
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
});
const Price = styled(BaseText)({
  fontSize: 18,
  fontFamily: "CustomFont-Bold",

  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.pine,
});
const PriceContainer = styled.View({
  flexDirection: "row",
  marginBottom: 7,
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginTop: 7.5,
});
Title.defaultProps = {
  numberOfLines: 1,
};
const Body = styled.ScrollView({ flex: 1, width: "100%" });
const Header = styled.View({
  backgroundColor: colors.black,
  height: 12,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
});
const Container = styled.View({
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  overflow: "hidden",
  alignItems: "center",
  backgroundColor: colors.trueWhite,
  width: "100%",
  // height: screenHeight * 0.784,
  aspectRatio: 54.86 / 105,
});
const styles = StyleSheet.create({});

export default ProductPopup;
