import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CATEGORY } from "../../constants";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as RootNavigation from "../../navigation/RootNavigation";
import * as actionTypes from "../../store/actions/actionTypes";
import * as CommonActions from "../../store/actions/common";
import * as eventActions from "../../store/actions/event";
import * as Util from "../../utils";
import { BaseImage, BaseText, SCREEN_WIDTH } from "../UI/BaseUI";
import Carousel from "../UI/Carousel";
import {
  MoreContainer,
  MoreText,
  Title,
  TitleContainer,
} from "./HomeProductsHeader";

const HomeEvent = (props: any) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const event = useAppSelector((state) => state.event.event);
  const eventTitle1 = "하나로마트 앱 지인추천하기";
  const [evTitle, setEvTitle] = useState(eventTitle1);
  const [evDate, setEvDate] = useState("");
  const userStore = useAppSelector((state) => state.auth.userStore);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused || _.isEmpty(userStore)) return;

    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: 1,
    };
    dispatch(eventActions.fetchEvent(query, true));
  }, [isFocused, userStore]);

  const onAnimateNextPage = (index) => {
    if (index === 0) {
      setEvDate(null);
      return setEvTitle(eventTitle1);
    }
    if (event && event.eventList && _.size(event.eventList) > 0) {
      setEvTitle(event.eventList[index - 1].title);
      setEvDate(
        `헹사기간 : ${event.eventList[index - 1].start_date} ~ ${
          event.eventList[index - 1].end_date
        }`
      );
    }
  };
  if (!event || !event.eventList) return <></>;
  return (
    <RoundedContainer>
      <TitleContainer>
        {_.size(event.eventList) > 0 && (
          <>
            <Title style={{ fontSize: Util.normalize(9), lineHeight: null }}>
              {" "}
            </Title>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => RootNavigation.navigate("Event")}
            >
              <MoreContainer>
                <MoreText>더보기</MoreText>
                <Image source={require("../../assets/images/path2.png")} />
              </MoreContainer>
            </TouchableOpacity>
          </>
        )}
      </TitleContainer>
      <Carousel
        onAnimateNextPage={onAnimateNextPage}
        delay={3000}
        style={{
          // height: (SCREEN_WIDTH - 48) * 0.439,
          width: SCREEN_WIDTH - 48,
          borderRadius: 10,
          overflow: "hidden",
          aspectRatio: 1 / 0.34756097560976,
        }}
        arrows={_.size(event.eventList) > 0 ? true : false}
        arrowLeft={
          <Image source={require("../../assets/images/left_button2.png")} />
        }
        arrowRight={
          <Image source={require("../../assets/images/right_button2.png")} />
        }
        arrowStyle={{
          paddingLeft: 5.5,
          paddingRight: 5.5,
        }}
        autoplay
        pageInfo={false}
        // bullets={true}
        pageInfoBottomContainerStyle={{
          left: null,
          right: 8.5,
          bottom: 5.5,
          width: 35,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 20,
          height: 15,
          paddingTop: 0,
          paddingBottom: 4,
        }}
        pageInfoBackgroundColor={"transparent"}
        pageInfoTextStyle={{ color: colors.trueWhite, fontSize: 12 }}
        pageInfoTextSeparator="/"
      >
        <TouchableOpacity
          key="inviteFriends"
          activeOpacity={0.8}
          onPress={Util.sendShareLink.bind(
            this,
            userInfo ? userInfo.recommend : null
          )}
        >
          <Image
            source={require("../../assets/images/event_banner.png")}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor:
                Platform.OS === "android" ? colors.WHITE : "transparent",
            }}
            defaultSource={require("../../assets/images/b_img500.png")}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {event.eventList.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.event_cd}
              onPress={async () => {
                await dispatch(
                  CommonActions.setLink({
                    category: CATEGORY["E"],
                    link_code: item.event_cd,
                  })
                );
                await RootNavigation.navigate("Event", {
                  event_cd: item.event_cd,
                });
              }}
              style={{
                aspectRatio: 1 / 0.34756097560976,
                width: SCREEN_WIDTH - 48,
              }}
            >
              <BannerItem item={item} />
            </TouchableOpacity>
          );
        })}
      </Carousel>
      <EventTitle>{evTitle}</EventTitle>
      <EventDate>{evDate}</EventDate>
    </RoundedContainer>
  );
};
const EventDate = styled(BaseText)({
  fontSize: Util.normalize(10),
});
const EventTitle = styled(BaseText)({
  marginTop: 8.5,
  fontSize: Util.normalize(13),
  lineHeight: 22.5,
  fontFamily: "Roboto-Medium",
});

const RoundedContainer = styled.View({
  flex: 1,
  width: "100%",
  paddingLeft: 24,
  paddingRight: 24,
  borderRadius: 10,
  overflow: "hidden",
});
const BannerItem = (props) => {
  return (
    <BaseImage
      style={{
        aspectRatio: 1 / 0.34756097560976,
        width: SCREEN_WIDTH - 48,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor:
          Platform.OS === "android" ? colors.WHITE : "transparent",
      }}
      resizeMode="cover"
      source={props.item.title_img}
      defaultSource={require("../../assets/images/b_img500.png")}
    />
  );
};

export default React.memo(HomeEvent);