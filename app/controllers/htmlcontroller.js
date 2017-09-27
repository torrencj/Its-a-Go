var express    = require('express');
var router     = express.Router();
var path       = require('path');
var fs         = require('fs');
var db 	       = require("../models");
var jwt        = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

var secret = fs.readFileSync(path.join(__dirname, '../../private.pem'));

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
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);

      res.render("create", decoded);

    });
  } else { // They aren't signed in.
    res.redirect("/")
  }
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
      // res.render("dashboard", results);
      res.send(results)
      });
    });
  } else { // They aren't signed in.
    res.redirect("/")
  }
});

router.get("/about", function(req,res) {
    res.render("about");
});

router.get("/stripetest", function (req, res) {
  res.render("stripetest")
})



// router.get("/all", function(req, res) {
//   db.Event.findAll({}).then(function(results) {
//       // results are available to us inside the .then
//     res.json(results);
//     });
//     // console.log(results);
//     res.render("index", results);
//   });


module.exports = router;
