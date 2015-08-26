angular.module('blog')
    .controller('articlesFilterController', ['$scope', '$rootScope', '$state', '$stateParams', 'Notification', 'articleFactory',
        function($scope, $rootScope, $state, $stateParams, Notification, articleFactory)
        {
            $scope.totalPages = 0;
            $scope.currentPage = 1;
            $scope.range = [];

            $scope.getArticles = function(pageNumber)
            {
                if(pageNumber===undefined)
                {
                    pageNumber = '1';
                }

                if ($stateParams.filterBy === 'categories')
                {
                    articleFactory.filterByCategory($stateParams.filterID, pageNumber)
                        .success(function(response)
                        {
                            $scope.articles     = response.data;
                            $scope.totalPages   = response.last_page;
                            $scope.currentPage  = response.current_page;
                
                            // Pagination Range
                            var pages = [];
                
                            for(var i=1;i<=response.last_page;i++) {          
                                pages.push(i);
                            }
                
                            $scope.range = pages;

                            articleFactory.getCategory($stateParams.filterID)
                                .success(function(response)
                                {
                                    $scope.filterCategory = response;
                                });
                        })
                        .error(function(response)
                        {
                            $state.go('articles');
                        });
                }
                else if ($stateParams.filterBy === 'tags')
                {
                    articleFactory.filterByTag($stateParams.filterID, pageNumber)
                        .success(function(response)
                        {
                            $scope.articles     = response.data;
                            $scope.totalPages   = response.last_page;
                            $scope.currentPage  = response.current_page;
                
                            // Pagination Range
                            var pages = [];
                
                            for(var i=1;i<=response.last_page;i++) {          
                                pages.push(i);
                            }
                
                            $scope.range = pages;

                            articleFactory.getTag($stateParams.filterID)
                                .success(function(response)
                                {
                                    $scope.filterTag = response;
                                });
                        })
                        .error(function(response)
                        {
                            $state.go('articles');
                        });
                }
                else
                {
                    $state.go('articles');
                }

                $scope.delete = function(slug)
                {
                    articleFactory.deleteArticle(slug, $rootScope.token)
                        .success(function()
                        {
                            Notification.success('<span class="fa fa-check-circle"></span> You successfully deleted article!');
                        })
                        .error(function(response)
                        {
                            Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                        });
                };
            };
        }
]);