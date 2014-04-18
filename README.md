# Sailng #

Sailng is a boilerplate that gives you a great foundation to start building realtime, Angular-based, single page applications.

It demonstrates how to create simple chat messages, update the page and delete a message all without a refresh. Go ahead and sign in with a couple different users in multiple browsers to see how it all works.

Current features include: a modular angular js architecture and file structure, an example of how to include services and directives from bower (lodash, angular-moment), and authentication using PassportJs.

More features are planned like i18n, plus I might modify the Gruntfile to run jshint and karma test runner on file saves.

# Credits #
https://github.com/ryancp/sailng

https://github.com/kyjan/angular-sails

# Sailng Fork by jrt@gtz.com #
https://github.com/johntom/sailng.

Added mongodb support (use   "sails-mongo": "0.10.0-rc2" and not -rc3 as there is a problem }.

This problem is only if you have existing users created under rc2 and then update to rc3 so you can install either for a blank database

Added ng-table.js for table ui magic (see todo).

Added a todo view which helps clear up some naming confusion I had with sails 0.10 and sockets.

Added an update method on message socket.

Added user role for auth levels.

note: I forgot to add role so you must hard after user is created (I use robomongo). 

a value of 4 will allow update on socket in messages
{
    "username" : "test",
    "email" : "test@gtz.com",
    "first_name" : "Test",
    "createdAt" : ISODate("2014-04-18T04:54:59.671Z"),
    "updatedAt" : ISODate("2014-04-18T04:54:59.671Z"),
    "role" : 4,
    "_id" : ObjectId("5350b0232980eb0000ff8f38")
}

Added audit trial for delete messages (messageaudit collection).
## Notes ##
see assets/styles/importer.less to reference other .less files

see tasks/pipeline.js to reference other .js files
## To do ##
bring over concepts developed in crmMeans. [https://github.com/johntom/crmMeans] (https://github.com/johntom/crmMeans).

## To get up and running ##
You will need to have Sails v0.10 installed on your machine (sudo npm install sails@beta -g) and then clone the repo, cd into the project directory and run.

    $ npm install (if you are on Windows using Vagrant, be sure to: npm install --no-bin-links)
    $ see .bowerrc for bower path
    $ bower install
    $ sails lift

Check it out at [http://localhost:1337](http://localhost:1337).
Angular Sails wraps the native sails.js REST functions. For further information check out
[the sails docs](http://sailsjs.org/#!documentation/sockets) and [Mike's Screencast](http://www.youtube.com/watch?v=GK-tFvpIR7c)
## Screenshots ##

![Messages](https://github.com/johntom/sailng/raw/master/screenshots/sailng-messages.png)
