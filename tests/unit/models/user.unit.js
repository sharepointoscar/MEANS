var User = require('../../../api/models/User'),
// sinon = require('sinon'),
    assert = require('assert'),
    should = require('should'),
    Sails = require('sails');

describe('The User Model', function () {
    var _users=null;
    before(function (done) {


        User.getAll().then(function (users) {

            _users = users;

            done();

        }).fail(done);
    });

    after(function (done) {

        done();
    });

    describe('#findAll()', function () {
        it('should return a user records', function (done) {

            assert.notEqual(_users, undefined);
            _users.should.be.an.Array.and.an.Object;
               console.log()
            done();
        });
        it('and should contain user records', function (done) {

            _users.length.should.be.above(0);

            done();
        });

    });

    xdescribe('#insert()', function () {

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
    xdescribe('#getOne()', function () {

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

