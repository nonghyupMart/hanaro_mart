import React from "react";
import BaseWebViewScreen from "../../components/BaseWebViewScreen";

const TermsScreen = ({ navigation }: any) => {
  return (
    <BaseWebViewScreen
      title={"이용약관"}
      url="/web/about/terms.do"
      navigation={navigation}
    />
  );
};

export default TermsScreen;
