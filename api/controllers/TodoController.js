
//https://github.com/ryancp/sailng

// Subscribes client to ONLY the create and destroy events for every `User` record.

//User.find({}).exec(function(e,listOfUsers){
//    User.subscribe(req.socket,listOfUsers,['create','destroy']);
//});
module.exports = {

    find: function(req, res) {
        Todo.getAll()
            .spread(function(models) {
               console.log('find ',req.socket.id);//req.socket
                Todo.watch(req);

                //  Todo.watch(req.socket, models);
                //  Todo.subscribe(req.socket, models);
                //  Todo.subscribe(req.socket,models,['create','destroy','update']);
                Todo.subscribe(req.socket,models);
//                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.',models);
                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.');
                console.log('1-----------------------------------------')
                console.log('-----------------------------------------')
                console.log('-----------------------------------------')
                console.log('-------------------,req.user----------------------',req.user)
                console.log('-----------------------------------------')
                console.log('-----------------------------------------')



//                //Todo.autosubscribe;
                res.json({data: models});
            })
            .fail(function(err) {
                // An error occured
            });
    },

    getAll: function(req, res) {
        Todo.getAll()
            .spread(function(models) {
                console.log('socket getAll',req.socket.id);//req.socket)

//Todo.autosubscribe();
                Todo.watch(req);
              //  Todo.watch(req.socket, models);  //old Todo.autosubscribe;
              //  Todo.subscribe(req.socket, models);
              //  Todo.subscribe(req.socket,models,['create','destroy','update']);
                Todo.subscribe(req.socket,models);
               // console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.',models);
                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.');
                console.log('--api/controllers/TodoController.js/getAll---------------------------------------')
                console.log('-----------------------------------------')
                console.log('-----------------------------------------')
                console.log('req.session.user----------------------',req.session.user)
                console.log('-----------------------------------------')
                console.log('-----------------------------------------')


                res.json({data: models});
            })
            .fail(function(err) {
                // An error occured
            });
    },
//    getAll: function(req, res) {
//    Todo.getAll().exec(function(e,listOfTodos){
//console.log('listOfTodos ',e,listOfTodos)
//        Todo.subscribe(req.socket,listOfTodos,['create','destroy','update']);
//        res.json({data: listOfTodos});
//        });
//     },
    getOne: function(req, res) {
        Todo.getOne(req.param('id'))
            .spread(function(model) {
                Todo.subscribe(req.socket, model);
                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.');
                console.log('--3---------------------------------------')
                console.log('-----------------------------------------')
                console.log('-----------------------------------------')
                console.log('-------------------,req.session.user----------------------',req.session.user)
                console.log('-----------------------------------------')
                console.log('-----------------------------------------')
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

            status: req.param('status'),
            user: userId

        };

        // TODO: upon message creation, how to populate the user here, so the associated user gets sent back as a property of the message
        Todo.create(model)
            .exec(function(err, model) {
                if (err) {
                    return console.log(err);
                }
                else {
                    //console.log('in todo create')
                    console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model create in \'todos\'.');
                    Todo.publishCreate(model);
                    res.json(model);
                }
            });
    },
    update: function (req, res, next) {
     //   console.log('in update', req.params.all())
        var id = req.param("id");
        var status = req.param("status");
        var title = req.param("title");
        //voteable=(age<18)?"Too young":"Old enough";
        isComplete=(status===4)?true:false;
        console.log('in update', status, id)
        if (status && title && req.isSocket) {
            Todo.update(id, {status: status, title: title ,isComplete:isComplete}).exec(function update(err, updated) {
                Todo.publishUpdate(updated[0].id, { status: updated[0].status, title: updated[0].title });

            })
        } else {
            if (status && req.isSocket) {
                Todo.update(id, {status: status,isComplete:isComplete }).exec(function update(err, updated) {
                    Todo.publishUpdate(updated[0].id, { status: updated[0].status });

                })
            }
        }
    },
    destroy: function (req, res) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }

        // Otherwise, find and destroy the model in question
        Todo.findOne(id).exec(function(err, model) {
            if (err) {
                return res.serverError(err);
            }
            if (!model) {
                return res.notFound();
            }
            Audit.create(model)
                .exec(function (err, todo) {
                    if (err) {
                        return console.log(err);
                    }
                    else {

                    }
                });
            Todo.destroy(id, function(err) {
                if (err) {
                    return res.serverError(err);
                }
                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'Todo destroy \'.',model.id);
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
//            .exec(function (err, model) {
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
//        Todo.findOne(id).exec(function (err, model) {
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
