import * as React from "react";
import { StackActions } from "@react-navigation/native";

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
};

export const replace = (...args) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(...args));
  }
};

export const popToTop = () => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
};
