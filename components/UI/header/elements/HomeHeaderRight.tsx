import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import colors from "../../../../constants/Colors";
import * as RootNavigation from "../../../../navigation/RootNavigation";
import * as Util from "../../../../utils";
import { BaseText } from "../../BaseUI";
import { IconImage } from "./HomeHeaderLeft";

const HomeHeaderRight = () => {
  const userStore = useSelector((state) => state.auth.userStore);
  if (_.isEmpty(userStore)) return <></>;
  return (
    <BtnContainer>
      <Btn
        onPress={() => RootNavigation.navigate("SearchProduct")}
        style={{ paddingRight: 0 }}
      >
        <IconImage
          source={require("../../../../assets/images/search.png")}
          style={{ width: Util.normalize(77) }}
        />
      </Btn>
    </BtnContainer>
  );
};
const Btn = styled.TouchableOpacity({
  padding: 6,
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
export default HomeHeaderRight;
