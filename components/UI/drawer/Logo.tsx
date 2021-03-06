import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import colors from "../../../constants/Colors";
import { useAppSelector } from "../../../hooks";
import * as Util from "../../../utils";
import { BaseText, SCREEN_WIDTH } from "../BaseUI";

const Logo = (props) => {
  const userStore = useAppSelector((state) => state.auth.userStore);
  return (
    <LogoContainer>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../../assets/images/HANAlogo2.png")}
          style={{
            width: Util.normalize(120),
            resizeMode: "contain",
            marginLeft: SCREEN_WIDTH > 320 ? -5 : 0,
          }}
        />
        {userStore?.storeInfo && (
          <BranchName>{userStore.storeInfo.store_nm}</BranchName>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.navigation.closeDrawer.bind(this)}
        style={{ marginRight: 17 }}
      >
        <IconImage source={require("../../../assets/images/ic_close.png")} />
      </TouchableOpacity>
    </LogoContainer>
  );
};
const IconImage = styled.Image({
  width: Util.normalize(25),
  resizeMode: "contain",
});
const BranchName = styled(BaseText)({
  fontSize: Util.normalize(13),
  fontFamily: "Roboto-Bold",

  color: colors.NASTY_GREEN,
  marginTop: Util.normalize(4.5),
});
const LogoContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 24,
  marginTop: Util.normalize(40),
});

export default Logo;
