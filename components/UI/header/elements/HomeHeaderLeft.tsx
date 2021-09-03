import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import colors from "../../../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import * as RootNavigation from "../../../../navigation/RootNavigation";
import { checkAuth } from "../../../../store/actions/auth";
import { BaseText, SCREEN_WIDTH } from "../../BaseUI";

const HomeHeaderLeft = () => {
  const dispatch = useAppDispatch();
  const isJoined = useAppSelector((state) => state.auth.isJoined);
  const pushCnt = useAppSelector((state) => state.auth.pushCnt);
  const wishCnt = useAppSelector((state) => state.auth.wishCnt);
  return (
    <BtnContainer>
      <Btn
        onPress={RootNavigation.toggleDrawer.bind(this)}
        style={{ paddingLeft: 5 }}
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
          if (await checkAuth(dispatch, isJoined)) {
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
    </BtnContainer>
  );
};
export const IconImage = styled.Image({
  resizeMode: "contain",
});
const Btn = styled.TouchableOpacity({
  padding: SCREEN_WIDTH > 320 ? (SCREEN_WIDTH > 360 ? 5 : 3) : 0,
});
const BtnContainer = styled.View({
  flexDirection: "row",
});
const BranchName = styled(BaseText)({
  fontSize: 15,
  fontFamily: "Roboto-Bold",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.APPLE_GREEN,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default HomeHeaderLeft;
