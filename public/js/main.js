$(document).ready(function () {
    'use strict';

    // Declare variables used
    var messages = [], socket, field, sendButton, content;

    // Set variables
    socket = io.connect('http://localhost:5000');
    field = $('input#field');
    sendButton = $('input#send');
    content = $('div#content');

    // Handle new posts
    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data.message);
            var html = '';
            _.each(messages, function (message) {
                html += message + '<br />';
            });
            content.html(html);
        } else {
            console.log('There is a problem:', data);
        }
    });

    sendButton.on('click', function () {
        var text = field.val();
        socket.emit('send', { message: text });
        field.val('');
    });
});
