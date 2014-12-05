angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', ['$scope', '$state', 'config',function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;


/*    var navItems = [

        {title: 'Todos', translationKey: 'navigation:todos', url: '/todos', cssClass: 'fa fa-tasks fa-lg'}

    ];*/

        console.log('angular controller topnavItems:',
            _.each(config.topNavigation,function(navItem) {
                console.log('navItem:',navItem.url);
            }));
    $scope.navItems = config.topNavigation;
}]);
