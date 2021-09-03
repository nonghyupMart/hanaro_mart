import React from "react";
import BaseWebViewScreen from "../components/BaseWebViewScreen";

const NotificationScreen = ({ navigation }: any) => {
  return (
    <BaseWebViewScreen
      title={"알림"}
      url="/web/community/push.do"
      navigation={navigation}
    />
  );
};

export default NotificationScreen;
