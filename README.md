# Sailng #

Sailng is a boilerplate that gives you a great foundation to start building realtime, Angular-based, single page applications.

It demonstrates how to create simple chat messages, update the page and delete a message all without a refresh. Go ahead and sign in with a couple different users in multiple browsers to see how it all works.

Current features include: a modular angular js architecture and file structure, an example of how to include services and directives from bower (lodash, angular-moment), and authentication using PassportJs.

More features are planned like i18n, plus I might modify the Gruntfile to run jshint and karma test runner on file saves.
parent repo: https://github.com/ryancp/sailng/tree/master/api
# Sailng Fork by jrt@gtz.com #
https://github.com/johntom/sailng.

Added mongodb support (use   "sails-mongo": "0.10.0-rc2" and not -rc3 as there is a problem }.

Added ng-table.js for table ui magic (see todo).

Added a todo view which helps clear up some naming confusion I had with sails 0.10 and sockets.

Added an update method on message socket.

Added user role for auth levels.

Added audit trial for delete messages (messageaudit collection).
## To do ##
bring over concepts developed in crmMeans.

## To get up and running ##
You will need to have Sails v0.10 installed on your machine (sudo npm install sails@beta -g) and then clone the repo, cd into the project directory and run.

    $ npm install (if you are on Windows using Vagrant, be sure to: npm install --no-bin-links)
    $ see .bowerrc for bower path
    $ bower install
    $ sails lift

Check it out at [http://localhost:1337](http://localhost:1337).

## Screenshots ##

![Messages](https://github.com/johntom/sailng/raw/master/screenshots/sailng-messages.png)