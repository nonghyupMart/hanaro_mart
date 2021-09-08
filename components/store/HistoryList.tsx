import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SET_STORE_MARK } from "../../store/actions/actionTypes";
import * as branchesActions from "../../store/actions/branches";
import {
  BaseText, SCREEN_WIDTH,
  StyleConstants
} from "../UI/BaseUI";
import StoreItem from "./StoreItem";

const HistoryList = (props) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const storeMark = useAppSelector((state) => state.branches.storeMark);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);
  // useEffect(() => {
  //   fetchMarkedStores();
  // }, [isVisible]);

  const fetchMarkedStores = (isDel = false) => {
    if (!isDel && (!isVisible || !_.isEmpty(storeMark))) return;
    let query = {
      user_cd: userInfo?.user_cd,
    };
    if (props.location) {
      query.lat = props.location.coords.latitude;
      query.lng = props.location.coords.longitude;
    }
    dispatch(branchesActions.fetchStoreMark(query));
  };
  useEffect(() => {
    return () => {
      dispatch({ type: SET_STORE_MARK, storeMark: null });
    };
  }, []);

  return (
    <>
      <Container onPress={setIsVisible.bind(this, !isVisible)}>
        <TextContainer>
          <TextContainer2>
            <Image source={require("../../assets/images/ic_star_24px.png")} />
            <Text1>회원님이 설정하셨던 매장</Text1>
          </TextContainer2>
          {!isVisible && (
            <Image source={require("../../assets/images/cross0101.png")} />
          )}
          {isVisible && (
            <Image source={require("../../assets/images/cross0102.png")} />
          )}
        </TextContainer>
      </Container>
      <Line />
      {storeMark && isVisible && (
        <FlatList
          listKey="mark"
          style={{ width: "100%", flexGrow: 1, marginBottom: 10 }}
          data={storeMark.storeList}
          keyExtractor={(item, index) => "mark:" + item.store_cd}
          renderItem={(itemData) => (
            <StoreItem
              item={itemData.item}
              isMark={true}
              fetchMarkedStores={fetchMarkedStores}
              fetchBranches={props.fetchBranches}
            />
          )}
        />
      )}
    </>
  );
};
const Text1 = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.WHITE,
  marginLeft: 5.4,
});
const Line = styled.View({
  height: 1,
  width: SCREEN_WIDTH - 18 - 18,
  margin: 12.5,
  marginLeft: StyleConstants.defaultPadding,
  marginRight: StyleConstants.defaultPadding,
  backgroundColor: colors.WHITE,
});
const Container = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })({
  backgroundColor: colors.CERULEAN,
  justifyContent: "center",
  alignItems: "center",
  height: 40,
  flex: 1,
  marginLeft: StyleConstants.defaultPadding,
  marginRight: StyleConstants.defaultPadding,
  borderRadius: 20,
  marginTop: 15,
});
const TextContainer2 = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  flex: 1,
  marginLeft: 12,
});
const TextContainer = styled.View({
  flexDirection: "row",
  //   alignItems: "flex-start",
  justifyContent: "space-between",
  paddingRight: 13.5,
});
export default React.memo(HistoryList);
