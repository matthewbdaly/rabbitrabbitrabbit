// Declare variables used
var Message;

// Model for messages
Message = Backbone.Model.extend({

    // Default values
    defaults: {
        text: ''
    },

    // Prevent submit
    sync: function () { return false; }
});
