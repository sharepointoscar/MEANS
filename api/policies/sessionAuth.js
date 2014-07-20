/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

// User is allowed, proceed to the next policy,
// or if this is the last policy, the controller
//  console.log('sessionAuth--------------------------- ',req)
// console.log('req.user--------------------------- ',req.user)
//   console.log('req.session.passport.user--------------------------- ',req.session.passport.user)
//  //console.log('sessionAuth------------------isAuthenticated--------- ',req.isAuthenticated());//sails)
//  console.log('req.session.passport.user.Authenticated--------------------------- ',req.session.passport.user.Authenticated)
//  if (req.session.passport.user) {
    console.log('api/policies/sessionAuth.js--------------------------- ')
    console.log('req.session--------------------------- ', req.session,req.session.user)
    console.log('req.session.authenticated--------------------------- ', req.session.authenticated)

    if (req.session.authenticated) {
        return next();
    }
    return res.forbidden('You are not permitted to perform this action.');
};
