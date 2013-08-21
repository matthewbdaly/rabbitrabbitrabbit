// Declare the variables used
var assert = require('chai').assert,
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
            done();
        });
    });
});

// Test the messages route
describe('Test the messages route', function () {
    it("should return JSON", function (done) {
        request.get({ url: 'http://localhost:5000/messages' }, function (error, response, body) {
            assert.equal(response.headers['content-type'], 'application/json');
            done();
        });
    });
});
