import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "../../store/actions/event";
import { StyleConstants, screenWidth } from "../../components/UI/BaseUI";
import EventItem from "../../components/EventItem";
import { useIsFocused } from "@react-navigation/native";
import { BackButton, TextTitle } from "../../components/UI/header";
import _ from "lodash";
import { setIsLoading } from "../../store/actions/common";
import NoList from "../../components/UI/NoList";

const EventScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [page, setPage] = useState(1);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  let event;
  if (routeName == "MyEvent") {
    //이벤트응모내역 일 경우..
    event = useSelector((state) => state.event.myEvent);
  } else {
    event = useSelector((state) => state.event.event);
  }
  useEffect(() => {
    if (isFocused && !_.isEmpty(userStore)) {
      setPage(1);
      fetchEvent();
    }
  }, [isFocused, userStore]);

  const fetchEvent = (p = page) => {
    dispatch(setIsLoading(true));
    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: p,
    };
    if (routeName == "MyEvent") query.user_cd = userInfo.user_cd;
    dispatch(eventActions.fetchEvent(query)).then(() => {
      dispatch(setIsLoading(false));
    });
  };
  const loadMore = () => {
    if (!isLoading && page + 1 <= event.finalPage) {
      fetchEvent(page + 1);
      setPage(page + 1);
    }
  };

  const onPress = (item) => {
    if (!userInfo.ci) return navigation.navigate("Empty");
    dispatch(setIsLoading(true));
    navigation.navigate("EventDetail", { event_cd: item.event_cd });
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
          numColumns={1}
          data={event.eventList}
          keyExtractor={(item) => `${item.event_cd}`}
          onEndReached={loadMore}
          renderItem={(itemData) => {
            return (
              <EventItem
                item={itemData.item}
                onPress={() => onPress(itemData.item)}
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
