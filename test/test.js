// Declare the variables used
var assert = require('chai').assert,
    io = require('socket.io-client'),
    request = require('request'),
    server = require('../index');

// Server tasks
describe('server', function () {
    // Beforehand, start the server
    before(function (done) {
        console.log('Starting the server');
        done();
    });

    // Afterwards, stop the server
    after(function (done) {
        console.log('Stopping the server');
        done();
    });
});

// Test the index route
describe('Test the index route', function () {
    it("should return a page with the title RabbitRabbitRabbit", function (done) {
        request.get({ url: 'http://localhost:5000' }, function (error, response, body) {
            assert.include(body, 'RabbitRabbitRabbit', 'Response contains the string "RabbitRabbitRabbit"');
            assert.equal(response.statusCode, '200');
            assert.equal(response.headers['content-type'], 'text/html; charset=utf-8');
            done();
        });
    });
});

// Test the messages route
describe('Test the messages route', function () {
    it("should return JSON", function (done) {
        request.get({ url: 'http://localhost:5000/messages' }, function (error, response, body) {
            assert.equal(response.statusCode, '200');
            assert.include(response.headers['content-type'], 'application/json');
            done();
        });
    });
});

// Test sending a message
describe('Test sending a message', function () {
    it("should return 'Message received'", function (done) {
        // Connect to server
        var socket = io.connect('http://localhost:5000', {
            'reconnection delay' : 0,
            'reopen delay' : 0,
            'force new connection' : true
        });

        // Handle the message being received
        socket.on('message', function (data) {
            assert.include(data.message, 'Message received');
            done();
        });

        // Send the message
        socket.emit('send', { message: 'Message received' });
    });
});
