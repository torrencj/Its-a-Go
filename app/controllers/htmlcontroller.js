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
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      if (err) throw err;
      res.redirect("/dashboard")
    });
  } else {
    res.render("signup");
  }
});

router.get("/create-event-1of2", function(req,res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);

      res.render("create-event-1of2", decoded);

    });
  } else { // They aren't signed in.
    res.redirect("/create-event-2of2")
  }
});

router.get("/create-event-2of2", function(req,res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);

      res.render("create-event-2of2", decoded);

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
      db.User.findOne({
        where: {
        	uuid: decoded.user
      }
        }).then(function(results) {
          console.log(results.dataValues);
      res.render("dashboard", results.dataValues);
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

router.get("/signout", function (req, res) {
  res.clearCookie("cookiename");
  res.render("splash")
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
