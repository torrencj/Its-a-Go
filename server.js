// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
// var handlebars = require("express-handlebars");

// Set up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8081;

// Requiring our models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set up method overriding
app.use(methodOverride("_method"));

// Static directory
app.use(express.static("app/public"));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ 
	defaultLayout: "main", 
	layoutsDir: "app/views/layouts/" 
}));
app.set("view engine", "handlebars");
app.set('views', __dirname + '/app/views');

// Main route
//TODO: Routes should only go in the controllers, I think? I'm not really clear on where the index
//      route should go.
// =============================================================
var htmlcontroller = require("./app/controllers/htmlcontroller.js");
app.use("/", htmlcontroller);

var eventcontroller = require("./app/controllers/eventcontroller.js");
app.use("/api/event", eventcontroller);

var usercontroller = require("./app/controllers/usercontroller.js");
app.use("/api/user", usercontroller);


// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


