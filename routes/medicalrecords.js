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

			if(body.role=="admin"){
				res.redirect(url.format({
				  	pathname:"/admin",
				  	query: {}
				}));
				return;
			}
		  	res.redirect(url.format({
		  		pathname:"/medicalrecords",
		  		query: {}
		  	}));
			return;
		});

	} else {
		let user = req.session.user;

		if(user.role=="admin"){
			res.redirect(url.format({
			  	pathname:"/admin",
			  	query: {}
			}));
			return;
		}

		if(user.role=='doctor'){
			res.render('medicalrecords', { 
				title: 'Doctor Medical Records', 
				user: req.session.user,
				scriptLink: '/javascripts/routes/doctor_medicalrecords.js',
				view: "records_list"
			});
			return;
		}
	  	res.render('medicalrecords', {
	  		scriptLink: '/javascripts/routes/patient_medicalrecords.js',
	  		title: 'Patient Medical Records', 
	  		user: req.session.user,
	  		view: "record_detail"
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

			if(body.role=="admin"){
				res.redirect(url.format({
				  	pathname:"/admin",
				  	query: {}
				}));
				return;
			}

		  	res.redirect(url.format({
		  		pathname:"/medicalrecords/detail",
		  		query: {}
		  	}));
			return;
		});

	} else {
		let user = req.session.user;

		if(user.role=="admin"){
			res.redirect(url.format({
			  	pathname:"/admin",
			  	query: {}
			}));
			return;
		}

		if(user.role!='doctor'){
			res.redirect(url.format({
				pathname:"/medicalrecords",
				query: {}
			}));
			return;
		}
	  	res.render('medicalrecords', {
	  		scriptLink: '/javascripts/routes/doctor_medicalrecords.js',
	  		title: 'Doctor Medical Records', 
	  		user: req.session.user,
	  		view: "record_detail"
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
			res.cookie('ehealth_id',body._id);
			res.cookie('ehealth_role',body.role);

			if(body.role=="admin"){
				res.redirect(url.format({
				  	pathname:"/admin",
				  	query: {}
				}));
				return;
			}

		  	res.redirect(url.format({
		  		pathname:"/medicalrecords/create",
		  		query: {}
		  	}));
			return;
		});

	} else {
		let user = req.session.user;

		if(user.role=="admin"){
			res.redirect(url.format({
			  	pathname:"/admin",
			  	query: {}
			}));
			return;
		}
		
		if(user.role!='doctor'){
			res.redirect(url.format({
				pathname:"/medicalrecords",
				query: {}
			}));
			return;
		}
	  	res.render('medicalrecords', {
	  		scriptLink: '/javascripts/routes/doctor_medicalrecords.js',
	  		title: 'Doctor Medical Records', 
	  		user: req.session.user,
	  		view: "create_record"
	  	});
	}
	
});

module.exports = router;