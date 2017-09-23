//Example eventcontroller.
//TODO: Set up event routes

var express = require('express');
var router = express.Router();
var db = require("../models");

/*
router.post('/', function(req, res) {
  console.log(req.body);
  db.Post.create(req.body).then(function(data) {
    res.send(data);
  })
})


router.get('/', function(req, res) {
  db.Post.findAll().then(data => {
    res.send(data)
  })
})
*/


module.exports = router;

