import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, Image } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "@actions/event";
import { BackButton, TextTitle } from "@UI/header";
import { IMAGE_URL } from "@constants/settings";

import {
  DetailContainer,
  BaseImage,
  ScaledImage,
  screenWidth,
  BaseButtonContainer,
} from "@UI/BaseUI";

import A from "@screens/home/EventDetail/A";
import B from "@screens/home/EventDetail/B";
import C from "@screens/home/EventDetail/C";
const EventDetailScreen = (props, { navigation }) => {
  console.log(props);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const eventDetail = useSelector((state) => state.event.eventDetail);
  const params = props.route.params;

  useEffect(() => {
    setIsLoading(true);

    const requestEvent = dispatch(
      eventActions.fetchEventDetail({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
      })
    );

    Promise.all([requestEvent]).then(() => {
      setIsLoading(false);
    });

    // Image.getSize(IMAGE_URL + eventDetail.title_img, (width, height) => {
    //   // calculate image width and height
    //   const screenWidth = Dimensions.get("window").width;
    //   const scaleFactor = width / screenWidth;
    //   const imageHeight = height / scaleFactor;
    //   setImageHeight(imageHeight);
    //   console.warn("imageHeight", imageHeight);
    // });
  }, []);
  // let imageSize;
  // await
  // console.warn(imageSize);
  return (
    <BaseScreen
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {eventDetail && (
        <DetailContainer
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: 0,
          }}
        >
          <ScaledImage
            source={eventDetail.detail_img}
            style={{}}
            width={screenWidth}
          />
          {eventDetail.gbn == "A" && <A {...props} />}
          {eventDetail.gbn == "B" && <B {...props} />}
          {eventDetail.gbn == "C" && <C {...props} />}
        </DetailContainer>
      )}
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "이벤트",

    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default EventDetailScreen;
