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


  router.post('/new', function(req, res) {
    var geocoder = require('google-geocoder');

    var geo = geocoder({
      key: 'AIzaSyBuD0bP9XwZ9XqGr1vmeUZbeitiaw8knZY'
    });

    geo.find('lot 40 austin,tx', function(err, loc){
      console.log(loc);
      // process response object
      // res.end();
      console.log(req.body);
      db.Event.create(req.body).then(function(data) {
        res.send(data);
      })
    });


  })


// router.get("/", function(req, res) {
//   db.Event.all(function(data) {
//     var hbsObject = {
//       events: data
//     };
//     console.log(hbsOb  ject);
//     res.render("index", hbsObject);
//   });
// });

router.post('/new', function(req, res) {
  console.log(req.body);
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);
      req.body.UserUuid = decoded.user; //Make a new key in body and set it to the uuid.
      console.log(req.body);

      var newEvent = {
        eventName:'test',
        eventDate:'test',
        eventAddress:'test',
        eventCost:100,
        UserUuid:decoded.user
      }

      db.Event.create(newEvent).then(function(data) {
        res.send(data);
      })

    });
  } else { // They aren't signed in.
    res.redirect("/login")
  }
})


// router.get('/', function(req, res) {
//   db.Post.findAll().then(data => {
//     res.send(data)
//   })
// })

module.exports = router;
