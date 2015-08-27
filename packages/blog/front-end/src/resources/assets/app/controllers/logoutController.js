angular.module('blog')
    .controller('logoutController', ['$rootScope', '$cookies', '$state', '$window',
        function($rootScope, $cookies, $state, $window)
        {
            if ($cookies.get('token') !== undefined)
            {
                $cookies.remove('token');
                $cookies.remove('user');

                $window.location.reload();
            }
            else
            {
                $state.go('home');
            }
        }
]);