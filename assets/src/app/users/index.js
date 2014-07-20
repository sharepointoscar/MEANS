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

    //.controller( 'TodoCtrl', function TodoController( $scope, $sails, lodash, config,titleService, TodoModel,$filter, ngTableParams  ) {
//
//    //    titleService.setTitle('Messages');
//    $scope.newTodo = {};
//	$scope.todos = [];
//	$scope.currentUser = config.currentUser;

    .controller( 'UserCtrl',['$scope', '$sails', 'lodash', 'config', 'titleService', 'UserModel','$filter', 'ngTableParams', function UserController( $scope, $sails, lodash, config, titleService, UserModel,$filter, ngTableParams ) {

        $scope.newUser = {};

        $scope.users = [];
        $scope.currentUser = config.currentUser;
        //console.log('scope.currentUser.data:: ', $scope.currentUser)
        // old version $sails.on('message', function (envelope) {
        // see  assets/src/common/models/Todo.js
//        $sails.on('user', function (envelope) {
//
//            switch(envelope.verb) {
//                case 'created':
//                    $scope.todos.unshift(envelope.data);
//                    $scope.tableParams.data=  $scope.users;
//                    $scope.tableParams.reload();
//
//                    break;
//                case 'destroyed':
//                    lodash.remove($scope.users, {id: envelope.id});
//                    $scope.tableParams.data=  $scope.users;
//                    $scope.tableParams.reload();
//                    break;
//                case 'updated': //
//                       console.log('in MessagesCtrl updated ',envelope.status,envelope.id,envelope)
////                    for (var i in $scope.todos) {
////                        if ($scope.todos[i].id == envelope.id) {
////                            $scope.todos[i].status = envelope.data.status;
////                        }
////                    }
//                    $scope.tableParams.data=  $scope.users;
//                    $scope.tableParams.reload();
//                    break;
//            }
//        });

//        $scope.destroyMessage = function(message) {
//            // check here if this message belongs to the currentUser
//            //ng-show="currentUser.id === message.user.id || currentUser.role==='4'"><i class="fa fa-trash-o"></i></button>
//            if (todos.user.id === config.currentUser.id || config.currentUser.role === '4') {
//                Todo.delete(message).then(function(model) {
//                    // message has been deleted, and removed from $scope.messages
//                });
//            }
//        };

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

        // var   messPromise =  MessageModel.getAll($scope);
        // messPromise.then(function (models) {

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
