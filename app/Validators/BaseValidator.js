"use strict";

const _ = require("lodash");
const mustache = require("mustache");

class BaseValidator {
  get rules() {
    return {};
  }

  get messages() {
    const antl = this.ctx.antl;
    let messages = antl.list("validations");
    const attributes = antl.list("attributes");
    messages = _.mapValues(messages, (message) => {
      return (field, validation, args) => {
        return mustache.render(message, {
          field: _.get(attributes, field, _.upperFirst(field)),
          argument: args,
        });
      };
    });
    return messages;
  }

  get sanitizationRules() {
    return {};
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).json({
      message: errorMessages[0].message,
    });
  }
}

module.exports = BaseValidator;
