var express = require('express');
var router  = express.Router();
var db      = require("../models");
var jwt     = require('jsonwebtoken');
var path    = require('path');
var fs      = require('fs');
var secret  = fs.readFileSync(path.join(__dirname, '../../private.pem'));

// sequelize.import("./models/event.js");

router.get("/all", function(req, res) {
  db.Event.findAll({
    include: [ db.User ]
  }).then(function(results) {
    res.json(results);
    });
  });

  /***********************************************************************
  Example of using geocoder to look up the lat/lon for the event
  ************************************************************************

  var geocoder = require('google-geocoder');

  var geo = geocoder({
    key: 'AIzaSyBuD0bP9XwZ9XqGr1vmeUZbeitiaw8knZY'
  });

  geo.find('lot 40 austin,tx', function(err, loc){
    console.log(loc);
  });

  ************************************************************************/

router.post('/new', function(req, res) {
  console.log(req.body);
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);
      req.body.UserUuid = decoded.user; //Make a new key in body and set it to the uuid.
      console.log(req.body.event);


      var newEvent = {
        event: req.body.event,
        date: req.body.date,
        notes: req.body.notes,
        totalCost: req.body.totalCost,
        maxCPP: req.body.maxCPP,
        UserUuid: decoded.user
      };

      db.Event.create(newEvent).then(function(data) {

        db.User.findOne({
        where: {
          uuid: decoded.user
        }
      })
      .then(function(record) {
        var newParticipant = {
          email: record.email,
          stripeToken: null,
          EventId: data.id
        };

        db.Participant.create(newParticipant).then(function(participantData){
          res.send(participantData);
        })

      });

      });

    });
  } else { // They aren't signed in.
    res.redirect("/login");
  }
});

// router.post('/new', function(req, res) {
//   console.log(req.body);

// });

// router.get('/', function(req, res) {
//   db.Post.findAll().then(data => {
//     res.send(data)
//   })
// })

module.exports = router;
