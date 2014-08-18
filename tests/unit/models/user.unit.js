var User = require('../../../api/models/User'),
    Passport = require('../../../api/models/Passport'),
    sinon = require('sinon'),
    assert = require('assert');

//
//describe('The User-Passport Model', function () {
//    describe('before Local User is created', function () {
//        it ('should hash the password in passprt collection', function (done) {
//
//            Passport.beforeCreate({
//                password: 'password'
//            }, function (err, paasport) {
//                assert.notEqual(paasport.password, 'password');
//                done();
//            });
//        });
//    });


describe('The User Model', function () {

    describe('#findAll()', function() {
        it('should get all Users', function (done) {
            User.getAll().then(function(users) {

                assert.notEqual(users, undefined);

                done();

            }).fail(done);
        });
    });

});