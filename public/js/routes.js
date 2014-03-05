// Declare variables used
var App;

// Router
App = Backbone.Router.extend({

    routes: {
        "": "index"
    },

    index: function () {
        // Declare variables
        var messagelistview, messagelist, field, sendButton, content, socket;

        // Set messagelist
        messagelist = new Messages();

        // Set variables
        socket = io.connect(window.location.href);
        field = $('input#field');
        sendButton = $('input#send');
        content = $('ul#content');

        // Handle sending messages
        sendButton.on('click', function () {
            var text = field.val();
            socket.emit('send', { message: text });
            field.val('');
        });

        // Populate the message list
        messagelist.fetch()
            .complete(function () {
                // Render message mist
                messagelistview = new MessageListView({ collection: messagelist });
                messagelistview.render();

                // Handle new posts and errors
                socket.on('message', function (data) {
                    if (data.error) {
                        alert('Your message must be at least one character long and not contain whitespace only');
                    } else {
                        messagelist.create({text: data.message});
                        messagelistview.render();
                    }
                });
            });
    }
});
