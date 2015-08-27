angular.module('blog')
    .controller('usersRegisterController', ['$scope', '$state', 'userFactory', 'Notification', '$cookies',
        function($scope, $state, userFactory, Notification, $cookies)
        {
            if ($cookies.get('token') !== undefined)
            {
                $state.go('articles');
            }
            
            $scope.register = function()
            {
                var credentials = {
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    password_confirmation: $scope.password_confirmation
                };

                userFactory.createUser(credentials)
                    .success(function()
                    {
                        $state.go('login');

                        $rootScope.notification.type = 'success';
                        $rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully created account!';
                        $rootScope.notification.popup = true;
                    })
                    .error(function(response)
                    {
                        if (response.errors.username !== undefined)
                        {
                            Notification.error({
                                message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.username[0],
                                delay: 10000
                            });
                        }

                        if (response.errors.email !== undefined)
                        {
                            Notification.error({
                                message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.email[0],
                                delay: 10000
                            });
                        }
                        
                        if (response.errors.password !== undefined)
                        {
                            Notification.error({
                                message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.password[0],
                                delay: 10000
                            });
                        }
                    })
            };
        }
]);