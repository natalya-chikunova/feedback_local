'use strict';

app.controller('LanguagesSettingsCntl', ['$scope', '$location', '$routeParams', '$cookieStore', 'ChannelsService', 'SettingsService', 'StaticLinksService',
    function LanguagesSettingsCntl($scope, $location, $routeParams, $cookieStore, ChannelsService, SettingsService, StaticLinksService) {
        console.log('LanguagesSettingsCntl');

        var path = $location.path().substring($location.path().lastIndexOf("/") + 1);

        /*
        Get Survey Id
         */
        //$scope.surveyId = SettingsService.getSurveyId();
        $scope.surveyId = $routeParams.surveyId || '';

        //static_links
        if($scope.surveyId) {
            StaticLinksService.languagesStaticLinks($scope.surveyId).success(function(data) {
                $scope.static_links = data;
            });
        }

        //Fetch channels tabs
        ChannelsService.getChannels(path).success(function(data) {
            $scope.channelsTabs = data;
        });
        //Get selected channel or 'web' by default and store selected channel in cookie
        $scope.channelSelected = $cookieStore.get('channel') || 'web';
        $cookieStore.put('channel', $scope.channelSelected);


        // Fetch languages list
        SettingsService.languagesList($scope.surveyId).success(function(data) {
            $scope.langsTabs = data;
            //Set enabled setting for the first language in the list
            $scope.langActivated = $scope.langsTabs[0]['active'];
        });
        //Get selected language or 'en' by default
        $scope.langId = $scope.langId || 'en';

        /*
         Fetch settings for default language and channel when user just opened page
         **/
//        $scope.languagesSettings();
        SettingsService.getSettings(path, $scope.channelSelected, $scope.surveyId, $scope.langId).success(function(data, status) {
            $scope.languages_settings = data;
        });


        //Switch channel
        $scope.switchTabTo = function (tabId) {
            $scope.channelSelected = $scope.channelsTabs[tabId]['id'];

            //Pass selected channel to another Ctrl
            $cookieStore.put('channel', $scope.channelSelected);

            $scope.languagesSettings();
        };

        //Switch language
        $scope.switchLang = function (langId) {
            //Set class 'active' for the selected language in the list
            $scope.langId = $scope.langsTabs[langId]['id'];
            $scope.langActivated = $scope.langsTabs[langId]['active'];

            $scope.languagesSettings();

        };

        //Toggle language
        $scope.enableLang = function(langId) {
            SettingsService.toggleLanguage($scope.langActivated, $scope.surveyId, $scope.langId).success(function(data, status) {});
            $scope.langActivated=!$scope.langActivated;

            $scope.languagesSettings();
        }

        /*
         Fetch settings for selected language and channel
         **/
        $scope.languagesSettings = function() {
            //Set enabled setting for the selected language in the list
            if(!$scope.langActivated) return;

            //Clear languages_settings Array
            $scope.languages_settings = [];

            SettingsService.getSettings(path, $scope.channelSelected, $scope.surveyId, $scope.langId).success(function(data, status) {
                $scope.languages_settings = data;
            });

        }

        //Save settings for selected channel
        $scope.save = function() {
            SettingsService.saveSettings(path, $scope.channelSelected, $scope.languages_settings, $scope.surveyId, $scope.langId).success(function(data, status) {
                console.log("Saved");
            });
        };


    }]);