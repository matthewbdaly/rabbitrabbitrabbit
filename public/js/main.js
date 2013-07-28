$(document).ready(function () {
    'use strict';

    // Declare variables used
    var Message, Messages, MessageView, messages = [], socket, field, sendButton, content;

    // Model for messages
    Message = Backbone.Model.extend({

        // Default values
        defaults: {
            text: ''
        }
    });

    // Collection for messages
    Messages = Backbone.Collection.extend({

        // Will hold Message objects
        model: Message,

        // Set URL
        url: '/messsages'
    });

    // Set variables
    socket = io.connect('http://localhost:5000');
    field = $('input#field');
    sendButton = $('input#send');
    content = $('ul#content');

    // Handle new posts
    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data.message);
            var html = '<li>' + data.message + '</li>';
            content.append(html);
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
