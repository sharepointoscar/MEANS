var User = require('../../../api/models/User'),
// sinon = require('sinon'),
    assert = require('assert'),
    should = require('should'),
    Sails = require('sails');

describe('The User Model', function () {

    describe('#findAll()', function () {
        it('should get all Users', function (done) {
            User.getAll().then(function (users) {

                assert.notEqual(users, undefined);

                done();

            }).fail(done);
        });
    });

    xdescribe('sign up', function () {

        it('should create User', function (done) {

            var sampleuser = {
                username: 'jamesH',
                email: 'james@yahoo.com',
                password: 'mypassword',
                first_name: 'james',
                role: 3

            };


            describe('#findAll()', function () {
                it('should get all Users', function (done) {
                    User.getAll().then(function (users) {

                        assert.notEqual(users, undefined);

                        done();

                    }).fail(done);
                });
            });


        });
    });

});

