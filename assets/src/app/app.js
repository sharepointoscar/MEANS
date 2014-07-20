angular.module( 'sailng', [
	'ui.router',
	'ngSails',
	'angularMoment',
	'lodash',
	'angularMoment',
	'ui.bootstrap',
	'templates-app',
	'services',
	'models',
    //'rxDataTable',
    'ngTable',


    'directive.blink',
    'sailng.header',
	'sailng.home',
	'sailng.about',
	'sailng.messages',
    'sailng.todos',
    'sailng.users'

])

//  .config(['$routeProvider', '$locationProvider', '$httpProvider','localStorageServiceProvider', function($routeProvider, $locationProvider, $httpProvider,localStorageServiceProvider) {

    //.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {

     .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
	// $urlRouterProvider.otherwise( '/home' );
	$urlRouterProvider.otherwise(function ($injector, $location) {
		if ($location.$$url === '/') {
			window.location = '/home';
		}
		else {
			// pass through to let the web server handle this request
			window.location = $location.$$absUrl;
		}
	});
	$locationProvider.html5Mode(true);
}])

.run( function run () {
	moment.lang('en');
})

.controller( 'AppCtrl',['$scope', 'config', function AppCtrl ( $scope, config ) {
	config.currentUser = window.currentUser;
}]);