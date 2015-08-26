angular.module('blog')
  .factory('AuthInterceptor', ['$rootScope', '$q', '$location', '$injector', '$window', '$cookies',
    function ($rootScope, $q, $location, $injector, $window, $cookies) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($cookies.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },
            'response': function (response) {
                if(response.headers('Authorization')) {
                    var token = response.headers('Authorization').replace('Bearer ', '');
                    $cookies.put('jwt_token', token);
                }
                return response;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403 || response.status === 400 || response.status === 404) {
                    if (response.data.error === 'token_not_provided' ||
                        response.data.error === 'token_expired' ||
                        response.data.error === 'token_invalid' ||
                        response.data.error === 'user_not_found') {
                        $window.location.href = '/auth/login';
                    }
                }
                return $q.reject(response);
            }
        };
    }]);