import Barcoder from "./lib/barcode";

export const validateBarcode = (barcode) => {
  var validator = new Barcoder("ean13");
  return validator.validate(barcode);
};

export const pad = (n, number) => {
  return new Array(n).join("0").slice((n || 2) * -1) + number;
};
