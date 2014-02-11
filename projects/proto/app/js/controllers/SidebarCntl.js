'use strict';

app.controller('SidebarController', ['$scope','$location', '$routeParams',
    function SidebarController($scope, $location, $routeParams) {
        console.log('SidebarController');


        $scope.surveyId = $routeParams.surveyId;
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'surveys_list';
            var re = new RegExp( page, "g" );
            var result = re.test(currentRoute);

            return result ? 'active' : '';
        };
    }]);