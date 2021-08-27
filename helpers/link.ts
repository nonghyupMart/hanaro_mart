import * as CommonActions from "../store/actions/common";
import * as Linking from "expo-linking";
import { AppDispatch, useAppDispatch, useAppSelector } from "../hooks";
import _ from "lodash";
import * as RootNavigation from "../navigation/RootNavigation";
import { useEffect } from "react";
import { CATEGORY } from "../constants";
import { setIsLoading } from "../store/actions/common";

export const initDeepLink = async (dispatch: AppDispatch) => {
  const _handleUrl = async (data) => {
    // this.setState({ url });
    if (!data.url) return;
    CommonActions.navigateByScheme(dispatch, data.url);
  };

  await Linking.addEventListener("url", _handleUrl);
  const schemeUrl = await Linking.getInitialURL();
  CommonActions.navigateByScheme(dispatch, schemeUrl);
};

export const useRedirectToScreenByLink = () => {
  const link = useAppSelector((state) => state.common.link);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    setTimeout(async () => {
      if (!link || _.isEmpty(link)) return;

      if (
        link.link_gbn === "I" &&
        (_.isEmpty(userInfo) || _.isEmpty(userStore))
      ) {
        return await RootNavigation.navigate("Login");
      }
      await RootNavigation.navigate(CATEGORY[link.link_gbn]);
    }, 500);
  }, [link]);
};

export const useRedirectToScreenByDidTryStorePopup = () => {
  const dispatch = useAppDispatch();
  const didTryStorePopup = useAppSelector(
    (state) => state.common.didTryStorePopup
  );

  useEffect(() => {
    if (
      typeof didTryStorePopup !== "string" &&
      typeof didTryStorePopup !== "object"
    )
      return;
    dispatch(setIsLoading(true));
    setTimeout(() => {
      switch (typeof didTryStorePopup) {
        case "string":
          RootNavigation.navigate(didTryStorePopup);
          break;
        case "object":
          dispatch(CommonActions.setLink(null));
          if (didTryStorePopup.link_code) {
            dispatch(
              CommonActions.setLink({
                category: CATEGORY[didTryStorePopup.link_gbn],
                link_code: didTryStorePopup.link_code,
              })
            );
          }
          RootNavigation.navigate(CATEGORY[didTryStorePopup.link_gbn]);
          break;

        default:
          break;
      }
      dispatch(setIsLoading(false));
      dispatch(CommonActions.setDidTryStorePopup(true));
    }, 500);
  }, [didTryStorePopup]);
};
