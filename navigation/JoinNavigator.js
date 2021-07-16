import React, { useEffect, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AgreementScreen, {
  screenOptions as AgreementScreenOptions,
} from "../screens/join/AgreementScreen";
import CIScreen, {
  screenOptions as CIScreenOptions,
} from "../screens/join/CIScreen";
import StoreChangeScreen, {
  screenOptions as StoreChangeScreenOptions,
} from "../screens/snb/StoreChangeScreen";
import StoreChangeDetailScreen, {
  screenOptions as StoreChangeDetailScreenOptions,
} from "../screens/snb/StoreChangeDetailScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";
import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from "../screens/LoginScreen";
import NHAHMScreen, {
  screenOptions as NHAHMScreenOptions,
} from "../screens/join/NHAHMScreen";

const JoinStackNavigator = createStackNavigator();
export const JoinNavigator = () => {
  return (
    <JoinStackNavigator.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <JoinStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={LoginScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="Agreement"
        component={AgreementScreen}
        options={AgreementScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="NHAHM"
        component={NHAHMScreen}
        options={NHAHMScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="CI"
        component={CIScreen}
        options={CIScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="StoreSetup"
        component={StoreChangeScreen}
        options={StoreChangeScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="StoreSetupDetail"
        component={StoreChangeDetailScreen}
        options={StoreChangeDetailScreenOptions}
      />
    </JoinStackNavigator.Navigator>
  );
};

export default JoinNavigator;
