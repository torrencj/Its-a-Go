var fs         = require('fs');
var express    = require('express');
var router     = express.Router();
var path       = require('path')
var db         = require("../models");
var bcrypt     = require('bcrypt');
var jwt        = require('jsonwebtoken');
var nodemailer = require('nodemailer');

// var pw = fs.createReadStream(path.join(__dirname, '../emailtemplates/welcome.html'));

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'itsagoinfo@gmail.com',
        pass: "This is a totally secure password isn't it?"
        //TODO Change this to an environment variable
    }
});


const saltRounds = 10;

//test stripe
router.post('/savecc', (req, res) => {
  var stripe = require("stripe")(
    "sk_test_BXX25dhatRKrf5ARZ6FxpZGp"
  );

  console.log(req.body);

  stripe.customers.create({
    description: `Customer for ${req.body.stripeEmail}`,
    email: req.body.stripeEmail,
    source: req.body.stripeToken // obtained from the client side JS.
  }, function(err, customer) {
  //TODO update user in our DB with their token and what they've agreed to pay?
  // asynchronously called
  console.log(customer);
  console.log(customer.id); //Used in fetching:
  /*
  //Fetching:
  stripe.customers.retrieve(
  "cus_BTiNyUr7MGy8aG",
  function(err, customer) {
    // asynchronously called
  });
  */

  // Charge the user's card:
  stripe.charges.create({
    amount: 1000,
    currency: "usd",
    description: "Joe's BBQ",
    customer: customer.id,
  }, function(err, charge) {
    // asynchronously called
    console.log(charge);
  });

});
})
// Add a new user.
router.post('/new', function(req, res) {
  var welcomeEmail = fs.createReadStream(path.join(__dirname, '../emailtemplates/welcome.html'));

  var mailOptions = {
    from: 'itsagoinfo@gmail.com', // sender address
    to: req.body.email,           // user email
    subject: 'This is a test',    // Subject line
    html: welcomeEmail              //File stream body....
  };

  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    console.log(hash);
    req.body.hash = hash;
    db.User.create(req.body).then(function(data) {

      transporter.sendMail(mailOptions, function (err, info) {
         if(err) //TODO Need to check if file stream is still open and close if needed.
           console.log(err)
         else
           console.log(info);
      });
      // res.send(data);
      res.redirect("/dashboard"); // Shouldn't this go to /api/user/dashboard????
    });
  });
});


// User login
router.post('/login', function(req, res) {
  console.log(req.cookies)
  console.log(req.body);
  // Find the user in the DB
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userRecord => {
    if (userRecord === null) {
      res.send("No user found.")
    } else {
      bcrypt.compare(req.body.password, userRecord.hash, function(err, response) {
        if (err) throw err;
        console.log(response);
        if (response) {
          //TODO Make sure this is an appropriate use of filesync.
          //TODO Set heroku environment variable config to keep our secret safe.
          var cert = fs.readFileSync(path.join(__dirname, '../../private.pem'));  // get private key
          console.log(userRecord.uuid);

          jwt.sign({
            user: userRecord.uuid,
            auth: 'true'
          }, cert, function(err, token) {
            console.log(token);
            let options = {
              token: token,
              maxAge: 1000 * 60 * 15, // would expire after 1 hour
              httpOnly: true, // The cookie only accessible by the web server
              signed: true // Indicates if the cookie should be signed
          }
            res.cookie('cookiename', options)
            res.redirect("/dashboard");
          });
        } else {
          //Wrong password.
          res.send(`Wrong password! Try again.`)
        }
      });
    }
  });
});

module.exports = router;
