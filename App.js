import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";

import authReducer from "./store/reducers/auth";
const rootReducer = combineReducers({ auth: authReducer });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ringPickerContainer: {
    flex: 1,
    position: "absolute",
    bottom: -200,
  },
});
