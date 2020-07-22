import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { MainNavigator } from "./MainNavigator";
import AgreementScreen from "../screens/AgreementScreen";

const AppNavigator = (props) => {
  const isAgreed = true;
  return (
    <NavigationContainer>
      {isAgreed && <MainNavigator />}
      {!isAgreed && <AgreementScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
