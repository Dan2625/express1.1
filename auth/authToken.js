const jwt = require('jsonwebtoken');

exports.authToken = (req, res, next) => {
  let token = req.header('x-api-key');
  if (!token) {
    return res.status(401).json({ msg: 'didnt find token' });
  }
  try {
    let decodedToken = jwt.verify(token, 'SECRETWORD');
    req.tokenData = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'token expire/invalid' });
  }
};
