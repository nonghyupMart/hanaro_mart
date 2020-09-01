import React, { useEffect, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AgreementScreen, {
  screenOptions as AgreementScreenOptions,
} from "../screens/join/AgreementScreen";
import JoinStep1Screen, {
  screenOptions as JoinStep1ScreenOptions,
} from "../screens/join/JoinStep1Screen";
import JoinStep2Screen, {
  screenOptions as JoinStep2ScreenOptions,
} from "../screens/join/JoinStep2Screen";
import StoreChangeScreen from "../screens/snb/StoreChangeScreen";
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
        name="JoinStep1"
        component={JoinStep1Screen}
        options={JoinStep1ScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="JoinStep2"
        component={JoinStep2Screen}
        options={JoinStep2ScreenOptions}
      />
      <JoinStackNavigator.Screen
        name="StoreSetup"
        component={StoreChangeScreen}
      />
    </JoinStackNavigator.Navigator>
  );
};

export default JoinNavigator;
