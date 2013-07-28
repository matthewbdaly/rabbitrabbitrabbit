$(document).ready(function () {
    'use strict';

    // Declare variables used
    var App, app, Message, Messages, MessageView, messages = [], socket, field, sendButton, content;

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

    // View for messages
    MessageView = Backbone.View.extend({
        tagName: 'li',

        render: function () {

            // Create the HTML
            var template = _.template('<%= text %>');
            this.$el.html(template(this.model.toJSON()));

            // Return the object
            return this;
        }
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

    // Main view
    App = Backbone.Router.extend({

        routes: {
            "": "index"
        },

        index: function () {
        }
    });

    app = new App();
    Backbone.history.start();
});
