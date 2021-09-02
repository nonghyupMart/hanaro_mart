import React from "react";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import * as Util from "../../utils";
import { BaseText, BaseTouchable } from "../UI/BaseUI";

const CouponButton = ({ status, onPress }) => {
  return (
    <>
      {status === "00" && (
        <Button
          onPress={onPress}
          style={{ backgroundColor: colors.TRUE_WHITE }}
        >
          <ButtonText>쿠폰 다운로드</ButtonText>
          <Icon
            source={require("../../assets/images/ic_file_download_1.png")}
          />
        </Button>
      )}
      {status === "10" && (
        <Button
          onPress={onPress}
          style={{ backgroundColor: colors.EMERALD, borderWidth: 0 }}
        >
          <ButtonText style={{ color: colors.TRUE_WHITE }}>
            쿠폰 사용하기
          </ButtonText>
          <Icon
            source={require("../../assets/images/ic_file_download_2.png")}
          />
        </Button>
      )}
      {status === "20" && (
        <Button
          style={{ backgroundColor: colors.GREYISH_TWO, borderWidth: 0 }}
          activeOpacity={1}
        >
          <ButtonText style={{ color: colors.TRUE_WHITE, marginRight: 0 }}>
            쿠폰 사용완료
          </ButtonText>
        </Button>
      )}
      {status === "30" && (
        <Button
          style={{ backgroundColor: colors.GREYISH_TWO, borderWidth: 0 }}
          activeOpacity={1}
        >
          <ButtonText style={{ color: colors.TRUE_WHITE, marginRight: 0 }}>
            쿠폰 소진완료
          </ButtonText>
        </Button>
      )}
    </>
  );
};

const Icon = styled.Image({});
const ButtonText = styled(BaseText)({
  fontSize: 12.5,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.EMERALD,
  marginRight: 1,
  fontFamily: "Roboto-Medium",
});
const Button = styled(BaseTouchable)({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.TRUE_WHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.EMERALD,
  minHeight: Util.normalize(24),
  aspectRatio: 100 / 19.86,
});

export default CouponButton;
