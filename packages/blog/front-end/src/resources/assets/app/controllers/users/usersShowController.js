angular.module('blog')
    .controller('usersShowController', ['$scope', 'userFactory', '$stateParams', '$rootScope', '$timeout', '$window', '$state', 'Notification', '$interval',
        function($scope, userFactory, $stateParams, $rootScope, $timeout, $window, $state, Notification, $interval)
        {
            userFactory.getUser($stateParams.userID)
                .success(function(user, status)
                {
                    $scope.user = user;

                    if ($stateParams.showParam !== undefined)
                    {
                        if ($stateParams.showParam === 'articles')
                        {
                            $scope.hideActivities = true;
                            $scope.hideArticles = false;
                            $scope.hideComments = true;
                            $scope.lastActive = "";
                            $scope.articlesActive = "active";
                            $scope.commentsActive = "";

                            $rootScope.spinner.active = true;

                            userFactory.getUserArticles(user.id)
                                .success(function(resource, status)
                                {
                                    $scope.articles = resource.articles;
                                    $scope.articlesAmount = 6;

                                    $timeout(function()
                                    {
                                        $rootScope.spinner.active = false;
                                    }, 500);
                                })
                                .error(function(resource, status)
                                {
                                    Notification.error(
                                    {
                                        message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                    });
                                });
                        }
                        else if ($stateParams.showParam === 'comments')
                        {
                            $scope.hideActivities = true;
                            $scope.hideArticles = true;
                            $scope.hideComments = false;
                            $scope.lastActive = "";
                            $scope.articlesActive = "";
                            $scope.commentsActive = "active";

                            $rootScope.spinner.active = true;

                            userFactory.getComments(user.id)
                                .success(function(resource, status)
                                {
                                    $scope.comments = resource.comments;
                                    $scope.commentsAmount = 5;

                                    $timeout(function()
                                    {
                                        $rootScope.spinner.active = false;
                                    }, 500);
                                })
                                .error(function(resource, status)
                                {
                                    Notification.error(
                                    {
                                        message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                    });
                                });
                        }
                        else
                        {
                            $state.go('users_show', { userID: $stateParams.userID });
                        }
                    }
                    else
                    {
                        $scope.hideActivities = false;
                        $scope.hideArticles = true;
                        $scope.hideComments = true;
                        $scope.lastActive = "active";
                        $scope.articlesActive = "";
                        $scope.commentsActive = "";
                    }

                    $scope.getActivities = function()
                    {
                        $scope.hideActivities = false;
                        $scope.hideArticles = true;
                        $scope.hideComments = true;
                        $scope.lastActive = "active";
                        $scope.articlesActive = "";
                        $scope.commentsActive = "";
                    };
                    
                    $scope.getArticles = function()
                    {
                        $scope.hideActivities = true;
                        $scope.hideArticles = false;
                        $scope.hideComments = true;
                        $scope.lastActive = "";
                        $scope.articlesActive = "active";
                        $scope.commentsActive = "";

                        $rootScope.spinner.active = true;

                        userFactory.getUserArticles(user.id)
                            .success(function(resource, status)
                            {
                                $scope.articles = resource.articles;
                                $scope.articlesAmount = 6;

                                $timeout(function()
                                {
                                    $rootScope.spinner.active = false;
                                }, 500);
                            })
                            .error(function(resource, status)
                            {
                                Notification.error(
                                {
                                    message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                });
                            });
                    };

                    $scope.getComments = function()
                    {
                        $scope.hideActivities = true;
                        $scope.hideArticles = true;
                        $scope.hideComments = false;
                        $scope.lastActive = "";
                        $scope.articlesActive = "";
                        $scope.commentsActive = "active";

                        $rootScope.spinner.active = true;

                        userFactory.getComments(user.id)
                            .success(function(resource, status)
                            {
                                $scope.comments = resource.comments;
                                $scope.commentsAmount = 5;

                                $timeout(function()
                                {
                                    $rootScope.spinner.active = false;
                                }, 500);
                            })
                            .error(function(resource, status)
                            {
                                Notification.error(
                                {
                                    message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                });
                            });
                    };

                    $scope.loadArticles = function()
                    {
                        $rootScope.spinner.active = true;

                        $timeout(function()
                        {
                            $rootScope.spinner.active = false;
                            $scope.articlesAmount = $scope.articlesAmount + 3;
                        }, 1000);
                    }
                })
                .error(function(resource, status)
                {
                    $state.go('articles');
                    
                    $rootScope.notification.type = 'error';
                    $rootScope.notification.msg = '<span class="fa fa-exclamation-circle"></span> ' + resource.error;
                    $rootScope.notification.popup = true;
                });

            $scope.go = function(path) 
            {
                $window.open(path, '_blank');
            };

            $scope.getFirstPart = function(str) 
            {
                return str.split('@')[0];
            }

            $scope.getSecondPart = function(str) 
            {
                return str.split('@')[1];
            }
        }
]);