// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/funddata', {
            templateUrl: 'views/funddata.html',
            controller: 'FundDataController'
        })
        
        .when('/maps', {
            templateUrl: 'views/maps.html',
            controller: 'FundDataController'
        })
        
        .when('/charts', {
            templateUrl: 'views/charts.html',
            controller: 'FundDataController'
        });
    $locationProvider.html5Mode(true);

}]);