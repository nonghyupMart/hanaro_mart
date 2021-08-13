import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { BaseImage, SCREEN_WIDTH, BaseText } from "../components/UI/BaseUI";
import { BaseSquareButtonContainer, BaseTextInput } from "./UI/BaseUI";
import * as Util from "../utils";
import _ from "lodash";

const ProductPopup = ({ item, isVisible, setIsVisible }) => {
  if (!item || !isVisible || _.isEmpty(item)) return <></>;

  return (
    <Modal
      // animationOutTiming={0}
      // onBackdropPress={setIsVisible.bind(this,false)}
      onRequestClose={setIsVisible.bind(this, false)}
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <Container>
        <CloseBtnContainer onPress={setIsVisible.bind(this, !isVisible)}>
          <Image source={require("../assets/images/cross0104.png")} />
        </CloseBtnContainer>
        <Body contentContainerStyle={{ alignItems: "center" }}>
          <BaseImage
            style={{
              width: SCREEN_WIDTH * 0.566,
              height: SCREEN_WIDTH * 0.566,
              aspectRatio: 1 / 1,
              marginTop: 18,
            }}
            source={item.detail_img || item.title_img}
            resizeMode="cover"
          />
          <BorderLine />
          <Title>{item.title}</Title>
          <SalePrice>{Util.formatNumber(item.price)}원</SalePrice>
          {item.sale_price > 0 && (
            <PriceContainer style={{}}>
              <PriceUnit>최종혜택가 </PriceUnit>
              <Price>{Util.formatNumber(item.sale_price)}원</Price>
            </PriceContainer>
          )}
          <NoticeContainer>
            <NoticeTitleContainer>
              <NoticeIcon />
              <NoticeTitle>혜택 및 상품 정보안내</NoticeTitle>
            </NoticeTitleContainer>
            {item.card_price > 0 && (
              <NoticeRow>
                <Notice0 style={{ backgroundColor: colors.CERULEAN }}>
                  카드할인
                </Notice0>
                <NoticeRight>
                  <Notice2
                    style={{
                      color: colors.CERULEAN,
                      paddingLeft: 15,
                      flexGrow: 0.4,
                    }}
                  >
                    {Util.formatNumber(item.card_price)}원
                  </Notice2>
                  <Notice2
                    style={{
                      textAlign: "right",
                      color: colors.CERULEAN,
                      paddingRight: 4,
                      flexShrink: 0,
                    }}
                  >
                    {`카드할인가 ${Util.formatNumber(
                      item.price - item.card_price
                    )}원`}
                  </Notice2>
                </NoticeRight>
              </NoticeRow>
            )}
            {item && !_.isEmpty(item.card_info) && (
              <NoticeRow>
                <Notice1 style={{ textAlign: "center" }}>
                  {item.card_info}
                  {item.card_limit ? " / " + item.card_limit : ""}
                </Notice1>
              </NoticeRow>
            )}
            {item.coupon_price > 0 && (
              <NoticeRow>
                <Notice0 style={{ backgroundColor: colors.APPLE_GREEN }}>
                  쿠폰할인
                </Notice0>
                <NoticeRight>
                  <Notice2
                    style={{
                      color: colors.APPLE_GREEN,
                      paddingLeft: 15,
                      flexGrow: 0.4,
                    }}
                  >
                    {Util.formatNumber(item.coupon_price)}원
                  </Notice2>
                  <Notice2
                    style={{
                      textAlign: "right",
                      color: colors.APPLE_GREEN,
                      paddingRight: 4,
                      flexShrink: 0,
                    }}
                  >
                    {`쿠폰할인가 ${Util.formatNumber(
                      item.price - item.coupon_price
                    )}원`}
                  </Notice2>
                </NoticeRight>
              </NoticeRow>
            )}
            {!_.isEmpty(item.bogo_info) && !_.isEmpty(item.bogo_info.trim()) && (
              <NoticeRow>
                <Notice0 style={{ backgroundColor: colors.CHERRY }}>
                  추가정보
                </Notice0>
                <NoticeRight>
                  <Notice2
                    style={{
                      flexShrink: 0,
                      textAlign: "right",
                      color: colors.CHERRY,
                      paddingRight: 4,
                    }}
                  >
                    {item.bogo_info}
                  </Notice2>
                </NoticeRight>
              </NoticeRow>
            )}
            {item.members_price > 0 && (
              <NoticeRow>
                <Notice0 style={{ backgroundColor: colors.WATER_BLUE }}>
                  NH멤버스
                </Notice0>
                <NoticeRight>
                  <Notice2
                    style={{
                      flexGrow: 0.4,
                      color: colors.WATER_BLUE,
                      paddingLeft: 15,
                    }}
                  >
                    {Util.formatNumber(item.members_price)}원
                  </Notice2>
                  <Notice2
                    style={{
                      flexShrink: 0,
                      textAlign: "right",
                      color: colors.WATER_BLUE,
                      paddingRight: 4,
                    }}
                  >
                    {`NH멤버스가 ${Util.formatNumber(
                      item.price - item.members_price
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
                  상품의 가격 및 내용은 공급자 사정에 따라 다소 변경될 수 있으며
                  조기품절 될 수도 있습니다.
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
            <GrayBtn onPress={setIsVisible.bind(this, !isVisible)}>
              <BtnText>닫기</BtnText>
            </GrayBtn>
          </BtnContainer>
        </Body>
      </Container>
    </Modal>
  );
};
const CloseBtnContainer = styled.TouchableOpacity({
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 10,
  elevation: 1,
  padding: 11.5,
});
const NoticeRight = styled.View({
  flexDirection: "row",
  flex: 1,
});
const Notice0 = styled(BaseText)({
  fontSize: Util.normalize(10),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.TRUE_WHITE,
  backgroundColor: colors.WHITE,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 1,
  paddingBottom: 1,
  marginRight: 2,
  width: "25%",
});
const Notice1 = styled(BaseText)({
  fontSize: Util.normalize(10),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  color: colors.GREYISH_BROWN,
  backgroundColor: colors.WHITE,
  paddingTop: 1,
  paddingBottom: 1,
  flex: 1,
});
const Notice2 = styled(BaseText)({
  fontSize: Util.normalize(10),
  fontFamily: "Roboto-Bold",
  lineHeight: 16,
  letterSpacing: 0,

  color: colors.GREYISH_BROWN,
  backgroundColor: colors.WHITE,
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
  color: colors.BLACK,
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
  backgroundColor: colors.BLACK_THREE,
  marginRight: 4,
});
const NoticeTitle = styled(BaseText)({
  fontSize: 11,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.BLACK,
});
const Notice = styled(BaseText)({
  borderLeftWidth: 3,
  borderColor: colors.GREYISH_THREE,
  borderRightWidth: 3,
  backgroundColor: colors.WHITE,
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.BLACK,
  paddingLeft: 11,
  paddingRight: 11,
  paddingTop: 5,
  paddingBottom: 5,
  marginBottom: 3,
});
const NoticeContainer = styled.View({
  marginTop: 0,
  width:
    SCREEN_WIDTH > 320
      ? SCREEN_WIDTH - 20.5 - 20.5 - 50
      : SCREEN_WIDTH - 20.5 - 20.5 - 35,
});
const BorderLine = styled.View({
  marginTop: 6.5,
  width: SCREEN_WIDTH - 20.5 - 20.5 - 50,
  height: 1,
  backgroundColor: colors.WHITE,
});
const BtnText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.TRUE_WHITE,
  marginLeft: 6,
});
const BlueBtn = styled(BaseSquareButtonContainer)({
  backgroundColor: colors.CERULEAN,
  height: SCREEN_WIDTH * 0.1,
  flexDirection: "row",
  flexGrow: 0,
  width: SCREEN_WIDTH * 0.333,
  marginLeft: 2.5,
  marginRight: 2.5,
});
const GrayBtn = styled(BlueBtn)({
  backgroundColor: colors.GREYISH_THREE,
  width: "100%",
  marginLeft: 0,
  marginRight: 0,
});
const BtnContainer = styled.View({
  marginTop: 13,
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-end",
  marginBottom: 0,
  width: SCREEN_WIDTH - 20.5 - 20.5 - 50,
});
const PriceUnit = styled(BaseText)({
  fontSize: 12,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.PINE,
});
const TotalUnit = styled(BaseText)({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.GREYISH_THREE,
});
const Total = styled(BaseText)({
  fontSize: 22,
  fontFamily: "Roboto-Bold",
  fontStyle: "normal",
  lineHeight: 32,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.BLACK,
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
  color: colors.GREYISH_BROWN,
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
  borderColor: colors.WHITE,
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
  color: colors.GREYISH_BROWN,
  marginLeft: 11,
});
const QuantityContainer = styled.View({
  paddingLeft: 18.5,
  paddingRight: 28,
  alignItems: "center",
  borderRadius: 23,
  backgroundColor: colors.TRUE_WHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.WHITE,

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
  color: colors.BLACK,
});
const Price = styled(BaseText)({
  fontSize: 18,
  fontFamily: "Roboto-Bold",

  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.PINE,
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
  color: colors.GREYISH_BROWN,
  marginTop: 7.5,
});
Title.defaultProps = {
  numberOfLines: 1,
};
const Body = styled.ScrollView({ width: "100%" });
const Header = styled.View({
  backgroundColor: colors.CERULEAN,
  height: 12,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
});
const Container = styled.View({
  borderBottomWidth: 12,
  borderTopWidth: 12,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  borderBottomLeftRadius: 5,
  borderColor: colors.CERULEAN,

  overflow: "hidden",
  alignItems: "center",
  backgroundColor: colors.TRUE_WHITE,
  width: "100%",
  paddingBottom: 15,

  // height: SCREEN_HEIGHT * 0.784,
  // aspectRatio: 54.86 / 105,
});
const styles = StyleSheet.create({});

export default React.memo(ProductPopup);
