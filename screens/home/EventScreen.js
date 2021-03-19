import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "../../store/actions/event";
import * as CommonActions from "../../store/actions/common";
import { StyleConstants, SCREEN_WIDTH } from "../../components/UI/BaseUI";
import EventItem from "../../components/EventItem";
import { useIsFocused } from "@react-navigation/native";
import { BackButton, TextTitle } from "../../components/UI/header";
import _ from "lodash";
import { setIsLoading } from "../../store/actions/common";
import NoList from "../../components/UI/NoList";

// let isMoved = false;

const EventScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const params = props.route.params;

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const page = useRef(1);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const link = useSelector((state) => state.common.link);
  let event;
  if (routeName == "MyEvent") {
    //이벤트응모내역 일 경우..
    event = useSelector((state) => state.event.myEvent);
  } else {
    event = useSelector((state) => state.event.event);
  }

  useEffect(() => {
    if (link && link.category == routeName) {
      setTimeout(async () => {
        await moveToDetail(link.link_code);
        await dispatch(CommonActions.setLink(null));
      }, 0);
    }
  }, [link]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!_.isEmpty(userStore)) {
      page.current = 1;
      fetchEvent();
    }
  }, [isFocused, userStore]);

  const fetchEvent = (p = page.current) => {
    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: p,
    };
    if (routeName == "MyEvent") query.user_cd = userInfo.user_cd;
    dispatch(eventActions.fetchEvent(query));
  };
  const loadMore = () => {
    if (!isLoading && page.current + 1 <= event.finalPage) {
      page.current++;
      fetchEvent(page.current);
    }
  };

  const moveToDetail = async (event_cd) => {
    if (!userInfo.ci) return navigation.navigate("Empty");
    await navigation.navigate("EventDetail", { event_cd: event_cd });
  };
  const onPress = (item) => {
    moveToDetail(item.event_cd);
  };
  if (!event) return <></>;
  if (routeName == "MyEvent" && _.size(event.eventList) === 0)
    return (
      <NoList
        source={require("../../assets/images/megaphone.png")}
        text={"응모한 이벤트"}
        infoText="응모한 이벤트 내역이 없습니다."
      />
    );
  if (routeName == "Event" && _.size(event.eventList) === 0)
    return (
      <NoList
        source={require("../../assets/images/megaphone.png")}
        text={"이벤트"}
      />
    );
  return (
    <BaseScreen style={styles.screen} contentStyle={{ paddingTop: 0 }}>
      {event && (
        <ScrollList
          listKey={`${userStore.storeInfo.store_cd}-${routeName}`}
          numColumns={1}
          data={event.eventList}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.event_cd}`
          }
          onEndReached={loadMore}
          renderItem={(itemData) => {
            return (
              <EventItem
                item={itemData.item}
                onPress={onPress.bind(this, itemData.item)}
              />
            );
          }}
        />
      )}
    </BaseScreen>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "이벤트 응모내역",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const ScrollList = styled(ExtendedFlatList)({
  flexGrow: 1,

  width: "100%",
  // backgroundColor: colors.black,
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite },
});

export default EventScreen;
