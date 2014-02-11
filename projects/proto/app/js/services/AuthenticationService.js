'use strict';

app.factory("AuthenticationService", ['$http', '$location', '$cookieStore',
    function($http, $location, $cookieStore){
        return {
            login : function(auth){

                //call $http ....

                var msg = "";
                /*
                Small jquery fix for pre-populated login fields
                Browser's bug
                 */
                auth.username = auth.username || $("#login").val();
                auth.password = auth.password || $("#pass").val();

                return $http({
                    method: 'POST',
                    url: 'file:///home/natalia/projects/proto/app/index.html#/',
                    data: {'username' : auth.username, 'password' : auth.password}
                });

//                console.log('username: '+auth.username+'; password: '+auth.password);
//
//                if(auth.username === "" || auth.password === "") {
//                    msg = "";
//                } else if(auth.username !== "admin" || auth.password !== "admin") {
//                    msg = "Wrong username or password";
//                } else {
//                    //sessionStorage.authenticated = true;
//                    $cookieStore.put('user', auth.username);
//                    $location.path('/surveys_list');
//                }

                //return msg;
            },
            logout: function() {
                //delete sessionStorage.authenticated;
                $cookieStore.remove('user');
                $location.path('/');
            }
        }
    }]);