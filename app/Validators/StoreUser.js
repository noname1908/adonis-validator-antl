"use strict";

class StoreUser {
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

  get messages() {
    const antl = this.ctx.antl;
    return {
      "username.required": antl.formatMessage("validations.required", {
        field: antl.formatMessage("attributes.username"),
      }),
      "username.unique": antl.formatMessage("validations.unique", {
        field: antl.formatMessage("attributes.username"),
      }),
      "email.required": antl.formatMessage("validations.required", {
        field: antl.formatMessage("attributes.email"),
      }),
      "email.unique": antl.formatMessage("validations.unique", {
        field: antl.formatMessage("attributes.unique"),
      }),
      "email.email": antl.formatMessage("validations.unique", {
        field: antl.formatMessage("attributes.email"),
      }),
      "password.required": antl.formatMessage("validations.required", {
        field: antl.formatMessage("attributes.password"),
      }),
      "password.min": antl.formatMessage("validations.min", {
        field: antl.formatMessage("attributes.password"),
      }),
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).json({
      message: errorMessages[0].message,
    });
  }
}

module.exports = StoreUser;
