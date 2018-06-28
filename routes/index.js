var express = require('express');
var router = express.Router();
var session = require('express-session');
var constanst =require('../common/constanst');
var request = require('request');
const url = require('url'); 

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.user){
		if(!req.cookies || !req.cookies.ehealth_id || !req.cookies.ehealth_role){
			res.redirect(url.format({
				pathname:"/login",
				query: {
					"redirect": true,
				}
			}));
			return;
		}
		let { ehealth_id, ehealth_role } = req.cookies;
		let apiURL;
		let headers ;
		if(ehealth_role=="admin"){
			apiURL = constanst.backendURL + "/admin";
			headers = "admin-auth"
		} else if (ehealth_role=="doctor"){
			apiURL = constanst.backendURL + "/doctor";
			headers = "doctor-auth"
		} else{
			apiURL = constanst.backendURL + "/patient";
			headers = "patient-auth"
		}
		request({
			url: apiURL,
			headers: {
				[headers]: ehealth_id
			},
			json:true
		}, function (err, response, body) {
			console.log(err);
			if(response.statusCode!=200 ){
				res.redirect(url.format({
					pathname:"/login",
					query: {
						"redirect": true,
					}
				}));
				return;
			}
			body.role=ehealth_role;
			req.session.user = body;
			res.cookie('ehealth_id',body._id);
			res.cookie('ehealth_role',body.role);
		  	res.render('index', { 
		  		title: 'Home', 
		  		scriptLink: 'javascripts/scripts.js', 
		  		user: body
		  	});
			return;
		});

	} else{

		let user = req.session.user;
		res.cookie('ehealth_id',user._id);
		res.cookie('ehealth_role',user.role);
	  	res.render('index', { 
	  		title: 'Home', 
	  		scriptLink: 'javascripts/scripts.js', 
	  		user: req.session.user 
	  	});
	}
	
});

module.exports = router;
