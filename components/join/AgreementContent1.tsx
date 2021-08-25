import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as AgreementStyle from "./styles";
import { styles } from "./styles";
const AgreementContent1 = (props) => {
  return (
    <AgreementStyle.ExtraBox>
      <AgreementStyle.SmallTextTitle>
        개인정보의 필수적 수집·이용 동의
      </AgreementStyle.SmallTextTitle>
      <AgreementStyle.SmallTextBold>이용목적</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>
        이용자 식별, 회원가입의 성립, 앱 서비스 제공,
        민원처리 등을 위한 의사소통 경로 확보
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>수집항목</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>
        휴대폰번호, 14세 이상여부 본인인증 시 성명, 생년월일, 성별, CI, DI,
        쿠폰 등 거래내역
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>
        보유 및 이용기간
      </AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.underline}>
        회원탈퇴 후 15일 이내 다만,
        법령상 개인정보의 보존의무가 있는 경우 그에 따름
      </AgreementStyle.SmallText>
      <AgreementStyle.WarnText>
        ※ 고객님께서는 필수항목 수집·이용에 대한 동의를 거부할 권리가 있습니다.
         단, 필수항목 동의 거부 시에는 회원가입이 불가하며,
        상기 이용목적에 명시된 서비스는 받으실 수 없습니다.
      </AgreementStyle.WarnText>
      <AgreementStyle.SmallTextTitle>
        개인정보의 필수적 제3자 제공 동의
      </AgreementStyle.SmallTextTitle>
      <AgreementStyle.SmallTextBold>제공받는자</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.underline}>
        농협유통, 농협대전유통, 농협부산경남유통, 농협충북유통,
        농업협동조합법에 의한 중앙회의 회원조합
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>제공목적</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.underline}>
        이용자 식별, 회원가입의 성립,
        앱 서비스 제공, 민원처리 등을 위한 의사소통 경로 확보
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>제공항목</AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText>
        휴대폰번호, 14세 이상여부, 본인인증 시 성명, 생년월일, 성별, CI, DI,
        쿠폰 등 거래내역
      </AgreementStyle.SmallText>
      <AgreementStyle.SmallTextBold>
        보유 및 이용기간
      </AgreementStyle.SmallTextBold>
      <AgreementStyle.SmallText style={styles.underline}>
        회원탈퇴 후 15일 이내 다만,
        법령상 개인정보의 보존의무가 있는 경우 그에 따름
      </AgreementStyle.SmallText>
      <AgreementStyle.WarnText>
        ※
        회원조합은 하나로마트앱을 통해 서비스를 제공하는 농협으로 매장설정에서 확인이 가능합니다.
      </AgreementStyle.WarnText>
      <AgreementStyle.WarnText style={{ marginTop: 20 }}>
        ※ 고객님께서는 필수항목 제공에 대한 동의를 거부할 권리가 있습니다.  단,
        필수항목 동의 거부 시에는 회원가입이 불가하며,
        상기 이용목적에 명시된 서비스는 받으실 수 없습니다.
      </AgreementStyle.WarnText>
    </AgreementStyle.ExtraBox>
  );
};
export default AgreementContent1;
