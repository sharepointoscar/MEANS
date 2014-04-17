module.exports = {
	index: function(req, res) {
		var navItems = [
			{url: '/messages', cssClass: 'fa fa-comments', title: 'Messages'},
            {url: '/todos', cssClass: 'fa fa-comments', title: 'Todos'},
			{url: '/about', cssClass: 'fa fa-infoc-circle', title: 'About'}
		];

		if (req.isAuthenticated()) {
			navItems.push({url: '/logout', cssClass: 'fa fa-comments', title: 'Logout'});
		}
		else {
			navItems.push({url: '/register', cssClass: 'fa fa-briefcase', title: 'Register'});
			navItems.push({url: '/login', cssClass: 'fa fa-comments', title: 'Login'});
		}

		res.view({
			title: 'HomeAAA',
			navItems: navItems,
			currentUser: req.user
		});
	}
};