var _ = require('lodash');
var moment = require('moment');

module.exports = {
    getAll: function (req, res) {

        console.log('user ', req.user);//user.id)
            console.log('all  ');//user.id)
            Message.getAll()
                .spread(function (models) {
                    //   console.log('socket ',req.socket.id);//req.socket)
                    Message.watch(req);
                    Message.subscribe(req.socket, models);//,'mess');
// user get in thru model
                    models.forEach(function (mess) {
                        mess.date = moment(mess.date).format("MM/DD/YYYY");
                        mess.date2 = moment(mess.date).format("dddd");

                    });
                    console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model instances in \'messages\'.', models);
                    res.json({data: models});
                })
                .fail(function (err) {
                    // An error occured
                });

    },

    getAllConditional: function (req, res) {
//        var userId = req.param('user');
//        console.log('in start ',userId)
        console.log('user ', req.user);//user.id)
        if (req.user.role === 4) {
            console.log('all  ');//user.id)
            Message.getAll()
                .spread(function (models) {
                    //   console.log('socket ',req.socket.id);//req.socket)
                    Message.watch(req);
                    Message.subscribe(req.socket, models);//,'mess');
// user get in thru model
                    models.forEach(function (mess) {
                        mess.date = moment(mess.date).format("MM/DD/YYYY");
                        mess.date2 = moment(mess.date).format("dddd");

                    });
                    console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model instances in \'messages\'.', models);
                    res.json({data: models});
                })
                .fail(function (err) {
                    // An error occured
                });
        } else {

            console.log('not admin..  ', req.user);//user.id)  +'534a94c661ba56e422e1f4a3'
            console.log('id::  ', req.user.id);
            console.log('username::  ', req.user.username);

            Message.find({user: req.user.id})
                .exec(function (err, models) {
                    // we must asign user
                    console.log('not admin  ', models, req.user);//.id);//user.id)
                    models.forEach(function (mess) {
                        mess.date = moment(mess.date).format("MM/DD/YYYY");

                    });
                    console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model instances in \'messages\'.', models);
                    Message.watch(req);
                    Message.subscribe(req.socket, models);//,'mess');

                    res.json({data: models});
                })
//                .fail(function (err) {
//                    // An error occured
//                });
        }
    },

    getOne: function (req, res) {
        Message.getOne(req.param('id'))
            .spread(function (model) {
                Message.subscribe(req.socket, model);
                res.json(model);
            })
            .fail(function (err) {
                res.send(404);
            });
    },

    create: function (req, res) {
        var userId = req.param('user');
        var date = req.param('date');
        var cd1 = moment(date).format("MM/DD/YYYY");
        var cd2 = moment(date).format("dddd");
        var model = {
            title: req.param('title'),
            date: date,
            date2: cd1,
            date3: cd2,
            status: req.param('status'),
            user: userId     

        };
        console.log('in create', model)
        Message.create(model)
            .exec(function (err, message) {
                if (err) {
                    return console.log(err);
                }
                else {
                    Message.publishCreate(message);
                    res.json(message);
                }
            });
    },
    update: function (req, res, next) {
        console.log('in update', req.params.all())
        var id = req.param("id");
        var status = req.param("status");
        var title = req.param("title");
        console.log('in update', status, id)
        if (status && title && req.isSocket) {
            Message.update(id, {status: status, title: title }).exec(function update(err, updated) {
                Message.publishUpdate(updated[0].id, { status: updated[0].status, title: updated[0].title });

            })
        } else {
            if (status && req.isSocket) {
                Message.update(id, {status: status }).exec(function update(err, updated) {
                    Message.publishUpdate(updated[0].id, { status: updated[0].status });

                })
            }
        }
    },
//                .exec(function (err, message) {
//                    if (err) {
//                        return console.log(err);
//                    }
//                    else {
//                        console.log('in publishUpdate', message)
//                        // This does not work
//                        // Message.publishUpdate(message.id, message) // Subscription
//                        // Calls.publishUpdate(call.id,{updatedId:call.id});
//                        // This does
//                        //    Message.publish(message, {updatedId: message.id});
//                        //                    Message.publish(message.id, {
//                        //                        id: message.id
//                        //                    });

    destroy: function (req, res) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }

        // Otherwise, find and destroy the model in question
        Message.findOne(id).exec(function (err, model) {


            if (err) {
                return res.serverError(err);
            }
            if (!model) {
                return res.notFound();
            }

            Messageaudit.create(model)
                .exec(function (err, message) {
                    if (err) {
                        return console.log(err);
                    }
                    else {

                    }
                });
            Message.destroy(id, function (err) {
                if (err) {
                    return res.serverError(err);
                }

                Message.publishDestroy(model.id);
                return res.json(model);
            });
        });
    }

};