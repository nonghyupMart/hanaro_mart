import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AgreementScreen from "../screens/join/AgreementScreen";
import JoinStep1Screen from "../screens/join/JoinStep1Screen";
import JoinStep2Screen from "../screens/join/JoinStep2Screen";
import StoreChangeScreen from "../screens/snb/StoreChangeScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";

const JoinStackNavigator = createStackNavigator();
export const JoinNavigator = () => {
  return (
    <JoinStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <JoinStackNavigator.Screen name="Agreement" component={AgreementScreen} />
      <JoinStackNavigator.Screen name="JoinStep1" component={JoinStep1Screen} />
      <JoinStackNavigator.Screen name="JoinStep2" component={JoinStep2Screen} />
      <JoinStackNavigator.Screen
        name="StoreSetup"
        component={StoreChangeScreen}
      />
    </JoinStackNavigator.Navigator>
  );
};

export default JoinNavigator;
