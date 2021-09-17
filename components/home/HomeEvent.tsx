import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import {
  useAppDispatch,
  useAppSelector,
  useEffectAllDepsChange,
} from "../../hooks";
import * as eventActions from "../../store/actions/event";
import * as Util from "../../utils";
import { BaseText, SCREEN_WIDTH } from "../UI/BaseUI";
import Carousel from "../UI/Carousel";
import BannerItem from "./homeEvent/BannerItem";
import HomeEventHeader from "./homeEvent/HomeEventHeader";
import ShareBanner from "./homeEvent/ShareBanner";

const HomeEvent = () => {
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => state.event.event);
  const eventTitle1 = "하나로마트 앱 지인추천하기";
  const [evTitle, setEvTitle] = useState(eventTitle1);
  const [evDate, setEvDate] = useState("");
  const userStore = useAppSelector((state) => state.auth.userStore);
  const isFocused = useIsFocused();

  useEffectAllDepsChange(() => {
    if (!isFocused || _.isEmpty(userStore)) return;
    setEvDate("");
    setEvTitle(eventTitle1);
    let query = {
      store_cd: userStore?.storeInfo.store_cd,
      page: 1,
    };
    dispatch(eventActions.fetchEvent(query, true));
  }, [isFocused, userStore]);

  const onAnimateNextPage = (index) => {
    if (index === 0) {
      setEvDate("");
      setEvTitle(eventTitle1);
      return;
    }
    if (
      event &&
      event.eventList &&
      _.size(event.eventList) > 0 &&
      event.eventList[index - 1]
    ) {
      setEvTitle(event.eventList[index - 1].title);
      setEvDate(
        `헹사기간 : ${event.eventList[index - 1].start_date} ~ ${
          event.eventList[index - 1].end_date
        }`
      );
    }
  };
  if (!event?.eventList) return <></>;
  // console.log("HomeEvent - " + Date.now());
  return (
    <RoundedContainer>
      <HomeEventHeader listSize={event.eventList.length} />
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
        pageInfoTextStyle={{ color: colors.TRUE_WHITE, fontSize: 12 }}
        pageInfoTextSeparator="/"
      >
        <ShareBanner key="shareBanner" />
        {event.eventList.map((item, index) => {
          return <BannerItem item={item} key={index.toString()} />;
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

export default HomeEvent;
