'use strict';

/* Services */

app.factory("ChannelsService", function($http, $location) {
    return {
        getChannels: function(path){
            //var url = $location.path().indexOf("global")>0 ? 'channels_4_settings' : 'channels';
            //'data/' + url + '.json'
            var url = '/backend/getchannel/';
            return $http({method: 'GET', url: url});
        }
    };
});

app.factory("StaticLinksService", function($http) {
    return {
        languagesStaticLinks: function(surveyId) {
            //url = 'settings/survey/2121/static_links/'
            return $http({method: 'GET', url: 'data/languages_static_links.json'});
        }
    };
});

app.factory('SettingsService', function($http) {

    return {
        languagesList: function(surveyId) {
            if(surveyId) {
                //url = 'settings/survey/2121/languages/'
                console.log('surveyId: '+surveyId);
                return $http({method: 'GET', url: 'data/languages_list.json'});
            } else {
                var url = '/backend/getlanguage/'
                //'data/languages_list.json'
                return $http({method: 'GET', url: url});
            }
        },
        getSettings: function(path, channel, surveyId, lang) {
            if(lang) {
                if(surveyId) {
                    //url = 'settings/survey/2121/languages/?language=en&active=1&channel=web'
                    console.log('getSettings surveyId: '+surveyId);
                    return $http({method: 'GET', url: 'data/'+ path +'_'+ lang +'_'+ channel +'.json'});
                } else {
                    //url = 'settings/global/?language=en&active=1&channel=web'
                    //'data/'+ path +'_'+ lang +'_'+ channel +'.json'
                    var url = ' /backend/getsetting/' + lang + '/' + channel;
                    return $http({method: 'GET', url: url});
                }
            } else {
                if(surveyId) {
                    //url = 'settings/survey/2121/?channel=web'
                    return $http({method: 'GET', url: 'data/'+ path +'_'+ channel +'.json'});
                } else {
                    //url = 'settings/global/?channel=web'
                    return $http({method: 'GET', url: 'data/'+ path +'_'+ channel +'.json'});
                }

            }

        },
        toggleLanguage: function(active, surveyId, lang) {
            //var url = surveyId ? 'settings/survey/2121/' : 'settings/global/';
            var url = '/backend/setlanguage/?language='+lang+'&active='+active;
            return  $http({method: 'POST', url: url});
//            if(surveyId) {
//                return $http({method: 'POST', url: 'settings/survey/2121/?language='+lang+'&active='+active});
//            } else {
//                return $http({method: 'POST', url: 'settings/global/?language='+lang+'&active='+active});
//            }
        },
        saveSettings: function(path, channel, settings, surveyId, lang) {
            //console.log("Saved 3: "+path+','+ channel+','+ settings+','+ surveyId+','+ lang);

            var settingsOverride = []; var newVal = {};
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

                    settingsOverride.push({"id": s["id"], "name":s["name"], "value":newVal, "override":1 });
                }
            });

            if(lang) {
                if(surveyId) {
                    //url = 'settings/survey/2121/?language='+lang+'&channel='+channel
                    return $http({method: 'PUT', url: 'http://feedback-proto.ci.custvox.org/#/settings/survey/2121/', data: settingsOverride});
                } else {
                    //url = 'settings/global/?language='+lang+'&channel='+channel
                    //return $http({method: 'PUT', url: 'http://feedback-proto.ci.custvox.org/#/global_settings/advanced_settings', data: settingsOverride});
                    var url = '/backend/setsetting/'+lang+'/'+channel;
                    return $http({method: 'PUT', url: url, data: settingsOverride});
                }
            } else {
                //console.log("Saved 4: ");
                if(surveyId) {
                    //url = 'settings/survey/2121/?channel='+channel
                    return $http({method: 'PUT', url: 'http://feedback-proto.ci.custvox.org/#/settings/survey/2121/', data: settingsOverride});
                } else {
                    //console.log("Saved 5: "+path+','+ channel+','+ settings+','+ surveyId+','+ lang);
                    //url = 'settings/global/?channel='+channel
                    return $http({method: 'PUT', url: 'http://feedback-proto.ci.custvox.org/#/global_settings/advanced_settings', data: settingsOverride});
                }
            }
        }
    };
});