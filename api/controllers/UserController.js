module.exports = {
	getAll: function(req, res) {
		User.getAll()
		.spread(function(models) {

                res.json({data:models});
		})
		.fail(function(err) {
			// An error occured
		});
	},


	getOne: function(req, res) {
		User.getOne(req.param('id'))
		.spread(function(model) {

			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

/*
model for roles
switch (project.role) {
 case -3:
 project.roleText = "Administrator";
 break;
 case -2:
 project.roleText = "Manager (Primary)";
 break;
 case -1:
 project.roleText = "Manager";
 break;
 case 0:
 project.roleText = "Viewer";
 break;
 case 1:
 project.roleText = "User";
 break;
 }*/
	create: function (req, res) {
        console.log(req.params.all);
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			first_name: req.param('first_name'),
            role: req.param('role')
		};

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	}
};