var express = require('express');
var router = express.Router();
var session = require('express-session');
const url = require('url'); 
var constanst =require('../common/constanst');

/* GET medical records page in doctor view. */


router.get('/', function(req, res, next) {
	if(!req.session.user){
		if(!req.cookies || !req.cookies.ehealth_id || !req.cookies.ehealth_role){
			res.redirect(url.format({
				pathname:"/admin/login",
				query: {
					"redirect": true,
				}
			}));
			return;
		}
		let { ehealth_id, ehealth_role } = req.cookies;
		let apiURL;
		let headers ;
		if(ehealth_role!="admin"){
			res.redirect(url.format({
				pathname:"/"
			}));
			return;
		}

		apiURL = constanst.backendURL + "/admin";
		headers = "admin-auth"
			
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
					pathname:"/admin/login",
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
		  	res.redirect(url.format({
		  		pathname:"/admin",
		  		query: {}
		  	}));
			return;
		});

	} else {
		let user = req.session.user;
		if(user.role!='admin'){
			res.redirect(url.format({
		  		pathname:"/",
		  		query: {}
		  	}));
			return;
		}
	  	res.render('admin', {
	  		scriptLink: '/javascripts/routes/admin.js',
	  		title: 'Admin', 
	  		user: req.session.user,
	  	});
	}
	
});

router.get('/login', function(req, res, next) {
	console.log(req.session.user);
	if(req.session.user && req.cookies && req.cookies.ehealth_id && req.cookies.ehealth_role){
		if(user.role!='admin'){
			res.redirect(url.format({
		  		pathname:"/",
		  		query: {}
		  	}));
			return;
		}

		res.redirect(url.format({
			pathname:"/admin",
			query: {}
		}));
		return;


	}

	req.session.destroy(function(){
      console.log("user logged out.")
   	});
	res.clearCookie('ehealth_id');
	res.clearCookie('ehealth_role');

	var redirectFromOtherPage = req.query.redirect;
	if(redirectFromOtherPage){
		res.render('login', { 
			title: 'Login', 
			scriptLink: 'javascripts/scripts.js', 
			note: "You need to login to being ale to use the site",
			view: "adminLogin"
		});
		return;
	} 
  	res.render('login', { 
  		title: 'Login', 
  		scriptLink: 'javascripts/scripts.js',
  		view: "adminLogin"
  	});
	
});

router.post('/login', function(req, res, next) {
	req.session.user=null;
	//backend api go here
	console.log(req.body);
	let { username, password } = req.body;
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

	let loginURL = constanst.backendURL + "/admin/signin";
	request.post({
		url: loginURL,
		json: {
			username: username,
			password: password
		}
	}, function (err, response, body) {
		if(response.statusCode!=200 ){
			let note = body.message || "There is something wrong. Try again later";
			res.render('login', { 
				title: 'Login', 
				scriptLink: 'javascripts/scripts.js', 
				note: note
			});
			return;
		}
		body.role="admin";
		req.session.user = body;
		res.redirect(url.format({
			pathname:"/admin",
			query: {}
		}));
	});
  	
});
// router.get('/create', function(req, res, next) {
// 	if(!req.session.user){
// 		if(!req.cookies || !req.cookies.ehealth_id || !req.cookies.ehealth_role){
// 			res.redirect(url.format({
// 				pathname:"/login",
// 				query: {
// 					"redirect": true,
// 				}
// 			}));
// 			return;
// 		}
// 		let { ehealth_id, ehealth_role } = req.cookies;
// 		let apiURL;
// 		let headers ;
// 		if(ehealth_role=="admin"){
// 			apiURL = constanst.backendURL + "/admin";
// 			headers = "admin-auth"
// 		} else if (ehealth_role=="doctor"){
// 			apiURL = constanst.backendURL + "/doctor";
// 			headers = "doctor-auth"
// 		} else{
// 			apiURL = constanst.backendURL + "/patient";
// 			headers = "patient-auth"
// 		}
// 		request({
// 			url: apiURL,
// 			headers: {
// 				[headers]: ehealth_id
// 			},
// 			json:true
// 		}, function (err, response, body) {
// 			console.log(err);
// 			if(response.statusCode!=200 ){
// 				res.redirect(url.format({
// 					pathname:"/login",
// 					query: {
// 						"redirect": true,
// 					}
// 				}));
// 				return;
// 			}
// 			body.role=ehealth_role;
// 			req.session.user = body;
// 			res.cookie('ehealth_id',body._id, { maxAge: 900000 });
// 			res.cookie('ehealth_role',body.role, { maxAge: 900000 });
// 		  	res.redirect(url.format({
// 		  		pathname:"/medicaladvises/create",
// 		  		query: {}
// 		  	}));
// 			return;
// 		});

// 	} else {
// 		let user = req.session.user;
// 		if(user.role!='doctor'){
// 			res.redirect(url.format({
// 				pathname:"/medicaladvises",
// 				query: {}
// 			}));
// 			return;
// 		}
// 	  	res.render('medicaladvises', {
// 	  		scriptLink: '/javascripts/routes/doctor_medicaladvises.js',
// 	  		title: 'Doctor Medical Advises', 
// 	  		user: req.session.user,
// 	  		view: "create_advise"
// 	  	});
// 	}
	
// });
module.exports = router;