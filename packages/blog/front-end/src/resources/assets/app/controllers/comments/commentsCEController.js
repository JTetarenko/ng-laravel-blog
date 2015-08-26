angular.module('blog')
    .controller('commentsCEController', ['$scope', '$rootScope', 'commentFactory', 'Notification', '$window', '$interval',
        function($scope, $rootScope, commentFactory, $state, $stateParams, Notification, $window, $interval)
        {
            if ($stateParams.commentID === undefined)
            {
                $scope.type = "create";

                $scope.create = function()
                {
                    data = {
                        body: $scope.create_body
                    };

                    commentFactory.createComment($stateParams.articleSlug, data, $rootScope.token)
                        .success(function()
                        {
                            $window.location.reload();
                        })
                        .error(function()
                        {
                            Notification.error('<span class="fa fa-exclamation-triangle"></span> You do not have permission!');
                        });
                };
            }
            else
            {
                $scope.type = "edit";

                if ($rootScope.loggedIn)
                {
                    var timer = $interval(function()
                    {
                        if ($rootScope.userObtained)
                        {
                            $interval.cancel(timer);
                            delete timer;

                            commentFactory.beforeEdit($stateParams.articleSlug, $stateParams.commentID, $rootScope.token)
                                .success(function(response)
                                {
                                    $scope.edit_body = response.body;

                                    $scope.edit = function()
                                    {
                                        data = {
                                            body: $scope.edit_body,
                                            token: $rootScope.token
                                        }

                                        commentFactory.editComment($stateParams.articleSlug, $stateParams.commentID, data)
                                            .success(function()
                                            {
                                                $state.go('articles_show', { articleSlug: $stateParams.articleSlug });
                                            })
                                            .error(function(response)
                                            {
                                                if (response.errors.body[0] !== undefined)
                                                {
                                                    Notification.error({
                                                        message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.body[0],
                                                        delay: 10000
                                                    });
                                                }
                                            });
                                    };
                                })
                                .error(function(response)
                                {
                                    $state.go('articles_show', { articleSlug: $stateParams.articleSlug });

                                    $rootScope.notification.type = 'error';
                                    $rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
                                    $rootScope.notification.popup = true;
                                });
                        }
                    });
                }
                else
                {
                    $state.go('articles_show', { articleSlug: $stateParams.articleSlug });

                    $rootScope.notification.type = 'error';
                    $rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
                    $rootScope.notification.popup = true;
                }
            }
        }
]);