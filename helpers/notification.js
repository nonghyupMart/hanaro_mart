import * as Notifications from "expo-notifications";
import { saveNotificationToStorage } from "../store/actions/common";

export const initNotificationReceiver = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({ shouldShowAlert: true }),
  });

  let globalInitialNotificationResponse;
  let globalSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      // When App is not running.
      saveNotificationToStorage(response.notification);
      globalInitialNotificationResponse = response;
      ensureGlobalSubscriptionIsCleared();
    });

  function ensureGlobalSubscriptionIsCleared() {
    if (globalSubscription) {
      globalSubscription.remove();
      globalSubscription = null;
    }
  }
};
