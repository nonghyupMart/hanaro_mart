import { UserInfo } from "./UserInfo";
import { UserStore } from "./UserStore";

export interface UserData extends UserStore, UserInfo {}
