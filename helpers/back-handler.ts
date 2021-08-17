import { BackHandler } from "react-native";
import * as CommonActions from "../store/actions/common";

export const createBackHandler = (dispatch, isBottomNavigation) => {
  const backAction = () => {
    dispatch(CommonActions.setBottomNavigation(isBottomNavigation));
    dispatch(CommonActions.setIsLoading(false));
    return false;
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  return backHandler;
};
