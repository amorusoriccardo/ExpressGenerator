var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/ciao', function(req, res, next) {
  res.send('prontone');
});

module.exports = router;
