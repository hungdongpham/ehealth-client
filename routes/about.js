var express = require('express');
var router = express.Router();
var session = require('express-session');
const url = require('url'); 

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.user){
		res.redirect(url.format({
			pathname:"/login",
			query: {
				"redirect": true,
			}
		}));
		return;
	}
  	res.render('about');
});

module.exports = router;
