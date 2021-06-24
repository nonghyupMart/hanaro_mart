import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";

const ExtendedFlatList = (props) => {
  // const [isScrolled, setIsScrolled] = useState(false);
  let isScrolled = false;

  const onScroll = () => {
    if (!isScrolled) isScrolled = true;
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

export default React.memo(ExtendedFlatList);
