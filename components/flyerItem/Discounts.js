import React, { PureComponent } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { BaseImage, BaseText } from "../../components/UI/BaseUI";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

import * as Util from "../../util";
import moment from "moment";
import _ from "lodash";

class Discounts extends PureComponent {
  render() {
    const props = this.props;
    return (
      <>
        <View style={{ height: 10 }} />
        {props.item.card_price != 0 && (
          <BadgeContainer>
            <Badge1Container>
              <Badge1>카드할인</Badge1>
            </Badge1Container>
            {!_.isEmpty(props.item.card_sdate) && (
              <Badge2Container>
                <Badge2>
                  {moment(props.item.card_sdate).format("MM.DD")}~
                  {moment(props.item.card_edate).format("MM.DD")}
                </Badge2>
              </Badge2Container>
            )}
          </BadgeContainer>
        )}
        {props.item.coupon_price != 0 && (
          <BadgeContainer>
            <Badge1Container style={{ backgroundColor: colors.emerald }}>
              <Badge1>쿠폰할인</Badge1>
            </Badge1Container>
            {!_.isEmpty(props.item.coupon_sdate) && (
              <Badge2Container style={{ borderColor: colors.emerald }}>
                <Badge2 style={{ color: colors.emerald }}>
                  {moment(props.item.coupon_sdate).format("MM.DD")}~
                  {moment(props.item.coupon_edate).format("MM.DD")}
                </Badge2>
              </Badge2Container>
            )}
          </BadgeContainer>
        )}
        {props.item.members_price != 0 && (
          <BadgeContainer>
            <Badge1Container style={{ backgroundColor: colors.tealish }}>
              <Badge1>NH멤버스</Badge1>
            </Badge1Container>
            {!_.isEmpty(props.item.members_sdate) && (
              <Badge2Container style={{ borderColor: colors.tealish }}>
                <Badge2 style={{ color: colors.tealish }}>
                  {moment(props.item.members_sdate).format("MM.DD")}~
                  {moment(props.item.members_edate).format("MM.DD")}
                </Badge2>
              </Badge2Container>
            )}
          </BadgeContainer>
        )}
      </>
    );
  }
}

const BadgeContainer = styled.View({
  flexDirection: "row",
  marginBottom: 2,
});
const Badge1Container = styled.View({
  alignItems: "center",
  height: Util.normalize(12),
  backgroundColor: colors.peacockBlue,
  justifyContent: "center",
  paddingLeft: 3,
  paddingRight: 3,
  width: Util.normalize(35),
});
const Badge1 = styled(BaseText)({
  fontSize: Util.normalize(7),
  color: colors.trueWhite,
});
const Badge2Container = styled.View({
  borderStyle: "solid",
  borderWidth: 0,
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.peacockBlue,
  borderLeftWidth: 0,
  height: Util.normalize(12),
  justifyContent: "center",
});
const Badge2 = styled(BaseText)({
  fontSize: Util.normalize(7),
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: colors.peacockBlue,
  paddingLeft: 3.5,
  paddingRight: 3.5,
});

export default Discounts;
