'use strict';

app.controller('AdvancedSettingsCntl', ['$scope','$location', '$routeParams', '$cookieStore', 'ChannelsService', 'SettingsService',
    function AdvancedSettingsCntl($scope, $location, $routeParams, $cookieStore, ChannelsService, SettingsService) {
        console.log('AdvancedSettingsCntl');

        $scope.changeLanguage = function (langKey) {
            $translate.uses(langKey);
        };

        $scope.$location = $location;
        var path = $location.path().substring($location.path().lastIndexOf("/") + 1);

        /*
         Get Survey Id
         */
        //$scope.surveyId = SettingsService.getSurveyId() || null;
        $scope.surveyId = $routeParams.surveyId || '';

        //Fetch channels tabs
        ChannelsService.getChannels(path).success(function(data) {
            $scope.channelsTabs = data;
        });

        //Get selected channel or 'web' by default and store selected channel in cookie
        $scope.channelSelected = $cookieStore.get('channel') || 'web';
        $cookieStore.put('channel', $scope.channelSelected);

        /*
         Fetch settings for selected language and channel
         **/
        $scope.advancedSettings = function() {
            SettingsService.getSettings(path, $scope.channelSelected, $scope.surveyId).success(function(data, status) {
                $scope.advanced_settings = data;
            });
        }

        //Switch channel
        $scope.switchTabTo = function (tabId) {
            $scope.channelSelected = $scope.channelsTabs[tabId]['id'];

            //Pass selected channel to another Ctrl
            $cookieStore.put('channel', $scope.channelSelected);

            $scope.advancedSettings();
        };

        //Save sattings for selected channel
        $scope.save = function() {
            SettingsService.saveSettings(path, $scope.channelSelected, $scope.advanced_settings, $scope.surveyId).success(function(data, status) {
                console.log("Saved");
            });
        };

        /*
         Fetch settings for default channel when user just opened page
         **/
        $scope.advancedSettings();



    }]);