import _ from "lodash";

// user states
// 1. userInfo : X , storeInfo : X
// 2. userInfo : X , storeInfo : O
// 3. userInfo : O , storeInfo : X
// 4. userInfo : O , storeInfo : O
export enum UserState {
  NOT_ASSESSED = 1,
  NO_USER_INFO = 2,
  NO_USER_STORE = 3,
  ASSESSED = 4,
}
export const getUserState = (userInfo, userStore) => {
    if (!hasUserInfo(userInfo) && !hasUserStore(userStore)) {
        return UserState.NOT_ASSESSED
    } else if (!hasUserInfo(userInfo) && hasUserStore(userStore)){
        return UserState.NO_USER_INFO
    }else if (hasUserInfo(userInfo) && !hasUserStore(userStore)){
        return UserState.NO_USER_STORE
    } else if (hasUserInfo(userInfo) && hasUserStore(userStore)){
        return UserState.ASSESSED
    } 
}
export const hasUserAndStore = (userInfo, userStore) =>  getUserState(userInfo, userStore) === UserState.ASSESSED

export const hasUserStore = userStore => !_.isEmpty(userStore)

export const hasUserInfo = userInfo => !_.isEmpty(userInfo)
