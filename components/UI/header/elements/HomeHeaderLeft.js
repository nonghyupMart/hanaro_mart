import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "../../../../navigation/RootNavigation";
import {
  BaseTouchable,
  BaseText,
  SCREEN_WIDTH,
} from "../../../../components/UI/BaseUI";
import _ from "lodash";
import * as Util from "../../../../util";
import { checkAuth } from "../../../../store/actions/auth";

const HomeHeaderLeft = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const pushCnt = useSelector((state) => state.auth.pushCnt);
  const wishCnt = useSelector((state) => state.auth.wishCnt);
  return (
    <BtnContainer>
      <Btn
        onPress={RootNavigation.toggleDrawer.bind(this)}
        style={{ paddingLeft: 23 }}
      >
        <IconImage source={require("../../../../assets/images/menu.png")} />
      </Btn>
      <Btn onPress={() => RootNavigation.navigate("Notification")} style={{}}>
        <IconImage source={require("../../../../assets/images/bell.png")} />
        {pushCnt > 0 && (
          <Image
            source={require("../../../../assets/images/N.png")}
            style={{ position: "absolute", top: 6, right: 6 }}
          />
        )}
      </Btn>
      <Btn
        onPress={async () => {
          if (await checkAuth(dispatch, isJoin)) {
            RootNavigation.navigate("WishProduct");
          }
        }}
        style={{}}
      >
        <IconImage
          source={require("../../../../assets/images/ic_heart_black.png")}
        />
        {wishCnt > 0 && (
          <Image
            source={require("../../../../assets/images/N.png")}
            style={{ position: "absolute", top: 6, right: 6 }}
          />
        )}
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
export const IconImage = styled.Image({
  resizeMode: "contain",
});
const Btn = styled.TouchableOpacity({
  padding: SCREEN_WIDTH > 320 ? 5 : 0,
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
export default HomeHeaderLeft;
