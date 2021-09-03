import _ from "lodash";
import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import colors from "../../../../constants/Colors";
import { useAppSelector } from "../../../../hooks";
import * as RootNavigation from "../../../../navigation/RootNavigation";
import * as Util from "../../../../utils";
import { BaseText } from "../../BaseUI";

const LogoTitle = () => {
  const userStore = useAppSelector((state) => state.auth.userStore);
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
  color: colors.NASTY_GREEN,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default LogoTitle;
