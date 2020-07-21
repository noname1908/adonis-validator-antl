"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class StoreUser extends BaseValidator {
  get rules() {
    return {
      username: "required|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required|min:3",
    };
  }

  get sanitizationRules() {
    return {
      email: "normalize_email",
    };
  }
}

module.exports = StoreUser;
