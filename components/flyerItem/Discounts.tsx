import React, { PureComponent } from "react";
import styled from "styled-components/native";
import {
  View,
} from "react-native";
import { BaseImage, BaseText } from "../UI/BaseUI";
import colors from "../../constants/Colors";
import * as Util from "../../utils";
import moment from "moment";
import _ from "lodash";

const Discounts = ({ item }) => {
  return (
    <>
      <View style={{ height: 10 }} />
      {item.card_price > 0 && (
        <BadgeContainer>
          <Badge1Container>
            <Badge1>카드할인</Badge1>
          </Badge1Container>
          {!_.isEmpty(item.card_sdate) && (
            <Badge2Container>
              <Badge2>
                {moment(item.card_sdate).format("MM.DD")}~
                {moment(item.card_edate).format("MM.DD")}
              </Badge2>
            </Badge2Container>
          )}
        </BadgeContainer>
      )}
      {item.coupon_price > 0 && (
        <BadgeContainer>
          <Badge1Container style={{ backgroundColor: colors.EMERALD }}>
            <Badge1>쿠폰할인</Badge1>
          </Badge1Container>
          {!_.isEmpty(item.coupon_sdate) && (
            <Badge2Container style={{ borderColor: colors.EMERALD }}>
              <Badge2 style={{ color: colors.EMERALD }}>
                {moment(item.coupon_sdate).format("MM.DD")}~
                {moment(item.coupon_edate).format("MM.DD")}
              </Badge2>
            </Badge2Container>
          )}
        </BadgeContainer>
      )}
      {item.members_price > 0 && (
        <BadgeContainer>
          <Badge1Container style={{ backgroundColor: colors.TEALISH }}>
            <Badge1>NH멤버스</Badge1>
          </Badge1Container>
          {!_.isEmpty(item.members_sdate) && (
            <Badge2Container style={{ borderColor: colors.TEALISH }}>
              <Badge2 style={{ color: colors.TEALISH }}>
                {moment(item.members_sdate).format("MM.DD")}~
                {moment(item.members_edate).format("MM.DD")}
              </Badge2>
            </Badge2Container>
          )}
        </BadgeContainer>
      )}
      {!_.isEmpty(item.bogo_info?.trim()) && (
        <BadgeContainer>
          <Badge1Container style={{ backgroundColor: colors.CHERRY }}>
            <Badge1>추가정보</Badge1>
          </Badge1Container>

          <Badge2Container style={{ borderColor: colors.CHERRY }}>
            <Badge2 style={{ color: colors.CHERRY }} numberOfLines={1}>
              {item.bogo_info}
            </Badge2>
          </Badge2Container>
        </BadgeContainer>
      )}
    </>
  );
};

const BadgeContainer = styled.View({
  flexDirection: "row",
  marginBottom: 2,
});
const Badge1Container = styled.View({
  alignItems: "center",
  height: Util.normalize(12),
  backgroundColor: colors.PEACOCK_BLUE,
  justifyContent: "center",
  paddingLeft: 3,
  paddingRight: 3,
  width: 43,
});
const Badge1 = styled(BaseText)({
  fontSize: 9,
  color: colors.TRUE_WHITE,
});
const Badge2Container = styled.View({
  borderStyle: "solid",
  borderWidth: 0,
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.PEACOCK_BLUE,
  borderLeftWidth: 0,
  height: Util.normalize(12),
  justifyContent: "center",
});
const Badge2 = styled(BaseText)({
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: colors.PEACOCK_BLUE,
  paddingLeft: 3.5,
  paddingRight: 3.5,
  maxWidth: Util.normalize(95),
});

export default React.memo(Discounts);
