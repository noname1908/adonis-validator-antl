"use strict";

const { validate, sanitize } = use("Validator");
const User = use("App/Models/User");

class UserNoValidatorController {
  async store({ request, response, antl }) {
    // Sanitizing user input
    const sanitizationRules = {
      email: "normalize_email",
    };
    const sanitizedData = sanitize(request.all(), sanitizationRules);

    // validate user input
    const rules = {
      username: "required|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required|min:3",
    };
    const messages = {
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
    const validation = await validate(sanitizedData, rules, messages);

    if (validation.fails()) {
      return response.status(422).json({
        message: validation.messages()[0].message,
      });
    }

    // actual work
    const user = await User.create({
      username: sanitizedData.username,
      email: sanitizedData.email,
      password: sanitizedData.password,
    });

    return response.status(201).json({
      user: user.toJSON(),
    });
  }
}

module.exports = UserNoValidatorController;
