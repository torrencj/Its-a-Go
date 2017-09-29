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

//First step in event creation.
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

//show the page to add guests
router.get("/addGuests", function(req,res) {
  if (req.cookies.cookiename) {
    jwt.verify(req.cookies.cookiename.token, secret, function(err, decoded) {
      console.log("Info stored in token:");
      console.log(decoded);
      res.render("addGuests", decoded);
    });
  } else { // They aren't signed in.
    res.redirect("/")
  }
});



// router.get("/:id", function(req,res) {
//     res.render("event");
// });



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
    res.render("about");
});

router.get("/stripetest", function (req, res) {
  res.render("stripetest")
})

router.get("/signout", function (req, res) {
  res.clearCookie("cookiename");
  res.render("splash")
})

//NOT protected.
router.get("/:eventId", function(req, res) {
  console.log(req.params.eventId);
  db.Event.findOne({
    where: {
      id: req.params.eventId
    }
  }).then(function(eventData) {
    console.log(eventData.dataValues);
    if (eventData) {
      res.render("event", eventData.dataValues);
    } else {
      res.send("Nuthin here.")
    }
  })
});

router.get("/event", function(req,res) {
    res.render("event");
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
