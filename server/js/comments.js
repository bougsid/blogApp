Comments = new Mongo.Collection('comments');

CommentsPages = new Meteor.Pagination(Comments, {
    perPage: 4,
    sort: {createdAt: -1},
    availableSettings: {
        pageTemplate: true,
        perPage: true,
        sort: true,
        itemTemplate: true,
        filters: true
    }
});

Meteor.methods({
    addComment: function (_idPost, content) {
        if (Meteor.user() != null){
            Comments.insert({
                idPost: _idPost,
                author: Meteor.userId(),
                content: content,
                createdAt: Date.now(),
            });
        }
    },
    editComment: function (id, content) {
        if (Meteor.user() != null)
            Comments.update({_id: id}, {
                $set: {
                    'content': content,
                }
            })
    },
    removeComment: function (id) {
        Comments.remove({
            _id: id
        })
    }
})