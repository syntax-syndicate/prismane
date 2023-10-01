/**
 * regex
 * @param {string | number} value The value that should be validated
 * @param {RegExp} regExp The regular expression that should be tested
 * @returns {string | null}
 * @description Method that check if a value is a valid url
 */
const regex = (value: string, regExp: RegExp): string | null => {
  if (!regExp.test(value)) {
    return "This value does not match the given pattern!";
  }

  return null;
};

export default regex;
