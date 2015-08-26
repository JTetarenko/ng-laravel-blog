angular.module('blog')
    .controller('logoutController', ['$rootScope', '$localStorage', '$cookies', '$state', '$window',
        function($rootScope, $localStorage, $cookies, $state, $window)
        {
            if ($rootScope.loggedIn)
            {
                delete $localStorage.token;

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