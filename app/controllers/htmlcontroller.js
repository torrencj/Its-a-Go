var express = require('express');
var router  = express.Router();
var path    = require('path');
var fs      = require('fs');
var db 	    = require("../models");

router.get("/", function(req,res) {
    res.render("splash");
});

router.get("/splash", function(req,res) {
    res.render("splash");
});

router.get("/login", function(req,res) {
    res.render("login");
});

router.get("/signup", function(req,res) {
    res.render("signup");
});

router.get("/create", function(req,res) {
    res.render("create");
});

router.get("/dashboard", function(req, res) {
  db.Event.findAll({}).then(function(results) {
    var hbsObject = {
      events: results
    };
    console.log(hbsObject);
    res.render("dashboard", hbsObject);
    });
});

router.get("/about", function(req,res) {
    res.render("about");
});



// router.get("/all", function(req, res) {
//   db.Event.findAll({}).then(function(results) {
//       // results are available to us inside the .then
//     res.json(results);
//     });
//     // console.log(results);
//     res.render("index", results);
//   });


module.exports = router;