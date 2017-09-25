var express = require('express');
var router = express.Router();
var db = require("../models");

app.get("/", function(req,res) {
    res.render("splash");
});

app.get("/", function(req,res) {
    res.render("index");
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

app.get("/create", function(req,res) {
    res.render("create");
});