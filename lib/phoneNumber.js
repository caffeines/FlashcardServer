const libPhone = require('google-libphonenumber');

const PNF = libPhone.PhoneNumberFormat;
const phoneUtil = libPhone.PhoneNumberUtil.getInstance();

const formatNumber = (number) => {
  let phoneNumber;
  try {
    phoneNumber = phoneUtil.parse(`+${number}`);
  } catch (err) {
    return { isValid: false };
  }
  const isValid = phoneUtil.isValidNumber(phoneNumber);

  const ret = { isValid };
  if (isValid) ret.number = phoneUtil.format(phoneNumber, PNF.E164).substr(1); // drop the initial +
  return ret;
};

exports.formatNumber = formatNumber;
