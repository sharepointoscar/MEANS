
module.exports = {


	index: function(req, res) {

		var navItems = [
			{url: '/messages', cssClass: 'fa fa-comments', title: 'Messages'},
            {url: '/todos', cssClass: 'fa fa-comments', title: 'Todos'}


		];

		res.view({
			title: 'Home - sailngMongo',
			navItems: navItems,
			currentUser: req.user,
            locales: sails.config.i18n.locales,
            layout: '/layouts/internal'

		});
	}
};