$(document).ready(function () {
    'use strict';

    // Declare variables used
    var App, app, Message, Messages, MessageView, MessageListView, messages = [], socket, field, sendButton, content;

    // Model for messages
    Message = Backbone.Model.extend({

        // Default values
        defaults: {
            text: ''
        },

        // Prevent submit
        sync: function () { return false; }
    });

    // Collection for messages
    Messages = Backbone.Collection.extend({

        // Will hold Message objects
        model: Message,

        // Set URL
        url: '/messages'
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

    // View for message list
    MessageListView = Backbone.View.extend({
        intialize: function () {
            // Set up event listeners
            this.collection.on('sync', this.render);
            this.collection.on('create', this.render);
        },

        render: function () {

            // Cache selector
            this.container = $('ul#content');

            // Empty out any existing content
            this.container.empty();

            // Render messages
            this.collection.each(function (message) {
                var view = new MessageView({ model: message });
                this.container.append(view.render().el);
            }, this);
        }
    });

    // Set variables
    socket = io.connect('http://localhost');
    field = $('input#field');
    sendButton = $('input#send');
    content = $('ul#content');

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
            // Declare variables
            var messagelistview, messagelist;

            // Set messagelist
            messagelist = new Messages();

            // Populate the message list
            messagelist.fetch()
                .complete(function () {
                    // Render message mist
                    messagelistview = new MessageListView({ collection: messagelist });
                    messagelistview.render();

                    // Handle new posts
                    socket.on('message', function (data) {
                        if (data.message) {
                            messagelist.create({text: data.message});
                            messagelistview.render();
                        } else {
                            console.log('There is a problem:', data);
                        }
                    });
                });
        }
    });

    app = new App();
    Backbone.history.start();
});
