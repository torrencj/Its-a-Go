//Handles all data routes for the participant table.
var express    = require('express');
var router     = express.Router();
var path       = require('path');
// var fs         = require('fs');
var db 	       = require("../models");
// var jwt        = require('jsonwebtoken');
// var cookieParser = require('cookie-parser');

router.post("/new", function(req, res) {
  console.log(req.body);
  console.log(req.params);
  res.end();
});


module.exports = router;
