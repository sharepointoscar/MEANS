/**
 * localize
 *
 * @module      :: Policy
 * @description :: Simple policy to localize the site
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

    req.locale = req.param('lang');
    console.log('localize.js local: ', req.locale);
    next();

};