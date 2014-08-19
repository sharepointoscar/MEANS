var User = require('../../../api/models/User'),
   // sinon = require('sinon'),
    assert = require('assert'),
    should = require('should'),
    Sails = require('sails');



describe('The User Model', function () {
    describe('before Local User is created', function () {
        it ('should hash the password', function (done) {
            User.beforeCreate({
                password: 'password'
            }, function (err, user) {
                assert.notEqual(user.password, 'password');
                done();

            }).fail(done);
        });
    });

    xdescribe('sign up', function () {

        it ('should create User', function (done) {

            var sampleuser = {
                username: 'jamesH',
                email: 'james@yahoo.com',
                password:'mypassword',
                first_name:'james',
                role: 3

            };

            User.insert(sampleuser)
                .exec(function(err, newUser) {

                    console.log('error creating user ',err);
                    newUser.username.should.equal('jamesH');
                    assert.notEqual(newUser, undefined);

                    done();

                }).fail(done);
        });
    });

});

