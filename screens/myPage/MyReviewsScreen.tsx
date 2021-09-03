import React from "react";
import BaseWebViewScreen from "../../components/BaseWebViewScreen";

const MyReviewScreen = ({ navigation }: any) => {
  return (
    <BaseWebViewScreen
      title={"나의리뷰"}
      url="/web/community/review.do"
      navigation={navigation}
    />
  );
};

export default MyReviewScreen;
