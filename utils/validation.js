function isPhoneNoValid(phone) {
  const regexExp = new RegExp(/^[6-9]\d{9}$/);
  return regexExp.test(phone);
}

function isEmailValid(email) {
  const regexExp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
  );

  return regexExp.test(email);
}

module.exports = {
  isPhoneNoValid,
  isEmailValid,
};
