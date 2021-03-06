/*
링크 카테고리
  . 행사전단 : G
  . 쿠폰 : C
  . 이벤트 : E
  . 기획전 : P
  . 매장전용 : S
  . 매장 공지 : A
  . 나로튜브 : T (9일 이후 추가 여부 확인, 나로튜브 권한이 시스템관리자에 있기 때문에 어떻게 사용할지 확인 필요)
  . 통합홈 공지 : H (9일 이후 추가 여부 확인)
*/
export const CATEGORY = {
  G: "Flyer",
  C: "Coupon",
  E: "Event",
  P: "Exhibition",
  S: "ForStore",
  A: "Notice",
  T: "NaroTube",
  H: "Notice",
  I: "MyInfo", // 가입한 경우 MyInfo로 가입 않한경우 회원가입으로
};

/*  이동 스키마
행사전단 : hanaroplus://?link_gbn=G
https://www.hanaromartapp.com/web/about/appStore2.do?link_gbn=G
"intent://hanaroplus://?link_gbn=G#Intent;scheme=hanaroplus;package=com.hanaroPlus.hanaroPlus;end"
이벤트 : hanaroplus://?link_gbn=E
*/