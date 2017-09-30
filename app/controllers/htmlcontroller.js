var express    = require('express');
var router     = express.Router();
var path       = require('path');
var fs         = require('fs');
var db 	       = require("../models");
var jwt        = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

var secret = fs.readFileSync(path.join(__dirname, '../../private.pem'));

router.get("/", function(req,res) {
    res.render("splash",{url: 'css/img/itsago2.jpg'});
});

router.get("/login", function(req,res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      if (err) throw err;
      res.redirect("/dashboard")
    });
  } else {
    res.render("login",{url:'css/img/itsago.jpg'});
  }

});

router.get("/signup", function(req,res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      if (err) throw err;
      res.redirect("/dashboard")
    });
  } else {
    res.render("signup", {url: 'css/img/itsago.jpg'});
  }
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

router.get("/event/:id", function(req,res) {
  db.Event.findOne({
  where: {
      id: req.params.id
    }
  })
  res.render("event",{url: 'css/img/itsago3.jpg'})
});

router.get("/dashboard", function(req, res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);
      db.User.findOne({
        where: {
        	uuid: decoded.user
      }
        }).then(function(results) {
          if (results) {
            console.log(results.dataValues);
            res.render("dashboard", results.dataValues);
          } else {
            res.render("signup");
          }

      });
    });
  } else { // They aren't signed in.
    res.redirect("/")
  }
});

router.get("/about", function(req,res) {
    res.render("about", {url:'css/img/itsago5.jpg'});
});

router.get("/stripetest", function (req, res) {
  res.render("stripetest")
})

router.get("/signout", function (req, res) {
  res.clearCookie("cookiename");
  res.render("splash", {url: 'css/img/itsago2.jpg'})
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
