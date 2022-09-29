const express = require('express');
const { prods_ar } = require('../data/shopData');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(prods_ar);
});

router.get('/category', (req, res) => {
  let categoryQ = req.query.category;
  let temp_ar = prods_ar.filter((item) => {
    return item.cat == categoryQ;
  });
  res.json(temp_ar);
});

module.exports = router;
