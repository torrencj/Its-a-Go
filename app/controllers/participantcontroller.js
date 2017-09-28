//Handles all data routes for the participant table.
var express    = require('express');
var router     = express.Router();
var path       = require('path');
var db 	       = require("../models");
// var jwt        = require('jsonwebtoken');
// var cookieParser = require('cookie-parser');

router.post("/new", function(req, res) {
  console.log(req.body);
  console.log(req.params);
  res.end();
});

router.get("/:eventId", function(req, res) {
  console.log(req.body);
  console.log(req.params);
  db.Participant.findAll({
    where: {
      EventId: req.params.eventId
    }
  }).then(function(eventData) {
    if (eventData) {
      res.send(eventData)
    } else {
      res.send("Nuthin here.")
    }
  })
});

module.exports = router;
