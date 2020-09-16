import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "@actions/event";
import EventItem from "@components/EventItem";
const EventScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const userStore = useSelector((state) => state.auth.userStore);
  const event = useSelector((state) => state.event.event);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      if (userStore) {
        const requestEvent = dispatch(
          eventActions.fetchEvent({ store_cd: userStore.store_cd })
        );

        Promise.all([requestEvent]).then(() => {
          setIsLoading(false);
        });
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [userStore]);

  const loadMore = () => {
    // console.warn("loadMore");
    if (!isLoading && page < event.finalPage) {
      const currentPage = page + 1;
      setPage(() => currentPage);
      setIsLoading(true);

      const requestEvent = dispatch(
        eventActions.fetchEvent({
          store_cd: userStore.store_cd,
          page: currentPage,
        })
      );

      Promise.all([requestEvent]).then(() => {
        setIsLoading(false);
      });
    }
  };

  const onPress = (item) => {
    navigation.navigate("EventDetail", { event_cd: item.event_cd });
  };
  return (
    <BaseScreen
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
    >
      {event && (
        <ScrollList
          data={event.eventList}
          keyExtractor={(item) => item.event_cd}
          onEndReached={() => {
            loadMore();
          }}
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
const ScrollList = styled.FlatList({
  flex: 1,

  width: "100%",
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite },
});

export default EventScreen;
