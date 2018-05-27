var express = require('express');
var router = express.Router();

/* GET medical records page in doctor view. */
router.get('/', function(req, res, next) {
	console.log("medical advices");
  res.render('patient_medicaladvises', { title: 'Patient Medical Advises' });
});

module.exports = router;