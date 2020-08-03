import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AgreementScreen from "../screens/join/AgreementScreen";
import JoinStep1Screen from "../screens/join/JoinStep1Screen";
import JoinStep2Screen from "../screens/join/JoinStep2Screen";

const JoinStackNavigator = createStackNavigator();
export const JoinNavigator = () => {
  return (
    <JoinStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <JoinStackNavigator.Screen name="Agreement" component={AgreementScreen} />
      <JoinStackNavigator.Screen name="JoinStep1" component={JoinStep1Screen} />
      <JoinStackNavigator.Screen name="JoinStep2" component={JoinStep2Screen} />
    </JoinStackNavigator.Navigator>
  );
};

export default JoinNavigator;
