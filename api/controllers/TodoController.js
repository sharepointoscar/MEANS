
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
                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.');

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
                Todo.subscribe(req.socket,models);

                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.');
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
                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'todos\'.');
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

        var id = req.param("id");
        var status = req.param("status");
        var title = req.param("title");

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