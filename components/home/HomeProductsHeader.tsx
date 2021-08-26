import React from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import * as RootNavigation from "../../navigation/RootNavigation";
import * as Util from "../../utils";
import { BaseText } from "../UI/BaseUI";

const HomeProductsHeader = () => {
  return (
    <RoundedContainer>
      <TitleContainer style={{ marginBottom: 0 }}>
        <Title>전체상품</Title>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => RootNavigation.navigate("Flyer")}
        >
          <MoreContainer>
            <MoreText>더보기</MoreText>
            <Image source={require("../../assets/images/path2.png")} />
          </MoreContainer>
        </TouchableOpacity>
      </TitleContainer>
    </RoundedContainer>
  );
};

export const MoreText = styled(BaseText)({
  fontSize: Util.normalize(9),
  color: colors.EMERALD,
  marginRight: 3,
});
export const MoreContainer = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 5,
  paddingBottom: 5,
});

export const Title = styled(BaseText)({
  fontSize: Util.normalize(15.5),
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: -0.38,
  fontFamily: "Roboto-Medium",
  flex: 1,
});
export const TitleContainer = styled.View({
  marginTop: 17.5,
  marginBottom: 8.5,
  flexDirection: "row",
  alignItems: "center",
});
const RoundedContainer = styled.View({
  flex: 1,
  width: "100%",
  paddingLeft: 24,
  paddingRight: 24,
  borderRadius: 10,
  overflow: "hidden",
});

export default React.memo(HomeProductsHeader);
