import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import * as AgreementScreen from "@screens/join/AgreementScreen";

import {
  BlueButton,
  BlueButtonText,
  BaseText,
  BaseTextInput,
} from "@UI/BaseUI";
import { setAlert } from "@actions/common";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "react-native-elements";

const ApplyBox = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const checkItem = props.checkItem;
  const setCheckItem = props.setCheckItem;
  const reg_num = props.reg_num;
  const setReg_num = props.setReg_num;

  const onPress = () => {
    props.onApply();
  };
  const onFocus = () => {
    if (props.scrollRef)
      setTimeout(() => {
        props.scrollRef.scrollToEnd();
      }, 800);
  };
  const handleChecked = (checkBox) => {
    let cks = { ...checkItem };
    cks.isChecked = !cks.isChecked;
    if (cks.child) {
      cks.child.map((el) => {
        cks.isChecked ? (el.isChecked = true) : (el.isChecked = false);
      });
    }
    setCheckItem(() => cks);
  };
  const setChecked = (checkBox, child) => {
    let cks = { ...checkItem };
    cks.child[child.id].isChecked = !cks.child[child.id].isChecked;

    if (cks.child[child.id].isChecked == false) {
      cks.isChecked = false;
    } else {
      let allTrue = cks.child.every((el) => el.isChecked);
      if (allTrue) cks.isChecked = true;
    }
    setCheckItem(() => cks);
  };

  return (
    <>
      {props.eventDetail.entry.status == "10" && (
        <Container>
          <Title>개인정보 수집동의</Title>
          {userInfo && userInfo.marketing_agree == "N" && (
            <>
              <AgreementScreen.TitleArea>
                <AgreementScreen.TitleContainer
                  style={{ marginTop: 13, marginBottom: 5 }}
                >
                  <AgreementScreen.CheckButton
                    value={checkItem}
                    onPress={() => handleChecked(checkItem)}
                    isRequired={true}
                  />
                  <AgreementScreen.TextView
                    style={{
                      fontWeight: "normal",
                      fontSize: 14,
                      flexGrow: 1,
                      flexShrink: 0,
                      color: props.item.isRequired
                        ? colors.cerulean
                        : colors.viridian,
                      fontFamily: "CustomFont-Bold",
                    }}
                  >
                    {props.item.isRequired ? "[필수] " : "[선택] "}
                  </AgreementScreen.TextView>
                  <AgreementScreen.BoldText
                    style={{ textAlign: "left", width: "100%" }}
                  >
                    행사안내 및 이벤트 수신 동의
                  </AgreementScreen.BoldText>
                </AgreementScreen.TitleContainer>
                {/* <CheckBox
            containerStyle={[AgreementScreen.styles.checkbox]}
            checked={props.item.isOpen}
            onPress={() => handleOpen(props.item)}
            checkedIcon={<Image source={require("@images/close_m.png")} />}
            uncheckedIcon={<Image source={require("@images/close_p.png")} />}
            style={{ opacity: 0 }}
          /> */}
              </AgreementScreen.TitleArea>
              <AgreementScreen.Desc>
                <AgreementScreen.DescTextLine>
                  <AgreementScreen.CircleCheckButton
                    checked={checkItem.child[0].isChecked}
                    onPress={() => setChecked(checkItem, checkItem.child[0])}
                  />
                  <AgreementScreen.DescText1>
                    개인정보의 선택적 수집·이용 동의
                  </AgreementScreen.DescText1>
                </AgreementScreen.DescTextLine>
                <AgreementScreen.DescTextLine>
                  <AgreementScreen.CircleCheckButton
                    checked={checkItem.child[1].isChecked}
                    onPress={() => setChecked(checkItem, checkItem.child[1])}
                  />
                  <AgreementScreen.DescText1>
                    개인정보의 선택적 제공동의
                  </AgreementScreen.DescText1>
                </AgreementScreen.DescTextLine>
                <AgreementScreen.GrayDesc>
                  이벤트 수신동의를 하시면 할인쿠폰 등에 대한 정보를 받으실 수
                  있습니다.
                </AgreementScreen.GrayDesc>
              </AgreementScreen.Desc>
              <AgreementScreen.ExtraBox style={{ marginBottom: 10 }}>
                <AgreementScreen.SmallTextBold>
                  이용목적
                </AgreementScreen.SmallTextBold>
                <AgreementScreen.SmallText>
                  상품 및 서비스 안내 또는 홍보(SMS, PUSH)
                  회원의 혜택과 서비스개선을 위한 통계분석 및 연구조사
                </AgreementScreen.SmallText>
                <AgreementScreen.SmallTextBold>
                  수집항목
                </AgreementScreen.SmallTextBold>
                <AgreementScreen.SmallText>
                  휴대폰번호, 성명, 생년월일, 성별, 마케팅수신 동의여부
                </AgreementScreen.SmallText>
                <AgreementScreen.SmallTextBold>
                  제공받는자
                </AgreementScreen.SmallTextBold>
                <AgreementScreen.SmallText
                  style={AgreementScreen.styles.justUnderline}
                >
                  농협유통, 농협대전유통, 농협부산경남유통, 농협충북유통,
                  농업협동조합법에 의한 중앙회의 회원조합
                </AgreementScreen.SmallText>
                <AgreementScreen.SmallTextBold>
                  제공목적
                </AgreementScreen.SmallTextBold>
                <AgreementScreen.SmallText
                  style={AgreementScreen.styles.justUnderline}
                >
                  상품 및 서비스 안내 또는 홍보(SMS, PUSH)
                  회원의 혜택과 서비스개선을 위한 통계분석 및 연구조사
                </AgreementScreen.SmallText>
                <AgreementScreen.SmallTextBold>
                  제공항목
                </AgreementScreen.SmallTextBold>
                <AgreementScreen.SmallText>
                  휴대폰번호, 성명, 생년월일, 성별, 마케팅수신 동의여부
                </AgreementScreen.SmallText>
                <AgreementScreen.SmallTextBold>
                  보유 및 이용기간
                </AgreementScreen.SmallTextBold>
                <AgreementScreen.SmallText
                  style={AgreementScreen.styles.justUnderline}
                >
                  회원탈퇴 또는 동의철회 시
                </AgreementScreen.SmallText>
                <AgreementScreen.WarnText>
                  {`※ 회원조합은 하나로마트앱을 통해 서비스를 제공하는 농협으로 선호매장관리에서 확인이 가능합니다.`}
                </AgreementScreen.WarnText>
                <AgreementScreen.WarnText>
                  ※ 고객님께서는 선택항목에 대한 동의를 거부할 권리가 있습니다.
                   단,
                  선택항목 거부 시에는 상기 이용목적에 명시된 서비스는 받으실 수 없습니다.
                </AgreementScreen.WarnText>
              </AgreementScreen.ExtraBox>
            </>
          )}
          {userInfo && !userInfo.user_age && (
            <InputText
              placeholder="생년원일+성별(7자리-8501011)"
              keyboardType="numeric"
              maxLength={7}
              value={reg_num}
              onChangeText={(text) => setReg_num(text)}
              editable={props.eventDetail.entry.status === "10"}
              onFocus={onFocus}
            />
          )}
        </Container>
      )}
      {props.isShowApplyButton && props.eventDetail.entry.status === "10" && (
        <BlueButton onPress={onPress} style={{ marginTop: 40 }}>
          <Image source={require("@images/forward.png")} />
          <BlueButtonText>응모하기</BlueButtonText>
        </BlueButton>
      )}
      {props.isShowApplyButton && props.eventDetail.entry.status === "20" && (
        <GrayButton style={{ marginTop: 40 }}>
          <Image source={require("@images/forward.png")} />
          <BlueButtonText>응모완료</BlueButtonText>
        </GrayButton>
      )}
    </>
  );
};
const GrayButton = styled(BlueButton).attrs({ activeOpacity: 0 })({
  backgroundColor: colors.greyishThree,
});
ApplyBox.defaultProps = {
  item: {
    id: 0,
    isRequired: true,
    isChecked: false,
  },
};

const InputText = styled(BaseTextInput)({
  borderRadius: 16,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.greyishThree,
  marginLeft: 34,
  marginRight: 34,
  minHeight: 34,
  padding: 0,
  height: 35,
  textAlign: "center",
});

const TextView2 = styled(AgreementScreen.TextView)({
  flexGrow: 1,
  marginRight: 22,
  justifyContent: "flex-start",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});

const Title = styled(BaseText)({
  flex: 1,
  fontSize: 15,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
  backgroundColor: colors.greyishBrown,
  width: "100%",
  padding: 4,
});
const Container = styled.View({
  marginTop: 42,
  flex: 1,
  width: "100%",
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.greyishThree,
  borderRadius: 12,
  overflow: "hidden",
  paddingBottom: 28,
});

export default ApplyBox;
