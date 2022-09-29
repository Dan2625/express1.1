const indexR = require('./index');
const usersR = require('./users');
const shopR = require('./shop');
const foodsR = require('./foods');

exports.routesInit = (app) => {
  app.use('/', indexR);

  app.use('/users', usersR);
  app.use('/shop', shopR);
  app.use('/foods', foodsR);
};
