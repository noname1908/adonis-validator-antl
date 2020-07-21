"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    const sanitizedData = request.all();
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

module.exports = UserController;
