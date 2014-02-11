'use strict';


// Declare app level module which depends on filters, and services

var app = angular.module('app', ['ngRoute', 'ngResource', 'pascalprecht.translate', 'ngCookies']);


app.config(['$translateProvider',
        function ($translateProvider) {

        //Configure ststicFileLoader
        $translateProvider.useStaticFilesLoader({
            prefix: 'translations/',
            suffix: '.json'
        });

        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en');

        // Tell the module to store the language in the cookie
        $translateProvider.useCookieStorage();

    }]);
//// Module specific configuration
//angular.module('app.config')
//    .value('app.config', {
//        basePath: '/' // Set your base path here
//    });
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/login.html', controller: 'LoginCntl', pageTitle: 'Login'});

  $routeProvider.when('/surveys_list', {templateUrl: 'partials/surveys_list/surveys_list.html', controller: 'SurveysCntl', pageTitle: 'Surveys List'});
  $routeProvider.when('/survey', {templateUrl: 'partials/surveys_list/survey.html', controller: 'SurveyQuestionsCntl', pageTitle: 'Survey'});
  $routeProvider.when('/survey/:surveyId', {templateUrl: 'partials/surveys_list/survey.html', controller: 'SurveyQuestionsCntl', pageTitle: 'Survey'});


  $routeProvider.when('/survey/:surveyId/question', {templateUrl: 'partials/surveys_list/question.html', controller: 'MenuCntl', pageTitle: 'Question'});
  $routeProvider.when('/survey/:surveyId/design', {templateUrl: 'partials/surveys_list/design.html', controller: 'MenuCntl', pageTitle: 'Design'});

  $routeProvider.when('/survey/:surveyId/languages_settings', {templateUrl: 'partials/surveys_list/language.html', controller: 'LanguagesSettingsCntl', pageTitle: 'Survey Languages Settings'});
  $routeProvider.when('/survey/:surveyId/advanced_settings', {templateUrl: 'partials/surveys_list/settings.html', controller: 'AdvancedSettingsCntl', pageTitle: 'Survey Advanced Settings'});

  $routeProvider.when('/survey/:surveyId/statistics', {templateUrl: 'partials/surveys_list/statistics.html', controller: 'MenuCntl', pageTitle: 'Statistics'});
  $routeProvider.when('/survey/:surveyId/questions_statistics', {templateUrl: 'partials/surveys_list/questions_statistics.html', controller: 'MenuCntl', pageTitle: 'Questions Statistics'});
  $routeProvider.when('/survey/:surveyId/answers_statistics', {templateUrl: 'partials/surveys_list/answers_statistics.html', controller: 'MenuCntl', pageTitle: 'Answers Statistics'});
  $routeProvider.when('/survey/:surveyId/quarantine', {templateUrl: 'partials/surveys_list/quarantine.html', controller: 'MenuCntl', pageTitle: 'Quarantine'});
  $routeProvider.when('/survey/:surveyId/customers', {templateUrl: 'partials/surveys_list/customers.html', controller: 'MenuCntl', pageTitle: 'Customers'});

  $routeProvider.when('/data_management/data_management_results', {templateUrl: 'partials/data_management/data_management_results.html', controller: 'MenuCntl', pageTitle: 'Data Management'});
  $routeProvider.when('/data_management/import_history', {templateUrl: 'partials/data_management/import_history.html', controller: 'MenuCntl', pageTitle: 'Import History'});
  $routeProvider.when('/data_management/add_import', {templateUrl: 'partials/data_management/add_import.html', controller: 'MenuCntl', pageTitle: 'Add New Import'});
  $routeProvider.when('/data_management/export_queue', {templateUrl: 'partials/data_management/export_queue.html', controller: 'MenuCntl', pageTitle: 'Export Queue'});
  $routeProvider.when('/data_management/exporters_list', {templateUrl: 'partials/data_management/exporters_list.html', controller: 'MenuCntl', pageTitle: 'Exporters List'});
  $routeProvider.when('/data_management/export_schedule', {templateUrl: 'partials/data_management/export_schedule.html', controller: 'MenuCntl', pageTitle: 'Export Schedule'});

  $routeProvider.when('/customers_management/addresses_management', {templateUrl: 'partials/customers_management/addresses_management.html', controller: 'MenuCntl', pageTitle: 'Addresses Management'});
  $routeProvider.when('/customers_management/customers_management', {templateUrl: 'partials/customers_management/customers_management.html', controller: 'MenuCntl', pageTitle: 'Customers Management'});
  $routeProvider.when('/customers_management/customers_target_groups', {templateUrl: 'partials/customers_management/customers_target_groups.html', controller: 'MenuCntl', pageTitle: 'Customers Target Groups'});

  $routeProvider.when('/global_settings/languages_settings', {templateUrl: 'partials/global_settings/languages_settings.html', controller: 'LanguagesSettingsCntl', pageTitle: 'Languages Settings'});
  $routeProvider.when('/global_settings/advanced_settings', {templateUrl: 'partials/global_settings/advanced_settings.html', controller: 'AdvancedSettingsCntl', pageTitle: 'Advanced Settings'});

  $routeProvider.when('/global_settings/case_alerts_settings', {templateUrl: 'partials/global_settings/case_alerts_settings.html', controller: 'MenuCntl', pageTitle: 'Case Alerts Settings'});
  $routeProvider.when('/global_settings/case_alert_conditions', {templateUrl: 'partials/global_settings/case_alert_conditions.html', controller: 'MenuCntl', pageTitle: 'Case Alert Conditions'});
  $routeProvider.when('/global_settings/quarantines_settings', {templateUrl: 'partials/global_settings/quarantines_settings.html', controller: 'MenuCntl', pageTitle: 'Quarantines Settings'});


  $routeProvider.otherwise({redirectTo: '/'});
}])
.run(['$route', '$rootScope', '$location', '$cookieStore', 'AuthenticationService',
        function($route, $rootScope, $location, $cookieStore, AuthenticationService) {

        $rootScope.$on("$routeChangeStart",
            function (event, next, current) {
               // var user = $cookieStore.get('user');
                //if (!sessionStorage.authenticated) $location.path('/');
                //console.log('cookie router: '+$cookieStore.get('user'));
                if ( !$cookieStore.get('user') ) $location.path('/');
            });

            $rootScope.$on("$routeChangeSuccess",
                function (event, current, previous) {
                   $rootScope.pageTitle = current.$$route.pageTitle;
                });
    }
]);
