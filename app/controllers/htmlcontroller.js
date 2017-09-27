var express    = require('express');
var router     = express.Router();
var path       = require('path');
var fs         = require('fs');
var db 	       = require("../models");
var jwt        = require('jsonwebtoken');
var jwtexpress = require('jwt-express');
var cookieParser = require('cookie-parser');

var secret = fs.readFileSync(path.join(__dirname, '../../private.pem'));

var testUser = {
"uuid": "14d32eb0-a2ee-11e7-b847-ef41a58002ce",
"firstname": "Jacqueline",
"lastname": "White",
"email": "jacquecwhite@gmail.com",
"hash": "$2a$10$PCRSu3mwCf8ePykiy8ICRO7SeRJN3QWauDG9dPMKCyoApE101kDwC",
"updatedAt": "2017-09-26T19:08:29.341Z",
"createdAt": "2017-09-26T19:08:29.341Z"
}

var testObj = {

}

router.get("/", function(req,res) {
    res.render("splash");
});

router.get("/login", function(req,res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      if (err) throw err;
      res.redirect("/dashboard")
    });
  } else {
    res.render("login");
  }

});

router.get("/signup", function(req,res) {
    res.render("signup");
});

router.get("/create", function(req,res) {
    res.render("create");
});

router.get("/event", function(req,res) {
    res.render("event");
});

router.get("/dashboard", function(req, res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);
      db.User.findAll({
        where: {
        	uuid: decoded.user
      }
        }).then(function(results) {
      res.render("dashboard", results);
      });
    });
  } else { // They aren't signed in.
    res.redirect("/")
  }
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
