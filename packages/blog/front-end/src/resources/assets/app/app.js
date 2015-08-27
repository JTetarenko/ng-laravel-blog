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
], 
function($interpolateProvider) 
{
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
})

.config(['$httpProvider', '$provide', function($httpProvider, $provide) 
{
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $provide.factory('ErrorInterceptor', function ($q) {
            return {
                responseError: function(rejection) {
                    return $q.reject(rejection);
                }
            };
        });
        
        $httpProvider.interceptors.push('ErrorInterceptor');
        $httpProvider.interceptors.push('AuthInterceptor');
}])

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

    if ($cookies.get('token') !== undefined)
    {
        $interval(function()
        {
            $http.get($rootScope.endPoint + '/auth/refresh-token?token=' + $rootScope.token)
                .success(function(response)
                {
                    $cookies.put('token', response.token);
                })
                .error(function()
                {
                    $cookies.remove('user');
                    $cookies.remove('token');

                    $state.go('login');


                    $timeout(function()
                    {
                        $window.location.reload();
                    }, 200);
                });
        }, 60000);
    }
});