const express = require('express');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const {
  UserModel,
  validUser,
  validLogin,
  genToken,
} = require('../models/userModel');
const { authToken } = require('../auth/authToken');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'users0 working fine' });
});

router.get('/userInfo', authToken, async (req, res) => {
  /* let token = req.header('x-api-key');
  if (!token) {
    res.status(401).json({ msg: 'didnt find token' });
  }
  try {
    let decodedToken = jwt.verify(token, 'SECRETWORD');
    let user = await UserModel.findOne({ _id: decodedToken._id }, { pass: 0 });
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: 'token expire/invalid' });
  } */
  let user = await UserModel.findOne({ _id: req.tokenData._id }, { pass: 0 });
  res.json(user);
});

router.post('/', async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.pass = await bcrypt.hash(user.pass, 10);
    await user.save();
    user.pass = '*******';
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: 'invalid email' });
  }
});

router.post('/login', async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  //check if the email exist
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: 'user not find' });
  }
  //check if the password match
  let passValid = await bcrypt.compare(req.body.pass, user.pass);
  if (!passValid) {
    return res.status(401).json({ msg: 'wrong password' });
  }
  //send a confirm message and create token
  let newToken = genToken(user._id);
  res.json({ token: newToken });
});

module.exports = router;
