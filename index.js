// Use strict
"use strict";

// Declare variables used
var app, express, io, mongoose, port;

// Define values
express = require("express");
app = express();
mongoose = require('mongoose');
port = process.env.PORT || 5000;

// Connect to the database
mongoose.connect('mongodb://localhost/rabbitrabbitrabbit');

// Create a model for the messages
var Message = mongoose.model('Message', { text: String });

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
        // Emit the message
        io.sockets.emit('message', data);

        // Also store it in the database
        var newmessage = new Message({ text: data.message });
        newmessage.save(function (err) {
            if (err) {
                console.log('Error: ' + err);
            }
        });
    });
});
