import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as AgreementStyle from "./styles";
import { styles } from "./styles";
const AgreementContent4 = (props) => {
  return (
    <AgreementStyle.ExtraBox>
      <AgreementStyle.SmallTextBold>이용목적</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>
        가까운 위치에 있는 매장찾기 서비스 제공
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>수집항목</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>위치정보 (위도, 경도)</AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>
        보유 및 이용기간
      </AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.underline}>
        서버에 전송되거나 저장되지 않음
      </AgreementStyle.SmallText>
      <AgreementStyle.WarnText>
        {`※ 고객님께서는 선택항목에 대한 동의를 거부할 권리가 있습니다.  단, 선택항목 거부 시에는 상기 이용목적에 명시된 서비스는 받으실 수 없습니다`}
      </AgreementStyle.WarnText>
    </AgreementStyle.ExtraBox>
  );
};
export default AgreementContent4;
