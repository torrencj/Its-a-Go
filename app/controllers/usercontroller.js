//Example usercontroller.
//TODO: Set up user routes

var express = require('express');
var router = express.Router();
var db = require("../models");

// Add a new user.
router.post('/new', function(req, res) {
  console.log(req.body);
  db.User.create(req.body).then(function(data) {
    res.send(data);
  })
})

module.exports = router;
