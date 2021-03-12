import React from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { BaseImage, BaseText } from "../components/UI/BaseUI";
const { width, height } = Dimensions.get("window");
import * as Util from "../util";
import _ from "lodash";
import Discounts from "../components/flyerItem/Discounts";
import moment from "moment";

const FlyerItemColumn2 = ({ item, onPress }) => {
  // console.log(item.title + " FlyerItemColumn2 rendered");
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
        <Container>
          <ImageContainer>
            {!_.isEmpty(item.bogo) && (
              <BogoIcon>
                <BogoText>{item.bogo}</BogoText>
              </BogoIcon>
            )}
            <BaseImage
              style={{
                width: width * 0.316,
                // height: width * 0.227,
                aspectRatio: 1 / 1,
              }}
              source={item.title_img}
              defaultSource={require("../assets/images/n_img501.png")}
            />
          </ImageContainer>

          <Discounts item={item} />
          {item.sale_price > 0 && (
            <>
              <OriginalPriceContainer>
                <PriceTitle>최종행사가</PriceTitle>
                <OriginalPrice>{Util.formatNumber(item.price)}원</OriginalPrice>
                <Image
                  source={require("../assets/images/ic_sale.png")}
                  style={{ marginTop: 4 }}
                />
              </OriginalPriceContainer>
              <SalePriceContainer>
                <SalePrice>{Util.formatNumber(item.sale_price)}</SalePrice>
                <SalePriceUnit>원</SalePriceUnit>
              </SalePriceContainer>
            </>
          )}
          {item.sale_price <= 0 && (
            <>
              <PriceTitle style={{ marginBottom: 2 }}>행사가</PriceTitle>
              <SalePriceContainer>
                <SalePrice>{Util.formatNumber(item.price)}</SalePrice>
                <SalePriceUnit>원</SalePriceUnit>
              </SalePriceContainer>
            </>
          )}

          <Title>{item.title}</Title>
          <Period>
            {moment(item.start_date).format("MM.DD")}~
            {moment(item.end_date).format("MM.DD")}
          </Period>
        </Container>
      </TouchableOpacity>
    </View>
  );
};
const Period = styled(BaseText)({
  borderRadius: Platform.OS == "ios" ? 5 : 10,
  borderStyle: "solid",
  borderWidth: 0.5,
  borderColor: colors.warmGreyTwo,
  fontSize: 9,
  color: colors.warmGreyTwo,
  paddingLeft: 5,
  paddingRight: 5,
  fontFamily: "Roboto-Bold",
  marginTop: 4.5,
});
const SalePriceUnit = styled(BaseText)({
  fontSize: 13,
  color: colors.blackish2,
  marginLeft: 1.3,
});
const SalePriceContainer = styled.View({
  flexDirection: "row",
  alignItems: "baseline",
});
const OriginalPriceContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
});
const PriceTitle = styled(BaseText)({
  fontSize: 9,
  lineHeight: 12.5,
  color: colors.blackish,
  marginRight: 2.5,
});
const ImageContainer = styled.View({
  alignSelf: "center",
});
const BogoText = styled(BaseText)({
  fontSize: 13.5,
  fontFamily: "Roboto-Bold",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
});
const BogoIcon = styled.View({
  width: 30,
  height: 30,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: 0,
  top: 0,
  zIndex: 10,
  elevation: 1,
  backgroundColor: colors.brightRed,
  borderWidth: 1,
  borderColor: colors.trueWhite,
  borderRadius: 100,
});

const BadgeContainer = styled.View({
  flexDirection: "row",
  marginBottom: 2,
});
const Badge1Container = styled.View({
  alignItems: "center",
  height: Util.normalize(12),
  backgroundColor: colors.peacockBlue,
  justifyContent: "center",
  paddingLeft: 3,
  paddingRight: 3,
  width: Util.normalize(35),
});
const Badge1 = styled(BaseText)({
  fontSize: Util.normalize(7),
  color: colors.trueWhite,
});
const Badge2Container = styled.View({
  borderStyle: "solid",
  borderWidth: 0,
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.peacockBlue,
  borderLeftWidth: 0,
  height: Util.normalize(12),
  justifyContent: "center",
});
const Badge2 = styled(BaseText)({
  fontSize: Util.normalize(7),
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: colors.peacockBlue,
  paddingLeft: 3.5,
  paddingRight: 3.5,
});
const Container = styled.View({
  // backgroundColor: colors.black,
  // flexBasis: 0,

  // flex: 1,
  // padding: 10,
  paddingTop: 12.5,
  paddingBottom: 12.5,
  width: width * 0.398,

  // backgroundColor: "white",

  marginHorizontal: 5,
  justifyContent: "flex-start",
  alignItems: "flex-start",
});
const SalePrice = styled(BaseText)({
  fontSize: 24,
  letterSpacing: -0.72,
  color: colors.blackish2,
  fontFamily: "Roboto-Bold",
  lineHeight: 24,
});
const OriginalPrice = styled(BaseText)({
  fontSize: 9,
  lineHeight: 12.5,
  color: colors.blackish,
  textDecorationLine: "line-through",
  textDecorationStyle: "solid",
});
const Title = styled(BaseText)({
  marginTop: 4,
  fontSize: 14,
  lineHeight: 16.5,
  letterSpacing: -0.4,
  textAlign: "left",
  color: colors.blackish2,
  height: 16.5,
});
Title.defaultProps = {
  numberOfLines: 1,
};
export const styles = StyleSheet.create({
  cartItem: {
    flexBasis: 0,
    flex: 0.333,
    padding: 10,
    // backgroundColor: "white",
    marginHorizontal: 20,
  },
  itemData: {
    alignItems: "center",
  },
  quantity: {
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    color: "black",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
  containerStyle: {
    flex: 0.5,
    width: "100%",
    maxWidth: "50%",
    alignItems: "center",
  },
});

export default React.memo(FlyerItemColumn2);
