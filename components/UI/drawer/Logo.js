import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, View, Image } from "react-native";
import { BaseText, SCREEN_WIDTH } from "../../UI/BaseUI";
import _ from "lodash";
import * as Util from "../../../util";

const Logo = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
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
        {userStore && userStore.storeInfo && !_.isEmpty(userStore) && (
          <BranchName>{userStore.storeInfo.store_nm}</BranchName>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.closeDrawer()}
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
  fontFamily: "CustomFont-Bold",

  color: colors.nastyGreen,
  marginTop: Util.normalize(4.5),
});
const LogoContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 24,
  marginTop: Util.normalize(40),
});

export default Logo;
