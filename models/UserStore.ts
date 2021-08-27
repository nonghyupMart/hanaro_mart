export interface UserStore {
  menuList: {
    menu_nm: string;
    r_menu_nm: string;
  }[];
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
}
