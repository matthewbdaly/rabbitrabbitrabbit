// Declare variables used
var MessageView, MessageListView;

// View for messages
MessageView = Backbone.Marionette.ItemView.extend({
    template: '#message-item',

    tagName: 'li',

    className: 'list-group-item'
});

// View for message list
MessageListView = Backbone.Marionette.CollectionView.extend({
    itemView: MessageView,

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
