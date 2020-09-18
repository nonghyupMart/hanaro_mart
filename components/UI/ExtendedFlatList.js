import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import styled from "styled-components/native";

const ExtendedFlatList = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const onScroll = () => {
    // console.warn("onScroll");
    if (!isScrolled) setIsScrolled(true);
    if (props.onScroll) props.onScroll();
  };
  const onEndReached = () => {
    if (isScrolled) {
      console.warn("onEndReached");
      props.onEndReached();
    }
  };
  return (
    <FlatList {...props} onScroll={onScroll} onEndReached={onEndReached} />
  );
};

export default ExtendedFlatList;
