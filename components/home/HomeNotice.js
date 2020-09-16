import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { StyleConstants, screenWidth } from "@UI/BaseUI";
import * as RootNavigation from "@navigation/RootNavigation";
const HomeNotice = (props) => {
  return (
    <>
      {props.homeNotice && (
        <FlatList
          {...props}
          initialNumToRender={6}
          onEndReachedThreshold={0.5}
          onEndReached={props.loadMore}
          contentContainerStyle={{
            justifyContent: "space-between",
          }}
          numColumns={1}
          style={{
            backgroundColor: colors.trueWhite,
            width: screenWidth,
            flexGrow: 1,
          }}
          data={props.homeNotice.noticeList}
          keyExtractor={(item) => item.id + ""}
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
const Date = styled.Text({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const NoticeTitle = styled.Text({
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
