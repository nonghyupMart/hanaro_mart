import React, { useState } from "react";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import * as Util from "../../utils";
import { BaseText, BaseTouchable } from "../UI/BaseUI";
import { Image } from "react-native";
import * as couponActions from "../../store/actions/coupon";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setAlert } from "../../store/actions/common";

const CouponRegistrationForm = (props) => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [serialNumber, setSerialNumber] = useState("");

  const onPress = () => {
    // if (serialNumber.length <= 0) return;
    dispatch(
      couponActions.registerCoupon({
        store_cd: userStore?.storeInfo.store_cd,
        user_cd: userInfo?.user_cd,
        barcode: serialNumber,
        coupon: props.coupon,
      })
    ).then((data) => {
      setSerialNumber("");
      if (data?.couponList.length > 0) {
        dispatch(
          setAlert({
            message: "쿠폰이 발급되었습니다.",
            onPressConfirm: () => {
              dispatch(setAlert(null));
            },
          })
        );
      }
    });
  };

  return (
    <Container style={[props.style]}>
      <Container1 style={{ paddingTop: 25 }}>
        <Text1>쿠폰번호 등록하기</Text1>
        <Input
          placeholder="쿠폰번호 입력"
          onChangeText={(number) => setSerialNumber(number)}
          value={serialNumber}
          onSubmitEditing={onPress}
        ></Input>
        <Button onPress={onPress}>
          <BtnText>등록</BtnText>
        </Button>
      </Container1>
      <Container1 style={{ marginTop: 9, marginBottom: 15 }}>
        <Image source={require("../../assets/images/i.png")} />
        <Desc>
          10~35자 일련번호 "-" 제외 마트에서 발행한 쿠폰번호만 입력해주세요.
        </Desc>
      </Container1>
    </Container>
  );
};

const Container = styled.View({
  alignSelf: "center",
  width: "100%",
});
const Container1 = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
});
const Desc = styled(BaseText)({
  fontSize: 10,
  color: colors.GREYISH_TWO,
  letterSpacing: -0.35,
  marginLeft: 2.5,
});

const Input = styled.TextInput({
  fontSize: 12,
  letterSpacing: -0.24,
  borderRadius: 7,
  borderWidth: 1.5,
  borderColor: "#dfdfdf",
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 5,
  paddingBottom: 5,
  flex: 1,
});

const Text1 = styled(BaseText)({
  fontSize: 15,
  textAlign: "center",
  color: colors.BLACK_TWO,
  fontFamily: "Roboto-Medium",
  marginRight: 4.5,
});

const BtnText = styled(BaseText)({
  fontSize: Util.normalize(13),
  letterSpacing: -0.34,
  textAlign: "center",
  color: colors.TRUE_WHITE,
  fontFamily: "Roboto-Bold",
});
const Button = styled(BaseTouchable)({
  borderWidth: 0,
  backgroundColor: colors.EMERALD,
  borderRadius: 30,
  paddingLeft: 6,
  paddingRight: 6,
  marginRight: 8,
  justifyContent: "center",
  alignItems: "center",
  height: Util.normalize(25),
  minWidth: Util.normalize(42),
  marginLeft: 6,
});

export default CouponRegistrationForm;
