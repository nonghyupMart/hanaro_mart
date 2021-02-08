import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, View, Image } from "react-native";
import { BaseText } from "../../UI/BaseUI";
import Constants from "expo-constants";
import _ from "lodash";

const Logo = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  return (
    <LogoContainer>
      <View style={{ flex: 1 }}>
        <Image source={require("../../../assets/images/HANAlogo2.png")} />
        {userStore && userStore.storeInfo && !_.isEmpty(userStore) && (
          <BranchName>{userStore.storeInfo.store_nm}</BranchName>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.closeDrawer()}
        style={{ marginRight: 17 }}
      >
        <Image source={require("../../../assets/images/ic_close.png")} />
      </TouchableOpacity>
    </LogoContainer>
  );
};
const BranchName = styled(BaseText)({
  fontSize: 15,
  fontFamily: "CustomFont-Bold",
  lineHeight: 22.5,
  color: colors.nastyGreen,
  marginTop: 5.5,
});
const LogoContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 24,
  marginTop: 49,
});

export default Logo;
