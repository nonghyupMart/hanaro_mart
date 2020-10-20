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
      onBackdropPress={() => props.setIsVisible(false)}
      onRequestClose={() => props.setIsVisible(false)}
      isVisible={props.isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      {productDetail && (
        <Container>
          <Header>
            <TouchableOpacity
              onPress={props.setIsVisible.bind(this, !props.isVisible)}
            >
              <Image source={require("@images/cross.png")} />
            </TouchableOpacity>
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
              <PriceUnit>쿠폰할인가 </PriceUnit>
              <Price>{Util.formatNumber(props.item.sale_price)}원</Price>
            </PriceContainer>
            <QuantityContainer>
              <QContainer>
                <Image source={require("@images/clipboard02.png")} />
                <QuantityTitle>수량</QuantityTitle>
              </QContainer>
              <QButtonContainer>
                <TouchableOpacity
                  onPress={() => setItem_amount(item_amount + 1)}
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
            </TotalContainer>
            <NoticeContainer>
              <Image
                source={require("@images/notic701.png")}
                style={{ marginBottom: 10 }}
              />
              <Notice>
                ※ 상품의 가격 및 내용은 공급자 사정에 따라 다소 변경될 수 있으며
                조기품절 될 수도 있습니다.
              </Notice>
              <Notice>※ 일부 상품사진은 이미지컷입니다.</Notice>
              <Notice>
                ※ 카드/쿠폰할인,다다익선은 매장방문고객에 한합니다.
              </Notice>
            </NoticeContainer>
            <BtnContainer style={{}}>
              <BlueBtn onPress={onAddCart}>
                <Image
                  source={require("@images/baseline-shopping_cart-24px.png")}
                />
                <BtnText>장바구니</BtnText>
              </BlueBtn>
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
  marginTop: 17,
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-end",
  marginBottom: 24,
});
const PriceUnit = styled(BaseText)({
  fontSize: 12,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.cerulean,
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
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 32,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.pine,
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
  fontWeight: "bold",

  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.cerulean,
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
  padding: 8,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
});
const Container = styled.View({
  alignItems: "center",
  backgroundColor: colors.trueWhite,
  width: "100%",
  // height: screenHeight * 0.784,
  aspectRatio: 54.86 / 105,
});
const styles = StyleSheet.create({});

export default ProductPopup;
