export const formatNumber = (num: string | number) => {
  if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return;
};

export const formatPhoneNumber = (phoneNumberString: string) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  var match2 = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "" + match[1] + "-" + match[2] + "-" + match[3];
  } else if (match2) {
    return "" + match2[1] + "-" + match2[2] + "-" + match2[3];
  }
  return phoneNumberString;
};

export const emptyPrint = (val: any) => {
  return val ? val : "";
};
