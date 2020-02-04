const Joi = require('joi');

const densityInput = {
  body: {
    text: Joi.string().max(1000).required(),
  },
};

const wordAdd = {
  body: {
    title: Joi.string().required(),
  },
};

module.exports = { densityInput, wordAdd };
