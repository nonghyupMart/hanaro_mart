import * as Device from "expo-device";

export const validateRooting = async () => {
  const isRooted = await Device.isRootedExperimentalAsync();
  if (isRooted) {
    throw new Error("루팅이 감지되었습니다.\n고객센터에 문의해주세요.");
  }
};
