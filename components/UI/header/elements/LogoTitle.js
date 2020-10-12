import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "@navigation/RootNavigation";
import { BaseTouchable, BaseText } from "@UI/BaseUI";
import _ from "lodash";

const LogoTitle = (props, { navigation }) => {
  const userStore = useSelector((state) => state.auth.userStore);
  return (
    <TouchableOpacity onPress={() => RootNavigation.navigate("Home")}>
      <Container>
        <Image source={require("@images/hanalogo_off.png")} />
        {userStore && userStore.storeInfo && !_.isEmpty(userStore) && (
          <BranchName>{userStore.storeInfo.store_nm}</BranchName>
        )}
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View({
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const BranchName = styled(BaseText)({
  fontSize: 15,
  fontWeight: "bold",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default LogoTitle;
