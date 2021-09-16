import { YN } from "./Types";

export interface UserInfo  {
  amnNo: string;
  ci: string;
  di: string;
  mana_qr: string;
  marketing_agree: YN;
  marketing_date: string;
  push_agree: YN;
  push_cnt: number;
  recommend: string;
  recommend_apply: YN;
  reg_date: string;
  sms_agree: YN;
  store_cd: number;
  store_type: string;
  tel: string;
  token: string;
  user_age: string;
  user_cd: string;
  user_id: string;
  user_name: string;
  user_sex: string;
  wish_cnt: number;
};
