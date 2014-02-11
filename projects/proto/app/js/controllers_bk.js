'use strict';

/* Controllers */


app.controller('MenuCntl', ['$scope','$route', '$routeParams', '$location', '$rootScope',
    function MenuCntl($scope, $route, $routeParams, $location, $rootScope) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.title = $route.current.title;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.title = $route.current.title;
            });
    }])
    .controller('HeaderController', ['$scope','$route', '$routeParams', '$location', '$rootScope',
        function HeaderController($scope, $route, $routeParams, $location, $rootScope) {

            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1) || 'surveys_list';
                console.log('currentRoute: '+currentRoute + ', page: '+page);

                var str = currentRoute;
                var re = new RegExp( page, "g" );

                var result = re.test(str);
                console.log('result: '+result);

                return result ? 'active' : '';
//                return page === currentRoute ? 'active' : '';
            };

//            $scope.navClass = function(page) {
//                var currentRoute = $location.path().substring(1) || 'surveys_list';
//                console.log('currentRoute: '+currentRoute + ', page: '+page);
//                return page === currentRoute ? 'active' : 'active_2';
//            }

//            $scope.isActive = function (currentUrl) {
//                var str = $location.path();
//                var found = str.indexOf(currentUrl);
//                if($location.path() === found){
//                    alert($location.path() );
//                } else{
//                    console.log('current: '+currentUrl);
//                }
//                return currentUrl === $location.path();
//            };
//
//            $rootScope.$on("$routeChangeStart",
//                function (event, current, previous, rejection) {
//                    //console.log('routeChangeStart:'+$scope, $rootScope, $route, $location);
//                    console.log('routeChangeStart:'+$location.path());
//                });
//            $rootScope.$on("$routeChangeSuccess",
//                function (event, current, previous, rejection) {
//                    //console.log('routeChangeSuccess:'+$scope, $rootScope, $route, $location);
//                    console.log('routeChangeSuccess:'+$location.path());
//
//                });


    }]);


//$scope.$on('$routeChangeSuccess', function (ev, current, prev) {
//    // ...
//});

//$scope.init = function ($location) {
//    alert($location.url());
//}

//$scope.$on('$viewContentLoaded', function($scope, $route, $routeParams, $location) {
//    //call it here
//});



//   app.run(function ($rootScope, $http, $route) {
//
//        $rootScope.$on("$routeChangeSuccess", function (angularEvent, currentRoute, previousRoute) {
//
//            var pageKey = currentRoute.pageKey;
//            console.log('pageKey: '+pageKey+', currentRoute: '+currentRoute+', previousRoute: '+previousRoute);
//            $(".pagekey").toggleClass("active", false);
//            $(".pagekey_" + pageKey).toggleClass("active", true);
//        });
//
//    });