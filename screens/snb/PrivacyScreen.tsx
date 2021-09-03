import React from "react";
import BaseWebViewScreen from "../../components/BaseWebViewScreen";

const PrivacyScreen = ({ navigation }: any) => {
  return (
    <BaseWebViewScreen
      title={"개인정보처리방침"}
      url="/web/about/privacy.do"
      navigation={navigation}
    />
  );
};

export default PrivacyScreen;
