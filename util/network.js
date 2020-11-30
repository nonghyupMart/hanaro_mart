import * as Util from "@util";
import { setAlert } from "@actions/common";
import { BackHandler } from "react-native";
import { withdrawalFinish } from "@actions/auth";
import axios from "@util/axios-instance";
import * as Updates from "expo-updates";

// FIXME: 네트워크 공통화..
// export const get = async (url) => {
//     return await axios.get(url).then((response) => {

//         return Promise.resolve(response);
//   });
// };

export const getResponse = async (response, dispatch, url, query) => {
  const resData = await response.json();
  //   console.warn(resData);

  if (!response.ok) {
    //response.status == 500, 400...
    // console.warn(response);
    Util.log("ERROR getResponse=> ", url, query);
    Util.log("ERROR message ==>", resData.error.errorMsg);
    dispatch(
      setAlert({
        message:
          "서비스 연결에\n오류가 발생하였습니다.\n잠시후 다시 실행해 주십시오.",
        onPressConfirm: () => {
          dispatch(setAlert(null));
        },
      })
    );
    return resData;
  }

  if (resData.code == "USE-0000") {
    //회원정보가 없는 경우 자동로그인 해제
    await dispatch(withdrawalFinish());
    Updates.reloadAsync();
    return resData;
  }
  if (resData.code != "200" && resData.code != "201") {
    dispatch(
      setAlert({
        message: resData.error.errorMsg,
        onPressConfirm: () => {
          dispatch(setAlert(null));
        },
      })
    );
    return resData;
  }

  return resData;
};
