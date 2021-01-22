import React, { useEffect, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AgreementScreen, {
  screenOptions as AgreementScreenOptions,
} from "../screens/join/AgreementScreen";
import CIScreen, {
  screenOptions as CIScreenOptions,
} from "../screens/join/CIScreen";
import JoinStep2Screen, {
  screenOptions as JoinStep2ScreenOptions,
} from "../screens/join/JoinStep2Screen";
import StoreChangeScreen, {
  screenOptions as StoreChangeScreenOptions,
} from "../screens/snb/StoreChangeScreen";
import StoreChangeDetailScreen, {
  screenOptions as StoreChangeDetailScreenOptions,
} from "../screens/snb/StoreChangeDetailScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";

const JoinStackNavigator = createStackNavigator();
export const JoinNavigator = () => {
  return (
    <JoinStackNavigator.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <JoinStackNavigator.Screen
        name="Agreement"
        component={AgreementScreen}
        options={AgreementScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="CI"
        component={CIScreen}
        options={CIScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="JoinStep2"
        component={JoinStep2Screen}
        options={JoinStep2ScreenOptions}
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
