/**
 * Policy mappings (ACL)
 *
 * Policies are simply Express middleware functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect just one of its actions.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access) 
  '*': true,

  // we are saying this size is localized be default.  Comment out otherwise.
  //'*':  'localize',

  '*': [ 'passport' ],


    'TodoController':{
        '*': 'sessionAuth'
        // Apply 'isLogged' in by default to all actions that are NOT specified below
//        '*': 'isLoggedIn',
//        // If an action is explicitly listed, its policy list will override the default list.
//        // So, we have to list 'isLoggedIn' again for the 'edit' action if we want it to be applied.
//        edit: ['isAdmin', 'isLoggedIn']
    },

    'todos':
    {
        '*': 'passport'
    }

};

