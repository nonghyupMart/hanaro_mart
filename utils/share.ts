import { Share } from "react-native";
import { SERVER_URL } from "../constants";

export const sendShareLink = async (recommend: string) => {
  try {
    let message = `모든 것을 하나로마트 - ${SERVER_URL}/web/about/appStore2.do`;
    if (recommend) {
      message += `?recommend=${recommend}\n\n추천인코드: ${recommend}`;
    }
    const result = await Share.share({
      message: message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    alert(error.message);
  }
};
