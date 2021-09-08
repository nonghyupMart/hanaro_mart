import { Menu } from "./Menu";

export type UserStore = {
  menuList: Menu[];
  storeInfo: {
    addr: string;
    addr_no: string;
    biz_no: string;
    ceo: string;
    company_no: string;
    lat: string;
    lname: string;
    lng: string;
    mname: string;
    prv_manager: string;
    store_cd: number;
    store_nm: string;
    store_type: string;
    support_tel: string;
    tel: string;
  };
};
