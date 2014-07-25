    /**
 * Todo
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	title: {
      type: 'string',
      required: true
    },
    isComplete: {
      type: 'boolean',
      defaultsTo: false
    },
      status:{
          type: 'string',
          required: true
      },

      user: {
          model: 'user'
      }
  },

    afterCreate: function (todo, next) {
        // set message.user = to appropriate user model
        User.getOne(todo.user)
            .spread(function(user) {
                todo.user = user;
                next(null, todo);
            });
    },

    getAll: function() {
        return Todo.find()
            // TODO: sort by createdAt DESC does not work here
            //.sort('title')
            .populate('user')
            .then(function (models) {
                return [models];
            });
    },
    getOne: function(id) {
    return Todo.findOne(id)
        .populate('user')
        .then(function (model) {
            // you have the option to do something with the model here if needed, before returning it to the controller
            return [model];
        });
}

};
