import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "../../../../navigation/RootNavigation";
import { BaseTouchable, BaseText } from "../../../../components/UI/BaseUI";
import _ from "lodash";
import * as Util from "../../../../util";

let isInit = false;
const LogoTitle = (props) => {
  if (!isInit && !props.route.state) {
    // console.log("home init 화면 ");
    isInit = true;
  } else if (props.route.state && props.route.state.index == 0) {
    // console.log("home 화면 ");
    isInit = false;
  }
  // console.log(props.route.state && props.route.state.index);
  // console.log(props.navigator.route);
  const userStore = useSelector((state) => state.auth.userStore);
  return (
    <Container onPress={() => RootNavigation.navigate("Home")}>
      <Image
        source={require("../../../../assets/images/HANAlogo.png")}
        style={{
          width: Util.normalize(100),
          // height: Util.normalize(21),
          // aspectRatio: 1 / 0.194,
          resizeMode: "contain",
        }}
      />
      {userStore && userStore.storeInfo && !_.isEmpty(userStore) && (
        <BranchName>{userStore.storeInfo.store_nm}</BranchName>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity({
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const BranchName = styled(BaseText)({
  fontSize: Util.normalize(12),
  fontFamily: "Roboto-Bold",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.nastyGreen,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default LogoTitle;
