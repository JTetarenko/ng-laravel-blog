var articlesIndexController = function($scope, $rootScope, articleFactory, Notification)
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

        articleFactory.getArticles(pageNumber)
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

                $scope.delete = function(slug)
                {
                    articleFactory.deleteArticle(slug, $rootScope.token)
                        .success(function()
                        {
                            Notification.success('<span class="fa fa-check-circle"></span> You successfully deleted article!');
                            $window.location.reload();
                        })
                        .error(function(response)
                        {
                            Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                        });
                };
            });
    };
};

articleFactory.$injector = ['$scope', '$rootScope', 'articleFactory', 'Notification'];

angular.module('blog')
    .controller('articlesIndexController', articlesIndexController);