angular.module( 'sailng.home', [])

//.config(function config( $stateProvider ) {
    .config( ['$stateProvider',function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/index.tpl.html'
			}
		}
	});
}])

        .controller( 'HomeCtrl', ['$scope', 'titleService',function HomeController( $scope, titleService ) {
	titleService.setTitle('Home');



}]);
