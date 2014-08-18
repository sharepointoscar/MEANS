var HomeController = require('../../../api/controllers/HomeController'),
    sinon = require('sinon'),
    assert = require('assert'),
    Sails = require('sails'),
    app;

before(function (done) {

    this.timeout(5000);

    Sails.lift({

        log: {
            level: 'error'
        },

        adapters: {
            'default': 'someMongodbServer',
           MongodbServer: {
                adapter   : 'sails-mongo',
                host      : 'localhost',
                port      : 27017,

                database: 'means-seed'
            }
        }

    }, function (err, sails) {
        app = sails;
        done(err, sails);
    });
});


after(function (done) {
    app.lower(done);
});

describe('The Home Controller', function () {
    var view = sinon.spy();
    var req = {};
    var res = {view:view};
    req.user = {user:{first_name:'oscar'}};

    describe('when we load the home page', function () {

        it ('should contain user', function () {
            assert.ok(req.user);
        });
        it ('should render the view', function () {

            HomeController.index(req,res, {
                view: view,
                title: 'Home - MEANS',
                navItems: {},
                currentUser: req.user,
                locales: app.config.i18n.locales,
                layout: '/layouts/internal'
            });
            assert.ok(view.called);
        });

    });
});