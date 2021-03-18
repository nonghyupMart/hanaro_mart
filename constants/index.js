// export const SERVER_URL = "http://dv-www.hanaromartapp.com";
// export const SERVER_URL = "http://www.hanaromartapp.com";
import Constants from "expo-constants";
export const PRODUCT_SERVER_URL = "http://www.hanaromartapp.com";
import getEnvVars from "./environment";
export const { SERVER_URL } = getEnvVars();

export const API_URL = `${SERVER_URL}/api`;
export const IMAGE_URL = `${SERVER_URL}`;

export const INTERNAL_APP_VERSION = "1.10.4";

export const PADDING_BOTTOM_MENU = 50;

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
};
