angular.module('blog')
    .controller('articlesShowController', ['$scope', 'articleFactory', '$stateParams', '$timeout', '$state', 'Notification', 'commentFactory', '$window',
        function($scope, articleFactory, $stateParams, $timeout, $state, Notification, commentFactory, $window)
        {
            var amount = 5;
            articleFactory.getArticle($stateParams.articleSlug)
                .success(function(article)
                {
                    $scope.article = article;

                    $scope.amount = amount;

                    $scope.delete = function()
                    {
                        articleFactory.deleteArticle($stateParams.articleSlug)
                            .success(function()
                            {
                                $state.go('articles');
                    
                                $rootScope.notification.type = 'success';
                                $rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully deleted article!';
                                $rootScope.notification.popup = true;
                            })
                            .error(function(response)
                            {
                                Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                            });
                    };

                    $scope.deleteComment = function(id)
                    {
                        commentFactory.deleteComment($stateParams.articleSlug, id)
                            .success(function()
                            {
                                $window.location.reload();
                            })
                            .error(function(response)
                            {
                                Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                            });
                    }

                    $scope.loadComments = function() 
                    {
                        $rootScope.spinner.active = true;

                        $timeout(function()
                        {
                            $rootScope.spinner.active = false;
                            $scope.amount = $scope.amount + amount;
                        }, 1000);
                    };

                    $timeout(function()
                    {
                        $rootScope.spinner.active = false;
                    }, 1000);
                })
                .error(function(resource, status)
                {
                    $state.go('articles');
                    
                    $rootScope.notification.type = 'error';
                    $rootScope.notification.msg = '<span class="fa fa-exclamation-circle"></span> ' + resource.error;
                    $rootScope.notification.popup = true;
                });
        }
]);