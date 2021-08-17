import * as CommonActions from "../store/actions/common";
import * as Linking from "expo-linking";

export const initDeepLink = async (dispatch) => {
  const _handleUrl = async (data) => {
    // this.setState({ url });
    if (!data.url) return;
    CommonActions.navigateByScheme(dispatch, data.url);
  };
  
  await Linking.addEventListener("url", _handleUrl);
  const schemeUrl = await Linking.getInitialURL();
  CommonActions.navigateByScheme(dispatch, schemeUrl);

  
};
