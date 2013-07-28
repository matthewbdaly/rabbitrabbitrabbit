// Use strict
"use strict";

// Declare variables used
var app, express, port;

// Define values
express = require("express");
app = express();
port = 3700;

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

// Define routes
app.get("/", function (req, res) {
    res.render("index");
});

// Listen
app.listen(port);
console.log("Listening on port " + port);
