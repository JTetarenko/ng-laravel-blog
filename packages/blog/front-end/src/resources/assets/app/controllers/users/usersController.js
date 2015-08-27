angular.module('blog')
    .controller('usersController', ['$scope', '$cookies',
        function($scope, $cookies)
        {
            $scope.auth = {};

            if ($cookies.get('token') !== undefined)
            {
                $scope.auth.loggedIn = true;

                $scope.auth.user = $cookies.getObject('user');
            }
            else
            {
                $scope.auth.loggedIn = false;
            }
        }
]);