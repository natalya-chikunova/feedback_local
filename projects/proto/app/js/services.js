'use strict';

/* Services */

app.factory("ChannelsService", function($http, $routeParams) {
    var surveyId = $routeParams.surveyId || '';
    return {
        getChannels: function(path){
            if(surveyId)
                return $http({method: 'GET', url: '/backend/getchannelsurvey/' + surveyId});
            else
                return $http({method: 'GET', url: '/backend/getchannel/'});
        }
    };
});

app.factory("StaticLinksService", function($http, $routeParams) {
    var surveyId = $routeParams.surveyId || '';
    return {
        languagesStaticLinks: function(surveyId) {
            //url = 'settings/survey/2121/static_links/'
            return $http({method: 'GET', url: 'data/languages_static_links.json'});
        }
    };
});

app.factory('SettingsService', function($http, $routeParams) {
    var surveyId = $routeParams.surveyId || '';
    return {
        languagesList: function(surveyId) {
            if(surveyId)
                return $http({method: 'GET', url: '/backend/getlanguagesurvey/' + surveyId});
            else
                return $http({method: 'GET', url: '/backend/getlanguage/'});
        },
        getSettings: function(path, channel, surveyId, lang) {
            if(lang) {
                var url = ' /backend/getsetting/' + lang + '/' + channel;
                return $http({method: 'GET', url: url});
            } else {
                var url = ' /backend/getadvancedsetting/' + channel;
                return $http({method: 'GET', url: url});

            }
        },
        toggleLanguage: function(active, surveyId, lang) {
            if(surveyId)
                return  $http({method: 'POST', url: '/backend/setlanguagesurvey/' + surveyId + '?language=' + lang + '&active=' + active});
            else
                return  $http({method: 'POST', url: '/backend/setlanguage/?language=' + lang + '&active=' + active});
        },
        saveSettings: function(path, channel, settings, surveyId, lang) {
            //console.log("Saved 3: "+path+','+ channel+','+ settings+','+ surveyId+','+ lang);

            var settings = []; var newVal = {};
            angular.forEach(settings, function(s, index){
                if(s["override"] === true || s["override"] === 1) {

                    switch(s["type"]) {
                        case 'text':
                            newVal = s["value"];
                            break;
                        case 'textarea':
                            newVal = s["value"];
                            break;
                        case 'wysiwyg':
                            newVal = s["value"];
                            break;
                        case 'radio':
                            newVal = s["selected"];
                            break;
                        case 'checkbox':
                            newVal = s["value"]>0 ? 1 : 0;
                            break;
                        case 'select':
                            newVal = s["selected"];
                            break;
                        case 'multi_values':
                            var multiArr = [];
                            for (var j in s["value"]) {
                                multiArr.push({"multi_name":s["value"][j]["multi_name"]});
                            }
                            newVal = multiArr;
                            break;
                    }

                    settings.push({"id": s["id"], "name":s["name"], "value":newVal, "override":1 });
                }
            });

            if(lang) {
                var url = '/backend/setsetting/' + lang + '/' + channel;
                return $http({method: 'PUT', url: url, data: settings});
            } else {
                var url = '/backend/setadvancedsetting/' + channel;
                return $http({method: 'PUT', url: url, data: settings});
            }
        }
    };
});