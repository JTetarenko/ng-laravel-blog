var blog = angular.module('blog', [
    'ui.router',
    'ngAnimate',
    'angular-loading-bar',
    'yaru22.angular-timeago',
    'blockUI',
    'ui.bootstrap',
    'ui-notification',
    'treasure-overlay-spinner',
    'ngCookies'
])
.run(function($rootScope, $cookies, $http, $interval, $state, Notification, $window, $timeout)
{
    $rootScope.endPoint = 'http://myblog.lv/api';
    $rootScope.spinner = {
        active: true
    };

    $rootScope.notification = {
        type: '',
        msg: '',
        popup: false
    };

    $rootScope.loggedIn = true;

    if ($cookies.get('token') !== undefined)
    {
        $rootScope.userObtained = false;
        
        $http.get($rootScope.endPoint + '/auth/user?token=' + $cookies.get('token'))
            .success(function(response)
            {
                $rootScope.token = $cookies.get('token');
                $rootScope.user = response.user;
                $rootScope.userObtained = true;
            })
            .error(function()
            {
                $rootScope.loggedIn = false;
                delete $rootScope.user;
                
                $cookies.remove('user');
                $cookies.remove('token');

                $state.go('login');

                $timeout(function()
                {
                    $window.location.reload();
                }, 200);
            });

        $interval(function()
        {
            $http.get($rootScope.endPoint + '/auth/refresh-token?token=' + $rootScope.token)
                .success(function(response)
                {
                    $rootScope.token = response.token;
                    $cookies.put('token', response.token);
                })
                .error(function()
                {
                    delete $rootScope.user;
                    $rootScope.loggedIn = false;
                    
                    $cookies.remove('token');

                    $state.go('login');


                    $timeout(function()
                    {
                        $window.location.reload();
                    }, 200);
                });
        }, 60000);
    }
    else
    {
        $rootScope.loggedIn = false;
    }
});