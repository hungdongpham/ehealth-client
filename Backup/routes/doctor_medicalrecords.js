var express = require('express');
var router = express.Router();

/* GET medical records page in doctor view. */
router.get('/', function(req, res, next) {
  res.render('doctor_medicalrecords', { title: 'Doctor Medical Records' });
});

module.exports = router;