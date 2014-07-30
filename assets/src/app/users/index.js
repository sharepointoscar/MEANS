angular.module( 'sailng.users', [
])

       .config( ['$stateProvider',function config( $stateProvider ) {
            $stateProvider.state( 'users', {
		url: '/users',
		views: {
			"main": {
				controller: 'UserCtrl',
				templateUrl: 'users/index.tpl.html'
			}
		},
		data:{ pageTitle: 'User' }
	});
}])

    .controller( 'UserCtrl',['$scope', '$sails', 'lodash', 'config', 'titleService', 'UserModel','$filter', 'ngTableParams', function UserController( $scope, $sails, lodash, config, titleService, UserModel,$filter, ngTableParams ) {

        $scope.newUser = {};

        $scope.users = [];
        $scope.currentUser = config.currentUser;


        $scope.destroyUser = function(user) {
            UserModel.delete(user).then(function(model) {
                // todo has been deleted, and removed from $scope.todos
             //   lodash.remove($scope.todos, {id: todo.id});
            });
        };

        $scope.createUser = function(newUser) {
            console.log('new ',newUser)
            newUser.user = config.currentUser.id;

            UserModel.create(newUser).then(function(model) {
                $scope.newUser.title ='';
                //= {};
            });
        };


        UserModel.getAll($scope).then(function(models) {
            $scope.users = models.data;
            var data =$scope.users;
            console.log('data ',data)
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 25,          // count per page
                sorting: {
                    //  comboday: 'asc'     // initial sorting
                    title: 'asc'
                }
            }, {
                 total: data.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                        data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });

    }]);
