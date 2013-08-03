// Declare the variables used
var assert = require('chai').assert,
    request = require('request');

// Test the index route
describe('Test the index route', function () {
    it("should return a page with the title RabbitRabbitRabbit", function (done) {
        request.get({ url: 'http://localhost:5000' }, function (error, response, body) {
            assert.include(body, 'RabbitRabbitRabbit', 'Response contains the string "RabbitRabbitRabbit"');
            done();
        });
    });
});
