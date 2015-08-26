angular.module('blog')
    .controller('authController', ['$scope', '$rootScope', 'Notification', '$state', '$auth', 'userFactory', '$cookies', '$window', '$state',
        function($scope, $rootScope, Notification, userFactory, $cookies, $window, $state)
        {
            if ($rootScope.loggedIn)
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

                        $rootScope.token = response.token;

                        userFactory.getUserFromToken(response.token)
                            .success(function(data)
                            {
                                $rootScope.user = data.user;

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