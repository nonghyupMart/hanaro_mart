import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as AgreementStyle from "./styles";
import { styles } from "./styles";
const AgreementContent3 = (props) => {
  return (
    <AgreementStyle.ExtraBox {...props}>
      <AgreementStyle.SmallTextTitle>
        개인정보의 선택적 수집·이용 동의
      </AgreementStyle.SmallTextTitle>
      <AgreementStyle.SmallTextBold>이용목적</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>
        상품 및 서비스 안내 또는 홍보(SMS, PUSH)
        서비스개선을 위한 통계분석 및 연구조사
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>수집항목</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>
        휴대폰번호, 마케팅수신 동의여부, 본인인증 시 성명, 생년월일, 성별
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>
        보유 및 이용기간
      </AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.justUnderline}>
        회원탈퇴 또는 동의철회 시
      </AgreementStyle.SmallText>
      <AgreementStyle.WarnText>
        ※ 고객님께서는 선택항목에 대한 동의를 거부할 권리가 있습니다.  단,
        선택항목 거부 시에는 상기 이용목적에 명시된 서비스는 받으실 수 없습니다.
      </AgreementStyle.WarnText>
      <AgreementStyle.SmallTextTitle>
        개인정보의 선택적 제3자 제공 동의
      </AgreementStyle.SmallTextTitle>
      <AgreementStyle.SmallTextBold>제공받는자</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.justUnderline}>
        농협유통, 농협대전유통, 농협부산경남유통, 농협충북유통,
        농업협동조합법에 의한 중앙회의 회원조합
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>제공목적</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.justUnderline}>
        상품 및 서비스 안내 또는 홍보(SMS, PUSH),
        서비스개선을 위한 통계분석 및 연구조사
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>제공항목</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>
        휴대폰번호, 마케팅수신 동의여부, 본인인증 시 성명, 생년월일, 성별
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>
        보유 및 이용기간
      </AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.justUnderline}>
        회원탈퇴 또는 동의철회 시
      </AgreementStyle.SmallText>
      <AgreementStyle.WarnText>
        {`※ 회원조합은 하나로마트앱을 통해 서비스를 제공하는 농협으로 매장설정에서 확인이 가능합니다.`}
      </AgreementStyle.WarnText>
      <AgreementStyle.WarnText>
        ※ 고객님께서는 선택항목에 대한 동의를 거부할 권리가 있습니다.  단,
        선택항목 거부 시에는 상기 이용목적에 명시된 서비스는 받으실 수 없습니다.
      </AgreementStyle.WarnText>
    </AgreementStyle.ExtraBox>
  );
};
export default AgreementContent3;
