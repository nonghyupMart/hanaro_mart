import React from "react";
import BaseWebViewScreen from "../../components/BaseWebViewScreen";

const InquiryScreen = ({ navigation } : any) => {
  return (
    <BaseWebViewScreen
      title={"1:1 문의"}
      url="/web/community/cstvoice.do"
      navigation={navigation}
    />
  );
};

export default InquiryScreen;
