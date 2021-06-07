import React from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { BaseText, BaseTouchable } from "../../components/UI/BaseUI";
import * as RootNavigation from "../../navigation/RootNavigation";
import * as branchesActions from "../../store/actions/branches";
import { setIsLoading } from "../../store/actions/common";
import { findLastKey } from "lodash";
import * as CommonActions from "../../store/actions/common";
import { setUserStore } from "../../store/actions/auth";

const StoreItem = ({isMark, item, fetchBranches, fetchMarkedStores}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const _isMark = isMark;

  const onPress = () => {
    dispatch(setIsLoading(true));
    if (!_isMark) {
      return RootNavigation.navigate("StoreChangeDetail", { item: item });
    }
    dispatch(branchesActions.fetchBranch(item.store_cd)).then((data) => {
      dispatch(
        setUserStore(
          { user_cd: userInfo.user_cd, store_cd: item.store_cd },
          data
        )
      ).then((data) => {
        if (data.result == "success") {
          (async () => {
            await dispatch(setIsLoading(false));
            await dispatch(CommonActions.setDidTryPopup("Flyer"));
          })();

          // Updates.reloadAsync();
        }
      });
    });
  };
  const onDelete = () => {
    dispatch(
      branchesActions.deleteMarkedStore({
        user_cd: userInfo.user_cd,
        store_cd: item.store_cd,
      })
    ).then((data) => {
      if (data.result == "success") {
        fetchMarkedStores(true);
        fetchBranches();
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
  color: colors.appleGreen,
});
const BlueText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.cerulean,
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
  borderColor: colors.white,
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
  color: colors.greyishBrown,
});
Title.defaultProps = {
  numberOfLines: 1,
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    color: "black",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default React.memo(StoreItem);
