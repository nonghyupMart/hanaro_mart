import * as React from "react";
import {
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const isReadyRef = React.createRef() as any;
export const navigationRef = createNavigationContainerRef();

import { DrawerActions } from "@react-navigation/native";

export const navigate = (name: string, params?: never) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
};

export const replace = (...args: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace([...args] as any));
  }
};

export const popToTop = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
};

export const pop = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop());
  }
};

export const toggleDrawer = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.toggleDrawer());
  }
};
