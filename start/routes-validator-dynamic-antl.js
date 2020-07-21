"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users-validator-dynamic-antl", "UserController.store").validator(
  "StoreUserDynamicAntl"
);
