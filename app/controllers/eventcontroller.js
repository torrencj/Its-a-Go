var express = require('express');
var router = express.Router();
var db = require("../models");

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

    geo.find('223 Edenbridge Dr, Toronto', function(err, loc){
      console.log(loc);
      // process response object
      res.end();

    });

    console.log(req.body);
    // db.Event.create(req.body).then(function(data) {
    //   res.send(data);
    // })
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


// router.get('/', function(req, res) {
//   db.Post.findAll().then(data => {
//     res.send(data)
//   })
// })

module.exports = router;
