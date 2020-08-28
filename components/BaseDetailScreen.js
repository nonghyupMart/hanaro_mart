import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { View, Text, StyleSheet, FlatList, BackHandler } from "react-native";
import { SafeAreaView } from "react-navigation";
import { setBottomNavigation } from "../store/actions/auth";
import BaseScreen from "../components/BaseScreen";

const BaseDetailScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setBottomNavigation(false));
    }, 150);

    const backAction = () => {
      dispatch(setBottomNavigation(true));
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
      dispatch(setBottomNavigation(true));
    };
  }, []);
  return <BaseScreen>{props.children}</BaseScreen>;
};

export default BaseDetailScreen;
