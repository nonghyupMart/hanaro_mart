import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { StyleConstants, screenWidth, BaseText } from "@UI/BaseUI";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import * as RootNavigation from "@navigation/RootNavigation";
import * as homeActions from "@actions/home";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const HomeNotice = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const homeNotice = useSelector((state) => state.home.homeNotice);
  useEffect(() => {
    props.setFetchHomeNotice(false);
    const fetchHomeNotice = dispatch(homeActions.fetchHomeNotice());
    Promise.all([fetchHomeNotice]).then((result) => {
      props.setFetchHomeNotice(true);
    });
  }, [dispatch]);

  const loadMore = () => {
    if (!isLoading && page + 1 <= homeNotice.finalPage) {
      dispatch(homeActions.fetchHomeNotice({ page: page + 1 }));
      setPage(page + 1);
    }
  };

  return (
    <>
      {homeNotice && (
        <ExtendedFlatList
          {...props}
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          contentContainerStyle={{
            justifyContent: "space-between",
          }}
          numColumns={1}
          style={{
            backgroundColor: colors.trueWhite,
            width: screenWidth,
            flexGrow: 1,
          }}
          data={homeNotice.noticeList}
          keyExtractor={(item) => {
            return item.notice_cd;
          }}
          renderItem={(itemData) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  RootNavigation.navigate("Notice", {
                    type: "H",
                    notice_cd: itemData.item.notice_cd,
                  });
                }}
              >
                <NoticeItemContainer>
                  <TitleContainer>
                    <Image
                      source={
                        itemData.item.today_yn == "Y"
                          ? require("@images/newicon640.png")
                          : require("@images/ic_message_24px.png")
                      }
                    />
                    <NoticeTitle
                      style={{
                        color:
                          itemData.item.today_yn == "Y"
                            ? colors.cerulean
                            : colors.greyishBrown,
                      }}
                    >
                      {itemData.item.title}
                    </NoticeTitle>
                  </TitleContainer>
                  <Date
                    style={{
                      color:
                        itemData.item.today_yn == "Y"
                          ? colors.cerulean
                          : colors.greyishBrown,
                    }}
                  >
                    {itemData.item.reg_date}
                  </Date>
                </NoticeItemContainer>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};
const TitleContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
});
const Date = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const NoticeTitle = styled(BaseText)({
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 7.5,
});
NoticeTitle.defaultProps = {
  numberOfLines: 1,
};
const NoticeItemContainer = styled.View({
  flexDirection: "row",

  paddingTop: 16,
  paddingBottom: 16,

  justifyContent: "space-between",
  paddingLeft: StyleConstants.defaultPadding,
  paddingRight: StyleConstants.defaultPadding,
  borderBottomWidth: 1,
  borderColor: colors.white,
});
export default HomeNotice;
