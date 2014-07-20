angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', ['$scope', '$state', 'config',function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;
console.log(' header $scope.currentUser ', $scope.currentUser)
    var navItems = [
        {title: 'Messages', translationKey: 'navigation:messages', url: '/messages', cssClass: 'fa fa-inbox fa-lg'},
        {title: 'Todos', translationKey: 'navigation:todos', url: '/todos', cssClass: 'fa fa-tasks fa-lg'}
  //      {title: 'Users', translationKey: 'navigation:users', url: '/users', cssClass: 'fa fa-group fa-lg'}

    ];



    $scope.navItems = navItems;
}]);