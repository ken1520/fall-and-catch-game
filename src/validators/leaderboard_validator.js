const Joi = require('joi');

const validate = (data, action) => {
  let schema = {};

  switch (action) {
    case 'create':
      console.log('validate data', data);
      schema = {
        username: Joi.string().required(),
        score: Joi.number().required(),
      };
      break;
    default:
      break;
  }

  return Joi.attempt(data, Joi.object(schema));
};

module.exports = {
  validate,
};
