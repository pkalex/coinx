const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCoinInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.ticker = !isEmpty(data.ticker) ? data.ticker : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.ticker)) {
    errors.ticker = "Ticker field is required";
  }

  if (!Validator.isLength(data.ticker, { min: 2, max: 30 })) {
    errors.ticker = "Ticker must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
