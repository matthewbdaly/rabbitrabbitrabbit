// Use strict
"use strict";

// Declare variables used
var app, express, io, port;

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

// Serve static files
app.use(express.static(__dirname + '/public'));

// Listen
io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

// Handle new comments
io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
