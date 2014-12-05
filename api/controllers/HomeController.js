
module.exports = {


	index: function(req, res) {

		var topNavigationItems = [{
		navItem: {url: '/messages', cssClass:'fa fa-comments', title: res.i18n("Site.TopNav.Messages")},
		navItem1: {url: '/todos', cssClass :'fa fa-comments', title: res.i18n("Site.TopNav.Todo")}
	}];


		console.log('SERVER SIDE TOPNAV, ', JSON.stringify(topNavigationItems,null,2));

		res.view({
			title: 'Home - MEANS',
			navItems: JSON.stringify(topNavigationItems),
			currentUser: req.user,
            locales: sails.config.i18n.locales,
            layout: '/layouts/internal'

		});
	}
};
