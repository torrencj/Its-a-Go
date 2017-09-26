var fs         = require('fs');
var express    = require('express');
var router     = express.Router();
var path       = require('path')
var db         = require("../models");
var bcrypt     = require('bcrypt');
var jwt        = require('jsonwebtoken');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'itsagoinfo@gmail.com',
        pass: "This is a totally secure password isn't it?"
        //TODO Change this to an environment variable
    }
});

var mailList = [
  'torrencj@gmail.com',
  'jamiewithaY@gmail.com',
  'jacquecwhite@gmail.com',
  'will.wms@gmail.com'
  ];

var htmlstream = fs.createReadStream(path.join(__dirname, '../emailtemplates/welcome.html'));

var mailOptions = {
  from: 'itsagoinfo@gmail.com', // sender address
  to: mailList,                 // list of receivers
  subject: 'This is a test',    // Subject line
  // html: '<p>Hi john, this is a message from node.</p>'// plain text body
  html: htmlstream              //File stream body....
};

const saltRounds = 10;

// Add a new user.
router.post('/new', function(req, res) {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    console.log(hash);
    req.body.hash = hash;
    db.User.create(req.body).then(function(data) {

      transporter.sendMail(mailOptions, function (err, info) {
         if(err) //TODO Need to check if file stream is still open and close if needed.
           console.log(err)
         else
           console.log(info);
      });

      res.send(data);
    });
  });
});


// User login
router.post('/login', function(req, res) {
  console.log(req.body);
  // Load hash from your password DB.
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userRecord => {
    if (userRecord === null) {
      res.send("No user found.")
    } else {
      bcrypt.compare(req.body.password, userRecord.hash, function(err, response) {
        if (err) throw err;
        console.log(response);
        if (response) {
          //User is logeed in, send a JWT and we can go from here.
          //TODO Make sure this is an appropriate use of filesync.
          //TODO Is this an appropriate use of a private key? Should we use a string like "secret"?
          //TODO Set heroku environment variable config to keep our secret safe.
          var cert = fs.readFileSync(path.join(__dirname, '../../private.pem'));  // get private key

          jwt.sign({ foo: 'bar' }, cert, function(err, token) {
            console.log(token);
            res.set("authorization", token); // Set response header to the access token. //TODO: save this in local storage
            res.send(`Welcome ${userRecord.firstname}! You are successfully logged in.`)
          });
        } else {
          //Wrong password.
          res.send(`Wrong password! Try again.`)
        }
      });
    }
  });
});

module.exports = router;
