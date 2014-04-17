//https://github.com/ryancp/sailng
module.exports = {
    getAll: function(req, res) {
        Todo.getAll()
            .spread(function(models) {
                console.log('socket ',models);//req.socket)
                Todo.watch(req); //replaces Todo.autosubscribe;
                Todo.subscribe(req.socket, models);

                res.json({data: models});
            })
            .fail(function(err) {
                // An error occured
            });
    },

    getOne: function(req, res) {
        Todo.getOne(req.param('id'))
            .spread(function(model) {
                Todo.subscribe(req.socket, model);
                res.json(model);
            })
            .fail(function(err) {
                res.send(404);
            });
    },

    create: function (req, res) {
        var userId = req.param('user');
        console.log('userID', userId);
        var model = {
            title: req.param('title'),
            user: userId
            //user: req.param('user')
        };

        // TODO: upon message creation, how to populate the user here, so the associated user gets sent back as a property of the message
        Todo.create(model)
            .done(function(err, model) {
                if (err) {
                    return console.log(err);
                }
                else {
                    console.log('in todo create')
                    Todo.publishCreate(model);
                    res.json(model);
                }
            });
    },

    destroy: function (req, res) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }

        // Otherwise, find and destroy the model in question
        Todo.findOne(id).done(function(err, model) {
            if (err) {
                return res.serverError(err);
            }
            if (!model) {
                return res.notFound();
            }

            Todo.destroy(id, function(err) {
                if (err) {
                    return res.serverError(err);
                }

                Todo.publishDestroy(model.id);
                return res.json(model);
            });
        });
    }

};

//
//
//TodoController = {
//    /**
//     * Overrides for the settings in `config/controllers.js`
//     * (specific to TodoController)
//     */
//    getAll: function (req, res) {
//
//        console.log('Todo getAll... ');
//        Todo.getAll()
//            .spread(function (models) {
//                Todo.subscribe(req.socket, models);
//                console.log('models ',models)
//              //  Todo.watch(req.socket, models);
//                res.json({data: models});
//            })
//            .fail(function (err) {
//                // An error occured
//            });
//    },
//    create: function (req, res) {
//        var model = {
//            title: req.param('title'),
//            user: req.param('user')
//        };
//
//        // TODO: upon message creation, how to populate the user here, so the associated user gets sent back as a property of the message
//        Message.create(model)
//            .done(function (err, model) {
//                if (err) {
//                    return console.log(err);
//                }
//                else {
//                    Message.publishCreate(model);
//                    res.json(model);
//                }
//            });
//    },
//
//    destroy: function (req, res) {
//
//        var id = req.param('id');
//        console.log('Todo destroy... ', id);
//        if (!id) {
//            return res.badRequest('No id provided.');
//        }
//
//        // Otherwise, find and destroy the model in question
//        Todo.findOne(id).done(function (err, model) {
//            if (err) {
//                return res.serverError(err);
//            }
//            if (!model) {
//                return res.notFound();
//            }
//
//            Todo.destroy(id, function (err) {
//                if (err) {
//                    return res.serverError(err);
//                }
//                console.log('Todo model... ', model);
//                console.log('Todo modelid... ', model.id)
//                Todo.publishDestroy(model.id);
//                return res.json(model);
//            });
//        });
//    },
//
//
////    index: function (req, res, next) {
////        console.log('Todo index... ');
////        Todo.find(function foundTodos(err, todos) {
////            if (err) return next(err);
////
//////      // subscribe this socket to the User model classroom
//////      //jrt  User.subscribe(req.socket);  // 4-4-2014 this is a bug
//////
//////      // subscribe this socket to the user instance rooms
//////        //todos = []
////////      Todo.subscribe(req.socket, todos);
//////     // console.log('Todo index subscribe... ', todos);
//////      Todo.subscribe('responsetodo',jj);
//////      //socket.emit('responsedaily', output);
//////      //Todo.subscribe(req.socket, todos);//jj);
////
////            Todo.watch(req.socket, todos);
////            jj = {data: todos};
////
////            res.json(jj);//todos);
////            console.log('Todo index subscribe... ', jj);
//////      res.send(200);
////            //    return res.json(jj);
////            // return res.view();
////        })
////    },
////    index2: function (req, res, next) {
////        console.log('Todo index2... ');
////        Todo.find(function foundTodos(err, todos) {
////            if (err) return next(err);
////
////            // subscribe this socket to the User model classroom
////            //jrt  User.subscribe(req.socket);  // 4-4-2014 this is a bug
////
////            // subscribe this socket to the user instance rooms
////
////            Todo.subscribe(req.socket, todos);
////            console.log('Todo index2 subscribe... ', todos);
////        })
////    },
////
////    subscribe: function (req, res, next) {
////        console.log('Todo subscribe... ');
////        Todo.find(function foundTodos(err, todos) {
////            if (err) return next(err);
////
////            // subscribe this socket to the User model classroom
////            //jrt  User.subscribe(req.socket);  // 4-4-2014 this is a bug
////
////            // subscribe this socket to the user instance rooms
////
////            Todo.subscribe(req.socket, todos);
////            console.log('Todo subscribe... ', todos);
////        })
////    },
////    _config: {}
//
//
//};
//module.exports = TodoController;
//
//
//console.log('TodoController ', TodoController)
