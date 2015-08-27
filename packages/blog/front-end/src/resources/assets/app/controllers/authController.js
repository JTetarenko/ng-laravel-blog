angular.module('blog')
    .controller('authController', ['$scope', '$rootScope', 'Notification', 'userFactory', '$cookies', '$window', '$state',
        function($scope, $rootScope, Notification, userFactory, $cookies, $window, $state)
        {
            if ($cookies.get('token') !== undefined)
            {
                $state.go('home');
            }

            $scope.login = function()
            {
                var credentials = {
                    email: $scope.email,
                    password: $scope.password
                }

                userFactory.login(credentials)
                    .success(function(response)
                    {
                        $cookies.put('token', response.token);

                        userFactory.getUserFromToken($cookies.get('token'))
                            .success(function(data)
                            {
                                $cookies.putObject('user', data.user);

                                $window.location.reload();
                            })
                            .error(function(error)
                            {
                                Notification.error('<span class="fa fa-exclamation-circle"></span> ' + error);
                            });
                    })
                    .error(function(response)
                    {
                        Notification.error('<span class="fa fa-exclamation-circle"></span> ' + response.error);
                    });
            }
        }
]);