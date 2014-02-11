'use strict';

app.controller('SurveyQuestionsCntl', ['$scope','$location', '$cookieStore', 'ChannelsService', 'SettingsService',
    function SurveyQuestionsCntl($scope, $location, $cookieStore, ChannelsService, SettingsService) {
        console.log('SurveyQuestionsCntl');

        $scope.$location = $location;
        var path = $location.path().substring($location.path().lastIndexOf("/") + 1);

        //Fetch channels tabs
        ChannelsService.getChannels(path).success(function(data) {
            $scope.channelsTabs = data;
        });

        //Get selected channel or 'web' by default and store selected channel in cookie
        $scope.channelSelected = $cookieStore.get('channel') || 'web';
        $cookieStore.put('channel', $scope.channelSelected);



    }]);