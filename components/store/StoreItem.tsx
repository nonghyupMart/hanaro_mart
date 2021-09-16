import React from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as RootNavigation from "../../navigation/RootNavigation";
import { fetchUserStore } from "../../store/actions/auth";
import * as branchesActions from "../../store/actions/branches";
import * as CommonActions from "../../store/actions/common";
import { BaseText, BaseTouchable } from "../UI/BaseUI";

const StoreItem = ({ isMark, item, fetchBranches, fetchMarkedStores }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const _isMark = isMark;

  const onPress = () => {
    if (!_isMark) {
      return RootNavigation.navigate("StoreChangeDetail", { item: item });
    }
    dispatch(branchesActions.fetchBranch(item.store_cd)).then((data) => {
      dispatch(
        fetchUserStore(
          { user_cd: userInfo?.user_cd, store_cd: item.store_cd },
          data
        )
      ).then((data) => {
        if (data.result === "success") {
          (async () => {
            await dispatch(CommonActions.setDidTryStorePopup("Flyer"));
          })();
        }
      });
    });
  };
  const onDelete = () => {
    dispatch(
      branchesActions.deleteMarkedStore({
        user_cd: userInfo?.user_cd,
        store_cd: item.store_cd,
      })
    ).then((data) => {
      if (data.result === "success") {
        fetchMarkedStores(true);
      }
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        {_isMark && (
          <StarContainer>
            <Image source={require("../../assets/images/star2.png")} />
          </StarContainer>
        )}
        <TitleContainer>
          <Title>{item.store_nm}</Title>
          <Tel>Tel. {item.tel}</Tel>
        </TitleContainer>
        <IconContainer>
          <Image source={require("../../assets/images/location-pin.png")} />
          <BlueText>{item.dist}km</BlueText>
          {!_isMark && (
            <Image source={require("../../assets/images/circle-right.png")} />
          )}
          {_isMark && (
            <Btn onPress={onDelete}>
              <Image source={require("../../assets/images/close_x646.png")} />
            </Btn>
          )}
        </IconContainer>
      </Container>
    </TouchableOpacity>
  );
};

const Btn = styled(BaseTouchable)({
  justifyContent: "center",
  alignItems: "center",
});
const StarContainer = styled.View({
  height: "100%",
  paddingTop: 6,
  paddingRight: 4.4,
});
const Tel = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.APPLE_GREEN,
});
const BlueText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "right",
  color: colors.CERULEAN,
  marginLeft: 8,
  marginRight: 8,
  lineHeight: 17,
});
const IconContainer = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
});
const Container = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: 35.5,
  marginRight: 35.5,
  alignItems: "center",
  borderColor: colors.WHITE,
  borderBottomWidth: 1,
  paddingTop: 10,
  paddingBottom: 10,
  overflow: "hidden",
  flexGrow: 0,
});
const TitleContainer = styled.View({
  flexShrink: 1,
  flexGrow: 1,
});
const Title = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
});
Title.defaultProps = {
  numberOfLines: 1,
};

export default React.memo(StoreItem);
