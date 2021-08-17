import _ from "lodash";
import { updateExpo } from "../store/actions/common";
import * as Util from "../utils";
import { fetchPushCnt } from "../store/actions/auth";
import { AppState } from "react-native";

let appState = AppState.currentState;

export const handleAppStateChange = async (nextAppState:any, dispatch:any ) => {
  if (
    appState.match(/inactive|background/) &&
    nextAppState === "active"
  ) {
    // console.log("App has come to the foreground!");
    const userInfoData = await Util.getStorageItem("userInfoData");
    if (!_.isEmpty(userInfoData)) {
      dispatch(fetchPushCnt({ user_cd: userInfoData.user_cd }));
    }
  } else {
    // console.log("App has come to the background!");
    Util.removeStorageItem("notificationData");
  }
  updateExpo(dispatch);
  appState = nextAppState;
};
