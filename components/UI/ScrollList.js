import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./HeaderButton";
import { setBottomNavigation } from "../../store/actions/auth";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";

const ScrollList = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <FlatList
      {...props}
      keyExtractor={(item) => item + ""}
      data={[0]}
      renderItem={props.renderItem}
    >
      {props.children}
    </FlatList>
  );
};
export default ScrollList;
