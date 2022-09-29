const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  role: {
    type: String,
    default: 'regular',
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
});

exports.UserModel = mongoose.model('users', userSchema);

exports.genToken = (_userId) => {
  let token = jwt.sign({ _id: _userId }, 'SECRETWORD', { expiresIn: '60mins' });
  return token;
};

exports.validUser = (_bodyData) => {
  let joiSchema = Joi.object().keys({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(30).required().email(),
    pass: Joi.string().min(4).max(25).required(),
  });

  return joiSchema.validate(_bodyData);
};

exports.validLogin = (_bodyData) => {
  let joiSchema = Joi.object().keys({
    email: Joi.string().min(2).max(30).required().email(),
    pass: Joi.string().min(4).max(25).required(),
  });

  return joiSchema.validate(_bodyData);
};
