var User = require('../../../api/models/User'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The User Model', function () {
    describe('before Local User is created', function () {
        it ('should hash the password', function (done) {
            User.beforeCreate({
                password: 'password'
            }, function (err, user) {
                assert.notEqual(user.password, 'password');
                done();
            });
        });
    });
});