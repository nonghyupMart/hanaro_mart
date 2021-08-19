export const log = (...val) => {
  if (__DEV__) {
    console.log(...val);
    // console.warn(JSON.stringify(userStore, null, "\t"));
    /*
    var people = [["John", "Smith"], ["Jane", "Doe"], ["Emily", "Jones"]]
    console.table(people);
    console.trace({foo, bar, baz});
    console.log({foo, bar, baz}); // when it's needed to log plenty of objects.
    */
  }
};
export const warn = (...val) => {
  if (__DEV__) {
    console.warn(...val);
    // console.warn(JSON.stringify(userStore, null, "\t"));
  }
};
