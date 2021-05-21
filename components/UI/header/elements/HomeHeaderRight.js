import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "../../../../navigation/RootNavigation";
import { BaseTouchable, BaseText } from "../../../../components/UI/BaseUI";
import _ from "lodash";
import { IconImage } from "./HomeHeaderLeft";
import * as Util from "../../../../util";

const HomeHeaderRight = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  if (_.isEmpty(userStore)) return <></>;
  return (
    <BtnContainer>
      <Btn
        onPress={() => RootNavigation.navigate("SearchProduct")}
        style={{ paddingRight: 21 }}
      >
        <IconImage
          source={require("../../../../assets/images/search.png")}
          style={{ width: Util.normalize(77) }}
        />
      </Btn>
      {/* <Btn
        onPress={() => RootNavigation.navigate("Cart")}
        style={{ paddingRight: 10 }}
      >
        <MaterialCommunityIcons
          name="cart-outline"
          size={24}
          color={colors.pine}
        />
      </Btn> */}
    </BtnContainer>
  );
};
const Btn = styled.TouchableOpacity({
  padding: 6,
});
const BtnContainer = styled.View({
  flexDirection: "row",
});
const Container = styled.View({
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const BranchName = styled(BaseText)({
  fontSize: 15,
  fontFamily: "Roboto-Bold",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default HomeHeaderRight;
