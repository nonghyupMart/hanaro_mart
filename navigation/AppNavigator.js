import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { MainNavigator } from "./MainNavigator";
import AgreementScreen from "../screens/AgreementScreen";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import { setPushToken, setLocation, setErrorMsg } from "../store/actions/auth";

const AppNavigator = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted!");
        }
      })
      .then(() => {
        console.log("getting token");
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        console.log("token==>" + token);
        dispatch(setPushToken(token));
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        // dispatch(setErrorMsg("Permission to access location was denied"));
      }

      // let location = await Location.getCurrentPositionAsync({});
      // dispatch(setLocation(location));
    })();
  }, []);

  const isAgreed = true;
  return (
    <NavigationContainer>
      {isAgreed && <MainNavigator />}
      {!isAgreed && <AgreementScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
