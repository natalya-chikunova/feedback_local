'use strict';

/* Controllers */

app.controller('MenuCntl', ['$scope','$route', '$routeParams', '$location', '$rootScope',
    function MenuCntl($scope, $route, $routeParams, $location, $rootScope) {

        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

    }]);

app.controller('titleController', function($scope, $route, $translate){
    $scope.changeLanguage = function (langKey) {
        $translate.uses(langKey);
    };

    $scope.$on('$routeChangeSuccess', function(){
        $scope.pageTitle = $route.current.pageTitle;
    });
});
