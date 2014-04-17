angular.module( 'sailng.todos', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'todos', {
		url: '/todos',
		views: {
			"main": {
				controller: 'TodoCtrl',
				templateUrl: 'todos/index.tpl.html'
			}
		},
		data:{ pageTitle: 'Todo' }
	});
})

.controller( 'TodoCtrl', function TodoController( $scope, $sails, lodash, config, titleService, TodoModel,$filter, ngTableParams ) {

            $scope.newTodo = {};
	$scope.todos = [];
	$scope.currentUser = config.currentUser;
	// old version $sails.on('message', function (envelope) {
        // see  assets/src/common/models/Todo.js
    $sails.on('todo', function (envelope) {
        console.log('envelope.verb'  ,  envelope.verb)
		switch(envelope.verb) {
			case 'created':
				$scope.todos.unshift(envelope.data);
                $scope.tableParams.data=  $scope.todos;
                $scope.tableParams.reload();
				break;
			case 'destroyed':

                lodash.remove($scope.todos, {id: envelope.id});
                $scope.tableParams.data=  $scope.todos;
                $scope.tableParams.reload();
				break;
		}
	});

	$scope.destroyTodo = function(todo) {
		TodoModel.delete(todo).then(function(model) {
			// todo has been deleted, and removed from $scope.todos
		});
	};

	$scope.createTodo = function(newTodo) {
        console.log('new ',newTodo)
        newTodo.user = config.currentUser.id;

        TodoModel.create(newTodo).then(function(model) {
			$scope.newTodo = {};
		});
	};

//	TodoModel.getAll($scope).then(function(models) {
//        console.log('models '  ,  models)
//		$scope.todos = models.data;
//	});

        TodoModel.getAll($scope).then(function(models) {
            $scope.todos = models.data;
            var data =$scope.todos;
            console.log('data ',data)
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 25,          // count per page
                sorting: {

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


});