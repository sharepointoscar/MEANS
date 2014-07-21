# MEANS [ seed project ] #

MEANS is a boilerplate that gives you a great foundation to start building real-time MongoDB + ExpressJS + AngularJS + SailsJS, single page applications.

It comes with sample real-time messages, update the page and delete a message all without a refresh. Go ahead and sign in with a couple different users in multiple browsers to see how it all works.

Current features include: a modular angular js architecture and file structure, an example of how to include services and directives from bower (lodash, angular-moment), and authentication using PassportJs.

More features are planned like i18n, plus I might modify the Gruntfile to run jshint and karma test runner on file saves.

## Getting Started ##
Ensure you have Sails v0.10 installed on your machine

    $ sudo npm install sails@beta -g
    $ git clone https://github.com/SharePointOscar/MEANS.git
    $ cd into repo folder
    $ npm install
    $ cd assets
    $ bower install

At the root of the project run the following

    $ sails lift

View the app on your local machine at [http://localhost:1337](http://localhost:1337)

## Folder Structure ##

## Built-in Features ##

### Authentication ###
The project uses the solid PassportJS authentication package, which supports Local(username/password) and OAuth for Facebook, Twitter, Github etc.  Adding providers is as easy as modifying the config/passport.js and specifying your provider information.

### Branding ###
MEANS comes with [Bootswatch Themes](http://bootswatch.com/) created by [Thomas park](http://thomaspark.me/) to change the Theme, simply modify the assets/styles/importer.less file.  We also included [Font Awesome](http://fortawesome.github.io/Font-Awesome/)

### Asset Management ###

### Grunt ###
Grunt is included with various tasks including concat, minifying, less compiling and uglify, but it is not required.  For more detail, view tasks/README.md

## Support for Multiple Layouts ##
It is typical for a website that has membership to have different Layouts than the public section.  Because of this, we've demonstrated how you can use a public layout for non-members and a private layout for members.

## Internationalization using i18n ##
SailsJS comes multi-language support, and so we've configured it and show this on the home page of the project.


## Screenshots ##

![Messages](https://github.com/SharePointOscar/MEANS/blob/master/assets/images/screenshots/sailng-app.png)
