const mongoose = require('mongoose');
const Joi = require('joi');

const foodSchema = new mongoose.Schema({
  name: String,
  img: String,
  cal: Number,
  price: Number,
});

const FoodModel = mongoose.model('foods', foodSchema);
exports.FoodModel = FoodModel;

exports.validFood = (_bodyData) => {
  let joiSchema = Joi.object().keys({
    name: Joi.string().min(2).max(99).required(),
    img: Joi.string().min(2).max(999).allow(null, ''),
    cal: Joi.number().min(1).max(999).required(),
    price: Joi.number().min(1).max(999).required(),
  });

  return joiSchema.validate(_bodyData);
};
