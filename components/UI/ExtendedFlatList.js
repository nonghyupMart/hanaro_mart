import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";

const ExtendedFlatList = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const onScroll = () => {
    if (!isScrolled) setIsScrolled(true);
    // if (props.onScroll) props.onScroll();
  };
  const onEndReached = () => {
    if (isScrolled) {
      if (props.onEndReached) props.onEndReached();
    }
  };
  return (
    <FlatList
      onEndReachedThreshold={0.5}
      scrollEventThrottle={60}
      {...props}
      onScroll={onScroll}
      onEndReached={onEndReached}
    />
  );
};

export default ExtendedFlatList;
