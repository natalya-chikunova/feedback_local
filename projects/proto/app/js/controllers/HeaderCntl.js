'use strict';

app.controller('HeaderController', ['$scope','$location', '$cookieStore', '$translate', 'AuthenticationService',
    function HeaderController($scope, $location, $cookieStore, $translate, AuthenticationService) {
        console.log('HeaderController');

        $scope.showHeader = function(){
            if($location.path() !== '/') return true;
        }

        $scope.logout = function() {
            var check = AuthenticationService.logout();
        }

        $scope.translates = [{ "id": "en"},{"id":"de"}];
        $scope.translate = $scope.translate || $translate.uses();
        $scope.changeLanguage = function (langKey) {
            $translate.uses(langKey);
            $scope.translate = langKey;

        };

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'surveys_list';
            var re = new RegExp( page, "g" );
            var result = re.test(currentRoute);

            return result ? 'active' : '';
        };
    }]);