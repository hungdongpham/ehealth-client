var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('detail', { title: 'Detail', scriptLink: 'javascripts/detail_scripts.js' });
});

module.exports = router;
