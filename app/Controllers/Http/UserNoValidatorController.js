"use strict";

const { validate, sanitize } = use("Validator");
const User = use("App/Models/User");

class UserNoValidatorController {
  async store({ request, response }) {
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
    const validation = await validate(sanitizedData, rules);

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
