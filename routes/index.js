const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'walla its working' });
});

module.exports = router;
