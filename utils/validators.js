const validator = require("validator");

module.exports.InputValidators = (
  userName,
  email,
  password,
  confirmedPassword
) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "Username cant be empty!";
  }
  if (email.trim() === "") {
    errors.email = "Email cant be empty!";
  } else {
    if (!validator.isEmail(email)) {
      errors.email = "Enter a valid Email!";
    }
  }
  if (password === "") {
    errors.password = "Password cant be empty!";
  }
  if (password !== confirmedPassword) {
    errors.confirmedPassword = "Passwords must be same!";
  }

  return {
    errors,
    valid: Object.keys(errors) == 0,
  };
};

module.exports.LoginValidators = (userName, password) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "Username cant be empty!";
  }
  if (password.trim() === "") {
    errors.password = "Password cant be empty!";
  }
  return {
    errors,
    valid: Object.keys(errors) == 0,
  };
};
