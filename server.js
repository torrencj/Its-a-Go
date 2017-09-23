// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var handlebars = require("express-handlebars");

// Set up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set up method overriding
app.use(methodOverride("_method"));

// Set up handlebars
app.engine("handlebars", handlebars({
  defaultLayout: "main",
  layoutsDir: "app/views/layouts/"  //We need this because server.js is one folder up from views
}));
app.set("view engine", "handlebars");
app.set('views', __dirname + '/app/views'); //We need this because server.js is one folder up from views

// Static directory
app.use(express.static("public"));

// Main route
//TODO: Routes should only go in the controllers, I think? I'm not really clear on where the index
//      route should go.
// =============================================================
app.get("/", function(req,res) {
    res.render("index");
});

<<<<<<< HEAD
var eventcontroller = require("./app/controllers/eventcontroller.js")
app.use("/api/event", eventcontroller);
=======
var usercontroller = require("./app/controllers/usercontroller.js");

app.use("/api/user", usercontroller);
>>>>>>> e41503fa57b97802bda000f6f9a41b46478b400f

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
