/*jslint node: true */
"use strict";

// Declare variables used
var app, express, io, mongoose, port;

// Define values
express = require("express");
app = express();
mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/rabbitrabbitrabbit';
port = process.env.PORT || 5000;

// Connect to the database
mongoose.connect(uristring);

// Create a model for the messages
var MessageSchema = mongoose.Schema({
    text: {
        type: String,
        match: /^(\w+)/
    }
});
var Message = mongoose.model('Message', MessageSchema);

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

// Define routes
app.get("/", function (req, res) {
    res.render("index");
});

app.get("/messages", function (req, res) {
    Message.find(function (err, messages) {
        /* istanbul ignore if */
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.json(messages);
        }
    });
});

// Serve static files
app.use(express.static(__dirname + '/public'));

// Listen
io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

// Use long polling as Heroku requires this
io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

// Handle new comments
io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
        var newmessage;

        // Store it in the database
        newmessage = new Message({ text: data.message });
        newmessage.save(function (err) {
            if (err) {
                // Emit the error
                data.error = 'Error: ' + err;
                data.message = null;
                io.sockets.emit('error', data);
            } else {
                io.sockets.emit('message', data);
            }
        });
    });
});
