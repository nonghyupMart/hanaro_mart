import React, { useRef } from "react";
import BaseWebViewScreen from "../../components/BaseWebViewScreen";

const NoticeScreen = (props: any) => {
  let params = props.route.params;
  const queryRef = useRef(params ? params : { type: "C" });
  const titleRef = useRef(params ? "통합 공지사항" : "매장 공지사항");

  return (
    <BaseWebViewScreen
      title={titleRef.current}
      url="/web/community/notice.do"
      navigation={props.navigation}
      query={queryRef.current}
    />
  );
};

export default NoticeScreen;
