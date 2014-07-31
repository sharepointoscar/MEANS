'use strict';
var util = require('util');

describe('MEANS App', function () {

    describe('Login scenarios', function () {
        var email;
        var password;
        var loginButton;

        it('should login user with valid credentials, redirect to member homepage', function () {

            browser.get('/login');

            email = element(by.id('InputUsername'));
            password =   element(by.id('InputPassword'));
            loginButton = element(by.className('btn-success'));

            //send the credentials and click to login
            email.sendKeys('oscar.medina@gmail.com');
            password.sendKeys('theace01');
            loginButton.click();

        });

        it('then ensure user is logged in', function () {

            /**
             * here find an element on the page that only authenticated
             * users see, such as the logged in Username element on the top nav
             * AND The element must be displayed on the page.
             **/
            element(by.id('currentUserMenu')).then(function (usernameelement) {

                expect(usernameelement.isDisplayed()).toBe(true);
                expect(usernameelement.getText()).toEqual('Oscar');

            });
        });

    });

    /**
     * Let's ignore these scenarios for now by marking it with 'xdescribe'
     */
    xdescribe('Signup scenarios', function () {
        var email;
        var password;
        var loginButton;

        it('should create new account successfully', function () {

        });


        /*
         it('should warn on missing/malformed credentials', function() {
         email.clear();
         password.clear();

         password.sendKeys('test');
         loginButton.click();
         expect(error.getText()).toMatch('missing email');

         email.sendKeys('test');
         loginButton.click();
         expect(error.getText()).toMatch('invalid email');

         email.sendKeys('@example.com');
         password.clear();
         loginButton.click();
         expect(error.getText()).toMatch('missing password');
         });

         it('should accept a valid email address and password', function() {
         email.clear();
         password.clear();

         email.sendKeys('test@example.com');
         password.sendKeys('test');
         loginButton.click();
         expect(browser.getCurrentUrl()).not.toEqual(loginURL);
         });*/

    });

});
