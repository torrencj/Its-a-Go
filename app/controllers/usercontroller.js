//Example usercontroller.
//TODO: Set up user routes

var express = require('express');
var router = express.Router();
var db = require("../models");
var bcrypt = require('bcrypt');

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';



// Add a new user.
router.post('/new', function(req, res) {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    console.log(hash);
    req.body.hash = hash;
    db.User.create(req.body).then(function(data) {
      res.send(data);
    });
  });
});


// User login
router.post('/login', function(req, res) {
  console.log(req.params);
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
          res.send(`Welcome ${userRecord.firstname}! You are successfully logged in.`)
        } else {
          //Wrong password.
          res.send(`Wrong password! Try again.`)
        }
      });
    }
  });
});

module.exports = router;
