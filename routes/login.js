var express = require('express');
var router = express.Router();
var session = require('express-session');
var request = require('request');
var async   = require('async');
var _ = require("underscore");
var localCache=require('../common/localCache');
var constanst =require('../common/constanst');
const url = require('url'); 

router.get('/', function(req, res, next) {
	console.log(req.session.user);
	if(req.session.user){
		res.redirect(url.format({
			pathname:"/",
			query: {}
		}));
		return;
	}
	var redirectFromOtherPage = req.query.redirect;
	if(redirectFromOtherPage){
		res.render('login', { 
			title: 'Login', 
			scriptLink: 'javascripts/scripts.js', 
			note: "You need to login to being ale to use the site"
		});
		return;
	} 
  	res.render('login', { 
  		title: 'Login', 
  		scriptLink: 'javascripts/scripts.js'
  	});
});


router.post('/', function(req, res, next) {
	req.session.user=null;
	//backend api go here
	console.log(req.body);
	let { username, password, role } = req.body;
	if(!username || username.length<=0){
		res.render('login', { 
			title: 'Login', 
			scriptLink: 'javascripts/scripts.js', 
			note: "Missing username"
		});
		return;
	}

	if(!password || password.length<=0){
		res.render('login', { 
			title: 'Login', 
			scriptLink: 'javascripts/scripts.js', 
			note: "Missing password"
		});
		return;
	}

	if(!role || role.length<=0){
		res.render('login', { 
			title: 'Login', 
			scriptLink: 'javascripts/scripts.js', 
			note: "Missing role"
		});
		return;
	}

	let loginURL;
	if (role=="doctor"){
		loginURL = constanst.backendURL + "/doctor/signin";
	} else{
		loginURL = constanst.backendURL + "/patient/signin";
	}
	request.post({
		url: loginURL,
		json: {
			username: username,
			password: password
		}
	}, function (err, response, body) {
		console.log(err);
		console.log(response);
		console.log(body);
		console.log(response.statusCode)
		if(response.statusCode!=200 ){
			let note = body.message || "There is something wrong. Try again later";
			res.render('login', { 
				title: 'Login', 
				scriptLink: 'javascripts/scripts.js', 
				note: note
			});
			return;
		}
		body.role=role;
		req.session.user = body;
		res.redirect(url.format({
			pathname:"/",
			query: {}
		}));
	});
  	
});

router.get('/signout', function(req, res, next) {
	req.session.destroy(function(){
      console.log("user logged out.")
   	});
	res.clearCookie('ehealth_id');
	res.clearCookie('ehealth_role');
   	res.redirect(url.format({
   		pathname:"/",
   		query: {}
   	}));
   	return;
});


module.exports = router;
