import * as React from "react";
import { StackActions } from "@react-navigation/native";

export const isReadyRef = React.createRef() as any;
export const navigationRef = React.createRef() as any;
import { DrawerActions } from "@react-navigation/native";

export const navigate = (name: string, params = {}) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
};

export const replace = (...args: any) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace([...args] as any));
  }
};

export const popToTop = () => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
};

export const pop = () => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.pop());
  }
};

export const toggleDrawer = () => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
  }
};
