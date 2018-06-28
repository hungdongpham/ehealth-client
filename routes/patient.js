var express = require('express');
var router = express.Router();
var session = require('express-session');
var constanst =require('../common/constanst');
var request = require('request');
const url = require('url'); 

/* GET medical records page in doctor view. */
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
			// if(ehealth_role!="doctor"){
			// 	res.redirect(url.format({
			// 		pathname:"/",
			// 		query: {}
			// 	}));
			// 	return;
			// }
		  	res.redirect(url.format({
		  		pathname:"/patient",
		  		query: {}
		  	}));
			return;
		});

	} else {
		let user = req.session.user;
		if(user.role=='doctor'){
			res.render('patient', {
				scriptLink: '/javascripts/routes/patient.js',
				title: 'Personal Info', 
				user: req.session.user,
				view: "patient_list"
			});
			return;
		}
	  	res.render('patient', {
	  		scriptLink: '/javascripts/routes/patient.js',
	  		title: 'Patient Info', 
	  		user: req.session.user,
	  		view: "personal_info"
	  	});
	}
	
});

router.get('/detail', function(req, res, next) {
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

		  	res.redirect(url.format({
		  		pathname:"/patient/detail",
		  		query: {}
		  	}));
			return;
		});

	} else {
		let user = req.session.user;
		if(user.role!='doctor'){
			res.redirect(url.format({
				pathname:"/patient",
				query: {}
			}));
			return;
		}
	  	res.render('patient', {
	  		scriptLink: '/javascripts/routes/patient.js',
	  		title: 'Patient Info', 
	  		user: req.session.user,
	  		view: "patient_detail"
	  	});
	}
	
});

router.get('/create', function(req, res, next) {
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
			res.cookie('ehealth_id',body._id, { maxAge: 900000});
			res.cookie('ehealth_role',body.role, { maxAge: 900000});
			if(ehealth_role!="doctor"){
				res.redirect(url.format({
					pathname:"/",
					query: {}
				}));
				return;
			}
		  	res.redirect(url.format({
		  		pathname:"/patient/create",
		  		query: {}
		  	}));
			return;
		});

	} else {
		let user = req.session.user;
		if(user.role!='doctor'){
			res.redirect(url.format({
				pathname:"/",
				query: {}
			}));
			return;
		}
	  	res.render('patient', {
	  		scriptLink: '/javascripts/routes/patient.js',
	  		title: 'Patient Info', 
	  		user: req.session.user,
	  		view: "create_patient"
	  	});
	}
	
});

module.exports = router;