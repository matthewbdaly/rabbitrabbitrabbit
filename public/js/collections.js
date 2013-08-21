// Declare variables used
var Messages;

// Collection for messages
Messages = Backbone.Collection.extend({

    // Will hold Message objects
    model: Message,

    // Set URL
    url: '/messages'
});
