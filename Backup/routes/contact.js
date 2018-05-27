var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact');
});

// post route
router.get('/send', function(req, res, next) {
    var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'harrispham90@gmail.com',
            pass: ''
        }
    });
    var mailOp = {
        from: 'Pater site - <xarenwo@gmail.com>',
        to: 'harrispham90#gmail.com',
        subject: 'Contact from diseasemap.com',
        text: 'You have a new message from ' + req.body.name + '\n Email: ' + req.body.email +'\n Message: ' + req.body.message ,
        html: '<h3>You have a new message from</h3>' + req.body.name + '<br/> Email: ' + req.body.email +'<br/> Message: ' + req.body.message
    }
    transport.sendMail(mailOp, function (error, info){
        if(error){
            console.log("Email could not be sent!\n" + error);
        }else{
            console.log('Message sent successfully!\n' + info.response);
        }
        res.redirect('/');
    })
});
module.exports = router;
