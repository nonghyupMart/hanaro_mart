import * as Util from "./";
import { setAlert } from "../store/actions/common";
import { BackHandler } from "react-native";
import { withdrawalFinish } from "../store/actions/auth";
import axios from "./axios-instance";
import * as Updates from "expo-updates";

// FIXME: 네트워크 공통화..
// export const get = async (url) => {
//     return await axios.get(url).then((response) => {

//         return Promise.resolve(response);
//   });
// };

