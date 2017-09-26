//Example eventcontroller.
//TODO: Set up event routes
var express = require('express');
var router = express.Router();
var db = require("../models");
// sequelize.import("./models/event.js");

router.get("/all", function(req, res) {
  db.Event.findAll({
    include: [ db.User ]
  }).then(function(results) {
      // results are available to us inside the .then
    res.json(results);
    });
    // console.log(results);
    // res.render("index", results);
  });

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
  db.Event.create(req.body).then(function(data) {
    res.send(data);
  })
})


// router.get('/', function(req, res) {
//   db.Post.findAll().then(data => {
//     res.send(data)
//   })
// })

module.exports = router;
