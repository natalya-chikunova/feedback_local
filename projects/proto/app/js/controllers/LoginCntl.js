'use strict';

app.controller('LoginCntl', ['$scope', '$http', '$location', '$cookieStore', 'AuthenticationService',
    function LoginCntl($scope, $http, $location, $cookieStore, AuthenticationService) {
        console.log('LoginCntl');




        $scope.login = function() {

            $scope.auth = { username: "", password: "" };
            $scope.authFailed = "";

            //$scope.authFailed = AuthenticationService.login($scope.auth);
            AuthenticationService.login($scope.auth).success(function(data, status, headers, config) {
                if(status != 200) {
                    $scope.authFailed = "Authentication failed!";
                } else {
                    $cookieStore.put('user', data.username);
                    $location.path('/surveys_list');
                }
                }).error(function(data, status, headers, config) {
                    $scope.authFailed = "Authentication failed!";
                });
            console.log('authFailed!');
        }

    }]);